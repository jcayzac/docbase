'use strict'
;(function(window) {
  const basePath = '/docbase/'
  const repo = `https://github.com/jcayzac/docbase/`
  const editBranch = `master`

  const defaultLanguage = 'en'
  const translations = [
    {
      language: 'ja',
      defaultDescription: `一般的な説明`,
      name: `日本語のタイトル`,
      search: `検索`,
    },

    {
      language: 'en',
      defaultDescription: `Some description`,
      name: `English Title`,
      search: `Search…`,
    },
  ]

  /* Disable caching if "?burst" is passed to the URL */
  const cacheBurst = (new URLSearchParams(window.location.search)).has('burst') ? { 'cache-control': 'max-age=0' } : undefined
  if (cacheBurst) console.warn(`CACHE BURST ENABLED`)

  window.$docsify = {
    basePath,
    repo,
    defaultLanguage,
    translations,
    auto2top: true,
    executeScript: true,
    loadSidebar: true,
    loadNavbar: true,
    maxLevel: 4,
    subMaxLevel: 3,
    search: {
      maxAge: 3600,
      depth: 3,
    },
    mustache: {
      noPackage: true,
    },
    pagination: {
      crossChapter: true,
      crossChapterText: true,
    },
    requestHeaders: {
      ...cacheBurst,
    }
  }

  function editPage(hook, vm) {
    hook.afterEach(function(html) {
      const { path, file } = vm.route
      const label = path.startsWith('ja/') ? `ページの編集` : `Edit Page`

      return `${html}<a rel="noopener" target="_blank" href="${repo}edit/${editBranch}/docs/${file}">${label}</a>`
    })
  }

  window.$docsify.plugins = (window.$docsify.plugins || []).concat([
    editPage,
  ])

  window.navigator.serviceWorker?.register(`${window.$docsify.basePath}vendor/js/service-worker.js`)
})(this)
