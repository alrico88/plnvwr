# plnvwr

This web app takes a Microsoft Flight Simulator (2020) .pln flight plan file, parses its XML and displays it in a map and a table. Useful to preview flight plans quickly.

This project was used to test Vite + Vue 3, with `<script setup>` and Composition API, as well as [pinia](https://github.com/posva/pinia) as a Store, [unplugin-icons](https://github.com/antfu/unplugin-icons) for the icons, and [vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) for the maps.

To parse the .pln file, [plnprsr](https://github.com/alrico88/plnprsr) is used.

Access the website [here](https://plnvwr.vercel.app).

This web app is not affiliated to or endorsed by Microsoft in any way.