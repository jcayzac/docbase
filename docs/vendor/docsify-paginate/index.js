'use strict'
/*
 * Replacement for [docsify-pagination](https://github.com/imyelo/docsify-pagination):
 *
 * - Dynamic previous/next labels (automatically setup by docsify-setup-translations).
 * - Compatible with docsify-themeable variables for docsify-pagination.
 * - Better accessibility.
 *
 * TODO:
 * - Support dynamic aria labels too (e.g. `${nextLabel}: ${next.title}, in ${next.chapter}` if lang=en).
 */
;(function(window) {
  const { document } = window

  const css = `
  #docsify-paginate-container {
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    overflow:hidden;
    padding: 0;
    margin:5em 0 1em;
    list-style: none;
    border-top: var(--pagination-border-top, rgba(0, 0, 0, .07));
    color: var(--pagination-color, currentColor);
  }

  #docsify-paginate-container .pagination-item {
    flex: 1;
    margin-top:2.5em;
  }

  #docsify-paginate-container .pagination-item a,
  #docsify-paginate-container .pagination-item a:hover {
    text-decoration:none;
  }

  #docsify-paginate-container .pagination-item a {
    color:currentColor;
  }

  #docsify-paginate-container .pagination-item a:hover .pagination-item-title {
    text-decoration:underline;
  }

  #docsify-paginate-container .pagination-item:not(:last-child) a .pagination-item-label,
  #docsify-paginate-container .pagination-item:not(:last-child) a .pagination-item-subtitle,
  #docsify-paginate-container .pagination-item:not(:last-child) a .pagination-item-title {
    opacity:.3;
    transition:all .2s;
  }

  #docsify-paginate-container .pagination-item:last-child .pagination-item-label,
  #docsify-paginate-container .pagination-item:not(:last-child) a:hover .pagination-item-label {
    opacity:.6;
  }

  #docsify-paginate-container .pagination-item:not(:last-child) a:hover .pagination-item-title {
    opacity:1;
  }

  #docsify-paginate-container .pagination-item-label {
    font-size: var(--pagination-label-font-size, .8em);
  }

  #docsify-paginate-container .pagination-item-label>* {
    line-height:1;
    vertical-align:middle;
  }

  #docsify-paginate-container .pagination-item-label svg {
    height: var(--pagination-chevron-height, .8em);
    width:auto;
    color: var(--pagination-label-color, currentColor);
    stroke: var(--pagination-chevron-stroke, currentColor);
    stroke-linecap: var(--pagination-chevron-stroke-linecap, round);
    stroke-linejoin: var(--pagination-chevron-stroke-linecap, round);
    stroke-width: var(--pagination-chevron-stroke-width, 1px);
  }

  #docsify-paginate-container .pagination-item--next {
    margin-left:auto;
    text-align:right;
  }

  #docsify-paginate-container .pagination-item--next svg {
    margin-left:.5em;
  }

  #docsify-paginate-container .pagination-item--previous svg {
    margin-right:.5em;
  }

  #docsify-paginate-container .pagination-item-title {
    color: var(--pagination-title-color);
    font-size: var(--pagination-title-font-size, 1.6em);
  }

  #docsify-paginate-container .pagination-item-subtitle {
    text-transform:uppercase;
    opacity:.3;
  }

  #docsify-paginate-container .pagination-item-navigate {
    text-transform:uppercase;
  }
  `

  const style = document.head.insertBefore(document.createElement('style'), document.head.firstElementChild)
  if (style.styleSheet) style.styleSheet.cssText = css
  else style.appendChild(document.createTextNode(css))

  function Paginate(hook, vm) {
    hook.afterEach((html) => {
      return `${html}
      <ul id="docsify-paginate-container" role="navigation">
      </ul>`
    })

    hook.doneEach(() => {
      // The URL of the page being rendered
      const url = new URL(vm.router.toURL(vm.route.path), window.location.href)
      // All the links in the sidebar
      const allLinks = Array.from(document.querySelectorAll('.sidebar-nav li a'))
      // The <a> element corresponding to the page being rendered, and its index
      const link = allLinks.filter((e) => e.href === url.href).shift()
      const index = allLinks.indexOf(link)
      // Collect chapter titles
      const allChapters = Array.from(document.querySelectorAll('.sidebar-nav ul > li > p + ul')).map((e) => ({
        title: e.previousElementSibling.innerText,
        element: e,
      }))
      // Neighbor links
      const prev = allLinks[index - 1]
      const next = allLinks[index + 1]
      const chapter = (element) => {
        let chapter, parent = element
        while ((parent = parent?.parentElement) && !(chapter = allChapters.filter(e => e.element == parent).shift())) {}
        return chapter?.title || ''
      }
      const { previousLabel, nextLabel } = vm.config.paginate || {}
      const previousLabelString = (typeof previousLabel === 'function' ? previousLabel(vm) : previousLabel) || 'Previous'
      const nextLabelString = (typeof nextLabel === 'function' ? nextLabel(vm) : nextLabel) || 'Previous'

      document.getElementById('docsify-paginate-container').innerHTML = [
        prev && `
        <li class="pagination-item pagination-item--previous">
          <a href="${prev.href}" title="${previousLabelString}">
            <div class="pagination-item-label">
              <svg class="icon" width="10" height="16" viewBox="0 0 10 16">
                <polyline fill="none" vector-effect="non-scaling-stroke" points="8,2 2,8 8,14"/>
              </svg>
              <span class="pagination-item-navigate">${previousLabelString}</span>
            </div>
            <div class="pagination-item-title">${prev.title}</div>
            <div class="pagination-item-subtitle">${chapter(prev)}</div>
          </a>
        </li>
        `,
        next && `
        <li class="pagination-item pagination-item--next">
          <a href="${next.href}" title="${nextLabelString}">
            <div class="pagination-item-label">
              <span class="pagination-item-navigate">${nextLabelString}</span>
              <svg class="icon" width="10" height="16" viewBox="0 0 10 16">
                <polyline fill="none" vector-effect="non-scaling-stroke" points="2,2 8,8 2,14"/>
              </svg>
            </div>
            <div class="pagination-item-title">${next.title}</div>
            <div class="pagination-item-subtitle">${chapter(next)}</div>
          </a>
        </li>
        `,
      ].filter(Boolean).join('')
    })
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(Paginate)
})(this)
