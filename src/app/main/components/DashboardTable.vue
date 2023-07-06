<template>
    <div class="content">
        <h1>Dashboard</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Metadata ID</th>
                    <th>Sport</th>
                    <th>Start Time</th>
                    <th>Average Power</th>
                    <th>Average Speed</th>
                    <th>Average Heart Rate</th>
                    <th>Total Time</th>
                    <th>Total Distance</th>
                    <th> Count</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody v-for="data2 in rowData" :key="data2.metadata.metadataId">
                <DashboardRow :msg="data2.metadata" :autoSync="data2.autoSync" :bulkSync="data2.bulkSync" />
            </tbody>
        </table>
    </div>
</template>

<style>
h1 {
    margin-top: 0;
}

.content {
    width: 100%;

}

table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    margin-left: auto;
    margin-right: auto;
    /* Center the table */
}


thead {
    width: 100%;
}
tbody {
    width: 100%;
}

thead th {
    background-color: #f2f2f2;
    text-align: left;
    padding: 10px;

}

tbody td {
    border-bottom: 1px solid #ddd;
    padding: 10px;
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
import { Options, Vue } from 'vue-class-component';
import { ClientData } from '@/dataSturcts/interfaces/interfaces';
import { Metadata } from "@/dataSturcts/interfaces/Metadata"
import DashboardRow from './DashboardRow.vue'; "@/app/main/components/DashboardRow.vue"
import store from '@/store';

@Options({
    components: {
        DashboardRow
    },
    props: {
        msg: {
            type: [],
            required: true,
        }
    }
})
export default class DashboardTable extends Vue {
    public rowData: {
        metadata: Metadata,
        autoSync: boolean,
        bulkSync: boolean
    }[] = []

    public dashboardData: Metadata[] = [];




    mounted(): void {
        var d: Metadata[] = store.getters.getDashboardData;
        console.log(d)
        this.dashboardData = d;

        let _count = 30;

        let _skipCount = 0

        this.rowData = this.dashboardData.map((ele, i) => {

            const skip = ele.workoutDataCount > 1 ? true : false

            _skipCount = skip ? _skipCount + 1 : _skipCount

            return {
                metadata: ele,
                autoSync: i <= (_count + _skipCount) && !skip,
                bulkSync: (_count + _skipCount) < i && i <= _skipCount + (2 * _count) && !skip
            }
        })

        store.watch(() => store.getters.getDashboardData, (newData: Metadata[]) => {
            this.dashboardData = newData;


            let _skipCount = 0

            this.rowData = this.dashboardData.map((ele, i) => {

                const skip = ele.workoutDataCount > 1 ? true : false

                _skipCount = skip ? _skipCount + 1 : _skipCount

                return {
                    metadata: ele,
                    autoSync: i <= (_count + _skipCount) && !skip,
                    bulkSync: (_count + _skipCount) < i && i <= _skipCount + (2 * _count) && !skip
                }
            })

            console.log(this.rowData);
        });

        console.log(this.rowData);
    }
}
</script>
  