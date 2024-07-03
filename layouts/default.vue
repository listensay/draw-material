<script setup></script>

<template>
  <div class="body">
    <div class="layout">
      <Header></Header>
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.body {
  @apply bg-slate-50;

  .layout {
    @apply mx-auto;
    width: 1200px;
    min-height: 100vh;
    background-color: #fff;
  }
}
</style>
