<template>
  <div class="bsi-left">
    <div class="bsi-logo">
      <img src="../assets/logo.png" />
    </div>
    <div class="bsi-menu">
      <RouterLink to="/detail">New Order</RouterLink>
      <RouterLink to="/">My Order</RouterLink>
    </div>
  </div>
</template>

<style>
.bsi-left {
  min-width: 200px;
  height: 100vh;
  box-shadow: 0 2px 10px #eee;
}

.bsi-logo {
  height: 64px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.bsi-menu {
  /* margin-top: 20px; */
}

.bsi-menu a {
  color: #333;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bsi-menu a:hover {
  background-color: var(--el-color-primary);
}

.bsi-menu .router-link-active {
  background-color: #eee;
}
</style>
