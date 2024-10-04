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
              <router-link class="nav-link active" :to="{ path: '/categories' }"
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
          Categories ({{ yourComputedCategories.length }})
        </h3>
        <p class="text-start ms-2">Manage categories of your store</p>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center me-4"
        style="width: 10%"
      >
        <button
          class="btn btn-dark text-center"
          data-bs-toggle="modal"
          data-bs-target="#createNewCategoryModal"
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
          placeholder="Search Category"
          class="form-control w-50 mb-3"
          v-model="searchCategory"
        />

        <table
          class="w-100 mt-3 me-3 bg-none table overflow-x-auto overflow-y-auto"
          v-if="yourComputedCategories.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
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
              <tr v-for="category in yourComputedCategories">
                <th scope="row">{{ category.categoryName }}</th>
                <td>{{ category.createdAtDate }}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="deleteCategory(category._id)"
                  >
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
      class="w-100 d-flex flex-column justify-content-center align-items-center p-3"
    >
      <h3 class="text-center">Api Calls</h3>
      <p class="text-center">Api calls for categories</p>
      <hr class="w-100" />

      <ApiCardsForCategories />
    </div>

    <div
      class="modal fade"
      id="createNewCategoryModal"
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
              Create New Category
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <transition name="fadeError" v-show="showErrorForCreateCategory">
              <div
                class="alert alert-danger fade show w-100 text-center"
                role="alert"
              >
                {{ errorForCreateCategory }}
              </div>
            </transition>
            <transition
              name="fadeError"
              v-show="showRequiredInputsErrorForCategories"
            >
              <div
                class="alert alert-danger fade show w-100 text-center"
                role="alert"
              >
                {{ requiredInputsErrorForCategories }}
              </div>
            </transition>
            <label for="#newStoreNameInt" class="form-label"
              >New Category Name</label
            >
            <input
              id="newStoreNameInt"
              class="form-control mt-1"
              type="text"
              v-model="newCategoryName"
              placeholder="Enter A Name For The New Category"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-dark"
              @click="createNewCategory"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import gsap from "gsap";
import ApiCardsForCategories from "@/components/ApiCardsForCategories.vue";

const store = useStore();
const router = useRouter();
const userId = ref<string | null>(localStorage.getItem("UserId"));
const currentStoreId = ref<string | null>(localStorage.getItem("StoreId"));
const currentStoreName = ref<string | null>(localStorage.getItem("StoreName"));
const newStoreName = ref<string>("");
const newStoreAdmins = ref<string>("");
const searchStore = ref<string>("");
const searchCategory = ref<string>("");
const newCategoryName = ref<string>("");
const requiredInputsErrorForCategories = ref<string>("");
const showRequiredInputsErrorForCategories = ref<boolean>(false);
const requiredInputsErrorForStores = ref<string>("");
const showRequiredInputsErrorForStores = ref<boolean>(false);

const currentStoreCategories = computed(() => {
  return store.state.currentStoreCategories;
});
const yourStores = computed(() => {
  return store.state.yourStores;
});
const errorForCreateCategory = computed(() => {
  return store.state.errorForCreateNewCategory;
});
const showErrorForCreateCategory = computed(() => {
  return store.state.showErrorForCreateNewCategory;
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

const yourComputedCategories = computed(() => {
  return currentStoreCategories.value.filter((category: any) =>
    category.categoryName.toLowerCase().includes(searchCategory.value)
  );
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

const logout = async (): Promise<void> => {
  store.dispatch("logout");
};

const getYourStoreCategories = async (): Promise<void> => {
  store.dispatch("getCurrentStoreCategories");
};

const createNewCategory = async (): Promise<void> => {
  if (newCategoryName.value != "") {
    store.dispatch("createNewCategory", {
      newCategoryName: newCategoryName.value,
    });
  } else {
    requiredInputsErrorForCategories.value = "The inputs are required";
    showRequiredInputsErrorForCategories.value = true;

    setTimeout(() => {
      showRequiredInputsErrorForCategories.value = false;
    }, 3000);
  }
};

const deleteCategory = async (categoryId: string): Promise<void> => {
  store.dispatch("deleteCategory", { categoryId: categoryId });
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
getYourStoreCategories();
</script>
