<script lang="ts" setup>
const url = 'http://127.0.0.1:5000/'
const images: any = (await useFetch(url)).data.value

// 联想搜索
const options = images.map((img: any) => ({value: img.id, label: img.name}))
const filterOption = (input: number, option: any) => {
  return option.label.includes(input);
};
const value = ref(undefined);
const resultList = ref([])
watch(value, () => {
  resultList.value = images.filter((img: any) => img.id === value.value)
})

const getImgUrl = (i) => {
  console.log(i)
  return 1
}

</script>

<template>
  <div class="search">

    <ClientOnly>
      <a-select
        v-model:value="value"
        show-search
        placeholder="搜索素材"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
      ></a-select>
    </ClientOnly>

    <div v-for="img in resultList" class="my-4">
      <a-carousel arrows>
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <right-circle-outlined />
          </div>
        </template>
        <div v-for="path in img.paths">
          <img class="w-full" :src="url + path" alt="" />
        </div>
      </a-carousel>
    </div>

  </div>
</template>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}
</style>