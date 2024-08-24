<template>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary text-center"
  >
    <h4 class="mb-0">Post</h4>
    <hr class="w-100" />
    <h5 class="fw-bold">
      http://192.168.1.241:3000/stores-management/createStore
    </h5>
  </div>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary mt-2 text-center"
  >
    <h4 class="mb-0">Patch</h4>
    <hr class="w-100" />
    <h5 class="fw-bold">
      http://192.168.1.241:3000/stores-management/updateStore/:storeId
    </h5>
  </div>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary mt-2 text-center"
  >
    <h4 class="mb-0">Delete</h4>
    <hr class="w-100" />
    <h5 class="fw-bold">
      http://192.168.1.241:3000/stores-management/deleteStore/:storeId
    </h5>
  </div>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary mt-2 text-center"
  >
    <h4 class="mb-0">Get</h4>
    <hr class="w-100" />
    <h5 class="fw-bold">
      http://192.168.1.241:3000/stores-management/getStore/:userId
    </h5>
  </div>
  <div
    class="p-3 w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary mt-2 text-center"
  >
    <h4 class="mb-0">Get</h4>
    <hr class="w-100" />
    <h5 class="fw-bold">
      http://192.168.1.241:3000/stores-management/getStoreDetails/:storeId
    </h5>
  </div>
</template>

<script setup lang="ts"></script>
