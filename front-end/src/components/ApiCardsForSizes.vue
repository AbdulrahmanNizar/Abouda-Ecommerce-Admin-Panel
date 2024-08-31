<template>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary text-center"
  >
    <h4
      class="mb-0 w-100 d-flex flex-row justify-content-between align-items-center"
    >
      <i class="bi bi-hdd-stack"></i>
      Post
      <button class="btn btn-dark ms-1" @click="copyUrl('CreateCategoryUrl')">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </h4>
    <hr class="w-100" />

    <input
      class="w-50 form-control text-center"
      ref="CreateCategoryUrl"
      value="http://192.168.1.241:3000/categories/createCategory"
      readonly
    />
  </div>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary mt-2 text-center"
  >
    <h4
      class="mb-0 w-100 d-flex flex-row justify-content-between align-items-center"
    >
      <i class="bi bi-hdd-stack"></i>
      Delete
      <button class="btn btn-dark ms-1" @click="copyUrl('DeleteCategroyUrl')">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </h4>
    <hr class="w-100" />
    <input
      class="w-50 form-control text-center"
      ref="DeleteCategroyUrl"
      value="http://192.168.1.241:3000/categories/deleteCategory/:categoryName"
      readonly
    />
  </div>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary mt-2 text-center"
  >
    <h4
      class="mb-0 w-100 d-flex flex-row justify-content-between align-items-center"
    >
      <i class="bi bi-hdd-stack"></i>
      Get
      <button class="btn btn-dark ms-1" @click="copyUrl('GetCategoryUrl')">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </h4>
    <hr class="w-100" />
    <input
      class="w-50 form-control text-center"
      ref="GetCategoryUrl"
      value="http://192.168.1.241:3000/categories/getCategories/:storeId"
      readonly
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const CreateCategoryUrl = ref<any>();
const GetCategoryUrl = ref<any>();
const DeleteCategroyUrl = ref<any>();

const copyUrl = (selectedUrl: string): void => {
  switch (selectedUrl != "") {
    case selectedUrl == "CreateCategoryUrl":
      CreateCategoryUrl.value.select();
      document.execCommand("copy");
      break;
    case selectedUrl == "GetCategoryUrl":
      GetCategoryUrl.value.select();
      document.execCommand("copy");
      break;
    case selectedUrl == "DeleteCategroyUrl":
      DeleteCategroyUrl.value.select();
      document.execCommand("copy");
      break;
  }
};
</script>
