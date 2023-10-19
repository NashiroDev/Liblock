import Delegate from "../hooks/delegate"
import Stake from "../hooks/stake"

export default function Index() {
    return (
        <div>
            <DelegateText />
            <Delegate />
            <StakeText />
            <Stake />
        </div>
    )
}

function DelegateText() {
    return (
        <section>
            <div className="page-head">
                <img src="./assets/article-banner.png" className="img-fluid" alt="missing"/>
                <h2>Ecosystem gateway</h2>
            </div>
            <div className="container">
                <div className="mt-4 mb-6">
                    <p>Here, you can delegate your voting power which you acquired by having $LIB tokens on your wallet to another wallet 
                        or yourself.<br/>By doing so, you'll be able to participate in Liblock governance by voting if an article should be adopted or not.
                    </p>
                </div>
            </div>
        </section>
    )
}

function StakeText() {
    return (
        <section>
            <div className="container">
                <div className="mt-4 mb-6">
                    <p>Here, you can stake your $LIB tokens.<br/>By doing so, you'll be able to participate in Liblock governance by submitting an article or 
                        simply voting if an article should be adopted or not.<br/>This action will lock your tokens for the period chosen, and will mint $rLIB tokens directly to your wallet.<br/>
                        Note that the $LIB and $rLIB tokens are automatically delegated to you when you stake.
                    </p>
                </div>
            </div>
        </section>
    )
}