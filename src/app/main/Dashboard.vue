<template>
    <div>
        <h1> Welcome {{ client?.username }} </h1>

        <label for="clientID">clientID:</label>
        <input type="text" id="clientID" name="clientID" v-model="clientId"><br><br>
        <label for="clientSecret">clientSecret:</label>
        <input type="password" id="clientSecret" name="clientSecret" v-model="clientSecret"><br><br>
        <input type="submit" value="OAuth" @click="onOauthLogin">


        <DashboardTable />
    </div>
</template>

<script lang="ts">
import DashboardTable from './components/DashboardTable.vue';
import {ServerAddress} from "@/dataSturcts/StaticData"

import { Options, Vue } from 'vue-class-component';
import { ClientData } from "@/dataSturcts/interfaces"
import store from '@/store';
import { thisExpression } from '@babel/types';

@Options({
    components: {
        DashboardTable
    }
})

export default class Dashboard extends Vue {
    public client: ClientData | null = null;
    public clientId = '';
    public clientSecret = ''

    onOauthLogin() {
        let server = new ServerAddress();


        let url = "https://www.strava.com/oauth/authorize?client_id=" + this.clientId + "&response_type=code&redirect_uri="+ "http://localhost:8081" +"/OAuthFlow&approval_prompt=force&scope=read_all,activity:read_all,profile:read_all"

        console.log("oauth", this.clientId)

        store.dispatch("updateClientIDandSecrect", {
            clientID: this.clientId,
            clientSecret: this.clientSecret
        })

        window.location.assign(url)
        // this.$router.push({
        //     path: url
        // })
    }

    mounted(): void {
        this.client = store.getters.getClientData
        console.log(this.client);
        this.clientId = this.client?.clientId ?? ""
        this.clientSecret = this.client?.clientSecret ?? ""
    }
}
</script>