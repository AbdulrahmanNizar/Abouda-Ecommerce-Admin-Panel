<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center p-3 mt-3"
  >
    <div class="w-100 d-flex flex-row justify-content-start align-items-start">
      <h3 class="fw-bold text-start ms-2">Create Store</h3>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-column justify-content-start align-items-start"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 w-100"
      >
        <label for="#storeName" class="form-label ms-2">Store Name</label>
        <input
          id="storeName"
          type="text"
          placeholder="New Store Name"
          class="form-control w-50"
          v-model="formData.newStoreName"
        />
        <span
          v-for="error in v$.newStoreName.$errors"
          class="text-danger mt-1 ms-2"
          >{{ error.$message }}</span
        >
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start mt-3 p-2 w-100"
      >
        <button
          class="btn btn-dark w-50"
          data-bs-toggle="modal"
          data-bs-target="#addNewAdminsToTheList"
        >
          Add Admin
        </button>
        <button
          class="btn btn-dark w-50 mt-2"
          data-bs-toggle="modal"
          data-bs-target="#seeAddedAdmins"
        >
          See The Added Admins
        </button>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
    >
      <button class="btn btn-dark w-50 mt-2" @click="createNewStore">
        Create
      </button>
    </div>

    <div
      class="modal fade"
      id="addNewAdminsToTheList"
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
              Add New Admin
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
            <div
              class="w-100 d-flex flex-column justify-content-start align-items-start"
            >
              <label for="#newAdminName" class="form-label ms-1"
                >Admin Name</label
              >
              <input
                id="newAdminName"
                type="text"
                class="form-control"
                placeholder="Admin Name"
                v-model="newAdminNameInput"
              />

              <hr class="w-100" v-if="newAdminsNamesSuggestion.length > 0" />
            </div>

            <div
              class="w-100 d-flex flex-row justify-content-center align-items-center"
            >
              <div class="list-group w-100">
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  aria-current="true"
                  v-for="userName in newAdminsNamesSuggestion"
                  @click="addUserNameSuggestion(userName)"
                >
                  {{ userName }}
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-dark"
              data-bs-dismiss="modal"
              @click="addUserAsAdmin"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="seeAddedAdmins"
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
              Added Admins
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
            <h5 class="text-center w-100" v-if="newStoreAdminsId.length == 0">
              Empty
            </h5>
            <div
              class="w-100 d-flex flex-row justify-content-center align-items-center"
            >
              <div class="list-group w-100">
                <button
                  type="button"
                  class="list-group-item list-group-item-action d-flex flex-row justify-content-between align-items-center"
                  aria-current="true"
                  v-for="adminId in newStoreAdminsId"
                >
                  {{ adminId }}
                  <button
                    class="btn btn-dark"
                    @click="removeAdminFromNewStoreAdminsList(adminId)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <transition name="slideFromTopError">
      <div
        v-show="showErrorForAddingNewStoreAdmin"
        class="alert alert-danger w-50 position-absolute start-25 mt-5 top-0 text-center"
        role="alert"
      >
        {{ errorForAddingNewStoreAdmin }}
      </div>
    </transition>
    <transition name="slideFromTopError">
      <div
        v-show="showErrorForNotFoundUser"
        class="alert alert-danger w-50 position-absolute start-25 mt-5 top-0 text-center"
        role="alert"
      >
        {{ errorForNotFoundUser }}
      </div>
    </transition>
    <transition name="slideFromTopError">
      <div
        v-show="showErrorForNotEnoughAdmins"
        class="alert alert-danger w-50 position-absolute start-25 mt-5 top-0 text-center"
        role="alert"
      >
        {{ errorForNotEnoughAdmins }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RequestOptionsType } from "@/types/requestOptionsType";

const router = useRouter();
const userId = ref<string | any>(localStorage.getItem("UserId"));
const userName = ref<string | null>(localStorage.getItem("UserName"));
const errorForNotFoundUser = ref<string>("");
const showErrorForNotFoundUser = ref<boolean>(false);
const errorForAddingNewStoreAdmin = ref<any>([]);
const showErrorForAddingNewStoreAdmin = ref<boolean>(false);
const newAdminNameInput = ref<string>("");
const newAdminsNamesSuggestion = ref<string[]>([]);
const newStoreAdmins = ref<string[]>([]);
const newStoreAdminsId = ref<string[]>([userId.value]);
const showErrorForNotEnoughAdmins = ref<boolean>(false);
const errorForNotEnoughAdmins = ref<string>("");
const theCountOfThePassedAdminsNames = ref<number>(0);

const formData = reactive({
  newStoreName: <string>"",
});

const formRules = computed(() => {
  return {
    newStoreName: { required },
  };
});

const addUserNameSuggestion = (userName: string): void => {
  newAdminNameInput.value = userName;
};

const addUserAsAdmin = async (): Promise<void> => {
  newStoreAdmins.value.push(newAdminNameInput.value);
  newAdminNameInput.value = "";

  for (let i = 0; i < newStoreAdmins.value.length; i++) {
    const response = await fetch(
      `http://192.168.1.241:3000/users-management/getUserInfo/${newStoreAdmins.value[i]}`
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      if (!newStoreAdminsId.value.includes(data.data.userId)) {
        newStoreAdminsId.value.push(data.data.userId);
        theCountOfThePassedAdminsNames.value += 1;
      } else {
        newAdminNameInput.value = "";
        errorForAddingNewStoreAdmin.value = "User is already added";
        showErrorForAddingNewStoreAdmin.value = true;

        setTimeout(() => {
          showErrorForAddingNewStoreAdmin.value = false;
        }, 3000);
      }
    } else {
      errorForNotFoundUser.value = data.message;
      showErrorForNotFoundUser.value = true;
      newStoreAdmins.value.splice(i, 1);

      setTimeout(() => {
        showErrorForNotFoundUser.value = false;
      }, 3000);
    }
  }
};

const removeAdminFromNewStoreAdminsList = (adminId: string | any) => {
  const theSelectedAdminNameForDeletingIndex =
    newStoreAdminsId.value.indexOf(adminId);

  newStoreAdminsId.value.splice(theSelectedAdminNameForDeletingIndex, 1);
  newStoreAdmins.value.splice(theSelectedAdminNameForDeletingIndex - 1, 1);
};

watch(newAdminNameInput, async (newAdminName, oldAdminName): Promise<void> => {
  if (newAdminName.length >= 3) {
    try {
      const response = await fetch(
        `http://192.168.1.241:3000/users-management/getUserNameSuggestion/${newAdminName.toLowerCase()}`
      );
      const data = await response.json();

      if (data.statusCode >= 200 && data.statusCode < 300) {
        for (let i = 0; i < data.data.length; i++) {
          if (
            !newAdminsNamesSuggestion.value.includes(data.data[i]) &&
            data.data[i] != userName.value
          ) {
            newAdminsNamesSuggestion.value.push(data.data[i]);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    newAdminsNamesSuggestion.value = [];
  }
});

const v$ = useVuelidate(formRules, formData);

const createNewStore = async (): Promise<void> => {
  try {
    const validationResult = await v$.value.$validate();

    if (validationResult && newStoreAdminsId.value.length > 1) {
      if (theCountOfThePassedAdminsNames.value == newStoreAdmins.value.length) {
        const requestOptions: RequestOptionsType | any = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeName: formData.newStoreName,
            storeAdmins: newStoreAdminsId.value,
          }),
        };

        const response = await fetch(
          "http://192.168.1.241:3000/stores-management/createStore",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          router.push({ path: "/" });
        }
      }
    } else {
      showErrorForNotEnoughAdmins.value = true;
      errorForNotEnoughAdmins.value = "The admins must be at least 2";

      setTimeout(() => {
        showErrorForNotEnoughAdmins.value = false;
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
.slideFromTopError-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slideFromTopError-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slideFromTopError-enter-active {
  transition: 0.7s ease;
}

.slideFromTopError-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slideFromTopError-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slideFromTopError-leave-active {
  transition: 0.7s ease;
}
</style>
