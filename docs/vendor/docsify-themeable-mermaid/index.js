'use strict'
;(function (window) {
  const { document } = window

  const css = `
  :root {
    --mermaid-primary-color: var(--theme-color);
    --mermaid-primary-text-color: var(--base-color);
    --mermaid-primary-background-color: var(--base-background-color);
    --mermaid-secondary-color: hsl(calc(var(--theme-hue) - 120), var(--theme-saturation), var(--theme-lightness));
    --mermaid-tertiary-color: hsl(calc(var(--theme-hue) + 180), var(--theme-saturation), calc(var(--theme-lightness) + 5));
    --mermaid-font-family: var(--base-font-family);
    --mermaid-default-line-width: 2;
    --mermaid-primary-border-color: var(--mermaid-primary-color);
    --mermaid-primary-line-color: hsl(var(--mono-hue), var(--mono-saturation), 50%);
    --mermaid-activation-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-activation-border-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-active-task-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-active-task-border-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-actor-background: var(--mermaid-primary-background-color);
    --mermaid-actor-border: var(--mermaid-primary-border-color);
    --mermaid-actor-text-color: var(--mermaid-primary-color);
    --mermaid-alt-section-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-crit-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-crit-border-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-done-task-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-done-task-border-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-error-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-error-text-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-grid-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-label-box-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-label-box-border-color: var(--mermaid-actor-border);
    --mermaid-label-color: var(--mermaid-secondary-color); /* TODO */
    --mermaid-label-text-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-line-color: var(--mermaid-primary-line-color); /* TODO */
    --mermaid-loop-text-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-node-background: var(--mermaid-primary-background-color);
    --mermaid-node-border: var(--mermaid-primary-border-color);
    --mermaid-note-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-note-border-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-note-text-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-section-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-section-background-color2: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-sequence-number-color: var(--mermaid-primary-color);
    --mermaid-signal-color: var(--mermaid-primary-color);
    --mermaid-signal-text-color: var(--mermaid-primary-text-color);
    --mermaid-task-background-color: var(--mermaid-primary-background-color); /* TODO */
    --mermaid-task-border-color: var(--mermaid-primary-border-color); /* TODO */
    --mermaid-task-text-clickablelickable-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-task-text-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-task-text-dark-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-task-text-outside-color: var(--mermaid-primary-text-color); /* TODO */
    --mermaid-title-color: var(--mermaid-secondary-color); /* TODO */
    --mermaid-today-line-color: var(--mermaid-secondary-color); /* TODO */
  }

  /* sequence */
  figure.mermaid svg .actor {
    fill: var(--mermaid-actor-background);
    stroke: var(--mermaid-actor-border);
    stroke-width: var(--mermaid-default-line-width);
  }
  figure.mermaid svg .actor-line {
    stroke: var(--mermaid-actor-border);
  }

  figure.mermaid svg text.actor > tspan {
    font-family: var(--mermaid-font-family);
    fill: var(--mermaid-actor-text-color);
    stroke: none;
  }

  figure.mermaid svg .messageLine0,
  figure.mermaid svg .messageLine1,
  figure.mermaid svg #arrowhead path,
  figure.mermaid svg #crosshead path {
    stroke: var(--mermaid-signal-color);
  }

  figure.mermaid svg #arrowhead path,
  figure.mermaid svg #crosshead path,
  figure.mermaid svg #sequencenumber {
    fill: var(--mermaid-signal-color);
  }
  figure.mermaid svg .messageLine0,
  figure.mermaid svg .messageLine1 {
    stroke-width: var(--mermaid-default-line-width);
  }
  figure.mermaid svg .sequenceNumber {
    fill: var(--mermaid-sequence-number-color);
  }

  figure.mermaid svg .messageText {
    font-family: var(--mermaid-font-family);
    fill: var(--mermaid-signal-text-color);
    stroke: var(--mermaid-signal-text-color);
  }

  figure.mermaid svg .labelBox,
  figure.mermaid svg .node rect.label-container {
    stroke: var(--mermaid-label-box-border-color);
    fill: var(--mermaid-label-box-background-color);
  }

  figure.mermaid svg .nodeLabel, .cluster-label {
    color: var(--mermaid-label-text-color);
  }

  figure.mermaid svg .labelText, .labelText > tspan {
    fill: var(--mermaid-label-text-color);
    stroke: none;
  }

  figure.mermaid svg .loopText, .loopText > tspan {
    fill: var(--mermaid-loop-text-color);
    stroke: none;
  }

  figure.mermaid svg .loopLine {
    stroke: var(--mermaid-label-box-border-color);
    fill: var(--mermaid-label-box-border-color);
  }

  figure.mermaid svg .note {
    stroke: var(--mermaid-note-border-color);
    fill: var(--mermaid-note-background-color);
  }

  figure.mermaid svg .noteText, .noteText > tspan {
    fill: var(--mermaid-note-text-color);
    stroke: none;
  }

  figure.mermaid svg .activation0 {
    fill: var(--mermaid-activation-background-color);
    stroke: var(--mermaid-activation-border-color);
  }

  figure.mermaid svg .activation1 {
    fill: var(--mermaid-activation-background-color);
    stroke: var(--mermaid-activation-border-color);
  }

  figure.mermaid svg .activation2 {
    fill: var(--mermaid-activation-background-color);
    stroke: var(--mermaid-activation-border-color);
  }

  /* gantt */
  figure.mermaid svg .mermaid-main-font {
    font-family: var(--mermaid-font-family);
  }

  figure.mermaid svg .section0 {
    fill: var(--mermaid-section-background-color);
  }

  figure.mermaid svg .section2 {
    fill: var(--mermaid-section-background-color2);
  }

  figure.mermaid svg .section1,
  figure.mermaid svg .section3 {
    fill: var(--mermaid-alt-section-background-color);
  }

  figure.mermaid svg .sectionTitle0,
  figure.mermaid svg .sectionTitle1,
  figure.mermaid svg .sectionTitle2,
  figure.mermaid svg .sectionTitle3,
  figure.mermaid svg g.stateGroup text,
  figure.mermaid svg g.statediagram-cluster .cluster-label text {
    fill: var(--mermaid-title-color);
  }

  figure.mermaid svg .sectionTitle {
    text-anchor: start;
    font-size: 11px;
    text-height: 14px;
    font-family: var(--mermaid-font-family);
  }

  figure.mermaid svg .grid .tick {
    stroke: var(--mermaid-grid-color);
  }

  figure.mermaid svg .grid .tick text {
    font-family: var(--mermaid-font-family);
  }

  figure.mermaid svg .today {
    stroke: var(--mermaid-today-line-color);
  }

  figure.mermaid svg .taskText {
    font-family: var(--mermaid-font-family);
  }

  figure.mermaid svg .taskTextOutsideRight {
    fill: var(--mermaid-task-text-dark-color);
    font-family: var(--mermaid-font-family);
  }

  figure.mermaid svg .taskTextOutsideLeft {
    fill: var(--mermaid-task-text-dark-color);
  }

  figure.mermaid svg .taskText.clickable {
    fill: var(--mermaid-task-text-clickable-color) !important;
  }
  figure.mermaid svg .taskTextOutsideLeft.clickable {
    fill: var(--mermaid-task-text-clickable-color) !important;
  }
  figure.mermaid svg .taskTextOutsideRight.clickable {
    fill: var(--mermaid-task-text-clickable-color) !important;
  }
  figure.mermaid svg .taskText0,
  figure.mermaid svg .taskText1,
  figure.mermaid svg .taskText2,
  figure.mermaid svg .taskText3 {
    fill: var(--mermaid-task-text-color);
  }
  figure.mermaid svg .task0,
  figure.mermaid svg .task1,
  figure.mermaid svg .task2,
  figure.mermaid svg .task3 {
    fill: var(--mermaid-task-background-color);
    stroke: var(--mermaid-task-border-color);
  }

  figure.mermaid svg .taskTextOutside0,
  figure.mermaid svg .taskTextOutside2
  figure.mermaid svg {
    fill: var(--mermaid-task-text-outside-color);
  }

  figure.mermaid svg .taskTextOutside1,
  figure.mermaid svg .taskTextOutside3 {
    fill: var(--mermaid-task-text-outside-color);
  }

  figure.mermaid svg .active0,
  figure.mermaid svg .active1,
  figure.mermaid svg .active2,
  figure.mermaid svg .active3 {
    fill: var(--mermaid-active-task-background-color);
    stroke: var(--mermaid-active-task-border-color);
  }

  figure.mermaid svg .activeText0,
  figure.mermaid svg .activeText1,
  figure.mermaid svg .activeText2,
  figure.mermaid svg .activeText3 {
    fill: var(--mermaid-task-text-dark-color) !important;
  }

  figure.mermaid svg .done0,
  figure.mermaid svg .done1,
  figure.mermaid svg .done2,
  figure.mermaid svg .done3 {
    stroke: var(--mermaid-done-task-border-color);
    fill: var(--mermaid-done-task-background-color);
    stroke-width: 2;
  }

  figure.mermaid svg .doneText0,
  figure.mermaid svg .doneText1,
  figure.mermaid svg .doneText2,
  figure.mermaid svg .doneText3 {
    fill: var(--mermaid-task-text-dark-color) !important;
  }

  figure.mermaid svg .crit0,
  figure.mermaid svg .crit1,
  figure.mermaid svg .crit2,
  figure.mermaid svg .crit3 {
    stroke: var(--mermaid-crit-border-color);
    fill: var(--mermaid-crit-background-color);
  }

  figure.mermaid svg .activeCrit0,
  figure.mermaid svg .activeCrit1,
  figure.mermaid svg .activeCrit2,
  figure.mermaid svg .activeCrit3 {
    stroke: var(--mermaid-crit-border-color);
    fill: var(--mermaid-active-task-background-color);
  }

  figure.mermaid svg .doneCrit0,
  figure.mermaid svg .doneCrit1,
  figure.mermaid svg .doneCrit2,
  figure.mermaid svg .doneCrit3 {
    stroke: var(--mermaid-crit-border-color);
    fill: var(--mermaid-done-task-background-color);
  }

  figure.mermaid svg .doneCritText0,
  figure.mermaid svg .doneCritText1,
  figure.mermaid svg .doneCritText2,
  figure.mermaid svg .doneCritText3,
  figure.mermaid svg .activeCritText0,
  figure.mermaid svg .activeCritText1,
  figure.mermaid svg .activeCritText2,
  figure.mermaid svg .activeCritText3 {
    fill: var(--mermaid-task-text-dark-color) !important;
  }

  figure.mermaid svg .titleText {
    font-size: calc(1rem * 1.333);
    fill: var(taskTextDarkColor);
    font-family: var(--mermaid-font-family);
  }

  /* class */

  figure.mermaid svg g.classGroup text {
    fill: var(--mermaid-node-border);
    stroke: none;
    font-family: var(--mermaid-font-family);
    font-size: 10px;
  }

  figure.mermaid svg .divider {
    stroke: var(--mermaid-node-border);
  }

  figure.mermaid svg g.classGroup rect {
    fill: var(--mermaid-node-background);
    stroke: var(--mermaid-node-border);
  }

  figure.mermaid svg g.classGroup line {
    stroke: var(--mermaid-node-border);
  }

  figure.mermaid svg .classLabel .box {
    fill: var(--mermaid-node-background);
  }

  figure.mermaid svg .classLabel .label {
    fill: var(--mermaid-node-border);
  }

  figure.mermaid svg .relation {
    stroke: var(--mermaid-line-color);
  }

  figure.mermaid svg #compositionStart, .composition,
  figure.mermaid svg #compositionEnd, .composition,
  figure.mermaid svg #dependencyStart, .dependency,
  figure.mermaid svg #dependencyEnd, .dependency,
  figure.mermaid svg #extensionStart , .extension,
  figure.mermaid svg #extensionEnd, .extension {
    fill: var(--mermaid-line-color) !important;
    stroke: var(--mermaid-line-color) !important;
    stroke-width: 1;
  }

  figure.mermaid svg #aggregationStart, .aggregation,
  figure.mermaid svg #aggregationEnd, .aggregation {
    fill: var(--mermaid-node-background) !important;
    stroke: var(--mermaid-line-color) !important;
    stroke-width: 1;
  }

  /* git */
  figure.mermaid svg .commit-id,
  figure.mermaid svg .commit-msg,
  figure.mermaid svg .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: var(--mermaid-font-family);
  }

  /* pie */
  figure.mermaid svg .pieTitleText {
    text-anchor: middle;
    font-size: 2rem;
    fill: var(--mermaid-task-text-dark-color);
    font-family: var(--mermaid-font-family);
  }
  figure.mermaid svg .slice {
    font-family: var(--mermaid-font-family);
  }
  figure.mermaid svg .legend text {
    font-family: var(--mermaid-font-family);
    fill: var(--mermaid-task-text-dark-color);
    font-size: inherit;
  }

  /* state */
  figure.mermaid svg g.stateGroup text {
    fill: var(--mermaid-node-border);
    stroke: none;
    font-size: 10px;
    font-family: var(--mermaid-font-family);
  }
  figure.mermaid svg g.stateGroup text {
    stroke: none;
    font-size: 10px;

  }
  figure.mermaid svg g.stateGroup .state-title {
    font-weight: bolder;
    fill: var(--mermaid-label-color);
  }

  figure.mermaid svg g.stateGroup rect {
    fill: var(--mermaid-node-background);
    stroke: var(--mermaid-node-border);
  }

  figure.mermaid svg g.stateGroup line {
    stroke: var(--mermaid-line-color);
    stroke-width: 1;
  }

  figure.mermaid svg .transition {
    stroke: var(--mermaid-line-color);
    stroke-width: 1;
    fill: none;
  }

  figure.mermaid svg .stateGroup .composit {
    fill: white;
  }

  figure.mermaid svg .stateGroup .alt-composit {
    fill: #e0e0e0;
  }

  figure.mermaid svg .state-note {
    stroke: var(--mermaid-note-border-color);
    fill: var(--mermaid-note-background-color);
  }

  figure.mermaid svg .state-note text {
    fill: black;
    font-size: 10px;
  }

  figure.mermaid svg .stateLabel .box {
    fill: var(--mermaid-node-background);
  }

  figure.mermaid svg .edgeLabel text {
    fill: #333;
  }

  figure.mermaid svg .stateLabel text {
    fill: var(--mermaid-label-color);
    font-family: var(--mermaid-font-family);
  }

  figure.mermaid svg .node circle.state-start {
    fill: var(--mermaid-line-color);
    stroke: var(--mermaid-line-color);
  }
  figure.mermaid svg .node circle.state-end {
    fill: var(--mermaid-line-color);
    stroke: var(--mermaid-primary-background-color);
  }
  figure.mermaid svg #statediagram-barbEnd {
    fill: var(--mermaid-line-color)
  }

  figure.mermaid svg .statediagram-cluster rect {
    stroke: var(--mermaid-node-border);
  }
  figure.mermaid svg .statediagram-state .divider {
    stroke: var(--mermaid-node-border);
  }
  figure.mermaid svg .statediagram-cluster.statediagram-cluster .inner {
    fill: white;
  }
  figure.mermaid svg .statediagram-cluster.statediagram-cluster-alt .inner {
    fill: #e0e0e0;
  }
  figure.mermaid svg .statediagram-state rect.divider {
    fill: #efefef;
  }
  figure.mermaid svg .statediagram-note rect {
    fill: var(--mermaid-note-background-color);
    stroke: var(--mermaid-note-border-color);
  }

  /* mermaid */
  figure.mermaid svg .error-icon {
    fill: var(--mermaid-error-background-color);
  }
  figure.mermaid svg .error-text {
    fill: var(--mermaid-error-text-color);
    stroke: var(--mermaid-error-text-color);
  }
  figure.mermaid svg .marker {
    fill: var(--mermaid-line-color);
  }
  figure.mermaid svg .marker.cross {
    stroke: var(--mermaid-line-color);
  }
  figure.mermaid svg > * {
    font-family: var(--mermaid-font-family);
    font-size: var(--base-font-size);
    fill: none;
  }
  `

  const style = document.head.insertBefore(document.createElement('style'), document.head.firstElementChild)
  if (style.styleSheet) style.styleSheet.cssText = css
  else style.appendChild(document.createTextNode(css))

  function initMermaid() {
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      deterministicIds: true,
      fontFamily: 'var(--mermaid-font-family)',
      logLevel: 5,
      securityLevel: 'antiscript',
      flowchart: {
        curve: 'basis'
      },
      gantt: {
        axisFormat: '%m/%d/%Y',
        fontFamily: 'var(--mermaid-font-family)',
      },
      sequence: {
        actorFontFamily: 'var(--mermaid-font-family)',
        actorFontSize: 12,
        actorFontWeight: 'var(--base-font-weight)',
        noteFontFamily: 'var(--mermaid-font-family)',
        noteFontSize: 12,
        noteFontWeight: 'var(--base-font-weight)',
        messageFontFamily: 'var(--mermaid-font-family)',
        messageFontSize: 12,
        messageFontWeight: 'var(--base-font-weight)',
      },
    })
  }

  function processSVG(svgCode) {
    const container = document.createElement('figure')
    container.classList.add('visual', 'diagram', 'mermaid')
    container.innerHTML = svgCode

    const svg = container.firstElementChild
    const viewBox = svg.getAttribute('viewBox').split(/ /g)
    svg.removeAttribute('xmlns')
    svg.removeAttribute('width')
    svg.removeAttribute('height')
    svg.removeAttribute('style')
    svg.querySelectorAll('style').forEach(x => x.parentNode.removeChild(x))
    svg.style=`width: 100%; max-width: ${viewBox[2]}px; height: auto; padding-top: ${(+viewBox[3]) / (+viewBox[2])}%`

    return container.outerHTML
  }

  function ThemeableMermaid(hook, vm) {
    let mermaidId

    hook.init(initMermaid)

    hook.beforeEach(function() {
      mermaidId = 0
    })

    hook.mounted(function() {
      const renderer = vm.config.markdown.renderer
      const original = renderer.code || renderer.origin.code
      renderer.code = renderer.origin.code = function(code, lang) {
        if (lang !== 'mermaid') return original.apply(this, arguments)

        let rendered
        mermaid.render(`mermaid-diagram-${++mermaidId}`, code, x => { rendered = processSVG(x) })
        return rendered
      }
    })
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(ThemeableMermaid)
})(this)
