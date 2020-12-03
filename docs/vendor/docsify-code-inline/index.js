'use strict'
/*
 * Small plugin that allows to pass a Prism language to an inline code fragment,
 * using the notation [`some code` language].
 */
;(function (window) {
  const css = `
  .markdown-section p > code[class*="language-"] {
    background: var(--code-theme-background);
    margin: var(--code-inline-margin);
    padding: var(--code-inline-padding);
    border-radius: var(--code-inline-border-radius);
    color: var(--code-inline-color, currentColor);
  }
  `

  const { document } = window
  const style = document.head.insertBefore(document.createElement('style'), document.head.firstElementChild)
  if (style.styleSheet) style.styleSheet.cssText = css
  else style.appendChild(document.createTextNode(css))

  function InlineCode(hook, vm) {
    hook.beforeEach(text => text.replace(/\[\`(.*?)\`\s+([^\`]+?)\](?!\()/g, '<code class="language-$2">$1</code>'))
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(InlineCode)
})(this)
