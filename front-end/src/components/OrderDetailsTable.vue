<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center mt-3 p-3"
  >
    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <h3 class="fw-bold text-start ms-2">Order ({{ orderId }}) Details</h3>
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
              <th scope="col">Ordered Products</th>
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
                <th scope="row">
                  <div class="dropdown">
                    <button
                      class="btn btn-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          href="#"
                          class="dropdown-item"
                          v-for="product in order.orderedProducts"
                          >{{ product }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </th>
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
                  <button class="btn btn-danger">
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

              <button class="btn btn-danger w-100 mt-1">
                <i class="bi bi-trash"></i>
              </button>
              <hr class="w-100" />
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";

const store = useStore();
const searchStore = ref<string>("");
const route = useRoute();
const orderId = ref<string | any>(route.params.orderId);

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

const getCurrentStoreOrders = async (): Promise<void> => {
  store.dispatch("getCurrentStoreOrders");
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

getCurrentStoreOrders();
</script>
