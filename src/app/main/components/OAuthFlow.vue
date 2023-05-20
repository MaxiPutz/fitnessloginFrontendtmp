<template>
    <div>
        <h1>OAutho Flow</h1>
        <p>Authorization code: {{ authorizationCode }}</p>
        <button @click="onClick">click me</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store';

import {ClientData,DashboardStruct}  from "@/dataSturcts/interfaces"

export default class OAuthFlow extends Vue {
    public client: ClientData | null = null;
    public dashboardData : DashboardStruct[] = []

    get authorizationCode(): string {
        return this.$route.query.code as string
    }

    onClick() {
        const form = new URLSearchParams();


        console.log(this.client);
        

        var data = {
            ClientID: this.client?.clientId ?? "",
            ClientSecret: this.client?.clientSecret ?? "",
            Code: this.authorizationCode
        }

        console.log("keys,", data)

        form.append("client_id", data.ClientID);
        form.append("client_secret", data.ClientSecret);
        form.append("code", data.Code);
        form.append("grant_type", "authorization_code");
        form.append("Content-Type", "application/x-www-form-urlencoded");

        const fitnessAppUrl = "https://www.strava.com/oauth/token";
        fetch(fitnessAppUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: form.toString(),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log("res",data)
            })
            .catch(error => {
                // Handle any errors
            });
    }


    mounted(): void {
        this.client = store.getters.getClientData
        console.log(this.client);
        var d: DashboardStruct[] = store.getters.getDashboardData;
        console.log(d)
        this.dashboardData = d;
    }
}
</script>