import { createStore } from "vuex";
import { ClientData, StravaToken } from "@/dataSturcts/interfaces/interfaces";
import { Metadata } from "./dataSturcts/interfaces/Metadata";

export default createStore({
  state: {
    sync: [],
    dashboardData: [] as Metadata[],
    clientData: null as ClientData | null,
  },
  mutations: {
    setDashboardData(state, data: Metadata[]) {
      state.dashboardData = data;
    },
    setClientData(state, data: ClientData) {
      state.clientData = data;
    },
    setSync(state, data: []) {
      state.sync = data;
    },
  },
  actions: {
    fireSync({ commit }, data: []) {
      commit("setSync", data);
    },
    setDashboardDataSyncCount({ commit }, data: Metadata) {
      const newMetadata: Metadata[] = this.state.dashboardData.map((ele) =>
        ele.metadataId != data.metadataId ? ele : data
      );
      console.log("for setDashboardData", data);
      
      commit("setDashboardData", newMetadata);
    },
    updateDashboardData({ commit }, data: Metadata) {
      commit("setDashboardData", data);
    },
    addDashboardData({ commit }, data: Metadata[]) {
      const newDashBoard: Metadata[] = [
        ...this.state.dashboardData,
        ...data,
      ].sort((ele1, ele2) => (ele1.metadataId > ele2.metadataId ? -1 : 1));
      commit("setDashboardData", newDashBoard);
    },
    updateClientData({ commit }, data: ClientData) {
      commit("setClientData", data);
    },
    updateClientIDandSecrect(
      { commit },
      data: { clientID: string; clientSecret: string }
    ) {
      const client: ClientData = {
        clientId: data.clientID,
        clientSecret: data.clientSecret,
        myLoginToken: this.state.clientData?.myLoginToken ?? "",
        stravaToken: this.state.clientData?.stravaToken ?? null,
        username: this.state.clientData?.username ?? "",
      };
      commit("setClientData", client);
    },
    setClientStravaData({ commit }, data: StravaToken) {
      const oldClient = this.state.clientData;
      const newClient: ClientData = {
        clientId: oldClient?.clientId ?? "",
        clientSecret: oldClient?.clientSecret ?? "",
        myLoginToken: oldClient?.myLoginToken ?? "",
        username: oldClient?.username ?? "",
        stravaToken: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      };
      commit("setClientData", newClient);
    },
  },
  getters: {
    getDashboardData(state): Metadata[] | null {
      return state.dashboardData;
    },
    getClientData(state): ClientData | null {
      return state.clientData;
    },
    getSync(state): any[] {
      return state.sync;
    },
  },
});
