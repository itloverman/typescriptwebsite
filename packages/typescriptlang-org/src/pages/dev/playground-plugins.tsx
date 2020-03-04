import React from "react"
import { Layout } from "../../components/layout"
import { withPrefix, graphql } from "gatsby"

import "./dev.scss"
import { Intl } from "../../components/Intl"
import { DevNav } from "../../components/dev-nav"
import { PlaygroundPluginQuery } from "../../__generated__/gatsby-types"

type Props = {
  data: PlaygroundPluginQuery
}

const Index: React.FC<Props> = (props) => {
  return (
    <>
      <Layout title="Developers - Playground Plugins" description="What is a TypeScript Playground Plugin, and how can you make one?" lang="en" allSitePage={props.data.allSitePage}>
        <div id="dev">
          <DevNav active="playground plugins" />
          <div className="raised content main-content-block">
            <div className="split-sixhundred">
              <h1 style={{ marginTop: "20px" }}>Your toys, our sandbox</h1>
              <p>The new TypeScript Playground allows people to hook into the Playground and extend it in ways in which the TypeScript team don't expect.</p>
              <p>The sidebar of the Playground uses the same plugin infrastructure as external plugins, so you have the same level of access as the playground to build interesting projects.</p>
              <p>Playground plugins use frameworks, you're free to inject them at runtime and use them if you need to - but the current plugins are built with the vanilla DOM APIs and TypeScript.</p>
              <p>&nbsp;</p>
              <p>Getting started it easy, we have a plugin template, and the Playground has a dev-mode for hooking directly to your local server, so you don't need to run a copy of the TypeScript website to have a working development environment.</p>
              <p>There is a complex reference plugin called <a href="https://github.com/orta/playground-slides">Presentation Mode</a> and a much simpler <a href="https://github.com/orta/playground-plugin-tsquery">plugin for TSQuery</a> which are available by default for you to investigate and understand.</p>
              <p>If you have questions as you are working on your plugin, ask in the <a href='https://discord.gg/typescript'>TypeScript Community Discord</a>. When it is polished let us know and we can add it to the default registry - making it visible to everyone easily.</p>
            </div>

            <div className="sixhundred" style={{ borderLeft: "1px solid gray" }}>
              <img src={require("../../assets/playground-plugin-preview.png")} width="100%" />
            </div>
          </div>

          <div className="raised main-content-block">
            <h2>Quick Tutorial</h2>
            <p>You need about 5 minutes, Node.js, yarn and a Chromium based browser.</p>
            <p><b>Step 1</b>: Use the template to bootstrap: <code>yarn create typescript-playground-plugin playground-my-plugin</code></p>
            <p><b>Step 2</b>: Run <code>yarn start</code> in the new repo, to start up the local dev server</p>
            <p><b>Step 3</b>: Open the <a href={withPrefix("/play")}>playground</a> in your Chromium browser, click "Options" and enable <code>"Connect to localhost:5000/index.js"</code></p>
            <p><b>Step 4</b>: Refresh, and see the new tab. That's your plugin up and running</p>
            <p>&nbsp;</p>
            <p>That's all the pieces working in tandem, now you can make changes to the template and build out your plugin. The plugin in dev mode will always become forefront when connected, so you can re-load without a lot off clicks. To understand the template's technology, read the <a href='https://github.com/microsoft/TypeScript-Website/blob/v2/packages/create-playground-plugin/template/CONTRIBUTING.md'>CONTRIBUTING.md</a></p>

            <h2>Alternatives</h2>
            <p>There are community-run templates for Playground plugins which bootstrap your plugin with well-known view libraries:</p>
            <ul>
              <li><a href="https://github.com/gojutin/typescript-playground-plugin-react#typescript-playground-plugin-react">gojutin/typescript-playground-plugin-react</a></li>
              <li><a href="https://github.com/gojutin/typescript-playground-plugin-svelte#typescript-playground-plugin-svelte">gojutin/typescript-playground-plugin-svelte</a></li>
            </ul>
            <p>They have their own up-to-date documentation in their READMEs.</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default (props: Props) => <Intl locale="en"><Index {...props} /></Intl>


export const query = graphql`
  query PlaygroundPlugin {
    ...AllSitePage
  }
`
