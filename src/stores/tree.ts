import { defineStore, acceptHMRUpdate } from 'pinia';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import type { QTreeNode } from 'quasar';

export interface MyTreeNode extends QTreeNode {
  id: string;
  parentId: string | null;
  children: MyTreeNode[];
}

export const useTreeStore = defineStore('tree', () => {
  const $q = useQuasar();

  const tree = ref<MyTreeNode>({
    id: 'root',
    parentId: null,
    children: [
      {
        id: _generateNodeId(),
        parentId: 'root',
        label: 'Первая нода',
        children: [],
      },
    ],
  });

  function _generateNodeId() {
    return crypto.randomUUID().slice(0, 5);
  }

  function createNewNode(parentId: string) {
    return {
      id: _generateNodeId(),
      parentId: parentId,
      label: 'New node',
      children: [],
    };
  }

  function findNode(
    tree: MyTreeNode,
    nodeId: string | null
  ): MyTreeNode | null {
    if (tree.id === nodeId) {
      return tree;
    }

    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].id === nodeId) {
        return tree.children[i];
      }
    }

    let searchedNode = null;

    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].children.length) {
        searchedNode = findNode(tree.children[i], nodeId);

        if (searchedNode) {
          return searchedNode;
        }
      }
    }

    return null;
  }

  function addNode(parentNodeId: string, node: MyTreeNode | null = null): void {
    const parentNode = findNode(tree.value, parentNodeId);

    if (parentNode === null) {
      $q.notify({
        type: 'negative',
        message: `Parent node with id ${parentNodeId} not found`,
      });
      return;
    }

    if (node === null) {
      node = createNewNode(parentNodeId);
    }

    parentNode.children.push(node);
  }

  function removeNode(nodeId: string): void {
    const node = findNode(tree.value, nodeId);

    if (node === null) {
      $q.notify({
        type: 'negative',
        message: `Node with id ${nodeId} not found`,
      });
      return;
    }

    const parentNode = findNode(tree.value, node.parentId);

    if (parentNode === null) {
      $q.notify({
        type: 'negative',
        message: `Parent node with id ${node.parentId} not found`,
      });
      return;
    }

    const nodeToRemoveIndex = parentNode.children.findIndex(
      (el) => el.id === node.id
    );

    if (nodeToRemoveIndex === -1) {
      $q.notify({
        type: 'negative',
        message: `Node with id ${node.id} not found in parent node with id ${node.parentId}`,
      });
      return;
    }

    parentNode.children.splice(nodeToRemoveIndex, 1);
  }

  function editNode(nodeId: string, newLabel: string): void {
    const node = findNode(tree.value, nodeId);

    if (node === null) {
      $q.notify({
        type: 'negative',
        message: `Node with id ${nodeId} not found`,
      });
      return;
    }

    node.label = newLabel;
  }

  return {
    tree,
    findNode,
    addNode,
    removeNode,
    editNode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTreeStore, import.meta.hot));
}
