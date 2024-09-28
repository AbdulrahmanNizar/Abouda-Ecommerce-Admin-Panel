<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center p-3 mt-3"
  >
    <div class="w-100 d-flex flex-row justify-content-start align-items-start">
      <h3 class="fw-bold text-start ms-2">Create Store</h3>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-row justify-content-start align-items-center row"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#storeName" class="form-label ms-2">Store Name</label>
        <input
          id="storeName"
          type="text"
          placeholder="New Store Name"
          class="form-control"
          v-model="formData.newStoreName"
        />
        <span
          v-for="error in v$.newStoreName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#storeAdmins" class="form-label ms-2">Store Admins</label>
        <input
          id="storeAdmins"
          type="text"
          placeholder="Add , Between Admins Names"
          class="form-control"
          v-model="formData.newStoreAdmins"
        />
        <span
          v-for="error in v$.newStoreAdmins.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const router = useRouter();

const formData = reactive({
  newStoreName: "",
  newStoreAdmins: "",
});

const formRules = computed(() => {
  return {
    newStoreName: { required },
    newStoreAdmins: { required },
  };
});

const v$ = useVuelidate(formRules, formData);

const createNewStore = async (): Promise<void> => {
  try {
    const validationResult = await v$.value.$validate();

    if (validationResult) {
      const storeAdminsInArr: string[] = formData.newStoreAdmins.split(",");
      const storeAdminsIdInArr: string[] = [];

      for (let i = 0; i < storeAdminsInArr.length; i++) {
        const response = await fetch(
          `http://192.168.1.241:3000/users-management/getUserInfo/${storeAdminsInArr[i]}`
        );
        const data = await response.json();

        if (data.statusCode >= 200 && data.statusCode < 300) {
          storeAdminsIdInArr.push(data.data.userId);
        } else {
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
