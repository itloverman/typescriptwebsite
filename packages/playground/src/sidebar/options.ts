import { PlaygroundPlugin, PluginFactory } from '..'

const pluginRegistry = [
  {
    module: 'typescript-playground-presentation-mode',
    display: 'Presentation Mode',
    blurb: 'Create presentations inside the TypeScript playground, seamlessly jump between slides and live-code.',
    repo: 'https://github.com/orta/playground-slides/#README',
    author: {
      name: 'Orta',
      href: 'https://orta.io',
    },
  },
]

/** Whether the playground should actively reach out to an existing plugin */
export const allowConnectingToLocalhost = () => {
  return !!localStorage.getItem('compiler-setting-connect-dev-plugin')
}

export const activePlugins = () => {
  const existing = customPlugins().map(module => ({ module }))
  return existing.concat(pluginRegistry.filter(p => !!localStorage.getItem('plugin-' + p.module)))
}

const removeCustomPlugins = (mod: string) => {
  const newPlugins = customPlugins().filter(p => p !== mod)
  localStorage.setItem('custom-plugins-playground', JSON.stringify(newPlugins))
}

const addCustomPlugin = (mod: string) => {
  const newPlugins = customPlugins()
  newPlugins.push(mod)
  localStorage.setItem('custom-plugins-playground', JSON.stringify(newPlugins))
  // @ts-ignore
  window.appInsights &&
    // @ts-ignore
    window.appInsights.trackEvent({ name: 'Added Custom Module', properties: { id: mod } })
}

const customPlugins = (): string[] => {
  return JSON.parse(localStorage.getItem('custom-plugins-playground') || '[]')
}

export const optionsPlugin: PluginFactory = i => {
  const settings = [
    {
      display: i('play_sidebar_options_disable_ata'),
      blurb: i('play_sidebar_options_disable_ata_copy'),
      flag: 'disable-ata',
    },
    {
      display: i('play_sidebar_options_disable_save'),
      blurb: i('play_sidebar_options_disable_save_copy'),
      flag: 'disable-save-on-type',
    },
    // {
    //   display: 'Verbose Logging',
    //   blurb: 'Turn on superfluous logging',
    //   flag: 'enable-superfluous-logging',
    // },
  ]

  const plugin: PlaygroundPlugin = {
    id: 'options',
    displayName: i('play_sidebar_options'),
    // shouldBeSelected: () => true, // uncomment to make this the first tab on reloads
    willMount: (_sandbox, container) => {
      const categoryDiv = document.createElement('div')
      container.appendChild(categoryDiv)

      const p = document.createElement('p')
      p.id = 'restart-required'
      p.textContent = i('play_sidebar_options_restart_required')
      categoryDiv.appendChild(p)

      const ol = document.createElement('ol')
      ol.className = 'playground-options'

      createSection(i('play_sidebar_options_external'), categoryDiv)

      const pluginsOL = document.createElement('ol')
      pluginsOL.className = 'playground-plugins'
      pluginRegistry.forEach(plugin => {
        const settingButton = createPlugin(plugin)
        pluginsOL.appendChild(settingButton)
      })
      categoryDiv.appendChild(pluginsOL)

      const warning = document.createElement('p')
      warning.className = 'warning'
      warning.textContent = i('play_sidebar_options_external_warning')
      categoryDiv.appendChild(warning)

      createSection(i('play_sidebar_options_modules'), categoryDiv)
      const customModulesOL = document.createElement('ol')
      customModulesOL.className = 'custom-modules'

      const updateCustomModules = () => {
        while (customModulesOL.firstChild) {
          customModulesOL.removeChild(customModulesOL.firstChild)
        }
        customPlugins().forEach(module => {
          const li = document.createElement('li')
          li.innerHTML = module
          const a = document.createElement('a')
          a.href = '#'
          a.textContent = 'X'
          a.onclick = () => {
            removeCustomPlugins(module)
            updateCustomModules()
            announceWeNeedARestart()
            return false
          }
          li.appendChild(a)

          customModulesOL.appendChild(li)
        })
      }
      updateCustomModules()

      categoryDiv.appendChild(customModulesOL)
      const inputForm = createNewModuleInputForm(updateCustomModules, i)
      categoryDiv.appendChild(inputForm)

      createSection('Plugin Dev', categoryDiv)

      const pluginsDevOL = document.createElement('ol')
      pluginsDevOL.className = 'playground-options'
      const connectToDev = createButton({
        display: i('play_sidebar_options_plugin_dev_option'),
        blurb: i('play_sidebar_options_plugin_dev_copy'),
        flag: 'connect-dev-plugin',
      })
      pluginsDevOL.appendChild(connectToDev)
      categoryDiv.appendChild(pluginsDevOL)

      categoryDiv.appendChild(document.createElement('hr'))

      createSection(i('play_sidebar_options'), categoryDiv)

      settings.forEach(setting => {
        const settingButton = createButton(setting)
        ol.appendChild(settingButton)
      })

      categoryDiv.appendChild(ol)
    },
  }

  return plugin
}

const announceWeNeedARestart = () => {
  document.getElementById('restart-required')!.style.display = 'block'
}

const createSection = (title: string, container: Element) => {
  const pluginDevTitle = document.createElement('h4')
  pluginDevTitle.textContent = title
  container.appendChild(pluginDevTitle)
}

const createPlugin = (plugin: typeof pluginRegistry[0]) => {
  const li = document.createElement('li')
  const div = document.createElement('div')

  const label = document.createElement('label')

  const top = `<span>${plugin.display}</span> by <a href='${plugin.author.href}'>${plugin.author.name}</a><br/>${plugin.blurb}`
  const bottom = `<a href='https://www.npmjs.com/package${plugin.module}'>npm</a> | <a href="${plugin.repo}">repo</a>`
  label.innerHTML = `${top}<br/>${bottom}`

  const key = 'plugin-' + plugin.module
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.id = key
  input.checked = !!localStorage.getItem(key)

  input.onchange = () => {
    announceWeNeedARestart()
    if (input.checked) {
      // @ts-ignore
      window.appInsights &&
        // @ts-ignore
        window.appInsights.trackEvent({ name: 'Added Registry Plugin', properties: { id: key } })
      localStorage.setItem(key, 'true')
    } else {
      localStorage.removeItem(key)
    }
  }

  label.htmlFor = input.id

  div.appendChild(input)
  div.appendChild(label)
  li.appendChild(div)
  return li
}

const createButton = (setting: { blurb: string; flag: string; display: string }) => {
  const li = document.createElement('li')
  const label = document.createElement('label')
  label.innerHTML = `<span>${setting.display}</span><br/>${setting.blurb}`

  const key = 'compiler-setting-' + setting.flag
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.id = key
  input.checked = !!localStorage.getItem(key)

  input.onchange = () => {
    if (input.checked) {
      localStorage.setItem(key, 'true')
    } else {
      localStorage.removeItem(key)
    }
  }

  label.htmlFor = input.id

  li.appendChild(input)
  li.appendChild(label)
  return li
}

const createNewModuleInputForm = (updateOL: Function, i: any) => {
  const form = document.createElement('form')

  const newModuleInput = document.createElement('input')
  newModuleInput.type = 'text'
  newModuleInput.id = 'gist-input'
  newModuleInput.placeholder = i('play_sidebar_options_modules_placeholder')
  form.appendChild(newModuleInput)

  form.onsubmit = e => {
    announceWeNeedARestart()
    addCustomPlugin(newModuleInput.value)
    e.stopPropagation()
    updateOL()
    return false
  }

  return form
}
