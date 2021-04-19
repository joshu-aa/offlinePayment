import axios from "axios";

const apiUrl = axios.create({
  baseURL: process.env.url.COUNTER_URL,
});

export default {
  accounts: {
    userRegister(payload) {
      return apiUrl.post("/account/register", payload);
    },

    userLoad(token) {
      return apiUrl.get("/api/user", {
        headers: { Authorization: "Bearer " + token },
      });
    },

    userLogin(payload) {
      return apiUrl.post("/api/login_check", payload, {
        headers: { "Content-Type": "application/json" },
      });
    },

    verifySubscriber(payload, token) {
      return apiUrl.post("/api/verify/subscriber", payload, {
        headers: { Authorization: "Bearer " + token },
      });
    },
  },

  otc: {
    loadTransaction(payload, token) {
      return apiUrl.post("/api/transfer_load", payload, {
        headers: { Authorization: "Bearer " + token },
      });
    },

    getAgentTransaction(token, payload) {
      return apiUrl.post("/api/otc/transaction/agent/get", payload, {
        headers: { Authorization: "Bearer " + token },
      });
    },

    getAgentDefaultTransaction(token) {
      return apiUrl.get("/api/otc/transaction/agent/get/default", {
        headers: { Authorization: "Bearer " + token },
      });
    },
  },
};
