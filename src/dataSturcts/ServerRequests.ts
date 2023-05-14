import { ServerAddress } from "./Hardcoded";
import { User } from "./interfaces";

const url : string =  (new  ServerAddress() ).getUrl()


export const requests = {
    login: (user : User) => {
        return {
            url: url+"/api/login/",
            method: "POST",
            body:  user
        }
    }
}