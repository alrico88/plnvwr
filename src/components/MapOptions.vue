<template lang="pug">
.row
  .col
    h6 #[gears-icon] Map options
    .vstack.gap-2
      style-select
      layer-select
</template>

<script setup>
import StyleSelect from './StyleSelect.vue';
import GearsIcon from '~icons/whh/gears';
import LayerSelect from './LayerSelect.vue';
</script>
