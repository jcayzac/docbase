'use strict'
;(function(window) {
  const { translations = [], defaultLanguage = 'en' } = window.$docsify || {}
  const languagePrefixes = translations.map(({language}) => language === defaultLanguage ? '' : `${language}/`)

  const configForPath = (path, key, defValue) =>
    translations.filter(({language}) => path?.startsWith(`/${language}/`)).shift()?.[key] ||
    translations.filter(({language}) => language === defaultLanguage).shift()?.[key] ||
    defValue

  const
    name = translations.map(({language, name}) => `<span lang="${language}">${name}</span>`).join(''),
    nameLink = Object.fromEntries(languagePrefixes.map(x => [`/${x}`, `#/${x}`])),
    notFoundPage = Object.fromEntries(languagePrefixes.map(x => [`/${x}`, `/${x}_404.md`])),
    fallbackLanguages = translations.map(x => x.language).filter(x => x !== defaultLanguage),
    formatUpdated = `{YYYY}-{MM}-{DD} ({HH}:{mm}:{ss})`, // TODO
    placeholder = Object.fromEntries(translations.map(({language, search}) => [language === defaultLanguage ? '/' : `/${language}/`, search])),
    description = (route, _) => configForPath(route.path, 'defaultDescription', '')

  window.$docsify = Object.assign(window.$docsify, { name, nameLink, notFoundPage, fallbackLanguages, formatUpdated })
  window.$docsify.search = Object.assign(window.$docsify.search || {}, { placeholder })
  window.$docsify.seo = Object.assign(window.$docsify.seo || {}, { description })

  // Refresh the <html lang> tag when the route changes
  function HtmlLang(hook, vm) {
    const refreshInfo = () => {
      const
        { defaultLanguage, translations } = vm.config,
        { path } = vm.route

      window.document.documentElement.lang = configForPath(path, 'language', defaultLanguage)
    }

    hook.init(refreshInfo)
    hook.doneEach(refreshInfo)
  }

  (window.$docsify.plugins = window.$docsify.plugins || []).push(HtmlLang)

})(this)
