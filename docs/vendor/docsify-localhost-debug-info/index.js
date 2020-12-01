'use strict'
;(function (window) {

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

    hook.afterEach((html) => `${html}
      <p>Running on localhost. Here's a dump of the VM:</p>
      <pre style="max-height:90vh;overflow:scroll;background:rgba(0,0,0,.1)"><code class="language-json">${JSON.stringify(vm, replacer(), 2).replace(/</g, '&lt;')}</code></pre>`)
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(DebugInfoIfLocalhost)
})(this)
