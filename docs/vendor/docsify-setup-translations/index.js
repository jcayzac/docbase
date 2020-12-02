'use strict'
;(function(window) {
  const { translations = [], defaultLanguage = 'en' } = window.$docsify || {}
  const languagePrefixes = translations.map(({language}) => language === defaultLanguage ? '' : `${language}/`)

  const configForPath = (path, key, defValue) =>
    translations.filter(({language}) => path?.startsWith(`/${language}/`)).shift()?.[key] ||
    translations.filter(({language}) => language === defaultLanguage).shift()?.[key] ||
    defValue

  const paginationLabel0 = (filter, label) => translations?.filter(filter)?.shift()?.paginate?.[`${label}Label`]
  const paginationLabel = (label, path) => paginationLabel0(({language}) => path.startsWith(`/${language}/`), label)
    || paginationLabel0(({language}) => language === defaultLanguage, label)
    || label

  const
    name = translations.map(({language, name}) => `<span lang="${language}">${name}</span>`).join(''),
    nameLink = Object.fromEntries(languagePrefixes.map(x => [`/${x}`, `#/${x}`])),
    notFoundPage = Object.fromEntries(languagePrefixes.map(x => [`/${x}`, `/${x}_404.md`])),
    fallbackLanguages = translations.map(x => x.language).filter(x => x !== defaultLanguage),
    formatUpdated = `{YYYY}-{MM}-{DD} ({HH}:{mm}:{ss})`, // TODO
    placeholder = Object.fromEntries(translations.map(({language, search}) => [language === defaultLanguage ? '/' : `/${language}/`, search])),
    description = (route, _) => configForPath(route.path, 'defaultDescription', ''),
    previousLabel = (vm) => paginationLabel('previous', vm.route.path),
    nextLabel = (vm) => paginationLabel('next', vm.route.path)

  window.$docsify = Object.assign(window.$docsify, { name, nameLink, notFoundPage, fallbackLanguages, formatUpdated })
  window.$docsify.search = Object.assign(window.$docsify.search || {}, { placeholder })
  window.$docsify.seo = Object.assign(window.$docsify.seo || {}, { description })
  window.$docsify.paginate = Object.assign(window.$docsify.paginate || {}, { previousLabel, nextLabel })

  // Refresh the <html lang> tag when the route changes
  function HtmlLang(hook, vm) {
    const refreshInfo = () => {
      const
        { defaultLanguage, translations } = vm.config,
        { path } = vm.route

      window.document.documentElement.lang = configForPath(path, 'language', defaultLanguage)
    }

    let oldPath
    hook.ready(() => {
      oldPath = vm.router.getCurrentPath()
      vm.router.onchange(({source}) => {
        const newPath = vm.router.getCurrentPath()

        if (source === 'navigate') {
          const newLanguage = configForPath(newPath, 'language', defaultLanguage)
          const newLanguageRoot = newLanguage === defaultLanguage ? '/' : `/${newLanguage}/`

          if (newPath === `${newLanguageRoot}?auto`) {
            const oldLanguage = configForPath(oldPath, 'language', defaultLanguage)
            const oldLanguageRoot = oldLanguage === defaultLanguage ? '/' : `/${oldLanguage}/`
            const path = `${oldPath.slice(oldLanguageRoot.length)}`
            const url = vm.router.toURL(`${newLanguageRoot}${path}`)
            window.location.href = url
          }
        }

        oldPath = newPath
      })
    })
    hook.init(refreshInfo)
    hook.doneEach(refreshInfo)
  }

  (window.$docsify.plugins = window.$docsify.plugins || []).push(HtmlLang)

})(this)
