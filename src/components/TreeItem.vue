<template>
  <li>
    <div :class="{ hasChilds: isFolder }" class="item" @dblclick="makeFolder">
      <div class="item-inner">
        <div class="item-header" @click="toggle">
          <div class="icon">
            <svg>
              <use
                href="@/assets/images/sprite.svg#folder"
                v-if="item.type === 'folder'"
              ></use>
              <use v-else href="@/assets/images/sprite.svg#file"></use>
            </svg>
          </div>
          <div v-show="!item.isEditing">
            {{ item.name }}
          </div>
          <input
            v-show="item.isEditing"
            type="text"
            :class="{ active: item.isEditing }"
            :ref="(el) => (input = el)"
            :value="item.name"
            @change="
              $emit('edit-item', { item, newValue: $event.target.value })
            "
            @blur="$emit('close-edit', item)"
          />
        </div>
        <div class="item-actions">
          <button @click="openEdit">
            <svg>
              <use href="@/assets/images/sprite.svg#pen"></use>
            </svg>
          </button>
          <button @click="$emit('del-item', item.id)">
            <svg>
              <use href="@/assets/images/sprite.svg#trash"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <ul v-if="isFolder" v-show="isOpen" class="folder">
      <TreeItem
        class="item"
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        @edit-item="$emit('edit-item', $event)"
        @del-item="$emit('del-item', $event)"
        @open-edit="$emit('open-edit', $event)"
        @close-edit="$emit('close-edit', $event)"
      ></TreeItem>
    </ul>
  </li>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "TreeItem",
  components: {},
  props: {
    item: Object,
  },
  setup(props, ctx) {
    const isOpen = ref(false);
    const input = ref([]);
    const isFolder = computed(() => {
      return props.item.children && props.item.children.length;
    });
    const openEdit = () => {
      input.value.focus();
      ctx.emit("open-edit", props.item);
    };
    const toggle = () => {
      if (isFolder.value) {
        isOpen.value = !isOpen.value;
      }
    };
    return {
      isOpen,
      toggle,
      isFolder,
      input,
      openEdit,
    };
  },
};
</script>

<style scoped>
.folder {
  padding-left: 15px;
  /* padding-bottom: 20px; */
}
.hasChilds {
  cursor: pointer;
}
.item {
  margin-bottom: 20px;
}
.item svg {
  width: 100%;
  height: 100%;
}
.item-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-header {
  display: flex;
  align-items: center;
}
.item .icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
input.active {
  border-color: rgb(82, 209, 82);
}
.item-actions button {
  width: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 15px;
}
.item-actions button + button {
  margin-left: 10px;
}
</style>
