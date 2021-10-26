<template lang="pug">
.row.mb-3
  .col
    h6 #[icon-info] Flight details
    template(v-if="store.fpLoaded")
      .card.shadow-sm
        .card-body.p-2
          .row.row-cols-2.mb-2
            .col
              h6 #[icon-takeoff] From
              p.font-monospace.fw-bold.lead.mb-0 {{ fp.departure.id }}
              p.mb-0.text-truncate(:title="fp.departure.name") {{ fp.departure.name }}
            .col
              h6 #[icon-landing] To
              p.font-monospace.fw-bold.lead.mb-0 {{ fp.destination.id }}
              p.mb-0.text-truncate(:title="fp.destination.name") {{ fp.destination.name }}
          .row.row-cols-3
            .col
              h6 Leg distance
              .font-monospace.fw-bold {{ Math.round(fp.totalDistance) }} nm
            .col
              h6 Flight rules
              .font-monospace.fw-bold {{ fp.planType }}
            .col
              h6 Cruising alt.
              .font-monospace.fw-bold {{ fp.cruisingAltitude }}
    template(v-else)
      empty-fp
.row(v-if="store.fpLoaded")
  .col
    .row
      .col
        h6 #[icon-route] Route
        table.table.table-bordered.table-sm.bg-white.shadow-sm
          thead.bg-light
            tr
              th Ident.
              th(v-show="hasProcs") Proc. / Airway
              th Altitude (ft.)
              th Bearing (º)
              th Distance (nm.)
          tbody
            tr.align-middle(v-for="waypoint, index of fp.route", :key="waypoint.id")
              td.fw-bold.font-monospace {{ waypoint.id }}
              td(v-show="hasProcs")
                span.text-muted {{ waypoint.airway }}
                span.text-primary {{ waypoint.sid }}
                span.text-primary {{ waypoint.star }}
              td {{ waypoint.altitude }}
              td {{ index === 0 ? '--' : waypoint.bearing }}
              td {{ index === 0 ? '--' : waypoint.distance }}

</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store';
import EmptyFp from './EmptyFp.vue';
import IconTakeoff from '~icons/mdi/airplane-takeoff';
import IconLanding from '~icons/mdi/airplane-landing';
import IconRoute from '~icons/tabler/route';
import IconInfo from '~icons/uil/map-marker-info';

const store = useStore();

/**
 * @type {import('plnprsr').FlightPlan}
 */
const fp = computed(() => store.flightPlan);

const hasProcs = computed(() => {
  function checker(waypoint) {
    return [waypoint.airway, waypoint.sid, waypoint.star].filter((d) => d !== undefined).length > 0;
  }

  return fp.value.route.some(checker);
});
</script>
