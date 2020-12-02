'use strict'
;(function(window) {
  const basePath = '/docbase/'
  const repo = `https://github.com/jcayzac/docbase/`
  const branch = `main`
  const path = `docs/`

  const defaultLanguage = 'en'
  const translations = [
    {
      language: 'ja',
      defaultDescription: `一般的な説明`,
      editPage: `ページの編集`,
      name: `日本語のタイトル`,
      search: `検索`,
      paginate: {
        previousLabel: `前へ`,
        nextLabel: `次へ`,
      },
    },

    {
      language: 'en',
      defaultDescription: `Some description`,
      editPage: `Edit Page`,
      name: `English Title`,
      search: `Search…`,
      paginate: {
        previousLabel: `Previous`,
        nextLabel: `Next`,
      },
    },
  ]

  /* Disable caching if "?burst" is passed to the URL */
  const cacheBurst = (new URLSearchParams(window.location?.search)).has('burst') ? { 'cache-control': 'max-age=0' } : undefined
  if (cacheBurst) window.console?.warn(`CACHE BURST ENABLED`)

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
    relativePath: true,
    edit: {
      branch,
      path,
    },
    search: {
      maxAge: 3600,
      depth: 3,
    },
    mustache: {
			noPackage: true,
			data: [
				{
					foo: [
						{name: 'name1', attr: 'attr1'},
						{name: 'name2', attr: 'attr2'},
						{name: 'name3', attr: 'attr3'},
					],
				}
			]
    },
    requestHeaders: {
      ...cacheBurst,
    },
  }

  window.navigator?.serviceWorker?.register(`${window.$docsify.basePath}vendor/js/service-worker.js`)
})(this)
