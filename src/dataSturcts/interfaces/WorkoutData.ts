const headerString = "id,lat,long,timerTime,power,speed,heartRate";

interface CSVWorkout {
  header: string;
  CSV: string;
}

interface LatLng {
  data: number[][];
}

interface _data {
  data: number[];
}

interface WorkoutData {
  watts?: _data;
  heartrate?: _data;
  velocity_smooth?: _data;
  latlng: LatLng;
  time?: _data;
}

export const workoutDataFromJson = (
  id: string,
  workoutData: any
): WorkoutData => {
  const heartrate = (workoutData as WorkoutData).heartrate?.data ?? -1;
  const lat = (workoutData as WorkoutData).latlng.data.map((ele) => ele[0]);
  const long = (workoutData as WorkoutData).latlng.data.map((ele) => ele[1]);
  const speed = (workoutData as WorkoutData).velocity_smooth?.data ?? -1;
  const watts = (workoutData as WorkoutData).watts?.data ?? -1;
  const timerTime = (workoutData as WorkoutData).time?.data ?? -1;

  return workoutData as WorkoutData;
};

export function mapStructToCSVHeader(
  id: string,
  data: WorkoutData
): CSVWorkout {
  const header = headerString.split(",");

  const lat = data.latlng.data.map((ele) => ele[0]);
  const long = data.latlng.data.map((ele) => ele[1]);
  const timerTime = data.time?.data ?? Array(lat.length).fill(-1);
  const power = data.watts?.data ?? Array(lat.length).fill(-1);
  const speed = data.velocity_smooth?.data ?? Array(lat.length).fill(-1);
  const heartrate = data.heartrate?.data ?? Array(lat.length).fill(-1);

  const resultArr: string[] = [];

  for (let i = 0; i < lat.length; i++) {
    const result = header.map((field) => {
      switch (field) {
        case "id":
          return id;
        case "lat":
          return lat[i]?.toString() ?? "";
        case "long":
          return long[i]?.toString() ?? "";
        case "timerTime":
          return timerTime[i]?.toString() ?? "";
        case "power":
          return power[i]?.toString() ?? "";
        case "speed":
          return speed[i]?.toString() ?? "";
        case "heartRate":
          return heartrate[i]?.toString() ?? "";
        default:
          return "";
      }
    });

    resultArr.push(result.join(","));
  }

  return {
    header: headerString,
    CSV: resultArr.join("\n"),
  };
}
