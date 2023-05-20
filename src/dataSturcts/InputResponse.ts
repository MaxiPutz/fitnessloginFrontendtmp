import { DashboardStruct } from "./interfaces";

export default class LoginResponse {
  clientId: string | null;
  clientSecret: string | null;
  username: string;
  myLoginToken: string;
  metadatas: Metadata[] = [];

  constructor(
    username: string,
    myToken: string,
    clientId: string | null,
    clientSecret: string | null,
    metadatas: Metadata[]
  ) {
    this.username = username;
    this.myLoginToken = myToken;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.metadatas = metadatas;
  }

  public toDashboardStruct(): DashboardStruct[] {
    return this.metadatas.map((ele) => ({
      averageHearRate: ele.averageHeartRate,
      averagePower: ele.averagePower,
      averageSpeed: ele.averageSpeed,
      metadataId: ele.metadataId,
      sport: ele.sport,
      startTime: ele.startTime,
      totalDistance: ele.totalDistance,
      totalTime: ele.totalTime,
      workoutDataCount: ele.workoutDataCount,
    }));
  }

  static fromJson(json: any): LoginResponse {
    console.log(json)
    const metadatas : Metadata[] = json.metadatas.map( (ele : any ) => ({
      metadataId: ele.id,
      sport: ele.sport,
      startTime: ele.startTime,
      totalDistance: ele.totalDistance,
      totalTime: ele.totalTime,
      workoutDataCount: ele.count,
      averageHeartRate: ele.averageHearRate,
      averagePower: ele.averagePower,
      averageSpeed: ele.averageSpeed,
    }) )

     


    return new LoginResponse(
      json.username,
      json.myLoginToken,
      json.clientId,
      json.clientSecret,
      metadatas,
    );
  }
}

interface Metadata {
  averageHeartRate: number;
  averagePower: number;
  averageSpeed: number;
  metadataId: string;
  sport: string;
  startTime: string;
  totalDistance: number;
  totalTime: number;
  workoutDataCount: number;
}
