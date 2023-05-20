import { ServerAddress } from "./StaticData";
import { User, FetchAPIStruct, OAuth } from "./interfaces";

const url : string =  (new  ServerAddress() ).getUrl()


export const requests = {
    login: (user : User) =>  {
        return {
            url: url+"/api/login/",
            method: "POST",
            body:  JSON.stringify( user ),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        } 
    },
}

export const requests2: {
    login: (user: User) => FetchAPIStruct;
    OauthLogin: (oAuth: OAuth) => FetchAPIStruct;
  } = {
    login: (user: User) => {
      return {
        url: url + '/api/login/',
        method: 'POST',
        body: JSON.stringify(user),
        header: {
          'Content-Type': 'application/json',
        },
      };
    },
    OauthLogin: (oAuth: OAuth) => {
        return {
            url: url + '/api/login/',
            method: 'POST',
            body: JSON.stringify(oAuth),
            header: {
              'Content-Type': 'application/json',
            },
        }
    }
  };