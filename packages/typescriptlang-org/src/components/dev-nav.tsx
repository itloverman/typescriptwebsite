import React from "react"
import { withPrefix } from "gatsby"

interface DevNavProps {
  active?: string
}

export const DevNav = (props: DevNavProps) => {
  const isActive = (str) =>
    props.active && props.active.toLowerCase() === str ? "active" : ""

  return <nav className="navbar-sub">
    <ul className="nav">
      <li className="name"><span>Developer Tools</span></li>
      <li style={{ display: "none" }}>
        <a className={isActive("compiler api")} href={withPrefix("/dev/compiler")}>Compiler API</a>
      </li>
      <li>
        <a className={isActive("sandbox")} href={withPrefix("/dev/sandbox")}>Sandbox</a>
      </li>
      <li>
        <a className={isActive("twoslash")} href={withPrefix("/dev/twoslash")}>Twoslash</a>
      </li>
      <li>
        <a className={isActive("typescript vfs")} href={withPrefix("/dev/typescript-vfs")}>TypeScript VFS</a>
      </li>
      <li>
        <a className={isActive("playground plugins")} href={withPrefix("/dev/playground-plugins")}>Playground Plugins</a>
      </li>
    </ul>
  </nav >
}
