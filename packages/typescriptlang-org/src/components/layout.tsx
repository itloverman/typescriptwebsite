import React from "react"
import { Link } from "gatsby"


declare const __PATH_PREFIX__: string

export class Layout extends React.Component<any> {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

    return (
      <div
        style={{
          backgroundColor: "#E5E5E5",
          marginLeft: `auto`,
          marginRight: `auto`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <a href="/deprecated">Old stuff</a>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div >
    )
  }
}
