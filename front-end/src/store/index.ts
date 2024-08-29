import { createStore } from "vuex";
import { useRouter } from "vue-router";

const store = createStore({
  state: {
    JwtToken: localStorage.getItem("JwtToken"),
    currentStoreName: localStorage.getItem("StoreName"),
    currentStoreId: localStorage.getItem("StoreId"),
    userId: localStorage.getItem("UserId"),
  },
  getters: {},
  mutations: {},
  actions: {
    async createNewStore(
      context,
      { newStoreName, newStoreAdmins }
    ): Promise<void> {
      console.log(newStoreName, newStoreAdmins);
      if (newStoreName != "" && newStoreAdmins != "") {
        const newStoreAdminsInArr: string[] = newStoreAdmins.split(",");
        const newStoreAdminsIdInArr: string[] = [];

        for (let i = 0; i < newStoreAdminsInArr.length; i++) {
          try {
            const response = await fetch(
              `http://192.168.1.241:3000/users-management/getUserInfo/${newStoreAdminsInArr[i]}`
            );
            const data = await response.json();

            if (data.statusCode >= 200 && data.statusCode < 300) {
              newStoreAdminsIdInArr.push(data.data.userId);
            }
          } catch (err) {
            console.log(err);
          }
        }

        try {
          const requestOptions: any = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              storeName: newStoreName,
              storeAdmins: newStoreAdminsIdInArr,
            }),
          };

          const response = await fetch(
            "http://192.168.1.241:3000/stores-management/createStore",
            requestOptions
          );
          const data = await response.json();
          if (data.statusCode >= 200 && data.statusCode < 300) {
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      }
    },

    async logout(context, payload): Promise<void> {
      try {
        const requestOptions: any = {
          method: "PATCH",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(
          `http://192.168.1.241:3000/registration/logout/${this.state.userId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          localStorage.clear();
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});

export default store;
