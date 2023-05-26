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
                    <th> Count</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody v-for="data2 in dashboardData" :key="data2.metadataId">
                <DashboardRow :msg="data2" />
            </tbody>
        </table>
    </div>
</template>
  
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
    public dashboardData: Metadata[] = [];

    mounted(): void {
        var d: Metadata[] = store.getters.getDashboardData;
        console.log(d)
        this.dashboardData = d;

        store.watch(() => store.getters.getDashboardData, (newData: Metadata[]) => {
            this.dashboardData = newData;
        });
    }
}
</script>
  