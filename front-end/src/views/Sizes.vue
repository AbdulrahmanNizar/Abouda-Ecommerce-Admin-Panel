<template>
  <div class="h-auto text-black">
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
              <router-link class="nav-link active" :to="{ path: '/sizes' }"
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
          Sizes ({{ yourComputedSizes.length }})
        </h3>
        <p class="text-start ms-2">Manage sizes of your store</p>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center me-4"
        style="width: 10%"
      >
        <button
          class="btn btn-dark text-center"
          data-bs-toggle="modal"
          data-bs-target="#createNewSizeModal"
        >
          <i class="bi bi-plus"></i> Add New
        </button>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start p-3 w-100"
      >
        <input
          type="text"
          placeholder="Search Size"
          class="form-control w-50 mb-3"
          v-model="searchSize"
        />

        <table
          class="w-100 mt-3 me-3 bg-none table overflow-x-auto overflow-y-auto"
          v-if="yourComputedSizes.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Letter</th>
              <th scope="col">Date</th>
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
              <tr v-for="size in yourComputedSizes">
                <th scope="row">{{ size.sizeName }}</th>
                <td>{{ size.sizeLetter }}</td>
                <td>{{ size.createdAtDate }}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteSize(size._id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </transition-group>
          </tbody>
        </table>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 text-center d-flex flex-column justify-content-center align-items-center p-3"
    >
      <h3>Api Calls</h3>
      <p>Api calls for sizes</p>
      <hr class="w-100" />

      <ApiCardsForSizes />
    </div>

    <div
      class="modal fade"
      id="createNewSizeModal"
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
              Create New Size
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex flex-column justify-content-center align-items-center"
          >
            <transition name="fadeError" v-show="showErrorForCreateSize">
              <div
                class="alert alert-danger fade show w-100 text-center"
                role="alert"
              >
                {{ errorForCreateSize }}
              </div>
            </transition>
            <transition
              name="fadeError"
              v-show="showRequiredInputsErrorForSizes"
            >
              <div
                class="alert alert-danger fade show w-100 text-center"
                role="alert"
              >
                {{ requiredInputsErrorForSizes }}
              </div>
            </transition>

            <h5 class="text-center w-100">Select A New Size</h5>
            <hr class="w-100" />

            <div
              class="form-check d-flex flex-column justify-content-start align-items-start w-100"
            >
              <div class="d-flex flex-row">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="verySmall"
                  v-model="theSelectedSize"
                  value="Very Small"
                />
                <label class="form-check-label ms-2" for="verySmall">
                  Very Small
                </label>
              </div>
              <div class="d-flex flex-row mt-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="small"
                  v-model="theSelectedSize"
                  value="Small"
                />
                <label class="form-check-label ms-2" for="small">Small</label>
              </div>
              <div class="d-flex flex-row mt-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="medium"
                  v-model="theSelectedSize"
                  value="Medium"
                />
                <label class="form-check-label ms-2" for="medium">Medium</label>
              </div>
              <div class="d-flex flex-row mt-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="large"
                  v-model="theSelectedSize"
                  value="Large"
                />
                <label class="form-check-label ms-2" for="large">Large</label>
              </div>
              <div class="d-flex flex-row mt-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="veryLarge"
                  v-model="theSelectedSize"
                  value="Very Large"
                />
                <label class="form-check-label ms-2" for="veryLarge">
                  Very Large
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-dark" @click="createNewSize">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import ApiCardsForSizes from "@/components/ApiCardsForSizes.vue";

const store = useStore();
const searchStore = ref<string>("");
const currentStoreName = ref<string | null>(localStorage.getItem("StoreName"));
const currentStoreId = ref<string | null>(localStorage.getItem("StoreId"));
const searchSize = ref<string>("");
const theSelectedSize = ref<string>("");
const newStoreName = ref<string>("");
const newStoreAdmins = ref<any>([]);
const requiredInputsErrorForStores = ref<string>("");
const showRequiredInputsErrorForStores = ref<boolean>(false);
const requiredInputsErrorForSizes = ref<string>("");
const showRequiredInputsErrorForSizes = ref<boolean>(false);

const errorForCreateSize = computed(() => {
  return store.state.errorForCreateNewSize;
});

const showErrorForCreateSize = computed(() => {
  return store.state.showErrorForCreateNewSize;
});

const currentStoreSizes = computed(() => {
  return store.state.currentStoreSizes;
});

const yourStores = computed(() => {
  return store.state.yourStores;
});

const yourComputedStores = computed(() => {
  return yourStores.value.filter((store: any) =>
    store.storeName.toLowerCase().includes(searchStore.value)
  );
});

const yourComputedSizes = computed(() => {
  return currentStoreSizes.value.filter((size: any) =>
    size.sizeName.toLowerCase().includes(searchSize.value)
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

const getYourStoreSizes = async (): Promise<void> => {
  store.dispatch("getSizes");
};

const createNewSize = async (): Promise<void> => {
  if (theSelectedSize.value != "") {
    store.dispatch("createNewSize", { theSelectedSize: theSelectedSize.value });
  } else {
    requiredInputsErrorForSizes.value = "You must choose a size";
    showRequiredInputsErrorForSizes.value = true;

    setTimeout(() => {
      showRequiredInputsErrorForSizes.value = false;
    }, 3000);
  }
};

const deleteSize = async (sizeId: string): Promise<void> => {
  store.dispatch("deleteSize", { sizeId: sizeId });
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
getYourStoreSizes();
</script>
