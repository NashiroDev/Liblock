import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"

export default function Index() {
    return (
        <div>
            <Navbar />
            <DisplayArticles />
            <Footer />
        </div>
    )
}

function DisplayArticles() {
    return (
        <section>
            <div class="page-head">
                <img src="./assets/article-banner.png" class="img-fluid" alt="missing"/>
                <h2>Articles</h2>
            </div>
            <div class="container">
                <div class="page-body row row-cols-4 mt-4 mb-6">
                    <div class="col-md-3 ms-4 mb-4 temp-class">
                        <p>Form filter, search & tag search is here</p>
                    </div>
                    <div class="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Title test</h5>
                            <p class="card-text">This is a test content</p>
                            <a href="#" class="btn btn-primary">Read</a>
                        </div>
                    </div>
                    <div class="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Title test</h5>
                            <p class="card-text">This is a test content</p>
                            <a href="#" class="btn btn-primary">Read</a>
                        </div>
                    </div>
                    <div class="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Title test</h5>
                            <p class="card-text">This is a test content</p>
                            <a href="#" class="btn btn-primary">Read</a>
                        </div>
                    </div>
                    <div class="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Title test</h5>
                            <p class="card-text">This is a test content</p>
                            <a href="#" class="btn btn-primary">Read</a>
                        </div>
                    </div>
                    <div class="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Title test</h5>
                            <p class="card-text">This is a test content</p>
                            <a href="#" class="btn btn-primary">Read</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}