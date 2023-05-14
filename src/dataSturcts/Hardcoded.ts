export class ServerAddress {
    private ip  = "172.20.19.12"
    private port  = "8080"


    public getUrl()   {
        return `http://${this.ip}:${this.port}`
    }
    
}
