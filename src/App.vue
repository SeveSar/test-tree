<template>
  <h1>Click folder to open it</h1>
  <ul>
    <TreeItem
      class="item"
      v-for="node in data"
      :item="node"
      :key="node.id"
      @edit-item="editItem"
      @open-edit="openEdit"
      @del-item="delItem"
      @close-edit="closeEdit"
    ></TreeItem>
  </ul>
</template>

<script>
import TreeItem from "@/components/TreeItem.vue";
import { useTreeDataStore } from "@/stores/treeData";
import { computed } from "vue";
export default {
  components: {
    TreeItem,
  },
  setup() {
    const treeDataStore = useTreeDataStore();
    const data = computed(() => treeDataStore.treeData);
    const openEdit = (item) => {
      treeDataStore.openEdit(item);
    };
    const editItem = (data) => {
      treeDataStore.editItem(data);
    };
    const delItem = (id) => {
      treeDataStore.delItem(id);
    };
    const closeEdit = (item) => {
      treeDataStore.closeEdit(item);
    };
    return {
      data,
      openEdit,
      editItem,
      delItem,
      closeEdit,
    };
  },
};
</script>

<style scoped>
ul {
  max-width: 500px;
}
</style>
