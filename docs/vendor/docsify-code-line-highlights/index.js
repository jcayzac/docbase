'use strict'
;(function (window) {
  const css = `
  pre[data-line] {
    position: relative;
  }

  pre[data-line] .line-highlight {
    position: absolute;
    margin: var(--code-block-padding);
    margin-left: 0;
    margin-right: 0;
    left: 0;
    right: 0;
    height: var(--code-block-line-height);
    pointer-events: none;
    padding: 0;
    background: linear-gradient(to right, hsla(var(--theme-hue), var(--theme-saturation), var(--theme-lightness),.15) 60%, hsla(var(--theme-hue), var(--theme-saturation), var(--theme-lightness),0) 90%);
    border-left: 4px solid var(--theme-color);
  }
  `

  const { document } = window
  const style = document.head.insertBefore(document.createElement('style'), document.head.firstElementChild)
  if (style.styleSheet) style.styleSheet.cssText = css
  else style.appendChild(document.createTextNode(css))

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
          return original.call(renderer, code, lang)
      }
    })
    hook.doneEach(() => Prism.highlightAll())
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(HighlightedCodeLines)
})(this)
