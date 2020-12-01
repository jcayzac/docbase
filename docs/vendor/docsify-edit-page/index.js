'use strict'
;(function (window) {
  function EditPage(hook, vm) {
    hook.afterEach(function(html) {
      const
        { edit, defaultLanguage, translations, repo } = vm.config,
        { path, file } = vm.route

      const selectLabel = (f) => translations?.filter(f)?.shift()?.editPage

      const
        label = selectLabel(({language}) => path.startsWith(`/${language}/`))
          || selectLabel(({language}) => language === defaultLanguage)
          || 'Edit',
        url = `${repo}edit/${edit.branch || 'main'}/${edit.path || ''}${file}`

      return `${html}<a rel="noopener" target="_blank" href="${url}">${label}</a>`
    })
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(EditPage)
})(this)
