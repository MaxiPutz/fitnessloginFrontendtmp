import { createStore } from 'vuex';
import { DashboardStruct, ClientData } from '@/dataSturcts/interfaces';

export default createStore({
  state: {
    dashboardData: [] as DashboardStruct[] ,
    clientData: null as ClientData | null,
  },
  mutations: {
    setDashboardData(state, data: DashboardStruct[]) {
      state.dashboardData = data;
    },
    setClientData(state, data: ClientData) {
      state.clientData = data
    }
  },
  actions: {
    updateDashboardData({ commit }, data: DashboardStruct) {
      commit('setDashboardData', data);
    },
    updateClientData({commit}, data: ClientData) {
      commit("setClientData", data)
    },
    updateClientIDandSecrect({commit},  data: {clientID: string, clientSecret: string} ) {
      const client : ClientData = {
        clientId: data.clientID,
        clientSecret: data.clientSecret,
        myLoginToken: this.state.clientData?.myLoginToken ?? "",
        stravaToken:this.state.clientData?.stravaToken ?? null,
        username:this.state.clientData?.username ?? ""
      } 
      commit("setClientData", client)
    }
  },
  getters: {
    getDashboardData(state) : DashboardStruct[] | null {
      return state.dashboardData;
    },
    getClientData(state) : ClientData | null {
      return state.clientData;
    },
  }
});

