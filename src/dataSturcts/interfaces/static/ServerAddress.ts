export class ServerAddress {
    private ip = process.env.VUE_APP_SERVER_IP ?? "http://localhost";
  private port = process.env.VUE_APP_SERVER_PORT ?? ":8080";
  private path = process.env.VUE_APP_SERVER_PATH ?? "/fitness";

  // private ip = "http://localhost"//"http://192.168.0.206"
  // private port = ":8080"; // ":8080"
  //
  // private path = "/fitness" // "/fitness"

  public getUrl() {
    return `${this.ip}${this.port}${this.path}`;
  }

  public getApp() {
    return `${this.getUrl()}/app`;
  }

  public getRunUrl() {
    return `${this.getUrl()}/api/runningApp`;
  }

  public getRideUrl() {
    return `${this.getUrl()}/api/RideApp`;
  }
}
