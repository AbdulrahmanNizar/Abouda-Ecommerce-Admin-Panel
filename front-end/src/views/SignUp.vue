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
        <h3 class="mt-3">Sign Up</h3>
        <hr class="w-100 text-black" />
        <div
          class="w-75 d-flex flex-column justify-content-center align-items-start"
        >
          <transition
            name="fadeError"
            v-show="showErrorMessageForAlreadyExsitUsername"
          >
            <div class="alert alert-danger w-100 text-center" role="alert">
              {{ errorMessageForAlreadyExistUsername }}
            </div>
          </transition>

          <div
            class="w-100 d-flex flex-column justify-content-start align-items-start"
          >
            <label for="#usernameInt" class="form-label mb-2">Username</label>
            <div
              class="input-group w-100 d-flex flex-row justify-content-center align-items-center"
            >
              <span class="input-group-text" id="userSymbol"
                ><i class="bi bi-person"></i
              ></span>
              <input
                id="usernameInt"
                type="text"
                placeholder="Enter Your Username"
                class="form-control"
                aria-describedby="#userSymbol"
                v-model="formData.username"
              />
            </div>
            <span
              v-for="error in v$.username.$errors"
              class="text-danger mt-1"
              >{{ error.$message }}</span
            >
          </div>

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
                ref="passwordInput"
                aria-describedby="#passwordSymbol"
                v-model="formData.password"
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

          <div
            class="w-100 d-flex flex-column justify-content-start align-items-start"
          >
            <label for="#confirmPasswordInt" class="form-label my-2"
              >Confirm Password</label
            >
            <div
              class="w-100 input-group d-flex flex-row justify-content-center align-items-center"
            >
              <span class="input-group-text" id="confirmPasswordSymbol"
                ><i class="bi bi-key"></i
              ></span>
              <input
                id="confirmPasswordInt"
                type="password"
                placeholder="Confirm Your Password"
                class="form-control"
                ref="confirmPasswordInput"
                aria-describedby="#confirmPasswordSymbol"
                v-model="formData.confirmPassword"
              />
              <button class="btn btn-dark" @click="showConfirmPasswordOrHide">
                <i class="bi bi-eye" v-if="showConfirmPassword"></i>
                <i class="bi bi-eye-slash" v-else="showConfirmPassword"></i>
              </button>
            </div>
            <span
              v-for="error in v$.confirmPassword.$errors"
              class="text-danger mt-1"
              >{{ error.$message }}</span
            >
          </div>

          <button class="btn btn-dark mt-4 mb-2 w-100" @click="signup">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { email, required, minLength, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";

const router = useRouter();
const errorMessageForAlreadyExistUsername = ref<string>("");
const showErrorMessageForAlreadyExsitUsername = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);
const passwordInput = ref<any>();
const confirmPasswordInput = ref<any>();

onMounted(() => {
  const JwtToken = localStorage.getItem("JwtToken");

  if (JwtToken) {
    router.push({ path: "/" });
  }
});

const formData = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const formRules = computed(() => {
  return {
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(7) },
    confirmPassword: { required, sameAs: sameAs(formData.password) },
  };
});

const showPasswordOrHide = (): void => {
  showPassword.value = !showPassword.value;
  passwordInput.value.type = showPassword.value == false ? "password" : "text";
};

const showConfirmPasswordOrHide = (): void => {
  showConfirmPassword.value = !showConfirmPassword.value;
  confirmPasswordInput.value.type =
    showConfirmPassword.value == false ? "password" : "text";
};

const v$ = useVuelidate(formRules, formData);

const signup = async (): Promise<void> => {
  const validationResult = await v$.value.$validate();

  if (validationResult == true) {
    const requestOptions: any = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username.toLowerCase(),
        email: formData.email,
        password: formData.password.toLowerCase(),
      }),
    };

    try {
      const response = await fetch(
        "http://192.168.1.241:3000/registration/signup",
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
        errorMessageForAlreadyExistUsername.value = data.message;
        showErrorMessageForAlreadyExsitUsername.value = true;

        setTimeout(() => {
          showErrorMessageForAlreadyExsitUsername.value = false;
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
