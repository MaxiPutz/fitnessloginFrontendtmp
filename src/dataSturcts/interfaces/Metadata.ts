const headerString =
  "id,sport,startTime,averagePower,averageSpeed,averageHearRate,totalTime,totalDistance";

interface CSVMeta {
  header: string;
  CSV: string;
}

type GeneratorState = "load" | "finished"

export interface Metadata {
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
export interface Generator<T> {
  msg: GeneratorState,
  data: T
}

const metadataFromJson = (json: any): Metadata => ({
  averageHeartRate: json.average_heartrate,
  averagePower: json.average_watts,
  averageSpeed: json.average_speed * 3.6, //toKmh
  metadataId: json.id,
  sport: json.type,
  startTime: json.start_date,
  totalDistance: json.distance,
  totalTime: json.elapsed_time,
  workoutDataCount: 0,
});

export const metadataFromJsonArray = (jsonArr: []): Metadata[] =>
  jsonArr.map((ele) => metadataFromJson(ele));

function _mapMetadataToCSVHeader(metadata: Metadata): string {
  const header = headerString.split(",");

  const result = header.map((field) => {
    switch (field) {
      case "id":
        return metadata.metadataId;
      case "sport":
        return metadata?.sport ?? "";
      case "startTime":
        return metadata?.startTime ?? "";
      case "averagePower":
        return metadata?.averagePower?.toString() ?? "";
      case "averageSpeed":
        return metadata?.averageSpeed?.toString() ?? "";
      case "averageHearRate":
        return metadata?.averageHeartRate?.toString() ?? "";
      case "totalTime":
        return metadata?.totalTime?.toString() ?? "";
      case "totalDistance":
        return metadata?.totalDistance?.toString() ?? "";
      default:
        return "";
    }
  });


  return result.join(",");
}

export function mapMetadataToCSVHeader(metadata: Metadata[]) : CSVMeta {
  return {
    header: headerString,
    CSV: metadata.map(ele=> _mapMetadataToCSVHeader(ele)).join("\n")
  }
}