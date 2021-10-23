<template lang="pug">
l-map(ref="mapRef", :zoom="3")
  l-tile-layer(:url="url", :attribution="attribution")
  l-circle-marker(
    v-for="marker of latLngs",
    :lat-lng="marker.latLng",
    :radius="5",
    :fill="true",
    :fill-opacity="1"
  )
    l-tooltip(:content="marker.text", :options="{permanent: true, direction: 'top'}")
  l-polyline(:lat-lngs="latLngs.map((d) => d.latLng)")
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import { getDatasetBBox } from 'bbox-helper-functions';
import {
  LMap, LPolyline, LCircleMarker, LTileLayer, LTooltip,
} from '@vue-leaflet/vue-leaflet';
import { ref, watch, computed } from 'vue';
import { useStore } from '../store';

const store = useStore();

const latLngs = computed(() => {
  /**
   * @type {(import('plnprsr').RouteItem)[]}
   */
  const routeItems = store.fpLoaded ? store.flightPlan.route : [];

  return routeItems.map((waypoint) => {
    const [lon, lat] = waypoint.coords;

    return {
      latLng: [lat, lon],
      text: waypoint.id,
    };
  });
});

const mapRef = ref(null);

watch(latLngs, (val) => {
  const [minLon, minLat, maxLon, maxLat] = getDatasetBBox(val, {
    latitudeAccessor: (d) => d.latLng[0],
    longitudeAccessor: (d) => d.latLng[1],
  });

  const newBounds = [
    [minLat, minLon],
    [maxLat, maxLon],
  ];

  mapRef.value.leafletObject.fitBounds(newBounds);
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors';
</script>
