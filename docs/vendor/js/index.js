const basePath = '/julien-cayzac/docsify-template/'

const cacheBurst = (new URLSearchParams(window.location.search)).has('burst') ? { 'cache-control': 'max-age=0' } : undefined
if (cacheBurst) console.warn(`CACHE BURST ENABLED`)

window.$docsify = {
  basePath,
  repo: `https://ghe.rakuten-it.com${basePath}`,
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
    depth: 3,
    placeholder: {
      '/ja/': '検索',
      '/': 'Search…',
      }
  },
  pagination: {
    previousText: '上一章节',
    nextText: '下一章节',
  },
  requestHeaders: {
    ...cacheBurst,
  },
}

navigator.serviceWorker?.register(`${basePath}vendor/js/service-worker.js`)
