# map-test

Primarily a test ground to try some technologies I want to use for an app.

[x] PWA
  [ ] work and load page while offline
  [x] update popup UI
  [x] cache static files such as fonts
  [x] cache map tiles
    [ ] learn to migrate database schema
    [x] expire map tiles (staleWhileValidate)
    [x] speed up cache retreival by using indexed key instead of filter
    [ ] wrap console logs in checks if env === production
    [ ] handle cache full
[x] WebPush
[x] Map
  [ ] dark theme map design
  [x] bounded area
  [x] max zoom out
  [x] loading bar across page for currently downloading tiles
  [x] viewport marker list

I want the app to work offline including the map tiles to be cached and preloaded.
I want to be able to support pushing to the end user updates that they request.


## Current task

Regardless of plugins it appears hundreds of markers is a burden and integrating leaflet marker canvas plugin into vue2-leaflet seems like an unecessary burden to setup and configure. I've begun to suspect when I started this project that leaflet is aging and not as popular as it used to be last time I made an app with it 4 years ago.

Openlayers is compariable in size now and a lower level api that supports vector tiles which is one feature I want to have to help with bandwidth restrictions I face in my location. Plus it's good to expand my knowledge by learning a new framework. So I'm going to try open layers now.

Loading hundreds of markers makes the whole system laggy.
  - Try marker cluster plugin
  - Try marker canvas plugin
  - Try creating polygons for different neighborhoods and only load markers within a selected neighborhood / or perhaps within a certain zoom level to limit markers and their popups. Read somewhere loading popups for each is expensive; not sure if Vue2Leaflet handles that or not.

Working with Vuex to store nakamals list. TODO now is how to dispaly the currently selected 
nakamal's data on the screen?
  - Side bar with or without tabs
    - Is a good idea but requires organizing data into a side bar nav or a custom card element that behaves like a navbar
  - Bottom sheet again with or without tabs
    - Another good choice but I would like the map to adjust to fit the space left over or it would cover the map on smaller screens
  - Large popup with card embeded
    - Maybe best for mobile and to show some details before committing to opening a full screen view on the mobile device
  - Modal/Dialog
    - I don't like covering the map but perhaps for mobile or after confirming to view additional details we open a dialog that blocks the map to focus on the details view.

I also want to have search somewhere and show current list of nakamals in map bounds.


## Map Notes

Vector tiles are what we want instead of raster tiles since we live in an area where bandwidth
considerations are paramount. They require more CPU to render though but I'll take that instead 
of consuming bandwidth and phone storage in IndexedDB. They also allow for custom colour themes 
which would be great for a dark and light theme.

[x] Leaflet supports vector tiles non-natively - is there a newer alternative for vector tiles?
  Seems leaflet is still good for me and fine, if I'm going to cache tiles then its okay if they 
  are bit larger than vectors since then users with weaker phones will be okay to view the map.
Others:
  - OpenLayers
  - MapBox GL JS

Loading bar
https://openlayers.org/en/latest/examples/tile-load-events.html
https://leafletjs.com/reference-1.7.1.html#tilelayer-loading

Bounding the map is easy but what is the difference between `bounds` and `maxBounds`?
  - `bounds` attribute can support `.sync` modifier so perhaps I can use it as a rolling value to query for markers within my current view and show them as a list to select from in a menu
  - `maxBounds` attribute is absolute limit of the map navigation. I'll limit it to an area I want to keep the user so their map can not travel freely anywhere and build up a considerable cache.


## IndexedDB Notes

Storing blobs is not supported everywhere so need to try and catch apparently.
https://developers.google.com/web/updates/2014/07/Blob-support-for-IndexedDB-landed-on-Chrome-Dev


## Sources and Guides

https://www.youtube.com/watch?v=15Yr-J4X34M
Great tutorial video that details caching and push notifications

https://github.com/web-push-libs/pywebpush
https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/

https://jakearchibald.com/2014/offline-cookbook/
https://github.com/davidgaroro/vuetify-todo-pwa

https://naturaily.com/blog/pwa-vue-cli-3
https://developers.google.com/web/tools/workbox/


### Service Worker Notes

Since I want to use WebPush and possibly other sw features I have to use 'InjectManifest' plugin
https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use

Service workers are not active in development mode. Must build the project then run built files to 
see sw in action.

Globally install `http-server` then run the following `yarn build && cd dist && http-server && cd ..`.
https://medium.com/@stephen.trevor.wong/3-steps-to-add-pwa-to-vue-js-in-2020-9f9daa56f9
https://github.com/stetrevor/vuejs-pwa-demo


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
