import { defineStore } from "pinia";

export const useTreeDataStore = defineStore({
  id: "tree",
  state: () => ({
    treeData: [
      {
        name: "Dir 1",
        type: "folder",
        isEditing: false,
        id: 1,
        children: [
          {
            name: "Dir 1-1",
            type: "folder",
            isEditing: false,
            id: 2,
            children: [
              {
                name: "File 1-1-1",
                type: "file",
                isEditing: false,
                id: 3,
              },
            ],
          },
          {
            name: "File 1-2",
            type: "file",
            isEditing: false,
            id: 4,
          },
        ],
      },
      {
        name: "Dir 2",
        type: "folder",
        isEditing: false,
        id: 5,
        children: [
          {
            name: "Dir 2-1",
            type: "folder",
            isEditing: false,
            id: 6,
          },
          {
            name: "File 2-2",
            type: "file",
            isEditing: false,
            id: 7,
          },
        ],
      },
      {
        name: "File 2",
        type: "file",
        isEditing: false,
        id: 8,
      },
    ],
  }),
  getters: {},
  actions: {
    editItem(data) {
      const element = this.findElement(this.treeData, data.item.id);
      element.name = data.newValue;
      data.item.isEditing = false;
    },
    delItem(id) {
      this.treeData = this.recursiveRemove(this.treeData, id);
    },
    recursiveRemove(list, id) {
      return list.filter((item) => {
        if ("children" in item) {
          item.children = this.recursiveRemove(item.children, id);
        }
        return item.id !== id;
      });
    },
    openEdit(item) {
      this.closeEdit();
      const element = this.findElement(this.treeData, item.id);
      element.isEditing = true;
    },
    closeEdit() {
      this.treeData = this.recursiveCloseEdit(this.treeData);
    },
    recursiveCloseEdit(childs) {
      return childs.map((item) => {
        if ("children" in item) {
          item.children = this.recursiveCloseEdit(item.children);
        }
        return {
          ...item,
          isEditing: false,
        };
      });
    },
    findElement(childsData, id) {
      if (childsData) {
        for (let i = 0; i < childsData.length; i++) {
          if (childsData[i].id === id) return childsData[i];
          const found = this.findElement(childsData[i].children, id);
          if (found) return found;
        }
      }
    },
  },
});
