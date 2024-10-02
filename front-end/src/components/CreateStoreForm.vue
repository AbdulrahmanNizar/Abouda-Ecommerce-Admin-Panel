<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center p-3 mt-3"
  >
    <div class="w-100 d-flex flex-row justify-content-start align-items-start">
      <h3 class="fw-bold text-start ms-2">Create Store</h3>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 w-100"
      >
        <label for="#storeName" class="form-label ms-2">Store Name</label>
        <input
          id="storeName"
          type="text"
          placeholder="New Store Name"
          class="form-control w-50"
          v-model="formData.newStoreName"
        />
        <span
          v-for="error in v$.newStoreName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 w-100"
      >
        <button
          class="btn btn-dark w-50"
          data-bs-toggle="modal"
          data-bs-target="#addNewAdminsToTheList"
        >
          Add Admin
        </button>
        <button class="btn btn-dark w-50 mt-2">See The Added Admins</button>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
    >
      <button class="btn btn-dark w-50 mt-2" @click="createNewStore">
        Create
      </button>
    </div>

    <div
      class="modal fade"
      id="addNewAdminsToTheList"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel1">
              Add New Admin
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex flex-column justify-content-center align-items-center"
          >
            <div
              class="w-100 d-flex flex-column justify-content-start align-items-start"
            >
              <label for="#newAdminName" class="form-label ms-1"
                >Admin Name</label
              >
              <input
                id="newAdminName"
                type="text"
                class="form-control"
                placeholder="Admin Name"
                v-model="newAdminNameInput"
              />

              <hr class="w-100" />
            </div>

            <div
              class="w-100 d-flex flex-row justify-content-center align-items-center"
            >
              <div class="list-group w-100">
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  aria-current="true"
                  v-for="userName in newAdminsNamesSuggestion"
                >
                  {{ userName }}
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-dark" @click="">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RequestOptionsType } from "@/types/requestOptionsType";

const router = useRouter();
const errorForNotFoundUser = ref<string>("");
const showErrorForNotFoundUser = ref<boolean>(false);
const newAdminNameInput = ref<string>("");
const newAdminsNamesSuggestion = ref<any>([]);

const formData = reactive({
  newStoreName: <string>"",
});

const formRules = computed(() => {
  return {
    newStoreName: { required },
  };
});

watch(newAdminNameInput, async (newAdminName, oldAdminName): Promise<void> => {
  if (newAdminName.length >= 3) {
    try {
      const response = await fetch(
        `http://192.168.1.241:3000/users-management/findUserByName/${newAdminName}`
      );
      const data = await response.json();

      if (data.statusCode >= 200 && data.statusCode < 300) {
        for (let i = 0; i < data.data.length; i++) {
          if (!newAdminsNamesSuggestion.value.includes(data.data[i])) {
            newAdminsNamesSuggestion.value.push(data.data[i]);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const v$ = useVuelidate(formRules, formData);

const createNewStore = async (): Promise<void> => {
  try {
    const validationResult = await v$.value.$validate();

    if (validationResult) {
      // const storeAdminsInArr: string[] = formData.newStoreAdmins.split(",");
      // const storeAdminsIdInArr: string[] = [];
      // for (let i = 0; i < storeAdminsInArr.length; i++) {
      //   const response = await fetch(
      //     `http://192.168.1.241:3000/users-management/getUserInfo/${storeAdminsInArr[i]}`
      //   );
      //   const data = await response.json();
      //   if (data.statusCode >= 200 && data.statusCode < 300) {
      //     storeAdminsIdInArr.push(data.data.userId);
      //     const requestOptions: RequestOptionsType | any = {
      //       method: "POST",
      //       mode: "cors",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //         storeName: formData.newStoreName,
      //         storeAdmins: storeAdminsIdInArr,
      //       }),
      //     };
      //     const response = await fetch(
      //       "http://192.168.1.241:3000/stores-management/createStore",
      //       requestOptions
      //     );
      //     const data2 = await response.json();
      //     if (data2.statusCode >= 200 && data2.statusCode < 300) {
      //       router.push({ path: "/" });
      //     }
      //   } else {
      //     errorForNotFoundUser.value = data.message;
      //     showErrorForNotFoundUser.value = true;
      //     setTimeout(() => {
      //       showErrorForNotFoundUser.value = false;
      //     }, 3000);
      //   }
      // }
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
