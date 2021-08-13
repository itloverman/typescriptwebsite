// Auto-generated by the twoslash-cli from react.tsx.md
import React from "react"

const innerHTML = `
<pre class="shiki min-dark twoslash lsp" style="background-color: #1f1f1f; color: #b392f0"><div class="language-id">tsx</div><div class='code-container'><code><div class='line'><span style="color: #F97583">import</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">*</span><span style="color: #B392F0"> </span><span style="color: #F97583">as</span><span style="color: #B392F0"> <data-lsp lsp='(alias) namespace React&#10;import React' >React</data-lsp> </span><span style="color: #F97583">from</span><span style="color: #B392F0"> </span><span style="color: #FFAB70">"react"</span><span style="color: #B392F0">;</span></div><div class='line'>&nbsp;</div><div class='line'><span style="color: #F97583">interface</span><span style="color: #B392F0"> <data-lsp lsp='interface UserThumbnailProps' >UserThumbnailProps</data-lsp> {</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) UserThumbnailProps.img: string' >img</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">string</span><span style="color: #B392F0">;</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) UserThumbnailProps.alt: string' >alt</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">string</span><span style="color: #B392F0">;</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) UserThumbnailProps.url: string' >url</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">string</span><span style="color: #B392F0">;</span></div><div class='line'><span style="color: #B392F0">}</span></div><div class='line'>&nbsp;</div><div class='line'><span style="color: #F97583">export</span><span style="color: #B392F0"> </span><span style="color: #F97583">const</span><span style="color: #B392F0"> <data-lsp lsp='const UserThumbnail: (props: UserThumbnailProps) => JSX.Element' >UserThumbnail</data-lsp> </span><span style="color: #F97583">=</span><span style="color: #B392F0"> (<data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> <data-lsp lsp='interface UserThumbnailProps' >UserThumbnailProps</data-lsp>) </span><span style="color: #F97583">=&gt;</span></div><div class='line'><span style="color: #B392F0">  &lt;</span><span style="color: #FFAB70"><data-lsp lsp='(property) JSX.IntrinsicElements.a: React.DetailedHTMLProps&lt;React.AnchorHTMLAttributes&lt;HTMLAnchorElement>, HTMLAnchorElement>' >a</data-lsp></span><span style="color: #B392F0"> <data-lsp lsp='(JSX attribute) React.AnchorHTMLAttributes&lt;HTMLAnchorElement>.href?: string | undefined' >href</data-lsp></span><span style="color: #F97583">=</span><span style="color: #B392F0">{</span><span style="color: #79B8FF"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #B392F0">.<data-lsp lsp='(property) UserThumbnailProps.url: string' >url</data-lsp>}></span></div><div class='line'><span style="color: #B392F0">    &lt;</span><span style="color: #FFAB70"><data-lsp lsp='(property) JSX.IntrinsicElements.img: React.DetailedHTMLProps&lt;React.ImgHTMLAttributes&lt;HTMLImageElement>, HTMLImageElement>' >img</data-lsp></span><span style="color: #B392F0"> <data-lsp lsp='(JSX attribute) React.ImgHTMLAttributes&lt;HTMLImageElement>.src?: string | undefined' >src</data-lsp></span><span style="color: #F97583">=</span><span style="color: #B392F0">{</span><span style="color: #79B8FF"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #B392F0">.<data-lsp lsp='(property) UserThumbnailProps.img: string' >img</data-lsp>} <data-lsp lsp='(JSX attribute) React.ImgHTMLAttributes&lt;HTMLImageElement>.alt?: string | undefined' >alt</data-lsp></span><span style="color: #F97583">=</span><span style="color: #B392F0">{</span><span style="color: #79B8FF"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #B392F0">.<data-lsp lsp='(property) UserThumbnailProps.alt: string' >alt</data-lsp>} /></span></div><div class='line'><span style="color: #B392F0">  &lt;/</span><span style="color: #FFAB70"><data-lsp lsp='(property) JSX.IntrinsicElements.a: React.DetailedHTMLProps&lt;React.AnchorHTMLAttributes&lt;HTMLAnchorElement>, HTMLAnchorElement>' >a</data-lsp></span><span style="color: #B392F0">&gt;</span></div><div class='line'>&nbsp;</div></code></div></pre>
<pre class="shiki homepage twoslash lsp" style="background-color: #235A97; color: #eeeeee"><div class="language-id">tsx</div><div class='code-container'><code><div class='line'><span style="color: #F2F1EF">import</span><span style="color: #EEEEEE"> </span><span style="color: #F2F1EF">*</span><span style="color: #EEEEEE"> </span><span style="color: #F2F1EF">as</span><span style="color: #EEEEEE"> </span><span style="color: #C4FF85"><data-lsp lsp='(alias) namespace React&#10;import React' >React</data-lsp></span><span style="color: #EEEEEE"> </span><span style="color: #F2F1EF">from</span><span style="color: #EEEEEE"> </span><span style="color: #F7CBA4">"react"</span><span style="color: #EEEEEE">;</span></div><div class='line'>&nbsp;</div><div class='line'><span style="color: #E3EBF3">interface</span><span style="color: #EEEEEE"> </span><span style="color: #FFFACD"><data-lsp lsp='interface UserThumbnailProps' >UserThumbnailProps</data-lsp></span><span style="color: #EEEEEE"> {</span></div><div class='line'><span style="color: #EEEEEE">  </span><span style="color: #FFFACD"><data-lsp lsp='(property) UserThumbnailProps.img: string' >img</data-lsp></span><span style="color: #F2F1EF">:</span><span style="color: #EEEEEE"> </span><span style="color: #FFFACD">string</span><span style="color: #EEEEEE">;</span></div><div class='line'><span style="color: #EEEEEE">  </span><span style="color: #FFFACD"><data-lsp lsp='(property) UserThumbnailProps.alt: string' >alt</data-lsp></span><span style="color: #F2F1EF">:</span><span style="color: #EEEEEE"> </span><span style="color: #FFFACD">string</span><span style="color: #EEEEEE">;</span></div><div class='line'><span style="color: #EEEEEE">  </span><span style="color: #FFFACD"><data-lsp lsp='(property) UserThumbnailProps.url: string' >url</data-lsp></span><span style="color: #F2F1EF">:</span><span style="color: #EEEEEE"> </span><span style="color: #FFFACD">string</span><span style="color: #EEEEEE">;</span></div><div class='line'><span style="color: #EEEEEE">}</span></div><div class='line'>&nbsp;</div><div class='line'><span style="color: #F2F1EF">export</span><span style="color: #EEEEEE"> </span><span style="color: #E3EBF3">const</span><span style="color: #EEEEEE"> </span><span style="color: #C4FF85"><data-lsp lsp='const UserThumbnail: (props: UserThumbnailProps) => JSX.Element' >UserThumbnail</data-lsp></span><span style="color: #EEEEEE"> </span><span style="color: #F2F1EF">=</span><span style="color: #EEEEEE"> (</span><span style="color: #C4FF85"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #F2F1EF">:</span><span style="color: #EEEEEE"> </span><span style="color: #FFFACD"><data-lsp lsp='interface UserThumbnailProps' >UserThumbnailProps</data-lsp></span><span style="color: #EEEEEE">) </span><span style="color: #E3EBF3">=&gt;</span></div><div class='line'><span style="color: #EEEEEE">  &lt;<data-lsp lsp='(property) JSX.IntrinsicElements.a: React.DetailedHTMLProps&lt;React.AnchorHTMLAttributes&lt;HTMLAnchorElement>, HTMLAnchorElement>' >a</data-lsp> <data-lsp lsp='(JSX attribute) React.AnchorHTMLAttributes&lt;HTMLAnchorElement>.href?: string | undefined' >href</data-lsp></span><span style="color: #F2F1EF">=</span><span style="color: #EEEEEE">{</span><span style="color: #C4FF85"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #EEEEEE">.</span><span style="color: #C4FF85"><data-lsp lsp='(property) UserThumbnailProps.url: string' >url</data-lsp></span><span style="color: #EEEEEE">}&gt;</span></div><div class='line'><span style="color: #EEEEEE">    &lt;<data-lsp lsp='(property) JSX.IntrinsicElements.img: React.DetailedHTMLProps&lt;React.ImgHTMLAttributes&lt;HTMLImageElement>, HTMLImageElement>' >img</data-lsp> <data-lsp lsp='(JSX attribute) React.ImgHTMLAttributes&lt;HTMLImageElement>.src?: string | undefined' >src</data-lsp></span><span style="color: #F2F1EF">=</span><span style="color: #EEEEEE">{</span><span style="color: #C4FF85"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #EEEEEE">.</span><span style="color: #C4FF85"><data-lsp lsp='(property) UserThumbnailProps.img: string' >img</data-lsp></span><span style="color: #EEEEEE">} <data-lsp lsp='(JSX attribute) React.ImgHTMLAttributes&lt;HTMLImageElement>.alt?: string | undefined' >alt</data-lsp></span><span style="color: #F2F1EF">=</span><span style="color: #EEEEEE">{</span><span style="color: #C4FF85"><data-lsp lsp='(parameter) props: UserThumbnailProps' >props</data-lsp></span><span style="color: #EEEEEE">.</span><span style="color: #C4FF85"><data-lsp lsp='(property) UserThumbnailProps.alt: string' >alt</data-lsp></span><span style="color: #EEEEEE">} /&gt;</span></div><div class='line'><span style="color: #EEEEEE">  &lt;/<data-lsp lsp='(property) JSX.IntrinsicElements.a: React.DetailedHTMLProps&lt;React.AnchorHTMLAttributes&lt;HTMLAnchorElement>, HTMLAnchorElement>' >a</data-lsp>></span></div><div class='line'>&nbsp;</div></code></div></pre>
`

export const Code = () => <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
