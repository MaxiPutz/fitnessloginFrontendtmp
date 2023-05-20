<template>
    <div>
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
                    <th>Workout Data Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in dashboardData" :key="data.metadataId">
                    <td>{{ data.metadataId }}</td>
                    <td>{{ data.sport }}</td>
                    <td>{{ data.startTime }}</td>
                    <td>{{ data.averagePower }}</td>
                    <td>{{ data.averageSpeed }}</td>
                    <td>{{ data.averageHearRate }}</td>
                    <td>{{ data.totalTime }}</td>
                    <td>{{ data.totalDistance }}</td>
                    <td>{{ data.workoutDataCount }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { DashboardStruct } from '@/dataSturcts/interfaces';
import store from '@/store';

@Options({
    props: {
        msg: {
            type: [],
            required: true,
        }
    }
})
export default class DashboardTable extends Vue {
    public dashboardData: DashboardStruct[] = [];


    mounted(): void {
        var d: DashboardStruct[] = store.getters.getDashboardData;
        console.log(d)
        this.dashboardData = d;
    }
}
</script>
  