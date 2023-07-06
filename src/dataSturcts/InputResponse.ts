import store from "@/store";
import { ClientData } from "@/dataSturcts/interfaces/interfaces";
import { Metadata } from "@/dataSturcts/interfaces/Metadata";

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

  public toDashboardStruct(): Metadata[] {
    return this.metadatas.map((ele) => ({
      averageHeartRate: ele.averageHeartRate,
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

  public toStore() {
    const client: ClientData = {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      myLoginToken: this.myLoginToken,
      username: this.username,
      stravaToken: null,
    };

    store.dispatch("updateDashboardData", this.toDashboardStruct());
    store.dispatch("updateClientData", client);
  }

  static fromJson(json: any): LoginResponse {
    console.log(json);
    const metadatas: Metadata[] = json.metadatas.map((ele: any) => ({
      metadataId: ele.id,
      sport: ele.sport,
      startTime: ele.startTime,
      totalDistance: ele.totalDistance,
      totalTime: ele.totalTime,
      workoutDataCount: ele.count,
      averageHeartRate: ele.averageHearRate,
      averagePower: ele.averagePower,
      averageSpeed: ele.averageSpeed,
    }));

    sessionStorage.setItem('accessToken', json.myLoginToken);
    document.cookie = `accessToken=${json.myLoginToken}`

    return new LoginResponse(
      json.username,
      json.myLoginToken,
      json.clientId,
      json.clientSecret,
      metadatas
    );
  }
}
