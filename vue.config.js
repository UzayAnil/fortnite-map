const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const SWPrecache = require('sw-precache-webpack-plugin')

module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ['/','/map','/coordinates','/seasons'],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // Defer scripts and tell Vue it's been server rendered to trigger hydration
        route.html = route.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');
        return route;
      }
    },
    SWPrecache: {
          cacheId: 'fortnite-map',
          filename: 'service-worker.js',
          staticFileGlobs: ['dist/**/*.{js,css}', '/'],
          minify: true,
          stripPrefix: 'dist/',
          dontCacheBustUrlsMatching: /\.\w{6}\./
    },
  }
}
