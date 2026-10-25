<template lang="pug">
.form-group.mb-0
  .form-floating
    select.form-select.bg-white#mapStyleSelect(v-model="store.selectedStyle")
      option(v-for="(provider, key) of mapProviders", :key="key", :value="key") {{ provider.text }}
    label(for="mapStyleSelect") Map style
</template>

<script setup>
import { useStore } from '../store';
import mapProviders from '../helpers/mapProviders';

const store = useStore();
</script>
