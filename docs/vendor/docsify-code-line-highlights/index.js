'use strict'
;(function (window) {

  function HighlightedCodeLines(hook, vm) {
    hook.mounted(function() {
      const renderer = vm.config.markdown.renderer
      const original = renderer.code || renderer.origin.code

      renderer.code = renderer.origin.code = function(code, lang) {
        var [_, realLang, options] = /^([^ \{]+) *(\{.+\})$/.exec(lang) || []
        if (options !== undefined)
          options = JSON.parse(options.replace(/([a-z][^:]*)(?=\s*:)/g, '"$1"'))
        if (options?.highlight !== undefined)
          return `<pre data-line="${options.highlight}" data-lang="${realLang}" class="line-highlight language-${realLang}"><code class="language-${realLang}">${code}</code></pre>`
        else
          return original.call(this, code, lang)
      }
    })
    hook.doneEach(() => Prism.highlightAll())
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(HighlightedCodeLines)
})(this)
