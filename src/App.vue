<template lang="pug">
.d-flex.vh-100
  aside.h-100.aside-style.border-end
    .container.py-2
      .row
        .col
          h1.text-primary.mb-0.main-title #[map-icon] plnvwr
    file-input.mb-2
    .container
      .row
        .col
          flight-plan
      .row
        .col
          map-options
  flight-plan-map.flex-grow-1.h-100
</template>

<script setup>
import FileInput from './components/FileInput.vue';
import FlightPlan from './components/FlightPlan.vue';
import FlightPlanMap from './components/FlightPlanMap.vue';
import MapIcon from '~icons/mdi/map-search-outline';
import MapOptions from './components/MapOptions.vue';
</script>

<style scoped lang="scss">
.aside-style {
  width: 35vw;
  min-width: 400px;
  max-height: 100vh;
  overflow-y: auto;
}
</style>
