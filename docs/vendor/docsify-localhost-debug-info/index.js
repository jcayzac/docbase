'use strict'
;(function (window) {
  if (!{'localhost': 1, '127.0.0.1': 1}[window.location.hostname]) { return }

  function DebugInfoIfLocalhost(hook, vm) {
    const replacer = () => {
      const seen = new WeakSet()
      return (_, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return
          else seen.add(value)
        }

        if (value === null) return
        else if (typeof value === 'function') return `${value.name || value}`
        else return value
      }
    }

    hook.beforeEach((content) => console.log(`BEFORE:`, {vm, content}))
    hook.afterEach((html) => console.log(`AFTER:`, {vm, html}))
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(DebugInfoIfLocalhost)
})(this)
