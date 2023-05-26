type Resolution = "high" | "low" | "medium";
const resolution: Resolution = "low";

import {
  StravaToken,
  FetchAPIStructGet,
} from "@/dataSturcts/interfaces/interfaces";
import {
  metadataFromJsonArray,
  mapMetadataToCSVHeader,
  Metadata,
  Generator,
} from "@/dataSturcts/interfaces/Metadata";

const stravaAPIUrl = "https://www.strava.com/api/v3";

const _metdata = (page: number) =>
  stravaAPIUrl + "/athlete/activities?unit_system=metric&page=" + page;
const _workout = (id: string, resolution: Resolution) =>
  stravaAPIUrl +
  "/activities/" +
  id +
  "/streams?keys=latlng,watts,heartrate,time,velocity_smooth&resolution=" +
  resolution +
  "&key_by_type=true";

export const requests = (token: StravaToken) => ({
  getMetadata: (page: number): FetchAPIStructGet => ({
    header: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    method: "GET",
    url: _metdata(page),
  }),
  getWorkout: (id: string): FetchAPIStructGet => ({
    header: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    method: "GET",
    url: _workout(id, resolution),
  }),
  getWorkoutWithResolution: (
    id: string,
    resolution: Resolution
  ): FetchAPIStructGet => ({
    header: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    method: "GET",
    url: _workout(id, resolution),
  }),
});

export async function* getAllActivities(
  token: StravaToken
): AsyncGenerator<Generator<Metadata[]>> {
  const req = requests(token).getMetadata;

  let page = 1;
  let length = 0;
  const arr: Metadata[] = [];

  do {
    const r = req(page);
    const res: [] = await (
      await fetch(r.url, {
        method: r.method,
        headers: r.header,
      })
    ).json();
    length = res.length;
    if (length !== 0) {
      arr.push(...metadataFromJsonArray(res));
      yield {
        data: arr,
        msg: "load",
      };
    }
    page++;
  } while (length !== 0);

  return yield {
    data: arr,
    msg: "finished",
  };
}
