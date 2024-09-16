<template>
  <div
    class="w-100 text-black d-flex flex-column justify-content-start align-items-start p-3 mt-3"
  >
    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <h3 class="fw-bold text-start ms-2">Update Product</h3>
    </div>

    <hr class="w-100 mt-3" />

    <div
      class="w-100 d-flex flex-row justify-content-start align-items-center row"
    >
      <transition name="fadeError" v-show="showErrorForUpdateProduct">
        <div class="alert alert-danger fade show" role="alert">
          {{ errorForUpdateProduct }}
        </div>
      </transition>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#productName" class="form-label ms-2">Product Name</label>
        <input
          id="productName"
          type="text"
          placeholder="Update Product Name"
          class="form-control"
          v-model="formData.updateProductName"
        />
        <span
          v-for="error in v$.updateProductName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#productPrice" class="form-label ms-2">Product Price</label>
        <input
          id="productPrice"
          type="number"
          placeholder="Update Product Price"
          class="form-control"
          v-model="formData.updateProductPrice"
        />
        <span
          v-for="error in v$.updateProductPrice.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#productImage" class="form-label ms-2"
          >Product Picture</label
        >
        <input
          @change="uploadPicture"
          id="productImage"
          type="file"
          placeholder="New Product Picture"
          class="form-control"
        />
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#productCategory" class="form-label ms-2"
          >Product Category</label
        >
        <select
          id="productCategory"
          class="form-select"
          v-model="formData.updateProductCategory"
        >
          <option disabled value="">Update Product Category</option>
          <option
            v-for="category in currentStoreCategories"
            :value="category.categoryName"
          >
            {{ category.categoryName }}
          </option>
        </select>
        <span
          v-for="error in v$.updateProductCategory.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#productSize" class="form-label ms-2">Product Size</label>
        <select
          id="productSize"
          class="form-select"
          v-model="formData.updateProductSize"
        >
          <option disabled value="">Update Product Size</option>
          <option v-for="size in currentStoreSizes" :value="size.sizeName">
            {{ size.sizeName }}
          </option>
        </select>
        <span
          v-for="error in v$.updateProductSize.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 col-md-4 col-6"
      >
        <label for="#productColor" class="form-label ms-2">Product Color</label>
        <select
          id="productColor"
          class="form-select"
          v-model="formData.updateProductColor"
        >
          <option disabled value="">Update Product Color</option>
          <option v-for="color in currentStoreColors" :value="color.colorName">
            {{ color.colorName }}
          </option>
        </select>
        <span
          v-for="error in v$.updateProductColor.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start ms-2 mt-3 pt-3 px-3 col-md-4 col-6 border border-muted rounded"
      >
        <div
          class="d-flex flex-column justify-content-start align-items-center"
        >
          <div class="form-check">
            <input
              id="featuredInput"
              type="checkbox"
              class="form-check-input"
              v-model="featuredProduct"
            />
            <label for="#featuredInput" class="form-check-label"
              >Featured</label
            >
            <p class="text-muted">This product will appear on the home page</p>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start ms-2 mt-3 pt-3 px-3 col-md-4 col-6 border border-muted rounded"
      >
        <div
          class="d-flex flex-column justify-content-start align-items-center"
        >
          <div class="form-check">
            <input
              id="archivedInput"
              type="checkbox"
              class="form-check-input"
              v-model="archivedProduct"
            />
            <label for="#archivedInput" class="form-check-label"
              >Archived</label
            >
            <p class="text-muted">
              This product will not appear in anywhere in the store
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
    >
      <button class="btn btn-dark w-50 mt-2" @click="updateProduct">
        Update
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RequestOptionsType } from "@/types/requestOptionsType";

const store = useStore();
const route = useRoute();
const router = useRouter();
const currentStoreId = ref<string | null>(localStorage.getItem("StoreId"));
const currentStoreName = ref<string | null>(localStorage.getItem("StoreName"));
const userId = ref<string | null>(localStorage.getItem("UserId"));
const errorForUpdateProduct = ref<string>("");
const showErrorForUpdateProduct = ref<boolean>(false);
const featuredProduct = ref<boolean>(false);
const archivedProduct = ref<boolean>(false);
let productPicture: string | any;

const currentStoreColors = computed(() => {
  return store.state.currentStoreColors;
});

const currentStoreCategories = computed(() => {
  return store.state.currentStoreCategories;
});

const currentStoreSizes = computed(() => {
  return store.state.currentStoreSizes;
});

const formData = reactive({
  updateProductName: "",
  updateProductCategory: "",
  updateProductSize: "",
  updateProductColor: "",
  updateProductPrice: 0,
  productPictureBase64: "",
});

const formRules = computed(() => {
  return {
    updateProductName: { required },
    updateProductCategory: { required },
    updateProductSize: { required },
    updateProductColor: { required },
    updateProductPrice: { required },
  };
});

const v$ = useVuelidate(formRules, formData);

const updateProduct = async (): Promise<void> => {
  const validationResult = await v$.value.$validate();

  if (validationResult == true) {
    const productId = route.params.productId;

    const requestOptions: RequestOptionsType | any = {
      method: "PATCH",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productId,
        userId: userId.value,
        storeId: currentStoreId.value,
        updatedProductName: formData.updateProductName.toLowerCase(),
        updatedProductSize: formData.updateProductSize,
        updatedProductColor: formData.updateProductColor,
        updatedProductCategory: formData.updateProductCategory,
        updatedProductPrice: formData.updateProductPrice,
        updatedProductImage: formData.productPictureBase64,
        featuredProduct: featuredProduct.value,
        archivedProduct: archivedProduct.value,
      }),
    };

    const response = await fetch(
      "http://192.168.1.241:3000/products/updateProduct",
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      router.push({ path: "/products" });
    } else {
      errorForUpdateProduct.value = data.message;
      showErrorForUpdateProduct.value = true;

      setTimeout(() => {
        showErrorForUpdateProduct.value = false;
      }, 3000);
    }
  }
};

const uploadPicture = (event: any) => {
  productPicture = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const readerResult: string | any = reader.result;
    formData.productPictureBase64 = readerResult;
  });

  reader.readAsDataURL(productPicture);
};

const getCurrentStoreCategories = async (): Promise<void> => {
  store.dispatch("getCurrentStoreCategories");
};

const getCurrentStoreColors = async (): Promise<void> => {
  store.dispatch("getColors");
};

const getCurrentStoreSizes = async (): Promise<void> => {
  store.dispatch("getSizes");
};

getCurrentStoreColors();
getCurrentStoreCategories();
getCurrentStoreSizes();
</script>
