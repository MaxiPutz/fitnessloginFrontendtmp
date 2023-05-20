export interface User {
    username: string,
    password: string
}

export interface FetchAPIStruct {
    url: string,
    method: string,
    body: string,
    header: any, 
}

export interface OAuth {
    clientId: string,
    clientSecret: string,
}

export interface DashboardStruct {
        "metadataId": string,
        "sport": string,
        "startTime": string,
        "averagePower": number,
        "averageSpeed": number,
        "averageHearRate": number,
        "totalTime": number,
        "totalDistance": number,
        "workoutDataCount": number
}

export interface ClientData {
    username: string,
    clientId: string | null,
    clientSecret: string | null,
    myLoginToken: string,
    stravaToken: StravaToken | null
}

interface StravaToken {
    authorization: string,
    refreshToken: string,
    accessToken: string
}