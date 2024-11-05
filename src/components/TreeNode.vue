<template>
  <q-card @keypress.stop>
    <q-card-section>
      <q-input
        ref="inputElement"
        v-if="isInEditableState"
        outlined
        v-model="label"
        @blur="handleDirectEdit"
        @keyup.enter="handleDirectEdit"
        @click.stop
      />
      <q-btn
        v-else
        no-caps
        flat
        class="full-width"
        @click.stop="handleLabelButton"
      >
        {{ props.node.label }}
      </q-btn>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        outline
        rounded
        color="negative"
        icon="close"
        @click.stop="handleRemove"
      />
      <q-btn
        outline
        rounded
        color="primary"
        icon="edit"
        @click.stop="handleEdit"
      />
      <q-btn
        outline
        rounded
        color="positive"
        icon="add"
        @click.stop="handleAdd"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { MyTreeNode } from 'src/stores/tree';

import { ref, watch, nextTick } from 'vue';

const emit = defineEmits(['add', 'remove', 'edit', 'directEdit']);

const props = defineProps<{
  node: MyTreeNode;
}>();

const isInEditableState = ref(false);
const inputElement = ref<HTMLElement | null>(null);
const label = ref(props.node.label);

function handleLabelButton() {
  isInEditableState.value = true;

  nextTick(() => {
    if (inputElement.value) {
      inputElement.value.focus();
    }
  });
}

function handleDirectEdit() {
  emit('directEdit', props.node.id, label.value);

  isInEditableState.value = false;
}

function handleAdd() {
  emit('add', props.node.id);
}

function handleRemove() {
  emit('remove', props.node.id);
}

function handleEdit() {
  emit('edit', props.node.id);
}

watch(
  () => props.node.label,
  () => {
    label.value = props.node.label;
  }
);
</script>
