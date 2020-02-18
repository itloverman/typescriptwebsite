import React from "react"
import { Layout } from "../../components/layout"
import { Intl } from "../../components/Intl"
import { graphql } from "gatsby"

import releaseInfo from "../../lib/release-info.json"
import { createIntlLink } from "../../components/IntlLink"


const changeExample = (code: string) => document.getElementById("code-example")!.textContent = code
const changeExample2 = (code: string) => document.getElementById("code-run")!.textContent = code

const Index = (props: any) => {
  const Link = createIntlLink(props.pageContext.lang, props.data.allSitePage)

  return <Layout title="How to set up TypeScript" description="" lang={props.pageContext.lang} allSitePage={props.data.allSitePage}>
    <div className="raised main-content-block">
      <h1>Download TypeScript</h1>
      <p>TypeScript is available in two main ways depending on how you intend to use it: built as an npm module, and a nuget package.</p>
      <p>If you are using MSBuild in your project, you want the nuget package, otherwise you will want the npm version.</p>
    </div>

    <div className="raised main-content-block">
      <h2>TypeScript in Your Project</h2>
      <p>Having TypeScript set up in a per-project basis lets you have many projects with many different versions of TypeScript, this keeps each project working consistently.</p>
      <section style={{ display: "flex" }}>
        <div style={{ borderRight: "1px grey solid", padding: "1rem", flex: 1 }}>
          <h3>via NPM</h3>
          <p>TypeScript is available as a <a href="https://www.npmjs.com/package/typescript">package on the npm registry</a> available as <code>"typescript"</code>.</p>
          <p>You will need a copy of <a href="https://nodejs.org/en/">Node.js</a> as an environment to run the package. Then you use a dependency manager like <a href='https://www.npmjs.com/'>npm</a>, <a href='https://yarnpkg.com/'>yarn</a> or <a href='https://pnpm.js.org/'>pnpm</a> to download TypeScript into your project.</p>
          <div>
            <code id='code-example'>npm install typescript --save-dev</code><br /><br />
            <button onClick={() => changeExample("npm install typescript --save-dev")}>npm</button> <button onClick={() => changeExample("yarn add typescript --dev")}>yarn</button> <button onClick={() => changeExample("pnpm add typescript -D")}>pnpm</button>
          </div>
          <p>All of these dependency managers support lockfiles, ensuring that everyone on your team is using the same version of the language. You can then run the TypeScript compiler using one of to the following commands:</p>
          <div>
            <code id='code-run'>npx tsc</code><br /><br />
            <button onClick={() => changeExample2("npx tsc")}>npm</button> <button onClick={() => changeExample2("yarn tsc")}>yarn</button> <button onClick={() => changeExample2("pnpx tsc")}>pnpm</button>
          </div>
        </div>

        <div style={{ padding: "1rem", flex: 1 }}>
          <h2>via Nuget</h2>
          <p>You can get TypeScript as a package in Nuget for your MSBuild projects, for example an ASP.NET Core app.</p>
          <p>You can <a href="https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-aspnet-with-typescript">install</a> TypeScript through Visual Studio using:</p>
          <ul>
            <li>
              The Manage NuGet Packages window (which you can get to by right-clicking on a project node)
            </li>
            <li style={{ marginTop: "20px" }}>
              The Nuget Package Manager Console (found in Tools > NuGet Package Manager > Package Manager Console) using <code>Install-Package Microsoft.TypeScript.MSBuild</code>
            </li>
          </ul>
        </div>
      </section>
    </div >

    <div className="main-content-block" style={{ textAlign: "center" }}>
      <p>The examples below are for more advanced use cases.</p>
    </div>

    <div className="raised main-content-block">
      <h2>Globally Installing TypeScript</h2>
      <p>It can be handy to have TypeScript available across all project, for example to test one-off ideas.</p>

      <section style={{ display: "flex" }}>
        <div style={{ borderRight: "1px grey solid", padding: "1rem", flex: 1 }}>
          <h3>via NPM</h3>
          <p>You can use npm to install TypeScript globally, this means you can use the <code>tsc</code> command anywhere in your terminal.</p>
          <p>To do this, run <code>npm install -g typescript</code>. This will install the latest version (currently {releaseInfo.tags.stableMajMin}).</p>
          <p>An alternative is to use <a href="https://www.npmjs.com/package/npx">npx</a> when you have to run <code>tsc</code> for one-off occasions.</p>
        </div>

        <div style={{ padding: "1rem", flex: 1 }}>
          <h3>via Visual Studio Marketplace</h3>
          <p>You can install TypeScript as a Visual Studio extension which will allow you to use TypeScript across many MSBuild projects.</p>
          <p>The latest version is available <a href={releaseInfo.vs.stable.vs2019_download}>here</a></p>
        </div>
      </section>
    </div >


    <div className="raised main-content-block">
      <h2>Working with TypeScript-compatible transpilers</h2>
      <p>You may want to use a different tool to convert TypeScript files to JavaScript, this could be for speed or consistency existing build tooling.</p>
      <p>Each of these projects handle the file conversion, but do not handle the type-checking aspects of the TypeScript compiler. So, it's likely you'll still need to keep the TypeScript dependency from above around, and you'll want to enable <Link to="/tsconfig#isolatedModules"><code>isolatedModules</code></Link>.</p>

      <section style={{ display: "flex" }}>
        <div style={{ borderRight: "1px grey solid", padding: "1rem", flex: 1 }}>
          <h3>Babel</h3>
          <p><a href='https://babeljs.io/'>Babel</a> is a very popular JavaScript transpiler which supports TypeScript files via the plugin <a href='https://babeljs.io/docs/en/babel-preset-typescript#docsNav'>@babel/plugin-transform-typescript</a></p>
        </div>

        <div style={{ borderRight: "1px grey solid", padding: "1rem", flex: 1 }}>
          <h3>swc</h3>
          <p><a href='https://swc-project.github.io/docs/installation/'>swc</a> is a fast, rust-based transpiler which supports many of Babel's features which supports TypeScript natively.</p>
        </div>

        <div style={{ borderRight: "1px grey solid", padding: "1rem", flex: 1 }}>
          <h3>Sucrase</h3>
          <p><a href='https://github.com/alangpierce/sucrase#sucrase/'>Sucrase</a> is a babel fork focused on speed for using in development mode. Sucrose supports TypeScript natively.</p>
        </div>
      </section>
    </div >

  </Layout >
}

export default (props: any) => <Intl><Index {...props} /></Intl>


export const query = graphql`
  query {
      ...AllSitePage
    }
    `
