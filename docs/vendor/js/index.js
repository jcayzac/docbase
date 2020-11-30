'use strict';

const basePath = '/julien-cayzac/docsify-template/'
const repo = `https://ghe.rakuten-it.com${basePath}`
const editBranch = `master`

/* Disable caching if "?burst" is passed to the URL */
const cacheBurst = (new URLSearchParams(window.location.search)).has('burst') ? { 'cache-control': 'max-age=0' } : undefined
if (cacheBurst) console.warn(`CACHE BURST ENABLED`)

window.$docsify = Object.assign(window.$docsify || {}, {
  basePath,
  repo,
  name: '<span lang="en">RPay PWA Platform</span><span lang="ja">楽天ペイPWAサービス</span>',
  nameLink: {
    '/ja/': `${basePath}ja/`,
    '/': basePath,
  },
  notFoundPage: {
    '/': '/_404.md',
    '/ja': '/ja/_404.md',
  },
  fallbackLanguages: ['ja'],
  auto2top: true,
  executeScript: true,
  loadSidebar: true,
  loadNavbar: true,
  maxLevel: 4,
  subMaxLevel: 3,
  formatUpdated: '{YYYY}-{MM}-{DD} ({HH}:{mm}:{ss})',
  search: {
    maxAge: 3600,
    depth: 3,
    placeholder: {
      '/ja/': '検索',
      '/': 'Search…',
      }
  },
  seo: {
    description: (route, frontmatter) => {
      if (route.path?.startsWith('/ja/')) return `一般的な説明`
      else return `Some default description`
    }
  },
  mustache: {
    noPackage: true,
    data: [
      // 'some/file.json',
    ],
  },
  pagination: {
    crossChapter: true,
    crossChapterText: true,
  },
  requestHeaders: {
    ...cacheBurst,
  },
})

function editPage(hook, vm) {
  hook.afterEach(function(html) {
    const { path, file } = vm.route
    const label = path.startsWith('ja/') ? `ページの編集` : `Edit Page`

    return `${html}<a rel="noopener" target="_blank" href="${repo}edit/${editBranch}/docs/${file}">${label}</a>`
  })
}

function debugInfo(hook, vm) {
  const replacer = () => {
    const seen = new WeakSet()
    return (_, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return
        }
        seen.add(value)
      }
      return value
    }
  }

  hook.afterEach(function(html) {
    return `${html}<!-- Debug information:
${JSON.stringify(vm, replacer(), 2)}
-->`
  })
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat([
  editPage,
  debugInfo,
])

navigator.serviceWorker?.register(`${basePath}vendor/js/service-worker.js`)
