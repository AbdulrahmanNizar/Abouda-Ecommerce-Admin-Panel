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
      ref="CreateSizeUrl"
      value="http://192.168.1.241:3000/sizes/createSize"
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
      ref="DeleteSizeUrl"
      value="http://192.168.1.241:3000/sizes/deleteSize/:userId/:sizeId"
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
      ref="GetSizeUrl"
      value="http://192.168.1.241:3000/sizes/getSizes/:storeId"
      readonly
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const CreateSizeUrl = ref<any>();
const GetSizeUrl = ref<any>();
const DeleteSizeUrl = ref<any>();

const copyUrl = (selectedUrl: string): void => {
  switch (selectedUrl != "") {
    case selectedUrl == "CreateUrl":
      CreateSizeUrl.value.select();
      document.execCommand("copy");
      break;
    case selectedUrl == "GetUrl":
      GetSizeUrl.value.select();
      document.execCommand("copy");
      break;
    case selectedUrl == "DeleteUrl":
      DeleteSizeUrl.value.select();
      document.execCommand("copy");
      break;
  }
};
</script>
