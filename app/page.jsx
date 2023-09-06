"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container">
        <a className="navbar-brand text-info" href="/"><img className="nav-img" src="/assets/logo-no-background.svg" alt="Liblock" /></a>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-light" href="/articles">Articles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/proposals">Proposals</a>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle text-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleLinkClick}>
                Links
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Twitter</a>
                <a className="dropdown-item" href="#">Discord</a>
                <a className="dropdown-item" href="#">Contracts</a>
              </div>
            </li>
          </ul>
        </div>
        <form className="form-inline">
          <ul className="navbar-nav">
            <li className="nav-item">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </li>
            <li className="nav-item ms-2">
              <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
            </li>
          </ul>
        </form>
        <ul className="navbar-nav ml-4">
          <li><ConnectButton /></li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-secondary">
      <div className="text-center text-white p-3 text-light">
        © 2023 Copyright :
        <a className="text-white" href="https://github.com/NashiroDev"> Nathan Pauchon</a>
      </div>
    </footer>
  )
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

function Articles() {
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

function Proposals() {
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

function Themes() {
  return (
    <section>
      <div className="container">
        <div className="d-flex align-items-center">
          <h4>Discover per theme :</h4>
        </div>
        <div className="theme-section">
          <h5>Blockchain :</h5>
          <div className="d-flex flex-wrap">
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Ethereum <span className="badge bg-dark text-light">16</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-warning text-light">Bitcoin <span className="badge bg-dark text-light">31</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">ZkSync <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Base <span className="badge bg-dark text-light">6</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Aurora <span className="badge bg-dark text-light">5</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Gnosis <span className="badge bg-dark text-light">3</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Avalanche <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Polygon <span className="badge bg-dark text-light">17</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-dark text-light">Axelar <span className="badge bg-dark text-light">9</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Optimism <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Arbitrum <span className="badge bg-dark text-light">21</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-warning text-light">Binance smart chain <span className="badge bg-dark text-light">10</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Phantom <span className="badge bg-dark text-light">7</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Kadena <span className="badge bg-dark text-light">7</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Flux <span className="badge bg-dark text-light">8</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Scroll <span className="badge bg-dark text-light">4</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Zetachain <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Polkadot <span className="badge bg-dark text-light">24</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Cosmos <span className="badge bg-dark text-light">17</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Solana <span className="badge bg-dark text-light">63</span></span></div>
          </div>
          <h5>Technology :</h5>
          <div className="d-flex flex-wrap">
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Proof of useful work <span className="badge bg-dark text-light">5</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-warning text-light">Proof of work <span className="badge bg-dark text-light">31</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Cross-chain messaging <span className="badge bg-dark text-light">21</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Delegated proof of stake <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Proof of history <span className="badge bg-dark text-light">6</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">MEV <span className="badge bg-dark text-light">3</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Proof of stake <span className="badge bg-dark text-light">16</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Graph <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-dark text-light">Tendermint <span className="badge bg-dark text-light">9</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">SHA256 <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">ZkProofs <span className="badge bg-dark text-light">17</span></span></div>
          </div>
          <h5>Dapps / DAO :</h5>
          <div className="d-flex flex-wrap">
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Uniswap <span className="badge bg-dark text-light">5</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-warning text-light">Stargate Finance <span className="badge bg-dark text-light">31</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Galxe <span className="badge bg-dark text-light">21</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">BitDAO <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-dark text-light">Balancer <span className="badge bg-dark text-light">9</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Optimism <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">ENS <span className="badge bg-dark text-light">21</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Pocket Network <span className="badge bg-dark text-light">21</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-warning text-light">Sushi <span className="badge bg-dark text-light">10</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">MakerDAO <span className="badge bg-dark text-light">7</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Frax Finance <span className="badge bg-dark text-light">7</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Olympus <span className="badge bg-dark text-light">8</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Decentraland <span className="badge bg-dark text-light">4</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Cosmos <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Lido <span className="badge bg-dark text-light">6</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Aave <span className="badge bg-dark text-light">3</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Compound <span className="badge bg-dark text-light">16</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">The Graph <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Synthetix <span className="badge bg-dark text-light">16</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-warning text-light">SafeDAO <span className="badge bg-dark text-light">31</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">1inch <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Osmosis <span className="badge bg-dark text-light">6</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">StarkNet <span className="badge bg-dark text-light">5</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Gnosis <span className="badge bg-dark text-light">3</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Yearn Finance <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Polygon <span className="badge bg-dark text-light">17</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-dark text-light">Alchemist <span className="badge bg-dark text-light">9</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">Bancor <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Immutable X <span className="badge bg-dark text-light">6</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-success text-light">Near <span className="badge bg-dark text-light">3</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-primary text-light">Synapse <span className="badge bg-dark text-light">16</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Polkadot <span className="badge bg-dark text-light">11</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Reflexer Finance <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-info text-light">Arbitrum <span className="badge bg-dark text-light">21</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-dark text-light">dYdX <span className="badge bg-dark text-light">9</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-danger text-light">Gitcoin <span className="badge bg-dark text-light">13</span></span></div>
            <div className="p-2 flex-fill"><span className="badge bg-secondary text-light">PoolTogether <span className="badge bg-dark text-light">17</span></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function handleLinkClick() {
  console.log("tempest");
}
