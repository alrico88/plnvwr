<template lang="pug">
.row
  .col
    h6 #[gears-icon] Map options
    style-select.mb-1
    layer-select
</template>

<script setup>
import StyleSelect from './StyleSelect.vue';
import GearsIcon from '~icons/whh/gears';
import LayerSelect from './LayerSelect.vue';
</script>
