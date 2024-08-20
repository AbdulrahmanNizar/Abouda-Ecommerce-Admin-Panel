<template>
  <div class="h-100">
    <nav
      class="navbar navbar-expand-lg d-flex flex-row justify-content-start align-items-start border-bottom"
    >
      <div class="container-fluid w-100">
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle ms-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-shop"></i>
          </button>

          <ul class="dropdown-menu">
            <li>
              <a href="#" class="dropdown-item">
                <i class="bi bi-shop"></i> Abouda Store</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                href="#"
                class="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#createNewStoreModal"
              >
                <i class="bi bi-plus"></i> Add New</a
              >
            </li>
          </ul>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-5" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/' }"
                >Overview</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/billboards' }"
                >Billboards</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/categories' }"
                >Categories</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/sizes' }"
                >Sizes</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/colors' }"
                >Colors</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/products' }"
                >Products</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/orders' }"
                >Orders</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/settings' }"
                >Settings</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ path: '/account' }"
                >Account</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="d-flex flex-column justify-content-start align-items-start mt-3 p-3 w-100"
    >
      <h3 class="fw-bold ms-5 text-start">Statistics</h3>
      <p class="text-muted text-start ms-5">Overview of your store</p>

      <hr class="w-100 text-black" />
    </div>

    <div
      class="row mt-2 w-100 d-flex flex-row justify-content-center align-items-center p-2"
    >
      <div class="ms-3 mt-2 p-4 border border-secondary rounded col-md-3 col-6">
        <h4>Total Revenue</h4>
        <h2 class="fw-bold">$0</h2>
      </div>
      <div class="ms-3 mt-2 p-4 border border-secondary rounded col-md-3 col-6">
        <h4>Sales</h4>
        <h2 class="fw-bold">0</h2>
      </div>
      <div class="ms-3 mt-2 p-4 border border-secondary rounded col-md-3 col-6">
        <h4>Products In Stoke</h4>
        <h2 class="fw-bold">0</h2>
      </div>
    </div>

    <div
      class="modal fade"
      id="createNewStoreModal"
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
              Create New Store
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label for="#newStoreNameInt" class="form-label"
              >New Store Name</label
            >
            <input
              id="newStoreNameInt"
              class="form-control mt-1"
              type="text"
              v-model="newStoreName"
              placeholder="Enter A Name For The New Store"
            />
            <hr class="w-100 text-black" />
            <label for="#newStoreAdminsInt" class="form-label"
              >New Store Admins</label
            >
            <input
              id="newStoreAdminsInt"
              type="text"
              class="form-control mt-1"
              placeholder="Add , Between The Names"
              v-model="newStoreAdmins"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-dark" @click="createNewStore">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const newStoreName = ref<string>("");
const newStoreAdmins = ref<string>("");

const createNewStore = async (): Promise<void> => {
  if (newStoreName.value != "" && newStoreAdmins.value != "") {
    const newStoreAdminsInArr: string[] = newStoreAdmins.value.split(",");
    const newStoreAdminsIdInArr: string[] = [];

    for (let i = 0; i < newStoreAdminsInArr.length; i++) {
      try {
        const response = await fetch(
          `http://192.168.0.46:3000/users-management/getUserInfo/${newStoreAdminsInArr[i]}`
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
      const requestOptions: any = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: newStoreName.value,
          storeAdmins: newStoreAdminsIdInArr,
        }),
      };

      const response = await fetch(
        "http://192.168.0.46:3000/stores-management/createStore",
        requestOptions
      );
      const data = await response.json();
      if (data.statusCode >= 200 && data.statusCode < 300) {
        setTimeout(() => {
          window.location.reload();
        }, 10);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
