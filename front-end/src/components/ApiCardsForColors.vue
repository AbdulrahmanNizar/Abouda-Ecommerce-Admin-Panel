<template>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary text-center"
  >
    <h4
      class="mb-0 w-100 d-flex flex-row justify-content-between align-items-center"
    >
      <i class="bi bi-hdd-stack"></i>
      Post
      <button class="btn btn-dark ms-1" @click="copyUrl('CreateUrl')">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </h4>
    <hr class="w-100" />

    <input
      class="w-50 form-control text-center"
      ref="CreateColorUrl"
      value="http://192.168.1.241:3000/colors/createColor"
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
      <button class="btn btn-dark ms-1" @click="copyUrl('DeleteUrl')">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </h4>
    <hr class="w-100" />
    <input
      class="w-50 form-control text-center"
      ref="DeleteColorUrl"
      value="http://192.168.1.241:3000/colors/deleteColor"
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
      <button class="btn btn-dark ms-1" @click="copyUrl('GetUrl')">
        <i class="bi bi-clipboard-check"></i>
      </button>
    </h4>
    <hr class="w-100" />
    <input
      class="w-50 form-control text-center"
      ref="GetColorsUrl"
      value="http://192.168.1.241:3000/color/getColors/:storeId"
      readonly
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const CreateColorUrl = ref<any>();
const GetColorsUrl = ref<any>();
const DeleteColorUrl = ref<any>();

const copyUrl = (selectedUrl: string): void => {
  switch (selectedUrl != "") {
    case selectedUrl == "CreateUrl":
      CreateColorUrl.value.select();
      document.execCommand("copy");
      break;
    case selectedUrl == "GetUrl":
      GetColorsUrl.value.select();
      document.execCommand("copy");
      break;
    case selectedUrl == "DeleteUrl":
      DeleteColorUrl.value.select();
      document.execCommand("copy");
      break;
  }
};
</script>
