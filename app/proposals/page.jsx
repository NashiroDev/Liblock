import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"

export default function Index() {
    return (
        <div>
            <Navbar />
            <DisplayProposals />
            <Footer />
        </div>
    )
}

function DisplayProposals() {
    return (
        <section>
            <div class="page-head">
                <img src="./assets/article-banner.png" class="img-fluid" alt="missing"/>
                <h2>Proposals</h2>
            </div>
            <div className="container">
                <div className="row row-cols-2 justify-content-end mt-4 pr-4">
                    <div className="card col proposal-card">
                        <div className="card-header">
                            <p>Proposed by : <strong>0xab5f1</strong><span className="badge bg-success text-light ms-4">On going</span></p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">title</h5>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">BTC</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width:70 }}>70%</div>
                                <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width:5 }}>5%</div>
                                <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width:25 }}>25%</div>
                            </div>
                            <a href="#" className="btn btn-primary mt-2">See more</a>
                        </div>
                    </div>
                    <div className="card col proposal-card">
                        <div className="card-header">
                            <p>Proposed by : <strong>0xab5f1</strong><span className="badge bg-success text-light ms-4">On going</span></p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">title</h5>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">BTC</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width:70 }}>70%</div>
                                <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width:5 }}>5%</div>
                                <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width:25 }}>25%</div>
                            </div>
                            <a href="#" className="btn btn-primary mt-2">See more</a>
                        </div>
                    </div>
                    <div className="card col proposal-card">
                        <div className="card-header">
                            <p>Proposed by : <strong>0xab5f1</strong><span className="badge bg-success text-light ms-4">On going</span></p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">title</h5>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">BTC</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width:70 }}>70%</div>
                                <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width:5 }}>5%</div>
                                <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width:25 }}>25%</div>
                            </div>
                            <a href="#" className="btn btn-primary mt-2">See more</a>
                        </div>
                    </div>
                    <div className="card col proposal-card">
                        <div className="card-header">
                            <p>Proposed by : <strong>0xab5f1</strong><span className="badge bg-success text-light ms-4">On going</span></p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">title</h5>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">BTC</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width:70 }}>70%</div>
                                <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width:5 }}>5%</div>
                                <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width:25 }}>25%</div>
                            </div>
                            <a href="#" className="btn btn-primary mt-2">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}