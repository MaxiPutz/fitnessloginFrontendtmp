export class FrontendServerAddress {
    private ip  = "" // "http://localhost"
    private port  = "" //":8080"


    public getUrl()   {
        return `${this.ip}${this.port}`
    }
    
 
}
