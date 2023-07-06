<template>
    <div class="container">
        <h1>MaxiPutz.github.io</h1>

        <h3>Quick view into the App</h3>

        <h4>What can I do with this App?</h4>
        <p>Compare the performance data of routes which you frequently use for your Workout. For example, if you run the
            same route every day, you might want to know your performance over time. You can graphically compare and analyze
            these data with this app.</p>

        <h4>What do I see on the homepage?</h4>
        <p>All Workouts!</p>
        <img src="https://user-images.githubusercontent.com/48091139/228637792-45201524-15bf-450a-9740-7a274dcdc662.jpg"
            alt="Screenshot of homepage">

        <h4>What happens if I click on a blue Workout-card/button?</h4>
        <p>This Workout is shown then in Detail:</p>
        <img src="https://user-images.githubusercontent.com/48091139/228636530-f73bcecd-3653-4533-84f7-d98ccf1c0422.jpg"
            alt="Screenshot of Workout detail view">

        <h4>What's the use of the CREATE-button in the header bar?</h4>
        <p>Select a frequent Workout segment (part of the route) on the map.</p>
        <p>Ok, but how can I select my segment of interest from point A to point B?</p>
        <ol>
            <li>Click CREATE</li>
            <li>Drag &amp; drop the pins on the map:</li>
            <ul>
                <li>green pin to the desired start point</li>
                <li>red pin to the end point (segment will appear green)</li>
            </ul>
            <li>Click the yellow LOAD button in the header bar to view the graphical comparison of multiple Workouts of one
                route:</li>
        </ol>
        <img src="https://user-images.githubusercontent.com/48091139/228637416-43bb6465-c071-48af-be8f-f9895f89a904.jpg"
            alt="Screenshot of segment selection">
        <p>Load all runs with this segment and compare it with the mean data from</p>
        <img src="https://user-images.githubusercontent.com/48091139/228637481-065573b2-8315-4e30-b065-c9eea4deefec.jpg"
            alt="Screenshot of comparison view">

    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';


export default class Info extends Vue {

}
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

img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
}
</style>