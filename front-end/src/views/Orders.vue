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
              <router-link class="nav-link" :to="{ path: '/' }"
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
              <router-link class="nav-link active" :to="{ path: '/orders' }"
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
              <a href="#" class="text-danger nav-link" @click="logout"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="w-100 d-flex flex-row justify-content-around align-items-center mt-3 p-3"
    >
      <div
        class="w-100 d-flex flex-column justify-content-start align-items-start"
      >
        <h3 class="fw-bold ms-2 text-start">
          Orders ({{ currentStoreOrders.length }})
        </h3>
        <p class="text-start ms-2">Manage orders of your store</p>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start p-3 w-100"
      >
        <table
          class="w-100 mt-3 me-3 bg-none table overflow-x-auto overflow-y-auto d-md-table d-none"
          v-if="currentStoreOrders.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Details</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <transition-group
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <tr v-for="order in currentStoreOrders">
                <th scope="row">{{ order._id }}</th>
                <td>${{ order.orderedProductsPrices }}</td>
                <td>{{ order.createdAtDate }}</td>
                <td>{{ order.createdAtTime }}</td>
                <td>
                  <router-link
                    :to="{ path: '/orderDetails/' + order._id }"
                    class="btn btn-dark"
                    ><i class="bi bi-info-circle"></i
                  ></router-link>
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="deleteOrder(order._id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </transition-group>
          </tbody>
        </table>

        <div
          class="w-100 p-3 d-md-none d-flex flex-column justify-content-center align-items-center border border-muted rounded mh-50 overflow-x-hidden overflow-y-auto"
        >
          <transition-group
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <div
              class="w-100 p-3 d-flex flex-column justify-content-center align-items-center border border-muted rounded mt-1"
              v-for="order in currentStoreOrders"
            >
              <p class="mb-0">Order Id: {{ order._id }}</p>
              <hr class="w-100" />
              <p class="mb-0">
                Order Price: ${{ order.orderedProductsPrices }}
              </p>
              <hr class="w-100" />
              <p class="mb-0">Created At Date: {{ order.createdAtDate }}</p>
              <hr class="w-100" />
              <p class="mb-0">Created At Time: {{ order.createdAtTime }}</p>
              <hr class="w-100" />
              <router-link
                :to="{ path: '/orderDetails/' + order._id }"
                class="btn btn-dark w-100"
                ><i class="bi bi-info-circle"></i
              ></router-link>
              <button
                class="btn btn-danger w-100 mt-1"
                @click="deleteOrder(order._id)"
              >
                <i class="bi bi-trash"></i>
              </button>
              <hr class="w-100" />
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 text-center d-flex flex-column justify-content-center align-items-center p-3"
    >
      <h3>Api Calls</h3>
      <p>Api calls for orders</p>
      <hr class="w-100" />

      <ApiCardsForOrders />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import ApiCardsForOrders from "@/components/ApiCardsForOrders.vue";
import { RequestOptionsType } from "@/types/requestOptionsType";

const store = useStore();
const searchStore = ref<string>("");
const currentStoreName = ref<string | null>(localStorage.getItem("StoreName"));
const currentStoreId = ref<string | null>(localStorage.getItem("StoreId"));
const newStoreName = ref<string>("");
const newStoreAdmins = ref<any>([]);
const requiredInputsErrorForStores = ref<string>("");
const showRequiredInputsErrorForStores = ref<boolean>(false);

const currentStoreOrders = computed(() => {
  return store.state.currentStoreOrders;
});

const yourStores = computed(() => {
  return store.state.yourStores;
});

const yourComputedStores = computed(() => {
  return yourStores.value.filter((store: any) =>
    store.storeName.toLowerCase().includes(searchStore.value)
  );
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

const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    const requestOptions: RequestOptionsType | any = {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
      }),
    };

    const response = await fetch(
      "http://192.168.1.241:3000/orders/deleteOrder",
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

const manageThisStore = (storeId: string, storeName: string): void => {
  store.commit("manageThisStore", { storeName: storeName, storeId: storeId });
};

const getYourStores = async (): Promise<void> => {
  store.dispatch("getYourStores");
};

const getYourStoreInformation = async (): Promise<void> => {
  store.dispatch("getYourStoreInformation");
};

const deleteStore = async (storeId: string): Promise<void> => {
  store.dispatch("deleteStore", { storeId: storeId });
};

const getCurrentStoreOrders = async (): Promise<void> => {
  store.dispatch("getCurrentStoreOrders");
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
getCurrentStoreOrders();
</script>
