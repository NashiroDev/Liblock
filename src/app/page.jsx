"use client"
import Themes from "./hooks/seekTags"
import { GetFewArticles, GetFewProposals } from "./hooks/peekData"

export default function Home() {
  return (
    <div>
      <section>
        <div className="container mt-4">
          <h1 className="title justify-content">Welcome to Liblock, the first information-sharing platform built with
            core web3 values</h1>
          <h3 className="mt-4">Begin your blockchain and web3 journey with us!</h3>
          <p><a className="link-info mt-2" href="/articles">Start exploring</a></p>
        </div>
      </section>
      <GetFewArticles />
      <GetFewProposals />
      <Themes />
    </div>
  )
}