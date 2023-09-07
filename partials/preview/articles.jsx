export function Articles() {
    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Last articles :</h4>
                    <a className="link-info ms-2" href="/articles">View all</a>
                </div>
                <div className="d-flex mt-4">
                    <ul className="pagination justify-content-center align-items-center">
                        <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                        <div className="col-3 ms-4 card">
                            <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Title test</h5>
                                <p className="card-text">This is an article preview</p>
                                <div className="badge-section mt-2">
                                    <span className="badge bg-warning text-light ms-2">Dapps</span>
                                    <span className="badge bg-warning text-light ms-2">L2</span>
                                </div>
                                <a href="#" className="btn btn-primary mt-2">Read</a>
                            </div>
                        </div>
                        <div className="col-3 ms-4 card">
                            <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Title test</h5>
                                <p className="card-text">This is an article preview</p>
                                <div className="badge-section mt-2">
                                    <span className="badge bg-warning text-light ms-2">Dapps</span>
                                    <span className="badge bg-warning text-light ms-2">L2</span>
                                </div>
                                <a href="#" className="btn btn-primary mt-2">Read</a>
                            </div>
                        </div>
                        <div className="col-3 ms-4 card">
                            <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Title test</h5>
                                <p className="card-text">This is an article preview</p>
                                <div className="badge-section mt-2">
                                    <span className="badge bg-warning text-light ms-2">Dapps</span>
                                    <span className="badge bg-warning text-light ms-2">L2</span>
                                </div>
                                <a href="#" className="btn btn-primary mt-2">Read</a>
                            </div>
                        </div>
                        <li className="page-item ms-4"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export function Proposals() {
    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Deliberating articles :</h4>
                    <a className="link-info ms-2" href="/proposals">View all</a>
                </div>
                <div className="justify-content-center row mt-4">
                    <div className="card ms-4 col-md-3 mt-2">
                        <div className="card-body">
                            <h5 className="card-title">Title test</h5>
                            <p className="card-text">Proposer : temp</p>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">Dapp</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success" style={{ width: 50 }}></div>
                                <div className="progress-bar-striped bg-warning" style={{ width: 45 }}></div>
                                <div className="progress-bar-striped bg-danger" style={{ width: 98 }}></div>
                            </div>
                            <a href="#" className="card-link">Visit</a>
                        </div>
                    </div>
                </div>
                <div className="justify-content-center row mt-4">
                    <div className="card ms-4 col-md-3 mt-2">
                        <div className="card-body">
                            <h5 className="card-title">Title test</h5>
                            <p className="card-text">Proposer : temp</p>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">Dapp</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success" style={{ width: 50 }}></div>
                                <div className="progress-bar-striped bg-warning" style={{ width: 45 }}></div>
                                <div className="progress-bar-striped bg-danger" style={{ width: 98 }}></div>
                            </div>
                            <a href="#" className="card-link">Visit</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}