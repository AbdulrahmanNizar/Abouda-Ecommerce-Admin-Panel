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
              <a
                href="#"
                class="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#createNewStoreModal"
              >
                <i class="bi bi-plus-circle me-1"></i> Add New</a
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
              <router-link class="nav-link active" :to="{ path: '/products' }"
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
      class="w-100 d-flex flex-row justify-content-around align-items-center mt-3 p-3"
    >
      <div
        class="w-100 d-flex flex-column justify-content-start align-items-start"
      >
        <h3 class="fw-bold ms-2 text-start">
          Products ({{ yourComputedProducts.length }})
        </h3>
        <p class="text-start ms-2">Manage products of your store</p>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center me-4"
        style="width: 10%"
      >
        <router-link
          :to="{ path: '/createProduct' }"
          class="btn btn-dark text-center"
        >
          <i class="bi bi-plus"></i> Add New
        </router-link>
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
          placeholder="Search Product"
          class="form-control w-50 mb-3"
          v-model="searchProduct"
        />

        <table
          class="w-100 mt-3 me-3 bg-none table overflow-x-auto overflow-y-auto d-md-table d-none"
          v-if="yourComputedProducts.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Color</th>
              <th scope="col">Size</th>
              <th scope="col">Featured/Archived</th>
              <th scope="col">Date</th>
              <th scope="col">Settings</th>
            </tr>
          </thead>
          <tbody>
            <transition-group
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <tr v-for="product in yourComputedProducts">
                <th scope="row">{{ product.productName }}</th>
                <td>${{ product.productPrice }}</td>
                <td>{{ product.productCategory }}</td>
                <td>{{ product.productColor }}</td>
                <td>{{ product.productSize }}</td>
                <td>
                  {{ product.featuredProduct }}/{{ product.archivedProduct }}
                </td>
                <td>{{ product.createdAtDate }}</td>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="bi bi-gear me-1"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          href="#"
                          class="dropdown-item text-danger"
                          @click="deleteProduct(product._id)"
                          >Delete</a
                        >
                      </li>
                      <li>
                        <router-link
                          :to="{ path: '/updateProduct/' + product._id }"
                          class="dropdown-item"
                          >Update</router-link
                        >
                      </li>
                    </ul>
                  </div>
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
              v-for="product in yourComputedProducts"
            >
              <p class="mb-0">Product Name: {{ product.productName }}</p>
              <hr class="w-100" />
              <p class="mb-0">Product Price: ${{ product.productPrice }}</p>
              <hr class="w-100" />
              <p class="mb-0">
                Product Category: {{ product.productCategory }}
              </p>
              <hr class="w-100" />
              <p class="mb-0">Product Color: {{ product.productColor }}</p>
              <hr class="w-100" />
              <p class="mb-0">Product Size: {{ product.productSize }}</p>
              <hr class="w-100" />
              <p class="mb-0">Created At: {{ product.createdAtDate }}</p>
              <hr class="w-100" />
              <router-link
                :to="{ path: '/updateProduct/' + product._id }"
                class="btn btn-dark w-100"
              >
                <i class="bi bi-pencil-square"></i>
              </router-link>
              <button
                class="btn btn-danger w-100 mt-1"
                @click="deleteProduct(product._id)"
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
      <p>Api calls for products</p>
      <hr class="w-100" />

      <ApiCardsForProducts />
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
            <transition
              name="fadeError"
              v-show="showRequiredInputsErrorForStores"
            >
              <div
                class="alert alert-danger fade show w-100 text-center"
                role="alert"
              >
                {{ requiredInputsErrorForStores }}
              </div>
            </transition>
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
            <hr class="w-100" />
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
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
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
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import ApiCardsForProducts from "@/components/ApiCardsForProducts.vue";

const store = useStore();
const searchStore = ref<string>("");
const currentStoreName = ref<string | null>(localStorage.getItem("StoreName"));
const currentStoreId = ref<string | null>(localStorage.getItem("StoreId"));
const searchProduct = ref<string>("");
const newStoreName = ref<string>("");
const newStoreAdmins = ref<any>([]);
const requiredInputsErrorForStores = ref<string>("");
const showRequiredInputsErrorForStores = ref<boolean>(false);

const currentStoreProducts = computed(() => {
  return store.state.currentStoreProducts;
});

const yourStores = computed(() => {
  return store.state.yourStores;
});

const yourComputedStores = computed(() => {
  return yourStores.value.filter((store: any) =>
    store.storeName.toLowerCase().includes(searchStore.value)
  );
});

const yourComputedProducts = computed(() => {
  return currentStoreProducts.value.filter((product: any) =>
    product.productName.toLowerCase().includes(searchProduct.value)
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

const createNewStore = async (): Promise<void> => {
  if (newStoreName.value != "" && newStoreAdmins.value != "") {
    store.dispatch("createNewStore", {
      newStoreName: newStoreName.value,
      newStoreAdmins: newStoreAdmins.value,
    });
  } else {
    requiredInputsErrorForStores.value = "The inputs are required";
    showRequiredInputsErrorForStores.value = true;

    setTimeout(() => {
      showRequiredInputsErrorForStores.value = false;
    }, 3000);
  }
};

const deleteStore = async (storeId: string): Promise<void> => {
  store.dispatch("deleteStore", { storeId: storeId });
};

const getCurrentStoreProducts = async (): Promise<void> => {
  store.dispatch("getCurrentStoreProducts");
};

const deleteProduct = async (productId: string): Promise<void> => {
  store.dispatch("deleteProduct", { productId: productId });
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
