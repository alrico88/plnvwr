import { defineStore } from 'pinia';
import { parsePln } from 'plnprsr';

export const useStore = defineStore('main', {
  state() {
    return {
      flightPlan: null,
      selectedStyle: 'stadiaOutdoors',
    };
  },
  getters: {
    fpLoaded(state) {
      return state.flightPlan !== null;
    },
  },
  actions: {
    parseFlightPlanFile(xmlText) {
      this.flightPlan = parsePln(xmlText);
    },
  },
});
