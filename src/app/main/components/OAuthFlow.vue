<template>
    <div>
        <h1>OAutho Flow</h1>
        <p>client: {{ client?.username }}</p>
        <p>client: {{ client?.clientId }}</p>
        <p>client: {{ client?.clientSecret }}</p>
        <p>jwt token: {{ myToken }}</p>
        <p>Authorization code: {{ authorizationCode }}</p>


        <button @click="onClick">click me</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store';
import { requests2 } from "@/dataSturcts/ServerRequests"
import { ClientData, StravaToken } from "@/dataSturcts/interfaces/interfaces.js"
import LoginResponse from '@/dataSturcts/InputResponse';
import {Metadata} from "@/dataSturcts/interfaces/Metadata"

export default class OAuthFlow extends Vue {
    public client: ClientData | null = null;
    public dashboardData: Metadata[] = []

    get authorizationCode(): string {
        return this.$route.query.code as string
    }

    get myToken(): string {
        const token = sessionStorage.getItem("accessToken") ?? ""
        console.log(token
        );
        
        return token;
        // eslint-disable-next-line no-unreachable
        return this.$route.query.myToken as string
    }

    onClick() {
        this.logInStrava()
    }

    logInStrava() {
        const form = new URLSearchParams();

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

        console.log("form", form.toString());

        fetch(fitnessAppUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: form.toString()
        }).then(res => {
            console.log(res);
            return res.json()
        }).then(json => {
            console.log(json);

            const sToken: StravaToken = {
                accessToken: json.access_token,
                refreshToken: json.refresh_token
            }

            store.dispatch("setClientStravaData", sToken)

            const c: ClientData = JSON.parse(JSON.stringify(store.getters.getClientData))
            console.log(c.stravaToken);

            this.$router.push({
                name: "Dashboard",
            })

        })

    }


    mounted(): void {

        const req = requests2.refresh(this.myToken);

        console.log(req.url)
        console.log(req.header);
        fetch(req.url, {
            method: req.method,
            headers: req.header
        })
            .then(response => response.json())
            .then(json => {
                let res = LoginResponse.fromJson(json)
                res.toStore()
                this.client = store.getters.getClientData
                console.log(this.client);

                this.logInStrava()
                
            })




    }
}
</script>