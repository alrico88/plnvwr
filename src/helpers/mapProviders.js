// Raster styles borrow OpenFreeMap glyphs so waypoint labels render on every basemap
const GLYPHS = 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf';

function rasterStyle(tiles, attribution, maxzoom) {
  return {
    version: 8,
    glyphs: GLYPHS,
    sources: {
      basemap: {
        type: 'raster',
        tiles,
        tileSize: 256,
        maxzoom,
        attribution,
      },
    },
    layers: [{ id: 'basemap', type: 'raster', source: 'basemap' }],
  };
}

function openFreeMapStyle(name) {
  return `https://tiles.openfreemap.org/styles/${name}`;
}

export default {
  bright: {
    text: 'OpenFreeMap Bright',
    style: openFreeMapStyle('bright'),
  },
  positron: {
    text: 'OpenFreeMap Positron',
    style: openFreeMapStyle('positron'),
  },
  dark: {
    text: 'OpenFreeMap Dark',
    style: openFreeMapStyle('dark'),
  },
  fiord: {
    text: 'OpenFreeMap Fiord',
    style: openFreeMapStyle('fiord'),
  },
  osm: {
    text: 'OpenStreetMap',
    style: rasterStyle(
      ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      19,
    ),
  },
  memomaps: {
    text: 'OPNVKarte',
    style: rasterStyle(
      ['https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png'],
      'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      18,
    ),
  },
  opentopo: {
    text: 'OpenTopoMap',
    style: rasterStyle(
      ['a', 'b', 'c'].map((s) => `https://${s}.tile.opentopomap.org/{z}/{x}/{y}.png`),
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      17,
    ),
  },
  esriNatGeo: {
    text: 'Esri NatGeoWorldMap',
    style: rasterStyle(
      ['https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'],
      'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
      16,
    ),
  },
  esriWorldImagery: {
    text: 'Esri WorldImagery',
    style: rasterStyle(
      ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      19,
    ),
  },
};
