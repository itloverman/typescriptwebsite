import React from "react"
import { Layout } from "../components/layout"
import { Intl } from "../components/Intl"
import { Link } from "gatsby"

const Index = (props: any) =>
  <Layout title="Index" description="Desc">

    <div className="raised" style={{ maxWidth: 960, margin: "1rem auto", padding: "2rem" }}>
      <h1>:wave:</h1>
      <ul>
        <li><Link to="/en/tsconfig">TSConfig Reference</Link></li>
        <li><Link to="/en/play">Playground</Link></li>
        <li><Link to="/docs/handbook/generics.html">Old Handbook</Link></li>
        <li><Link to="/dev/sandbox">Sandbox Dev</Link></li>
        <li><Link to="/asdasda">404 Page</Link></li>
      </ul>

      <div />
    </div>

  </Layout>


export default (props: any) => <Intl><Index {...props} /></Intl>

