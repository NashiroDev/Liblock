import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import Delegate from "../hooks/delegate"

export default function Index() {
    return (
        <div>
            <Navbar />
            <TopText />
            <Delegate />
            <Footer />
        </div>
    )
}

function TopText() {
    return (
        <section>
            <div className="page-head">
                <img src="./assets/article-banner.png" className="img-fluid" alt="missing"/>
                <h2>Delegate</h2>
            </div>
            <div className="container">
                <div className="page-body row row-cols-4 mt-4 mb-6">
                    <p>Here, you can delegate your voting power which you acquired by having $LIB tokens on your wallet to another wallet.</p>
                </div>
            </div>
        </section>
    )
}