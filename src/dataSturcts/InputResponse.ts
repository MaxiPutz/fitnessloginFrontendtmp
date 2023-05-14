export default class LoginResponse {
    averageHeartRate: number;
    averagePower: number;
    averageSpeed: number;
    clientId: string | null;
    clientSecret: string | null;
    metadataId: string;
    sport: string;
    startTime: string;
    totalDistance: number;
    totalTime: number;
    username: string;
    workoutDataCount: number;
  
    constructor(
      averageHeartRate: number,
      averagePower: number,
      averageSpeed: number,
      clientId: string | null,
      clientSecret: string | null,
      metadataId: string,
      sport: string,
      startTime: string,
      totalDistance: number,
      totalTime: number,
      username: string,
      workoutDataCount: number
    ) {
      this.averageHeartRate = averageHeartRate;
      this.averagePower = averagePower;
      this.averageSpeed = averageSpeed;
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.metadataId = metadataId;
      this.sport = sport;
      this.startTime = startTime;
      this.totalDistance = totalDistance;
      this.totalTime = totalTime;
      this.username = username;
      this.workoutDataCount = workoutDataCount;
    }


    static fromJson(json: any): LoginResponse {
  
        return new LoginResponse(
            json.averagehearrate,
            json.averagePower,
            json.averageSpeed,
            json.clientId,
             json.clientSecret,
            json.metadataId,
            json.sport,
            json.startTime,
            json.totalDistance,
            json.totalTime,
            json.username,
             json.workoutDataCount
        );
      }
  }
  

