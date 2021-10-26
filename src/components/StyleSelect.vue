<template lang="pug">
.form-floating
  select.form-select.bg-white#mapStyleSelect(v-model="selectedOption")
    option(v-for="option of options", :value="option.key") {{ option.text }}
  label(for="mapStyleSelect") Map style
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();

const options = [
  {
    key: 'osm',
    text: 'OpenStreetMap',
  },
  {
    key: 'memomaps',
    text: 'OPNVKarte',
  },
  {
    key: 'opentopo',
    text: 'OpenTopoMap',
  },
  {
    key: 'stadiaBright',
    text: 'Stadia OSM Bright',
  },
  {
    key: 'stadiaOutdoors',
    text: 'Stadia Outdoors',
  },
  {
    key: 'esriNatGeo',
    text: 'Esri NatGeoWorldMap',
  },
  {
    key: 'esriWorldImagery',
    text: 'Esri WorldImagery',
  },
];

const selectedOption = computed({
  get() {
    return store.selectedStyle;
  },
  set(val) {
    store.selectedStyle = val;
  },
});
</script>
