import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import Delegate from "../hooks/delegate"

export default function Index() {
    return (
        <div>
            <Navbar />
            <Delegate />
            <Footer />
        </div>
    )
}