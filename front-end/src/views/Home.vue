<template>
  <div class="h-100">
    <nav
      class="navbar navbar-expand-lg d-flex flex-row justify-content-start align-items-start"
    >
      <div class="container-fluid w-100">
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle ms-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-shop"></i>
          </button>

          <ul class="dropdown-menu">
            <li>
              <a href="#" class="dropdown-item">
                <i class="bi bi-shop"></i> Abouda Store</a
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
              <a class="nav-link active" aria-current="page" href="#"
                >Overview</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Billboards</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Categories</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Sizes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Colors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Orders</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Settings</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Account</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="d-flex flex-column justify-content-start align-items-start mt-3 p-3 w-100"
    >
      <h3 class="fw-bold ms-5 text-start">Statistics</h3>
      <p class="text-muted text-start ms-5">Overview of your store</p>

      <hr class="w-100 text-black" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
