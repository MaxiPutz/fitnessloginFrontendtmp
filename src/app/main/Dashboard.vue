<template>
    <div>
        <h1> Welcome {{ client?.username }} </h1>

        <div v-if="isStravaLoggin">
            <div>
                <h2>
                    You are loggedin Strava
                </h2>
            </div>
            <div>
                <label for="loadLatestMetadata"></label>
                <input type="submit" value="loadLatestMetadata" @click="onLoadLatestMetadata">
                <label for="loadAllMetadata"></label>
                <input type="submit" value="loadAllMetadata" @click="onLoadAllMetadata">
                <br><br>


            </div>

        </div>
        <div v-if="!isStravaLoggin">
            <label for="clientID">clientID:</label>
            <input type="text" id="clientID" name="clientID" v-model="clientId"><br><br>
            <label for="clientSecret">clientSecret:</label>
            <input type="password" id="clientSecret" name="clientSecret" v-model="clientSecret"><br><br>
            <input type="submit" value="OAuth" @click="onOauthLogin">
        </div>


        <div v-if="isLoading">
            metadata is loading you received at this time {{ foundData }}
        </div>

        <DashboardTable />

    </div>
</template>

<script lang="ts">
import DashboardTable from './components/DashboardTable.vue';
import { ServerAddress } from "@/dataSturcts/StaticData"

import { requests, getAllActivities } from "@/dataSturcts/StravaRequests"
import { requests2 } from "@/dataSturcts/ServerRequests"

import { metadataFromJsonArray, mapMetadataToCSVHeader, Metadata } from "@/dataSturcts/interfaces/Metadata"

import { Options, Vue } from 'vue-class-component';
import { ClientData } from "@/dataSturcts/interfaces/interfaces"
import store from '@/store';


@Options({
    components: {
        DashboardTable
    }
})

export default class Dashboard extends Vue {
    public client: ClientData | null = null;
    public clientId = '';
    public clientSecret = ''
    public myToken = "";

    public isStravaLoggin = false;

    public isLoading = false
    public foundData = 0


    onLoadLatestMetadata() {
        if (this.client && this.client.stravaToken) {
            let req = requests(this.client.stravaToken).getMetadata(1)

            fetch(req.url, {
                method: req.method,
                headers: req.header
            }).then(async ele => {
                let json = await ele.json()
                const receiveData = (metadataFromJsonArray(json));
                const oldData : Metadata[] = store.getters.getDashboardData

                const newData = receiveData
                        .filter(nEle => oldData.filter(oEle => oEle.metadataId == nEle.metadataId).length == 0)


                let str = mapMetadataToCSVHeader(newData)

                console.log(str);
                if (this.client != null) {

                    store.dispatch("addDashboardData", newData)
                    let req = requests2.metaDataInsert(this.client.myLoginToken, str.header, str.CSV)
                    fetch(req.url, {
                        method: req.method,
                        body: req.body,
                        headers: req.header,
                    })
                }

            })
        }
    }

    async onLoadAllMetadata() {
        if (this.client != null && this.client.stravaToken) {

            const data = getAllActivities(this.client.stravaToken)

            for await (const d of data) {
                this.isLoading = true

                console.log(d);
                this.foundData = d.data.length
                if (d.msg == "finished") {
                    this.isLoading = false

                    const oldData: Metadata[] = store.getters.getDashboardData

                    const receivedData: Metadata[] = d.data;


                    const newData = receivedData
                        .filter(nEle => oldData.filter(oEle => oEle.metadataId == nEle.metadataId).length == 0)

                    console.log("newdata", newData);

                    const csvData = mapMetadataToCSVHeader(newData)

                    const req = requests2.metaDataInsert(this.client.myLoginToken, csvData.header, csvData.CSV)

                    store.dispatch("addDashboardData", newData)

                    fetch(
                        req.url, {
                        method: req.method,
                        body: req.body,
                        headers: req.header
                    })

                }
            }

        }
    }

    onOauthLogin() {
        let server = new ServerAddress();

        console.log(this.myToken)
        let url = "https://www.strava.com/oauth/authorize?client_id=" + this.clientId + "&response_type=code&redirect_uri=" +
            "http://localhost:8081" + "/OAuthFlow?myToken=" + this.myToken + "&approval_prompt=force&scope=read_all,activity:read_all,profile:read_all"

        console.log("oauth", this.clientId)

        store.dispatch("updateClientIDandSecrect", {
            clientID: this.clientId,
            clientSecret: this.clientSecret
        })

        const req = requests2.setStravaData(this.myToken, this.clientId, this.clientSecret)

        console.log(req);
        

        fetch(req.url, {
            method: req.method,
            body:req.body,
            headers: req.header,            
        })

        window.location.assign(url)


    }

    mounted(): void {


        this.client = store.getters.getClientData
        console.log(this.client);
        this.clientId = this.client?.clientId ?? ""
        this.clientSecret = this.client?.clientSecret ?? ""
        this.myToken = this.client?.myLoginToken ?? "notoken"

        this.client = store.getters.getClientData;

        if (this.client!.stravaToken != null) {
            this.isStravaLoggin = true
        }

    }
}
</script>