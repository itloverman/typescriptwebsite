// Auto-generated by the twoslash-cli from interface.ts.md
import React from "react"

const innerHTML = `
<pre class="shiki min-dark twoslash lsp" style="background-color: #1f1f1f; color: #b392f0"><div class="language-id">ts</div><div class='code-container'><code><div class='line'><span style="color: #F97583">interface</span><span style="color: #B392F0"> <data-lsp lsp='interface User' >User</data-lsp> {</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) User.id: number' >id</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">number</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) User.firstName: string' >firstName</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">string</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) User.lastName: string' >lastName</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">string</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='(property) User.role: string' >role</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">string</span></div><div class='line'><span style="color: #B392F0">}</span></div><div class='line'>&nbsp;</div><div class='line'><span style="color: #F97583">function</span><span style="color: #B392F0"> <data-lsp lsp='function updateUser(id: number, update: Partial&lt;User>): void' >updateUser</data-lsp>(<data-lsp lsp='(parameter) id: number' >id</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> </span><span style="color: #79B8FF">number</span><span style="color: #B392F0">, <data-lsp lsp='(parameter) update: Partial&lt;User>' >update</data-lsp></span><span style="color: #F97583">:</span><span style="color: #B392F0"> <data-lsp lsp='type Partial&lt;T> = { [P in keyof T]?: T[P] | undefined; }' >Partial</data-lsp>&lt;<data-lsp lsp='interface User' >User</data-lsp>>) {</span></div><div class='line'><span style="color: #B392F0">  </span><span style="color: #F97583">const</span><span style="color: #B392F0"> </span><span style="color: #79B8FF"><data-lsp lsp='const user: User' >user</data-lsp></span><span style="color: #B392F0"> </span><span style="color: #F97583">=</span><span style="color: #B392F0"> <data-lsp lsp='function getUser(id: number): User' >getUser</data-lsp>(<data-lsp lsp='(parameter) id: number' >id</data-lsp>)</span></div><div class='line'><span style="color: #B392F0">  </span><span style="color: #F97583">const</span><span style="color: #B392F0"> </span><span style="color: #79B8FF"><data-lsp lsp='const newUser: {&#10;    id: number;&#10;    firstName: string;&#10;    lastName: string;&#10;    role: string;&#10;}' >newUser</data-lsp></span><span style="color: #B392F0"> </span><span style="color: #F97583">=</span><span style="color: #B392F0"> { </span><span style="color: #F97583">...</span><span style="color: #B392F0"><data-lsp lsp='const user: User' >user</data-lsp>, </span><span style="color: #F97583">...</span><span style="color: #B392F0"><data-lsp lsp='(parameter) update: Partial&lt;User>' >update</data-lsp> }</span></div><div class='line'><span style="color: #B392F0">  <data-lsp lsp='function saveUser(id: number, user: User): User' >saveUser</data-lsp>(<data-lsp lsp='(parameter) id: number' >id</data-lsp>, <data-lsp lsp='const newUser: {&#10;    id: number;&#10;    firstName: string;&#10;    lastName: string;&#10;    role: string;&#10;}' >newUser</data-lsp>)</span></div><div class='line'><span style="color: #B392F0">}</span></div><div class='line'>&nbsp;</div></code></div></pre>
<pre class="shiki typescript-beta-dark twoslash lsp" style="background-color: #00273f; color: #D4D4D4"><div class="language-id">ts</div><div class='code-container'><code><div class='line'><span style="color: #569CD6">interface</span><span style="color: #D4D4D4"> <data-lsp lsp='interface User' >User</data-lsp> {</span></div><div class='line'><span style="color: #D4D4D4">  <data-lsp lsp='(property) User.id: number' >id</data-lsp>: number</span></div><div class='line'><span style="color: #D4D4D4">  <data-lsp lsp='(property) User.firstName: string' >firstName</data-lsp>: string</span></div><div class='line'><span style="color: #D4D4D4">  <data-lsp lsp='(property) User.lastName: string' >lastName</data-lsp>: string</span></div><div class='line'><span style="color: #D4D4D4">  <data-lsp lsp='(property) User.role: string' >role</data-lsp>: string</span></div><div class='line'><span style="color: #D4D4D4">}</span></div><div class='line'>&nbsp;</div><div class='line'><span style="color: #569CD6">function</span><span style="color: #D4D4D4"> <data-lsp lsp='function updateUser(id: number, update: Partial&lt;User>): void' >updateUser</data-lsp>(<data-lsp lsp='(parameter) id: number' >id</data-lsp>: number, <data-lsp lsp='(parameter) update: Partial&lt;User>' >update</data-lsp>: </span><span style="color: #FFEE11"><data-lsp lsp='type Partial&lt;T> = { [P in keyof T]?: T[P] | undefined; }' >Partial</data-lsp></span><span style="color: #D4D4D4">&lt;</span><span style="color: #FFEE11"><data-lsp lsp='interface User' >User</data-lsp></span><span style="color: #D4D4D4">&gt;) {</span></div><div class='line'><span style="color: #D4D4D4">  </span><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> <data-lsp lsp='const user: User' >user</data-lsp> = <data-lsp lsp='function getUser(id: number): User' >getUser</data-lsp>(<data-lsp lsp='(parameter) id: number' >id</data-lsp>)</span></div><div class='line'><span style="color: #D4D4D4">  </span><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> <data-lsp lsp='const newUser: {&#10;    id: number;&#10;    firstName: string;&#10;    lastName: string;&#10;    role: string;&#10;}' >newUser</data-lsp> = { ...<data-lsp lsp='const user: User' >user</data-lsp>, ...<data-lsp lsp='(parameter) update: Partial&lt;User>' >update</data-lsp> }</span></div><div class='line'><span style="color: #D4D4D4">  <data-lsp lsp='function saveUser(id: number, user: User): User' >saveUser</data-lsp>(<data-lsp lsp='(parameter) id: number' >id</data-lsp>, <data-lsp lsp='const newUser: {&#10;    id: number;&#10;    firstName: string;&#10;    lastName: string;&#10;    role: string;&#10;}' >newUser</data-lsp>)</span></div><div class='line'><span style="color: #D4D4D4">}</span></div><div class='line'>&nbsp;</div></code></div></pre>
`

export const Code = () => <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
