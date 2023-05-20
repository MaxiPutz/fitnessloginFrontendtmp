export class ServerAddress {
    private ip  = "192.168.0.206"
    private port  = "8080"


    public getUrl()   {
        return `http://${this.ip}:${this.port}`
    }
    
}
