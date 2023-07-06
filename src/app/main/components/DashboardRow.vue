<template>
    <tr>
        <td>{{ msg.metadataId }}</td>
        <td>{{ msg.sport }}</td>
        <td>{{ msg.startTime }}</td>
        <td>{{ msg.averagePower }}</td>
        <td>{{ msg.averageSpeed }}</td>
        <td>{{ msg.averageHeartRate }}</td>
        <td>{{ msg.totalTime }}</td>
        <td>{{ msg.totalDistance }}</td>
        <td>{{ msg.workoutDataCount }}</td>
        <td>
            <button v-if="isReadyToSync" @click="getWorkout">sync</button>
        </td>
        <!-- <td v-if="autoSync">"autoSync"</td>
        <td v-if="bulkSync">"bulkSync"</td> -->

    </tr>
</template>

<style>
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

</style>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Metadata } from "@/dataSturcts/interfaces/Metadata"
import { workoutDataFromJson, mapStructToCSVHeader } from "@/dataSturcts/interfaces/WorkoutData"

import { requests } from "@/dataSturcts/StravaRequests"
import { requests2 } from "@/dataSturcts/ServerRequests"

import store from '@/store';
import { ClientData } from '@/dataSturcts/interfaces/interfaces';

@Options({
    props: {
        msg: {
            type: Object as () => Metadata,
        },
        autoSync: {
            type: Object as () => boolean,
        },
        bulkSync: {
            type: Object as () => boolean,
        },

    }
})

export default class DashboardRow extends Vue {
    autoSync!: boolean
    bulkSync!: boolean
    msg!: Metadata
    client?: ClientData
    isReadyToSync = false

    getWorkout() {
        console.log("");
        if (this.isReadyToSync == false) {
            console.log("no sync");

            return
        }
        this.isReadyToSync = false
        const token: ClientData = store.getters.getClientData

        if (token && token.stravaToken) {
            const req = requests(token.stravaToken).getWorkout(this.msg.metadataId)
            fetch(req.url, {
                method: req.method,
                headers: req.header
            }).then(async ele => {
                console.log(ele);
                const json = await ele.json()
                // console.log(json);

                let str = mapStructToCSVHeader(this.msg.metadataId, json)

                // console.log(str);

                if (this.client != null) {

                    console.log(json.time.data.length);

                    this.msg.workoutDataCount = json.time.data.length

                    let req = requests2.workoutDataInsert(this.client?.myLoginToken, this.msg.metadataId, str.header, str.CSV)
                    fetch(req.url, {
                        method: req.method,
                        body: req.body,
                        headers: req.header,
                    }).then((_res) => {
                        console.log("response success");

                        store.dispatch("setDashboardDataSyncCount", this.msg)

                    })

                }

            })
        }
    }

    mounted(): void {
        this.client = store.getters.getClientData

        this.isReadyToSync = this.client?.stravaToken?.accessToken != null && this.msg.workoutDataCount == 0


        store.watch(() => store.getters.getSync, (newVal: any[]) => {
            if (this.bulkSync) {
                console.log(this.msg.metadataId);

                this.getWorkout()

            }
        })

        if (this.autoSync) {
            this.getWorkout()
        }
    }
}

</script>