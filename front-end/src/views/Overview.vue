<template>
  <div class="h-100 text-black">
    <nav
      class="navbar navbar-expand-lg d-flex flex-row justify-content-start align-items-start border-bottom"
    >
      <div class="container-fluid w-100">
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle ms-1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-shop"></i>
            {{ currentStoreName }}
          </button>

          <ul class="dropdown-menu">
            <div
              class="d-flex flex-row justify-content-center align-items-center"
            >
              <input
                type="text"
                placeholder="Search Store"
                v-model="searchStore"
                class="form-control"
                style="width: 90%"
              />
            </div>
            <li><hr class="dropdown-divider" /></li>
            <transition-group
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <li
                v-for="store in yourComputedStores"
                class="d-flex flex-row justify-content-center align-items-center"
              >
                <a
                  href="#"
                  class="dropdown-item p-2"
                  @click="manageThisStore(store._id, store.storeName)"
                >
                  <i class="bi bi-shop"></i> {{ store.storeName }}
                </a>
                <div class="me-2">
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteStore(store._id)"
                  >
                    <i style="cursor: pointer" class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </transition-group>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link class="dropdown-item" :to="{ path: '/createStore' }"
                ><i class="bi bi-plus-circle me-1"></i> Add New</router-link
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
              <router-link class="nav-link" :to="{ path: '/categories' }"
                >Categories</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/sizes' }"
                >Sizes</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/colors' }"
                >Colors</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/products' }"
                >Products</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/orders' }"
                >Orders</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/settings' }"
                >Settings</router-link
              >
            </li>
            <li class="nav-item me-2">
              <router-link class="nav-link" :to="{ path: '/account' }"
                >Account</router-link
              >
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-danger" @click="logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="d-flex flex-column justify-content-start align-items-start mt-3 p-3 w-100"
    >
      <h3 class="fw-bold ms-5 text-start">Statistics</h3>
      <p class="text-start ms-5">Overview of your store</p>
    </div>

    <hr class="w-100" />

    <div
      class="row mt-2 w-100 d-flex flex-row justify-content-center align-items-center p-2"
    >
      <div
        class="ms-3 mt-2 p-4 border border-secondary rounded col-md-3 col-6"
        v-for="storeDetail in currentStoreInformation"
      >
        <h4>Total Revenue</h4>
        <h2 class="fw-bold">${{ storeDetail.storeTotalRevenue }}</h2>
      </div>
      <div
        class="ms-3 mt-2 p-4 border border-secondary rounded col-md-3 col-6"
        v-for="storeDetail in currentStoreInformation"
      >
        <h4>Sales</h4>
        <h2 class="fw-bold">{{ storeDetail.storeSales }}</h2>
      </div>
      <div
        class="ms-3 mt-2 p-4 border border-secondary rounded col-md-3 col-6"
        v-for="storeDetail in currentStoreInformation"
      >
        <h4>Products In Stoke</h4>
        <h2 class="fw-bold">{{ currentStoreProducts.length }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import gsap from "gsap";

const store = useStore();
const router = useRouter();
const userId = ref<string | null>(localStorage.getItem("UserId"));
const currentStoreId = ref<string | null>(localStorage.getItem("StoreId"));
const currentStoreName = ref<string | null>(localStorage.getItem("StoreName"));
const newStoreName = ref<string>("");
const newStoreAdmins = ref<string>("");
const searchStore = ref<string>("");

const currentStoreProducts = computed(() => {
  return store.state.currentStoreProducts;
});

const yourStores = computed(() => {
  return store.state.yourStores;
});

const currentStoreInformation = computed(() => {
  return store.state.currentStoreInformation;
});

onMounted(() => {
  for (let i = 0; i < yourStores.value.length; i++) {
    for (let j = 0; j < yourStores.value.length; j++) {
      if (yourStores.value[i] == yourStores.value[j]) {
        window.location.reload();
      }
    }
  }
});

const yourComputedStores = computed(() => {
  return yourStores.value.filter((store: any) =>
    store.storeName.toLowerCase().includes(searchStore.value)
  );
});

const getYourStores = async (): Promise<void> => {
  store.dispatch("getYourStores");
};

const getYourStoreInformation = async (): Promise<void> => {
  if (currentStoreName.value != "" && currentStoreId.value != "") {
    store.dispatch("getYourStoreInformation");
  }
};

const deleteStore = async (storeId: string): Promise<void> => {
  store.dispatch("deleteStore", { storeId: storeId });
};

const manageThisStore = (storeId: string, storeName: string) => {
  store.commit("manageThisStore", { storeName: storeName, storeId: storeId });
};

const getCurrentStoreProducts = async (): Promise<void> => {
  store.dispatch("getCurrentStoreProducts");
};

const logout = async (): Promise<void> => {
  store.dispatch("logout");
};

function onBeforeEnter(el: any) {
  el.style.opacity = 0;
  el.style.height = 0;
}

function onEnter(el: any, done: any) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

function onLeave(el: any, done: any) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

getYourStores();
getYourStoreInformation();
getCurrentStoreProducts();
</script>
