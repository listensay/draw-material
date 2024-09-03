<script setup>
const data = ref({})
const result = await useFetch('/api/images')
data.value = result.data.value.data
console.log(data.value)
</script>

<template>
  <div class="home">
    <a-button type="primary" @click="navigateTo('add')">导入图片</a-button>
  </div>
</template>

<style lang="less" scoped></style>
