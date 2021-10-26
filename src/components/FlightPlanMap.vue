<template lang="pug">
l-map(
  ref="mapRef",
  :zoom="3",
  :options="{attributionControl: false}",
  :fade-animation="true"
  :world-copy-jump="true",
)
  l-tile-layer(:url="tileLayer.url")
  l-control-attribution(:prefix="tileLayer.attr", position="bottomright")
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
  LMap, LPolyline, LCircleMarker, LTileLayer, LTooltip, LControlAttribution,
} from '@vue-leaflet/vue-leaflet';
import { ref, watch, computed } from 'vue';
import { useStore } from '../store';
import mapProviders from '../helpers/mapProviders';

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

const tileLayer = computed(() => mapProviders[store.selectedStyle]);

</script>
