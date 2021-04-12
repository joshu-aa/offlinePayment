import axios from "axios";

const apiUrl = axios.create({
    baseURL: process.env.url.COUNTER_URL,
  });

  export default {
      accounts: {
        userRegister(payload) {
            return apiUrl.post("/account/register", payload);
          },
        }
    }