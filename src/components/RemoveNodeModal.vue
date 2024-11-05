<template>
  <q-dialog>
    <q-card>
      <q-card-section class="row items-center justify-center text-h6">
        Delete?
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="primary"
          v-close-popup
          @click="handleRemove"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['remove']);

function handleRemove() {
  emit('remove');
}
</script>
