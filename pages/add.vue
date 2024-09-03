<script setup>
const form = reactive({
  name: '',
  dirname: '',
})

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});
const name = ref();
const inputRef = ref();
const addItem = e => {
  e.preventDefault();
  console.log('addItem');
  items.value.push(name.value || `New item ${(index += 1)}`);
  name.value = '';
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
};
const items = ref(['jack', 'lucy']);
</script>

<template>
  <div class="add-images">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="添加图片"
      @back="() => navigateTo('/')"
    />
    <div class="p-4">
      <a-form
        :model="form"
        name="basic"
        autocomplete="off"
      >
        <a-form-item
          label="图片名称"
          name="name"
          :rules="[{ required: true, message: '请输入图片名称' }]"
        >
          <a-input v-model:value="form.name" />
        </a-form-item>

        <a-form-item
          label="图片目录"
          name="dirname"
          :rules="[{ required: true, message: '请输入图片目录!' }]"
        >
          <a-select
            v-model:value="form.dirname"
            placeholder="custom dropdown render"
            style="width: 300px"
            :options="items.map(item => ({ value: item }))"
          >
            <template #dropdownRender="{ menuNode: menu }">
              <v-nodes :vnodes="menu" />
              <a-divider style="margin: 4px 0" />
              <a-space style="padding: 4px 8px">
                <a-input ref="inputRef" v-model:value="name" placeholder="Please enter item" />
                <a-button type="text" @click="addItem">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  Add item
                </a-button>
              </a-space>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">完成</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
