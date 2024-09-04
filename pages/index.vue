<script setup>
const data = ref({})
const result = await useFetch('/api/images')
data.value = result.data.value.data
console.log(data.value)
</script>

<template>
  <div class="home p-8">
    <a-button type="primary" @click="navigateTo('add')">导入图片</a-button>
    <div class="mt-8">
      <div>
        <div class="p-2" v-for="item in data" :key="item.name">
          <h2 class="mb-4">{{ item.name }}</h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full h-64 bg-gray-200 rounded-md overflow-hidden relative" v-for="i in item.images" :key="i.url">
              <a-image class="w-full h-full object-cover" :src="i.url" />
              <div class="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">{{ i.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
