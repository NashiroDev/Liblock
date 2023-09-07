import Navbar from "../partials/navbar"
import Footer from "../partials/footer"
import Themes from "../partials/themes"
import { Articles, Proposals } from "../partials/preview/articles"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
}

function Body() {
  return (
    <div>
      <BodyTop />
      <Articles />
      <Proposals />
      <Themes />
    </div>
  )
}

function BodyTop() {
  return (
    <section>
      <div className="container mt-4">
        <h1 className="title justify-content">Welcome to Liblock, the first information-sharing platform built with
          core web3 values</h1>
        <h3 className="mt-4">Begin your blockchain and web3 journey with us!</h3>
        <p><a className="link-info mt-2" href="/articles">Start exploring</a></p>
      </div>
    </section>
  )
}