import CreateProposal from "../../hooks/create"

export default function Index() {
    return (
        <div>
            <TopText />
            <CreateProposal />
        </div>
    )
}

function TopText() {
    return (
        <section>
            <div className="page-head">
                <img src="../assets/article-banner.png" className="img-fluid" alt="missing"/>
                <h2>Create article</h2>
            </div>
            <div className="container">
                <div className="mt-4 mb-6">
                    <p>Here, you can create an article that will be published on the blockchain as a proposal<br/>If the proposal received enough positive votes before the voting proccess end, it'll be
                    accepted as an article and displayed on Liblock as such.<br/>Therefor, if the proposal do not receive enough positive votes or there is a majority of negative votes, it'll be discarted.
                    </p>
                </div>
            </div>
        </section>
    )
}