<template>
  <div class="shadow-sm card ms-2 mt-2" style="width: 18rem">
    <img
      :src="productDetails.productImage"
      class="card-img-top"
      alt="Product Image"
    />
    <div class="card-body">
      <hr class="w-100" />
      <h6 class="card-title mb-0">
        Product Name: {{ productDetails.productName }}
      </h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        Product Price: ${{ productDetails.productPrice }}
      </li>
      <li class="list-group-item">
        Product Category: {{ productDetails.productCategory }}
      </li>
      <li class="list-group-item">
        Product Size: {{ productDetails.productSize }}
      </li>
      <li class="list-group-item">
        Product Color: {{ productDetails.productColor }}
      </li>
      <li class="list-group-item">
        Featured Product: {{ productDetails.featuredProduct }}
      </li>
      <li class="list-group-item">
        Archived Product: {{ productDetails.archivedProduct }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["productId"]);
const productDetails = ref<any>([]);

const getProductDetails = async (): Promise<void> => {
  try {
    const response = await fetch(
      `http://192.168.100.75:3000/products/getProductDetails/${props.productId}`
    );
    const data = await response.json();

    if (data.statusCode >= 200 && data.statusCode < 300) {
      productDetails.value = data.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};

getProductDetails();
</script>
