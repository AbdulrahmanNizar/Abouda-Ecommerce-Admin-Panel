<template>
  <div
    class="h-100 d-flex flex-lg-row flex-column justify-content-center align-items-center"
  >
    <SideBar />
    <NavBar />
    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center h-75"
    >
      <div
        class="col-12 w-75 d-flex flex-column justify-content-center align-items-center border border-secondary rounded p-3 shadow h-auto"
      >
        <h3 class="mt-3">Login</h3>
        <hr class="w-100 text-black" />
        <div
          class="w-75 d-flex flex-column justify-content-center align-items-start"
        >
          <transition name="fadeError" v-show="showErrorWrongEmailOrPassword">
            <div class="alert alert-danger w-100 text-center" role="alert">
              {{ errorWrongEmailOrPassword }}
            </div>
          </transition>

          <div
            class="w-100 d-flex flex-column justify-content-start align-items-start"
          >
            <label for="#emailInt" class="form-label my-2">Email</label>
            <div
              class="w-100 d-flex flex-row justify-content-center align-items-center input-group"
            >
              <span class="input-group-text" id="emailSymbol">@</span>
              <input
                id="emailInt"
                type="email"
                placeholder="Enter Your Email"
                class="form-control"
                aria-describedby="#emailSymbol"
                v-model="formData.email"
              />
            </div>
            <span v-for="error in v$.email.$errors" class="text-danger mt-1">{{
              error.$message
            }}</span>
          </div>

          <div
            class="w-100 d-flex flex-column justify-content-start align-items-start"
          >
            <label for="#passwordInt" class="form-label my-2">Password</label>
            <div
              class="w-100 d-flex flex-row justify-content-center align-items-center input-group"
            >
              <span class="input-group-text" id="passwordSymbol"
                ><i class="bi bi-key"></i
              ></span>
              <input
                id="passwordInt"
                type="password"
                placeholder="Enter Your Password"
                class="form-control"
                aria-describedby="#passwordSymbol"
                v-model="formData.password"
                ref="passwordInput"
              />
              <button class="btn btn-dark" @click="showPasswordOrHide">
                <i class="bi bi-eye" v-if="showPassword"></i>
                <i class="bi bi-eye-slash" v-else="showPassword"></i>
              </button>
            </div>
            <span
              v-for="error in v$.password.$errors"
              class="text-danger mt-1"
              >{{ error.$message }}</span
            >
          </div>

          <button class="btn btn-dark mt-4 mb-2 w-100" @click="login">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { required, email, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";

const router = useRouter();
const errorWrongEmailOrPassword = ref<string>("");
const showErrorWrongEmailOrPassword = ref<boolean>(false);
const passwordInput = ref<any>();
const showPassword = ref<boolean>(false);

onMounted(() => {
  const JwtToken = localStorage.getItem("JwtToken");

  if (JwtToken) {
    router.push({ path: "/" });
  }
});

const formData = reactive({
  email: "",
  password: "",
});

const formRules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(7) },
  };
});

const showPasswordOrHide = (): void => {
  showPassword.value = !showPassword.value;
  passwordInput.value.type = showPassword.value == false ? "password" : "text";
};

const v$ = useVuelidate(formRules, formData);

const login = async (): Promise<void> => {
  const validationResult = await v$.value.$validate();

  if (validationResult == true) {
    const requestOptions: any = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password.toLowerCase(),
      }),
    };

    try {
      const response = await fetch(
        "http://192.168.1.241:3000/registration/login",
        requestOptions
      );
      const data = await response.json();

      if (data.statusCode >= 200 && data.statusCode < 300) {
        localStorage.setItem("JwtToken", data.data.token);
        localStorage.setItem("UserId", data.data.userId);

        router.push({ path: "/" });
        setTimeout(() => {
          window.location.reload();
        }, 10);
      } else {
        errorWrongEmailOrPassword.value = data.message;
        showErrorWrongEmailOrPassword.value = true;

        setTimeout(() => {
          showErrorWrongEmailOrPassword.value = false;
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
.fadeError-enter-from {
  opacity: 0;
}

.fadeError-enter-to {
  opacity: 1;
}

.fadeError-enter-active {
  transition: all 0.7 ease;
}

.fadeError-leave-from {
  opacity: 1;
}

.fadeError-leave-to {
  opacity: 0;
}

.fadeError-leave-active {
  transition: all 0.7 ease;
}
</style>
