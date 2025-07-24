<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center p-3 mt-3"
  >
    <div class="w-100 d-flex flex-row justify-content-start align-items-start">
      <h3 class="fw-bold text-start ms-2">Create Color</h3>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 w-100"
      >
        <label for="#colorName" class="form-label ms-2">Color Name</label>
        <input
          id="colorName"
          type="text"
          placeholder="New Color Name"
          class="form-control w-50 mb-5"
          v-model="formData.newColorName"
        />
        <span
          v-for="error in v$.newColorName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
    >
      <button class="btn btn-dark w-50 mt-2" @click="createNewColor">
        Create
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RequestOptionsType } from "@/types/requestOptionsType";

const router = useRouter();
const userId = ref(localStorage.getItem("UserId"));
const currentStoreName = ref(localStorage.getItem("StoreName"));
const currentStoreId = ref(localStorage.getItem("StoreId"));

const formData = reactive({
  newColorName: <string>"",
});

const formRules = computed(() => {
  return {
    newColorName: { required },
  };
});

const v$ = useVuelidate(formRules, formData);

const createNewColor = async () => {
  try {
    const validationResult = await v$.value.$validate();

    if (validationResult) {
      const requestOptions: RequestOptionsType | any = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.value,
          storeName: currentStoreName.value,
          storeId: currentStoreId.value,
          colorName: formData.newColorName,
        }),
      };

      const response = await fetch(
        "http://192.168.1.241:3000/colors/createColor",
        requestOptions
      );
      const data = await response.json();

      if (data.statusCode >= 200 && data.statusCode < 300) {
        router.push("/colors");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
