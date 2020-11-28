'use strict';
(function (window) {
  function initMermaid() {
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeCSS: `
      /* sequence */
      .actor {
        fill: var(--mermaid-actor-background);
        stroke: var(--mermaid-actor-border);
        stroke-width: var(--mermaid-default-line-width);
      }
      .actor-line {
        stroke: var(--mermaid-actor-border);
      }
      
      text.actor > tspan {
        font-family: var(--mermaid-font-family);
        fill: var(--mermaid-actor-text-color);
        stroke: none;
      }
    
      .messageLine0,
      .messageLine1,
      #arrowhead path,
      #crosshead path {
        stroke: var(--mermaid-signal-color);
      }
    
      #arrowhead path,
      #crosshead path,
      #sequencenumber {
        fill: var(--mermaid-signal-color);
      }
      .messageLine0,
      .messageLine1 {
        stroke-width: var(--mermaid-default-line-width);
      }
      .sequenceNumber {
        fill: var(--mermaid-sequence-number-color);
      }
      
      .messageText {
        font-family: var(--mermaid-font-family);
        fill: var(--mermaid-signal-text-color);
        stroke: var(--mermaid-signal-text-color);
      }
    
      .labelBox,
      .node rect.label-container {
        stroke: var(--mermaid-label-box-border-color);
        fill: var(--mermaid-label-box-background-color);
      }
    
      .nodeLabel, .cluster-label {
        color: var(--mermaid-label-text-color);
      }
      
      .labelText, .labelText > tspan {
        fill: var(--mermaid-label-text-color);
        stroke: none;
      }
      
      .loopText, .loopText > tspan {
        fill: var(--mermaid-loop-text-color);
        stroke: none;
      }
      
      .loopLine {
        stroke: var(--mermaid-label-box-border-color);
        fill: var(--mermaid-label-box-border-color);
      }
      
      .note {
        stroke: var(--mermaid-note-border-color);
        fill: var(--mermaid-note-background-color);
      }
      
      .noteText, .noteText > tspan {
        fill: var(--mermaid-note-text-color);
        stroke: none;
      }
      
      .activation0 {
        fill: var(--mermaid-activation-background-color);
        stroke: var(--mermaid-activation-border-color);
      }
      
      .activation1 {
        fill: var(--mermaid-activation-background-color);
        stroke: var(--mermaid-activation-border-color);
      }
      
      .activation2 {
        fill: var(--mermaid-activation-background-color);
        stroke: var(--mermaid-activation-border-color);
      }
    
      /* gantt */
      .mermaid-main-font {
        font-family: var(--mermaid-font-family);
      }
    
      .section0 {
        fill: var(--mermaid-section-background-color);
      }
    
      .section2 {
        fill: var(--mermaid-section-background-color2);
      }
    
      .section1,
      .section3 {
        fill: var(--mermaid-alt-section-background-color);
      }
    
      .sectionTitle0,
      .sectionTitle1,
      .sectionTitle2,
      .sectionTitle3,
      g.stateGroup text,
      g.statediagram-cluster .cluster-label text {
        fill: var(--mermaid-title-color);
      }
    
      .sectionTitle {
        text-anchor: start;
        font-size: 11px;
        text-height: 14px;
        font-family: var(--mermaid-font-family);
      }
    
      .grid .tick {
        stroke: var(--mermaid-grid-color);
      }
    
      .grid .tick text {
        font-family: var(--mermaid-font-family);
      }
    
      .today {
        stroke: var(--mermaid-today-line-color);
      }
    
      .taskText {
        font-family: var(--mermaid-font-family);
      }
    
      .taskTextOutsideRight {
        fill: var(--mermaid-task-text-dark-color);
        font-family: var(--mermaid-font-family);
      }
    
      .taskTextOutsideLeft {
        fill: var(--mermaid-task-text-dark-color);
      }
    
      .taskText.clickable {
        fill: var(--mermaid-task-text-clickable-color) !important;
      }
      .taskTextOutsideLeft.clickable {
        fill: var(--mermaid-task-text-clickable-color) !important;
      }
      .taskTextOutsideRight.clickable {
        fill: var(--mermaid-task-text-clickable-color) !important;
      }
      .taskText0,
      .taskText1,
      .taskText2,
      .taskText3 {
        fill: var(--mermaid-task-text-color);
      }
      .task0,
      .task1,
      .task2,
      .task3 {
        fill: var(--mermaid-task-background-color);
        stroke: var(--mermaid-task-border-color);
      }
    
      .taskTextOutside0,
      .taskTextOutside2
      {
        fill: var(--mermaid-task-text-outside-color);
      }
    
      .taskTextOutside1,
      .taskTextOutside3 {
        fill: var(--mermaid-task-text-outside-color);
      }
    
      .active0,
      .active1,
      .active2,
      .active3 {
        fill: var(--mermaid-active-task-background-color);
        stroke: var(--mermaid-active-task-border-color);
      }
    
      .activeText0,
      .activeText1,
      .activeText2,
      .activeText3 {
        fill: var(--mermaid-task-text-dark-color) !important;
      }
    
      .done0,
      .done1,
      .done2,
      .done3 {
        stroke: var(--mermaid-done-task-border-color);
        fill: var(--mermaid-done-task-background-color);
        stroke-width: 2;
      }
    
      .doneText0,
      .doneText1,
      .doneText2,
      .doneText3 {
        fill: var(--mermaid-task-text-dark-color) !important;
      }
    
      .crit0,
      .crit1,
      .crit2,
      .crit3 {
        stroke: var(--mermaid-crit-border-color);
        fill: var(--mermaid-crit-background-color);
      }
    
      .activeCrit0,
      .activeCrit1,
      .activeCrit2,
      .activeCrit3 {
        stroke: var(--mermaid-crit-border-color);
        fill: var(--mermaid-active-task-background-color);
      }
    
      .doneCrit0,
      .doneCrit1,
      .doneCrit2,
      .doneCrit3 {
        stroke: var(--mermaid-crit-border-color);
        fill: var(--mermaid-done-task-background-color);
      }
    
      .doneCritText0,
      .doneCritText1,
      .doneCritText2,
      .doneCritText3,
      .activeCritText0,
      .activeCritText1,
      .activeCritText2,
      .activeCritText3 {
        fill: var(--mermaid-task-text-dark-color) !important;
      }
    
      .titleText {
        font-size: calc(1rem * 1.333);
        fill: var(taskTextDarkColor);
        font-family: var(--mermaid-font-family);
      }
    
      /* class */
    
      g.classGroup text {
        fill: var(--mermaid-node-border);
        stroke: none;
        font-family: var(--mermaid-font-family);
        font-size: 10px;
      }
    
      .divider {
        stroke: var(--mermaid-node-border);
      }
    
      g.classGroup rect {
        fill: var(--mermaid-node-background);
        stroke: var(--mermaid-node-border);
      }
    
      g.classGroup line {
        stroke: var(--mermaid-node-border);
      }
    
      .classLabel .box {
        fill: var(--mermaid-node-background);
      }
    
      .classLabel .label {
        fill: var(--mermaid-node-border);
      }
    
      .relation {
        stroke: var(--mermaid-line-color);
      }
    
      #compositionStart, .composition,
      #compositionEnd, .composition,
      #dependencyStart, .dependency,
      #dependencyEnd, .dependency,
      #extensionStart , .extension,
      #extensionEnd, .extension {
        fill: var(--mermaid-line-color) !important;
        stroke: var(--mermaid-line-color) !important;
        stroke-width: 1;
      }
    
      #aggregationStart, .aggregation,
      #aggregationEnd, .aggregation {
        fill: var(--mermaid-node-background) !important;
        stroke: var(--mermaid-line-color) !important;
        stroke-width: 1;
      }
    
      /* git */
      .commit-id,
      .commit-msg,
      .branch-label {
        fill: lightgrey;
        color: lightgrey;
        font-family: var(--mermaid-font-family);
      }
    
      /* pie */
      .pieTitleText {
        text-anchor: middle;
        font-size: 2rem;
        fill: var(--mermaid-task-text-dark-color);
        font-family: var(--mermaid-font-family);
      }
      .slice {
        font-family: var(--mermaid-font-family);
      }
      .legend text {
        font-family: var(--mermaid-font-family);
        fill: var(--mermaid-task-text-dark-color);
        font-size: inherit;
      }
    
      /* state */
      g.stateGroup text {
        fill: var(--mermaid-node-border);
        stroke: none;
        font-size: 10px;
        font-family: var(--mermaid-font-family);
      }
      g.stateGroup text {
        stroke: none;
        font-size: 10px;
    
      }
      g.stateGroup .state-title {
        font-weight: bolder;
        fill: var(--mermaid-label-color);
      }
    
      g.stateGroup rect {
        fill: var(--mermaid-node-background);
        stroke: var(--mermaid-node-border);
      }
    
      g.stateGroup line {
        stroke: var(--mermaid-line-color);
        stroke-width: 1;
      }
    
      .transition {
        stroke: var(--mermaid-line-color);
        stroke-width: 1;
        fill: none;
      }
    
      .stateGroup .composit {
        fill: white;
      }
    
      .stateGroup .alt-composit {
        fill: #e0e0e0;
      }
    
      .state-note {
        stroke: var(--mermaid-note-border-color);
        fill: var(--mermaid-note-background-color);
      }
    
      .state-note text {
        fill: black;
        font-size: 10px;
      }
    
      .stateLabel .box {
        fill: var(--mermaid-node-background);
      }
    
      .edgeLabel text {
        fill: #333;
      }
    
      .stateLabel text {
        fill: var(--mermaid-label-color);
        font-family: var(--mermaid-font-family);
      }
    
      .node circle.state-start {
        fill: var(--mermaid-line-color);
        stroke: var(--mermaid-line-color);
      }
      .node circle.state-end {
        fill: var(--mermaid-line-color);
        stroke: var(--mermaid-primary-background-color);
      }
      #statediagram-barbEnd {
        fill: var(--mermaid-line-color)
      }
    
      .statediagram-cluster rect {
        stroke: var(--mermaid-node-border);
      }
      .statediagram-state .divider {
        stroke: var(--mermaid-node-border);
      }
      .statediagram-cluster.statediagram-cluster .inner {
        fill: white;
      }
      .statediagram-cluster.statediagram-cluster-alt .inner {
        fill: #e0e0e0;
      }
      .statediagram-state rect.divider {
        fill: #efefef;
      }
      .statediagram-note rect {
        fill: var(--mermaid-note-background-color);
        stroke: var(--mermaid-note-border-color);
      }
    
      /* mermaid */
      .error-icon {
        fill: var(--mermaid-error-background-color);
      }
      .error-text {
        fill: var(--mermaid-error-text-color);
        stroke: var(--mermaid-error-text-color);
      }
      .marker {
        fill: var(--mermaid-line-color);
      }
      .marker.cross {
        stroke: var(--mermaid-line-color);
      }
      > * {
        font-family: var(--mermaid-font-family);
        font-size: var(--base-font-size);
        fill: none;
      }
      `,
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

  function plugin(hook, vm) {
    var mermaidId = 0

    hook.init(initMermaid)
    hook.beforeEach(function() {
      mermaidId = 0
    })
    hook.mounted(function() {
      const renderer = vm.config.markdown.renderer
      const original = renderer.code || renderer.origin.code
      renderer.code = renderer.origin.code = function(code, lang) {
        if (lang === 'mermaid')
          return `<figure class="visual diagram mermaid">${mermaid.render(`mermaid-svg-${++mermaidId}`, code)}</figure>`
        else
          return original.apply(this, arguments)
      }
    })
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(plugin)
})(this)
