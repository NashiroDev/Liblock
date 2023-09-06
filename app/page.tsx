import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Home() {
  return (<nav className="navbar">
    <div className="container">
      <img className="nav-img" src="./assets/logo-no-background.svg" />
      <ConnectButton />
    </div>
    </nav>
  )
}
