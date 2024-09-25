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
          v-if="orderDetails.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Username</th>
              <th scope="col">User Phone Number</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <transition-group
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <tr v-for="order in orderDetails">
                <th scope="row">{{ order.userId }}</th>
                <td>{{ order.userName }}</td>
                <td>{{ order.userPhoneNumber }}</td>
                <td>${{ order.orderedProductsPrices }}</td>
                <td>{{ order.createdAtDate }}</td>
                <td>{{ order.createdAtTime }}</td>
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
              v-for="order in orderDetails"
            >
              <p class="mb-0">User Id: {{ order.userId }}</p>
              <hr class="w-100" />
              <p class="mb-0">User Name: {{ order.userName }}</p>
              <hr class="w-100" />
              <p class="mb-0">User Phone Number: {{ order.userPhoneNumber }}</p>
              <hr class="w-100" />
              <p class="mb-0">
                Order Price: ${{ order.orderedProductsPrices }}
              </p>
              <hr class="w-100" />
              <p class="mb-0">Created At Date: {{ order.createdAtDate }}</p>
              <hr class="w-100" />
              <p class="mb-0">Created At Time: {{ order.createdAtTime }}</p>
              <hr class="w-100" />
            </div>
          </transition-group>
        </div>

        <hr class="w-100 mt-3" />

        <div
          class="w-100 mt-1 p-2 d-flex flex-column justify-content-center align-items-center"
        >
          <h3>Ordered Products</h3>
        </div>

        <hr class="w-100" />
      </div>

      <div
        class="w-100 d-flex flex-row row p-3 justify-content-around align-items-center"
        v-for="order in orderDetails"
      >
        <ProductCard
          class="col-md-3 col-6"
          v-for="productId in order.orderedProducts"
          :productId="productId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import ProductCard from "@/components/ProductCard.vue";

const store = useStore();
const searchStore = ref<string>("");
const route = useRoute();
const orderId = ref<string | any>(route.params.orderId);
const orderDetails = ref<any>([]);

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

const getOrderDetails = async (): Promise<void> => {
  try {
    const response = await fetch(
      `http://192.168.1.241:3000/orders/getOrderDetails/${orderId.value}`
    );
    const data = await response.json();

    if (data.statusCode >= 200 && data.statusCode < 300) {
      orderDetails.value = data.data;
    }
  } catch (err) {
    console.log(err);
  }
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

getOrderDetails();
</script>
