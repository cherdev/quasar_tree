<template>
  <q-page>
    <q-tree :nodes="treeStore.tree.children" node-key="id">
      <template v-slot:default-header="prop">
        <TreeNode
          :node="prop.node"
          @add="handleAdd"
          @remove="showRemoveModal"
          @direct-edit="handleDirectEdit"
          @edit="showEditModal"
        />
      </template>
    </q-tree>

    <div class="row" style="padding: 12px 24px">
      <q-btn rounded color="positive" icon="add" @click="handleAdd('root')" />
    </div>

    <RemoveNodeModal
      v-model="isRemoveNodeModalOpen"
      @remove="handleRemoveConfirmation"
    />

    <EditNodeModal
      v-model="isEditNodeModalOpen"
      :node="tmpNode"
      @edit="handleEditConfirmation"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useTreeStore } from 'src/stores/tree';
import type { MyTreeNode } from 'src/stores/tree';

import TreeNode from 'src/components/TreeNode.vue';
import RemoveNodeModal from 'src/components/RemoveNodeModal.vue';
import EditNodeModal from 'src/components/EditNodeModal.vue';

defineOptions({
  name: 'IndexPage',
});

const treeStore = useTreeStore();

const isRemoveNodeModalOpen = ref(false);
const isEditNodeModalOpen = ref(false);
const tmpNode = ref<MyTreeNode | null>(null);

function setTmpNode(nodeId: string) {
  const node = treeStore.findNode(treeStore.tree, nodeId);

  if (node) {
    tmpNode.value = node;
  }
}

function handleAdd(nodeId: string) {
  treeStore.addNode(nodeId);
}

function handleDirectEdit(nodeId: string, newLabel: string) {
  treeStore.editNode(nodeId, newLabel);
}

function showRemoveModal(nodeId: string) {
  setTmpNode(nodeId);

  isRemoveNodeModalOpen.value = true;
}

function showEditModal(nodeId: string) {
  setTmpNode(nodeId);

  isEditNodeModalOpen.value = true;
}

function handleRemoveConfirmation() {
  if (tmpNode.value === null) {
    return;
  }

  treeStore.removeNode(tmpNode.value.id);
}

function handleEditConfirmation(newLabel: string) {
  if (tmpNode.value === null) {
    return;
  }

  treeStore.editNode(tmpNode.value.id, newLabel);
}

// localstorage
treeStore.$subscribe((_mutation, state) => {
  localStorage.setItem('tree', JSON.stringify(state.tree));
});

onMounted(() => {
  const localStorageTree = localStorage.getItem('tree');

  if (localStorageTree) {
    treeStore.tree = JSON.parse(localStorageTree);
  }
});
</script>
