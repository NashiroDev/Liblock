import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import GetProposals from "../hooks/seekProposals"

export default function Index() {
    return (
        <section>
            <div className="page-head">
                <img src="./assets/article-banner.png" className="img-fluid" alt="missing" />
                <h2>Proposals</h2>
            </div>
            <GetProposals />
        </section>
    )
}