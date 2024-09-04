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
const addItem = async (e) => {
  e.preventDefault();
  const result = await useRequest('/api/items', { method: 'post', body: { name: name.value }} )
  if(result.code !== 200) {
    return message.error(result.data.message)
  }

  items.value.push(name.value || `New item ${(index += 1)}`);
  name.value = '';
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
};

const items = ref([])
const result = await useRequest('/api/items', { method: 'get' })
items.value = result.data

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([]);
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

// 如果用户没输入name 和 path 的时候，禁用上传按钮
const disabled = computed(() => !form.name || !form.dirname)
</script>

<template>
  <div class="add-images">
    <a-page-header
      title="添加图片"
      @back="() => navigateTo('/')"
      class="border-b border-gray-200"
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
                <a-button type="text" @click="addItem" class="flex items-center">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  添加新文件夹目录
                </a-button>
              </a-space>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item
          label="图片上传"
          name="dirname"
          :rules="[{ required: true, message: '请上传图片!' }]"
        >
          <a-upload
            v-model:file-list="fileList"
            :action="`/api/images?name=${form.name}&path=${form.dirname}`"
            list-type="picture-card"
            @preview="handlePreview"
            :disabled="disabled"
          >
            <plus-outlined />
            <div>上传</div>
          </a-upload>
          <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
