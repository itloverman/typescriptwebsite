import React from "react"
import { SiteNav, Props } from "./layout/TopNav"
import { SiteFooter } from "./layout/SiteFooter"
import { SeoProps, HeadSEO } from "./HeadSEO";
import "./layout/main.scss"
import { AppInsights } from "./AppInsights";
import { Helmet } from "react-helmet";

type LayoutProps = SeoProps & Props & {
  children: any
}

export const Layout = (props: LayoutProps) => {

  return (
    <>
      <Helmet>
        {/* Should be a NOOP for anything but edge, and much older browsers */}
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es2015" />
      </Helmet>
      <HeadSEO {...props} />
      <div className="ms-Fabric">
        <SiteNav {...props} />
        <main>{props.children}</main>
        <SiteFooter />
      </div>
      <AppInsights />
    </>
  )
}
