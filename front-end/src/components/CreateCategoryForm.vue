<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center p-3 mt-3"
  >
    <div class="w-100 d-flex flex-row justify-content-start align-items-start">
      <h3 class="fw-bold text-start ms-2">Create Category</h3>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 w-100"
      >
        <label for="#categoryName" class="form-label ms-2">Category Name</label>
        <input
          id="categoryName"
          type="text"
          placeholder="New Category Name"
          class="form-control w-50"
          v-model="formData.newCategoryName"
        />
        <span
          v-for="error in v$.newCategoryName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
    >
      <button class="btn btn-dark w-50 mt-2" @click="createNewCategory">
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
import { RequestOptionsType } from "@/types/requestOptionsType";

const router = useRouter();

const formData = reactive({
  newCategoryName: <string>"",
});

const formRules = computed(() => {
  return {
    newCategoryName: { required },
  };
});

const v$ = useVuelidate(formRules, formData);

const createNewCategory = async (): Promise<void> => {
  const validationResult = await v$.value.$validate();

  if (validationResult) {
    console.log("working");
  }
};
</script>
