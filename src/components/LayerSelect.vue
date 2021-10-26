<template lang="pug">
.form-group
  .form-check.form-switch
    input.form-check-input#showBaseLayer(checked, disabled, type="checkbox" role="switch")
    label.form-check-label(for="showBaseLayer") Show base layer
</template>

<script setup>
import { useStore } from '../store';

const store = useStore();
</script>
