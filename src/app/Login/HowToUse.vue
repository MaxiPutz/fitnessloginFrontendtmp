<template>
    <div class="container">
        <h1>Tutorial: Setting Up Not Another Fitness App with Strava API</h1>

            <img  style="max-width: 100%; margin-bottom: 20px;" src="@/assets/output3.gif" alt="Animated GIF">


        <h2>Step 1: Sign up for a Strava Account</h2>
        <p>If you haven't already, go to <a href="https://www.strava.com/register">Strava registration page</a> and sign up
            for a Strava account. Follow the instructions to create your account.</p>

        <h2>Step 2: Create an App on Strava</h2>
        <ol>
            <li>After logging in to your Strava account, go to <a href="https://www.strava.com/settings/api">Strava API
                    settings</a>.</li>
            <li>Click on the "Create an App" button to create a new app.</li>
            <li>Fill in the following information for your app:</li>
        </ol>
        <ul>
            <li>Application Name: not-another-fitness</li>
            <li>Category: Visualizer</li>
            <li>Website: <a
                    href="https://not-another-fitness-dje544rcra-no.a.run.app/">https://not-another-fitness-dje544rcra-no.a.run.app/</a>
            </li>
            <li>Authorization Callback Domain: not-another-fitness-dje544rcra-no.a.run.app</li>
        </ul>
        <p>Once you've filled in the details, click on the "Create" button to create your app.</p>

        <h2>Step 3: Retrieve Client ID and Client Secret</h2>
        <p>After creating your app, you will be redirected to the "My API Application" page. On this page, you can find the
            following information:</p>
        <ul>
            <li>Category: The category you chose for your application (Visualizer in this case)</li>
            <li>Client ID: Your application ID</li>
            <li>Client Secret: Your client secret</li>
        </ul>
        <p>Copy the Client ID and Client Secret from the "My API Application" page.</p>
        <h2>Step 4: Configure Not Another Fitness App</h2>
        <ol>
            <li>Register and login to the Not Another Fitness App</li>
            <li>Fill in the Client ID and Client Secret obtained from the previous steps.</li>
            <li>Click on Oauth and authorizate the api for the Not Another Fitness App</li>
        </ol>

        <h2>Step 5: Sync Your Workouts and Have Fun with the App</h2>
        <ol>
            <li>Initiate the workout sync process.</li>
            <li>Once the sync is complete, you will be able to view and analyze your workout data within the app.</li>
            <li>Explore the features and functionalities of the app to make the most out of your fitness data.</li>
        </ol>

        <p>Now you're all set up with the Not Another Fitness app and Strava API integration. Enjoy tracking and analyzing
            your workouts!</p>
    </div>
</template>

<script lang="ts">
import { def } from '@vue/shared';
import { Vue } from 'vue-class-component';

export default class HowToUser extends Vue { }
</script>


<style>
.container {
    margin-left: 15%;
    margin-right: 15%;
    text-align: left;
}

h1 {
    font-family: Arial, sans-serif;
    font-size: 24px;
    margin-top: 70px;
}

h3,
h4 {
    font-family: Arial, sans-serif;
    font-size: 18px;
    margin-top: 10px;
}

p {
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 16px;
}
</style>