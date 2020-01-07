import { PlaygroundPlugin } from '..'

export const compiledJSPlugin = () => {
  let codeElement: HTMLElement

  const plugin: PlaygroundPlugin = {
    id: 'js',
    displayName: 'JS',
    willMount: async (sandbox, container) => {
      const createCodePre = document.createElement('pre')
      codeElement = document.createElement('code')

      createCodePre.appendChild(codeElement)
      container.appendChild(createCodePre)
    },
    modelChanged: async (sandbox, model) => {
      codeElement.textContent = await sandbox.getRunnableJS()
    },
  }

  return plugin
}
