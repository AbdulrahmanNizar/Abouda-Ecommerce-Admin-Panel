import { RequestOptionsType } from "@/types/requestOptionsType";
import { createStore } from "vuex";

const store = createStore({
  state: {
    JwtToken: localStorage.getItem("JwtToken"),
    currentStoreName: localStorage.getItem("StoreName"),
    currentStoreId: localStorage.getItem("StoreId"),
    currentStoreInformation: <any>[],
    yourStores: <any>[],
    currentStoreSizes: <any>[],
    currentStoreCategories: <any>[],
    currentStoreColors: <any>[],
    userId: localStorage.getItem("UserId"),
    errorForCreateNewCategory: <string>"",
    showErrorForCreateNewCategory: <boolean>false,
    errorForCreateNewSize: <string>"",
    showErrorForCreateNewSize: <boolean>false,
    errorForCreateNewColor: <string>"",
    showErrorForCreateNewColor: <boolean>false,
  },
  getters: {},
  mutations: {
    manageThisStore(state, { storeName, storeId }): void {
      localStorage.setItem("StoreName", storeName);
      localStorage.setItem("StoreId", storeId);

      window.location.reload();
    },
  },
  actions: {
    async createNewStore(
      context,
      { newStoreName, newStoreAdmins }
    ): Promise<void> {
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
          const requestOptions: RequestOptionsType | any = {
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

    async getYourStores(context, payload): Promise<void> {
      try {
        const response = await fetch(
          `http://192.168.1.241:3000/stores-management/getStores/${this.state.userId}`
        );
        const data: any = await response.json();

        if (data.statusCode >= 200 && data.statusCode < 300) {
          for (let i = 0; i < data.data.length; i++) {
            if (!this.state.yourStores.includes(data.data[i])) {
              this.state.yourStores.push(data.data[i]);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getYourStoreInformation(context, payload): Promise<void> {
      try {
        const response = await fetch(
          `http://192.168.1.241:3000/stores-management/getStoreDetails/${this.state.currentStoreId}`
        );
        const data = await response.json();

        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.state.currentStoreInformation = data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateStore(
      context,
      { newStoreName, newStoreAdmins }
    ): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "PATCH",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: this.state.currentStoreId,
            newStoreName: newStoreName,
            newStoreAdmins: newStoreAdmins,
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/stores-management/updateStore",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteStore(context, { storeId }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: storeId,
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/stores-management/deleteStore",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          localStorage.removeItem("StoreName");
          localStorage.removeItem("StoreId");

          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getCurrentStoreCategories(context, payload): Promise<void> {
      try {
        const response = await fetch(
          `http://192.168.1.241:3000/categories/getCategories/${this.state.currentStoreId}`
        );
        const data = await response.json();

        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.state.currentStoreCategories = data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async createNewCategory(context, { newCategoryName }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: this.state.userId,
            storeId: this.state.currentStoreId,
            storeName: this.state.currentStoreName,
            categoryName: newCategoryName.toLowerCase(),
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/categories/createCategory",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        } else {
          this.state.errorForCreateNewCategory = data.message;
          this.state.showErrorForCreateNewCategory = true;

          setTimeout(() => {
            this.state.showErrorForCreateNewCategory = false;
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteCategory(context, { categoryId }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: this.state.userId,
            storeId: this.state.currentStoreId,
          }),
        };

        const response = await fetch(
          `http://192.168.1.241:3000/categories/deleteCategory/${categoryId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getSizes(context, payload): Promise<void> {
      try {
        const response = await fetch(
          `http://192.168.1.241:3000/sizes/getSizes/${this.state.currentStoreId}`
        );
        const data = await response.json();

        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.state.currentStoreSizes = data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async createNewSize(context, { theSelectedSize }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: this.state.userId,
            storeId: this.state.currentStoreId,
            storeName: this.state.currentStoreName,
            sizeName: theSelectedSize,
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/sizes/createSize",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        } else {
          this.state.errorForCreateNewSize = data.message;
          this.state.showErrorForCreateNewSize = true;

          setTimeout(() => {
            this.state.showErrorForCreateNewSize = false;
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteSize(context, { sizeId }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: this.state.currentStoreId,
            userId: this.state.userId,
          }),
        };

        const response = await fetch(
          `http://192.168.1.241:3000/sizes/deleteSize/${this.state.userId}/${sizeId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getColors(context, payload): Promise<void> {
      try {
        const response = await fetch(
          `http://192.168.1.241:3000/colors/getColors/${this.state.currentStoreId}`
        );
        const data = await response.json();

        if (data.statusCode >= 200 && data.statusCode < 300) {
          this.state.currentStoreColors = data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async createNewColor(context, { newColorName }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: this.state.userId,
            storeId: this.state.currentStoreId,
            storeName: this.state.currentStoreName,
            colorName: newColorName.toLowerCase(),
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/colors/createColor",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteColor(context, { colorId }): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: this.state.currentStoreId,
            userId: this.state.userId,
            colorId: colorId,
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/colors/deleteColor",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async logout(context, payload): Promise<void> {
      try {
        const requestOptions: RequestOptionsType | any = {
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
