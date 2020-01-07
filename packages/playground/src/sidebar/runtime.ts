import { PlaygroundPlugin } from '..'

let allLogs = ''

export const runPlugin = () => {
  const plugin: PlaygroundPlugin = {
    id: 'logs',
    displayName: 'Logs',
    willMount: (sandbox, container) => {
      const errorUL = document.createElement('div')
      errorUL.id = 'log-container'
      container.appendChild(errorUL)

      const logs = document.createElement('div')
      logs.id = 'log'
      logs.innerHTML = allLogs
      errorUL.appendChild(logs)
    },
  }

  return plugin
}

export const runWithCustomLogs = (closure: Function) => {
  rewireLoggingToElement(
    () => document.getElementById('log')!,
    () => document.getElementById('log-container')!,
    closure,
    true
  )
}

// Thanks SO: https://stackoverflow.com/questions/20256760/javascript-console-log-to-html/35449256#35449256

function rewireLoggingToElement(
  eleLocator: () => Element,
  eleOverflowLocator: () => Element,
  closure: Function,
  autoScroll: boolean
) {
  fixLoggingFunc('log', 'LOG')
  fixLoggingFunc('debug', 'DBG')
  fixLoggingFunc('warn', 'WRN')
  fixLoggingFunc('error', 'ERR')
  fixLoggingFunc('info', 'INF')

  closure()
  allLogs = allLogs + '<hr />'

  undoLoggingFunc('log')
  undoLoggingFunc('debug')
  undoLoggingFunc('warn')
  undoLoggingFunc('error')
  undoLoggingFunc('info')

  function undoLoggingFunc(name: string) {
    // @ts-ignore
    console[name] = console['old' + name]
  }

  function fixLoggingFunc(name: string, id: string) {
    // @ts-ignore
    console['old' + name] = console[name]
    // @ts-ignore
    console[name] = function(...objs: any[]) {
      const output = produceOutput(objs)
      const eleLog = eleLocator()

      const prefix = '[<span class="log-' + name + '">' + id + '</span>]: '

      if (autoScroll) {
        const eleContainerLog = eleOverflowLocator()
        const isScrolledToBottom =
          eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1
        allLogs = allLogs + prefix + output + '<br>'
        eleLog.innerHTML = allLogs
        if (isScrolledToBottom) {
          eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight
        }
      } else {
        allLogs = allLogs + prefix + output + '<br>'
        eleLog.innerHTML = allLogs
      }

      // @ts-ignore
      console['old' + name].apply(undefined, objs)
    }
  }

  function produceOutput(args: any[]) {
    return args.reduce((output: any, arg: any, index) => {
      const isObj = typeof arg === 'object'
      let textRep = ''
      if (arg && arg.stack && arg.message) {
        // special case for err
        textRep = arg.message
      } else if (isObj) {
        textRep = JSON.stringify(arg, null, 2)
      } else {
        textRep = arg as any
      }

      const showComma = index !== args.length - 1
      const comma = showComma ? "<span class='comma'>, </span>" : ''
      return output + textRep + comma + '&nbsp;'
    }, '')
  }
}
