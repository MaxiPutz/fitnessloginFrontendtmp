export class FrontendServerAddress {
  private ip =  "" //"http://192.168.0.206";
  private port = "" //  ":8081";


  public getUrl() {
    return `${this.ip}${this.port}`;
  }
}
