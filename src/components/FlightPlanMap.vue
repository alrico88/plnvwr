<template lang="pug">
div
  mgl-map(
    :map-style="initialStyle",
    :center="[0, 20]",
    :zoom="2",
    :bounds="routeBounds",
    :fit-bounds-options="{ padding: 60 }"
  )
    mgl-navigation-control
    mgl-geo-json-source(source-id="route", :data="routeLine")
      mgl-line-layer(layer-id="route-line", :paint="linePaint")
    mgl-geo-json-source(source-id="waypoints", :data="waypoints")
      mgl-circle-layer(layer-id="waypoint-circles", :paint="circlePaint")
      mgl-symbol-layer(layer-id="waypoint-labels", :layout="labelLayout", :paint="labelPaint")
</template>

<script setup>
import 'maplibre-gl/dist/maplibre-gl.css';
import { LngLatBounds } from 'maplibre-gl';
import {
  MglMap,
  MglNavigationControl,
  MglGeoJsonSource,
  MglLineLayer,
  MglCircleLayer,
  MglSymbolLayer,
  useMap,
} from '@indoorequal/vue-maplibre-gl';
import {
  computed, watch, onMounted, onUnmounted,
} from 'vue';
import { useStore } from '../store';
import mapProviders from '../helpers/mapProviders';
import { goToEmitter } from '../emitters/goTo';

const ROUTE_COLOR = '#3388ff';

const linePaint = {
  'line-color': ROUTE_COLOR,
  'line-width': 3,
};

const circlePaint = {
  'circle-radius': 5,
  'circle-color': ROUTE_COLOR,
  'circle-stroke-color': '#ffffff',
  'circle-stroke-width': 1.5,
};

const labelLayout = {
  'text-field': ['get', 'id'],
  'text-font': ['Noto Sans Bold'],
  'text-size': 12,
  'text-anchor': 'bottom',
  'text-offset': [0, -0.8],
};

const labelPaint = {
  'text-color': '#ffffff',
  'text-halo-color': 'rgba(0, 0, 0, 0.75)',
  'text-halo-width': 1.2,
};

const store = useStore();
const map = useMap();

const initialStyle = mapProviders[store.selectedStyle].style;

/**
 * @type {import('vue').ComputedRef<(import('plnprsr').RouteItem)[]>}
 */
const route = computed(() => (store.fpLoaded ? store.flightPlan.route : []));

const routeLine = computed(() => ({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: route.value.map((waypoint) => waypoint.coords),
  },
}));

const waypoints = computed(() => ({
  type: 'FeatureCollection',
  features: route.value.map((waypoint) => ({
    type: 'Feature',
    properties: { id: waypoint.id },
    geometry: { type: 'Point', coordinates: waypoint.coords },
  })),
}));

const routeBounds = computed(() => {
  if (route.value.length === 0) {
    return undefined;
  }

  return route.value.reduce((bounds, waypoint) => bounds.extend(waypoint.coords), new LngLatBounds());
});

// The default diff swap drops our layers without firing `style.load`. A full reload
// fires it, and vue-maplibre-gl then re-adds the route sources and layers.
watch(() => store.selectedStyle, (key) => {
  map.map.setStyle(mapProviders[key].style, { diff: false });
});

function moveToCoords(coords) {
  map.map.flyTo({ center: coords, zoom: 13 });
}

onMounted(() => {
  goToEmitter.on('move-map', moveToCoords);
});

onUnmounted(() => {
  goToEmitter.off('move-map', moveToCoords);
});
</script>
