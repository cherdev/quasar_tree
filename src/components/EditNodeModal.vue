<template>
  <q-dialog>
    <q-card>
      <q-card-section class="row items-center justify-center">
        <q-input ref="inputElement" outlined v-model="label" label="Label" />
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Save"
          color="primary"
          v-close-popup
          @click="handleEdit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { MyTreeNode } from 'src/stores/tree';

import { ref, watch } from 'vue';

const emit = defineEmits(['edit']);

const props = defineProps<{
  node: MyTreeNode | null;
}>();

const label = ref('');

function handleEdit() {
  if (props.node) {
    emit('edit', label.value);
  }
}

watch(
  () => props.node?.label,
  () => {
    if (props.node?.label) {
      label.value = props.node.label;
    }
  }
);
</script>
