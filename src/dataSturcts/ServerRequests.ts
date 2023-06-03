import { ServerAddress } from "./interfaces/static/ServerAddress";
import {
  User,
  FetchAPIStructPost,
  OAuth,
  FetchAPIStructGet,
} from "./interfaces/interfaces";

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const url: string = new ServerAddress().getUrl();

export const requests = {
  login: (user: User) => {
    return {
      url: url + "/api/login/",
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  },
};

export const requests2: {
  login: (user: User) => FetchAPIStructPost;
  refresh: (token: string) => FetchAPIStructGet;
  workoutDataInsert: (
    token: string,
    id: string,
    header: string,
    csv: string
  ) => FetchAPIStructPost;
  metaDataInsert: (
    token: string,
    header: string,
    csv: string
  ) => FetchAPIStructPost;
  setStravaData: (
    myToken: string,
    clientID: string,
    clientSecret: string
  ) => FetchAPIStructPost;
} = {
  login: (user: User) => {
    return {
      url: url + "/api/login/",
      method: "POST",
      body: JSON.stringify(user),
      header: {
        "Content-Type": "application/json",
      },
    };
  },
  refresh: (token: string) => {
    return {
      url: url + "/api/userReload",
      method: "GET",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  },
  workoutDataInsert: (
    token: string,
    id: string,
    header: string,
    csv: string
  ) => {
    return {
      url: url + "/api/workoutDataInsert",
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        header,
        csv,
      }),
    };
  },
  metaDataInsert: (token: string, header: string, csv: string) => {
    return {
      url: url + "/api/metadataInsert",
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        header,
        csv,
      }),
    };
  },
  setStravaData(myToken, clientID, clientSecret) {
    return {
      url: url + "/api/userSetStravaData",
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        clientID: clientID,
        clientSecret: clientSecret,
      }),
    };
  },
};
