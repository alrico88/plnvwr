<template lang="pug">
.bg-white.border-top.border-bottom.py-3
  .container
    form.form(@submit.prevent, ref="fileForm", @reset="clearFlightPlan")
      .form-group.mb-0
        h6 #[icon-load] Load a flight plan
        input.form-control(type="file", @change="processFile")
        button.btn.btn-link.btn-sm.p-0(
          v-show="store.fpLoaded",
          @click="clearFile"
        ) Clear flight plan
</template>

<script setup>
import { readAsText } from 'promise-file-reader';
import { ref } from 'vue';
import { useStore } from '../store/index';
import IconLoad from '~icons/mdi/file-settings-outline';

const store = useStore();

const fileForm = ref(null);

/**
 * Processes a file event
 * @param {Event} event
 */
async function processFile(event) {
  const xmlText = await readAsText(event.target.files[0]);

  store.parseFlightPlanFile(xmlText);
}

function clearFile() {
  fileForm.value.reset();
}

function clearFlightPlan() {
  store.flightPlan = null;
}
</script>
