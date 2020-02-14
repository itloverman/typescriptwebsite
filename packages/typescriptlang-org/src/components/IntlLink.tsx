import React from "react"
import { GatsbyLinkProps, Link, graphql } from "gatsby"

export type AllSitePage = {
  nodes: {
    path: string
  }[]
}


/** 
 * Creates a <Link> which supports gradual migration, you provide a link to the english page and
 * if the page supports the same version but in your language, it opts for that.
 */
export const createIntlLink = (currentLocale: string, allSitePage: AllSitePage) => {
  const paths = allSitePage.nodes.map(n => n.path)

  return (linkProps: GatsbyLinkProps<{}>) => {
    let to = linkProps.to
    const localeVersion = to.replace("/en/", "/" + currentLocale + "/")

    if (paths.includes(localeVersion)) {
      to = localeVersion
    }

    // @ts-ignore
    return <Link {...linkProps} to={to} />
  }
}

// This fragment becomes globally available
export const query = graphql`
fragment AllSitePage on Query {
  allSitePage {
    nodes {
      path
    }
  }
}
`

