<template>
    <div>
        <h1> Welcome {{ client?.username }} </h1>
        <div v-if="isStravaLoggin">
            <div>
                <h2>
                    Authentication in Strava Success
                </h2>
            </div>
            <div>
                <label for="loadLatestMetadata"></label>
                <input type="submit" value="loadLatestMetadata" @click="onLoadLatestMetadata">
                <label for="loadAllMetadata"></label>
                <input type="submit" value="loadAllMetadata" @click="onLoadAllMetadata">
                <br><br>

                <button @click="onBulkSync">bulkSync</button>
            </div>
        </div>
        <div v-if="!isStravaLoggin">
            <label for="clientID">clientID:</label>
            <input type="text" id="clientID" name="clientID" v-model="clientId"><br><br>
            <label for="clientSecret">clientSecret:</label>
            <input type="password" id="clientSecret" name="clientSecret" v-model="clientSecret"><br><br>
            <input type="submit" value="OAuth" @click="onOauthLogin">
        </div>



        <br><br>
        <button @click="onRunApp" v-if="isRideAppReady">RUN</button>
        <button @click="onRideApp" v-if="isRunningAppReady">RIDE</button>



        <div v-if="isLoading">
            The metadata you have at this time is in the loading process \t {{ foundData }} \t workouts
        </div>

        <DashboardTable />

    </div>
</template>

<script lang="ts">
import DashboardTable from './components/DashboardTable.vue';
import { ServerAddress } from "@/dataSturcts/interfaces/static/ServerAddress"
import { FrontendServerAddress } from "@/dataSturcts/interfaces/static/FrontendServerAddress"



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

    public isRunningAppReady = false
    public isRideAppReady = false


    private server = new ServerAddress();
    private uiServer = new FrontendServerAddress()

    onLoadLatestMetadata() {
        if (this.client && this.client.stravaToken) {
            let req = requests(this.client.stravaToken).getMetadata(1)

            fetch(req.url, {
                method: req.method,
                headers: req.header
            }).then(async ele => {
                let json = await ele.json()
                const receiveData = (metadataFromJsonArray(json));
                const oldData: Metadata[] = store.getters.getDashboardData

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


        console.log(this.myToken)
        let url = "https://www.strava.com/oauth/authorize?client_id=" + this.clientId + "&response_type=code&redirect_uri=" +
            (new URL(document.URL)).origin /* this.uiServer.getUrl() */ + "/OAuthFlow" /* + ?myToken=" + "this.myToken "+ */ + "&approval_prompt=force&scope=read_all,activity:read_all,profile:read_all"

        console.log("oauth", this.clientId)

        store.dispatch("updateClientIDandSecrect", {
            clientID: this.clientId,
            clientSecret: this.clientSecret
        })

        const req = requests2.setStravaData(this.myToken, this.clientId, this.clientSecret)

        console.log(req);


        fetch(req.url, {
            method: req.method,
            body: req.body,
            headers: req.header,
        })

        window.location.assign(url)


    }


    onBulkSync() {
        console.log("");
        store.dispatch("fireSync", [])
    }

    onRunApp() {
        console.log("runapp");


        sessionStorage.setItem('url', this.server.getRunUrl());
        sessionStorage.setItem('accessToken', this.client?.myLoginToken ?? "");
        window.location.assign((new URL(document.URL)).origin + "/app")

        // window.location.assign(this.server.getApp())
    }

    onRideApp() {
        console.log("rideApp");

        sessionStorage.setItem('url', this.server.getRideUrl());
        sessionStorage.setItem('accessToken', this.client?.myLoginToken ?? "");
        window.location.assign((new URL(document.URL)).origin + "/app")

        // window.location.assign(this.server.getApp())
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




        store.watch(() => store.getters.getDashboardData, (newData: Metadata[]) => {
            let runCount = newData.filter(ele => ele.sport == "Run").filter((ele) => ele.workoutDataCount > 1).length
            let rideCount = newData.filter(ele => ele.sport == "Ride").filter((ele) => ele.workoutDataCount > 1).length

            console.log("run count", runCount);

            this.isRideAppReady = runCount > 1 ? true : false
            this.isRunningAppReady = rideCount > 1 ? true : false

        });

        var newData: Metadata[] = store.getters.getDashboardData

        let runCount = newData.filter(ele => ele.sport == "Run").filter((ele) => ele.workoutDataCount > 1).length
        let rideCount = newData.filter(ele => ele.sport == "Ride").filter((ele) => ele.workoutDataCount > 1).length

        console.log("run count", runCount);

        this.isRideAppReady = runCount > 1 ? true : false
        this.isRunningAppReady = rideCount > 1 ? true : false
    }
}
</script>