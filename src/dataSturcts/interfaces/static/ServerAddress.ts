export class ServerAddress {
    private ip  = "" // "http://localhost"
    private port  = "" // ":8080"


    public getUrl()   {
        return `${this.ip}${this.port}`
    }
    
    
    public getApp() {
        return `${this.getUrl()}/app`
    }

    public getRunUrl() {
        return `${this.getUrl()}/api/runningApp`
    }

    public getRideUrl() {
        return `${this.getUrl()}/api/RideApp`
    }
}
