# map-test

Primarily a test ground to try some technologies I want to use for an app.

[x] PWA
  [x] update popup UI
  [x] cache static files such as fonts
  [ ] cache map tiles
[x] WebPush

I want the app to work offline including the map tiles to be cached and preloaded.
I want to be able to support pushing to the end user updates that they request.

## Current task

[ ] figure out how to use Dexie for caching tiles and making custom route handler for workbox

[ ] replace old register route in v4 to v6 convention that always returns to index.html since this is a SPA
[ ] cache for images, static content, etc

Tile cache quickly swelled over 300MB (duh) so now to try to use IndexedDB for tile 
storage since it can hold much more. Must be careful not to fill the user's disk
too much though but for short term app usage flying around the map of our town 
the stored tiles will be reused often. Be sure to set an expiration on tiles.

Realized confusion between docs and tutorials is the change from v3 to v4 of workbox.
https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-v3#workbox-core


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

Vue PWA uses workbox v4 but v5 and soon v6 will be available. To override the selected workbox 
version manually I should look into something I found on github about `yarn selective-version-resolutions`.
https://legacy.yarnpkg.com/en/docs/selective-version-resolutions/
https://github.com/vuejs/vue-cli/issues/5119
However this is a pre-mature optimization at this point. Just get v4 working for now.


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
