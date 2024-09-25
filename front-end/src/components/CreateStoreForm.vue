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
          placeholder="New Product Name"
          class="form-control"
        />
        <!-- <span
          v-for="error in v$.newProductName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        > -->
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#storeAdmins" class="form-label ms-2">Store Admins</label>
        <input
          id="storeAdmins"
          type="text"
          placeholder="New Product Price"
          class="form-control"
        />
        <!-- <span
          v-for="error in v$.newProductPrice.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        > -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const newStoreName = ref<string>("");
const newStoreAdmins = ref<any>([]);
const requiredInputsErrorForStores = ref<string>("");
const showRequiredInputsErrorForStores = ref<boolean>(false);

const createNewStore = async (): Promise<void> => {
  if (newStoreName.value != "" && newStoreAdmins.value != "") {
    store.dispatch("createNewStore", {
      newStoreName: newStoreName.value,
      newStoreAdmins: newStoreAdmins.value,
    });
  } else {
    requiredInputsErrorForStores.value = "The inputs are required";
    showRequiredInputsErrorForStores.value = true;

    setTimeout(() => {
      showRequiredInputsErrorForStores.value = false;
    }, 3000);
  }
};
</script>
