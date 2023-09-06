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
      <div class="container">
        <div class="d-flex align-items-center">
          <h4>Last articles :</h4>
          <a class="link-info ms-2" href="/articles">View all</a>
        </div>
        <div class="d-flex mt-4">
          <ul class="pagination justify-content-center align-items-center">
            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
            <div class="col-3 ms-4 card">
              <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Title test</h5>
                <p class="card-text">This is an article preview</p>
                <div class="badge-section mt-2">
                  <span class="badge bg-warning text-light ms-2">Dapps</span>
                  <span class="badge bg-warning text-light ms-2">L2</span>
                </div>
                <a href="#" class="btn btn-primary mt-2">Read</a>
              </div>
            </div>
            <div class="col-3 ms-4 card">
              <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Title test</h5>
                <p class="card-text">This is an article preview</p>
                <div class="badge-section mt-2">
                  <span class="badge bg-warning text-light ms-2">Dapps</span>
                  <span class="badge bg-warning text-light ms-2">L2</span>
                </div>
                <a href="#" class="btn btn-primary mt-2">Read</a>
              </div>
            </div>
            <div class="col-3 ms-4 card">
              <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Title test</h5>
                <p class="card-text">This is an article preview</p>
                <div class="badge-section mt-2">
                  <span class="badge bg-warning text-light ms-2">Dapps</span>
                  <span class="badge bg-warning text-light ms-2">L2</span>
                </div>
                <a href="#" class="btn btn-primary mt-2">Read</a>
              </div>
            </div>
            <li class="page-item ms-4"><a class="page-link" href="#">Next</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Proposals() {
  return (
    <section>
      <div class="container">
        <div class="d-flex align-items-center">
          <h4>Deliberating articles :</h4>
          <a class="link-info ms-2" href="/proposals">View all</a>
        </div>
        <div class="justify-content-center row mt-4">
          <div class="card ms-4 col-md-3 mt-2">
            <div class="card-body">
              <h5 class="card-title">Title test</h5>
              <p class="card-text">Proposer : temp</p>
              <div class="badge-section mt-2">
                <span class="badge bg-warning text-light ms-2">Dapp</span>
              </div>
              <div class="progress mt-2">
                <div class="progress-bar-striped bg-success" style={{ width: 50 }}></div>
                <div class="progress-bar-striped bg-warning" style={{ width: 45 }}></div>
                <div class="progress-bar-striped bg-danger" style={{ width: 98 }}></div>
              </div>
              <a href="#" class="card-link">Visit</a>
            </div>
          </div>
        </div>
        <div class="justify-content-center row mt-4">
          <div class="card ms-4 col-md-3 mt-2">
            <div class="card-body">
              <h5 class="card-title">Title test</h5>
              <p class="card-text">Proposer : temp</p>
              <div class="badge-section mt-2">
                <span class="badge bg-warning text-light ms-2">Dapp</span>
              </div>
              <div class="progress mt-2">
                <div class="progress-bar-striped bg-success" style={{ width: 50 }}></div>
                <div class="progress-bar-striped bg-warning" style={{ width: 45 }}></div>
                <div class="progress-bar-striped bg-danger" style={{ width: 98 }}></div>
              </div>
              <a href="#" class="card-link">Visit</a>
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
      <div class="container">
        <div class="d-flex align-items-center">
          <h4>Discover per theme :</h4>
        </div>
        <div class="theme-section">
          <h5>Blockchain :</h5>
          <div class="d-flex flex-wrap">
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Ethereum <span class="badge bg-dark text-light">16</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-warning text-light">Bitcoin <span class="badge bg-dark text-light">31</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">ZkSync <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Base <span class="badge bg-dark text-light">6</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Aurora <span class="badge bg-dark text-light">5</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Gnosis <span class="badge bg-dark text-light">3</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Avalanche <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Polygon <span class="badge bg-dark text-light">17</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-dark text-light">Axelar <span class="badge bg-dark text-light">9</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Optimism <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Arbitrum <span class="badge bg-dark text-light">21</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-warning text-light">Binance smart chain <span class="badge bg-dark text-light">10</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Phantom <span class="badge bg-dark text-light">7</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Kadena <span class="badge bg-dark text-light">7</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Flux <span class="badge bg-dark text-light">8</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Scroll <span class="badge bg-dark text-light">4</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Zetachain <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Polkadot <span class="badge bg-dark text-light">24</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Cosmos <span class="badge bg-dark text-light">17</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Solana <span class="badge bg-dark text-light">63</span></span></div>
          </div>
          <h5>Technology :</h5>
          <div class="d-flex flex-wrap">
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Proof of useful work <span class="badge bg-dark text-light">5</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-warning text-light">Proof of work <span class="badge bg-dark text-light">31</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Cross-chain messaging <span class="badge bg-dark text-light">21</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Delegated proof of stake <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Proof of history <span class="badge bg-dark text-light">6</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">MEV <span class="badge bg-dark text-light">3</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Proof of stake <span class="badge bg-dark text-light">16</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Graph <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-dark text-light">Tendermint <span class="badge bg-dark text-light">9</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">SHA256 <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">ZkProofs <span class="badge bg-dark text-light">17</span></span></div>
          </div>
          <h5>Dapps / DAO :</h5>
          <div class="d-flex flex-wrap">
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Uniswap <span class="badge bg-dark text-light">5</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-warning text-light">Stargate Finance <span class="badge bg-dark text-light">31</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Galxe <span class="badge bg-dark text-light">21</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">BitDAO <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-dark text-light">Balancer <span class="badge bg-dark text-light">9</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Optimism <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">ENS <span class="badge bg-dark text-light">21</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Pocket Network <span class="badge bg-dark text-light">21</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-warning text-light">Sushi <span class="badge bg-dark text-light">10</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">MakerDAO <span class="badge bg-dark text-light">7</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Frax Finance <span class="badge bg-dark text-light">7</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Olympus <span class="badge bg-dark text-light">8</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Decentraland <span class="badge bg-dark text-light">4</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Cosmos <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Lido <span class="badge bg-dark text-light">6</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Aave <span class="badge bg-dark text-light">3</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Compound <span class="badge bg-dark text-light">16</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">The Graph <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Synthetix <span class="badge bg-dark text-light">16</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-warning text-light">SafeDAO <span class="badge bg-dark text-light">31</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">1inch <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Osmosis <span class="badge bg-dark text-light">6</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">StarkNet <span class="badge bg-dark text-light">5</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Gnosis <span class="badge bg-dark text-light">3</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Yearn Finance <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Polygon <span class="badge bg-dark text-light">17</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-dark text-light">Alchemist <span class="badge bg-dark text-light">9</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">Bancor <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Immutable X <span class="badge bg-dark text-light">6</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-success text-light">Near <span class="badge bg-dark text-light">3</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-primary text-light">Synapse <span class="badge bg-dark text-light">16</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Polkadot <span class="badge bg-dark text-light">11</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Reflexer Finance <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-info text-light">Arbitrum <span class="badge bg-dark text-light">21</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-dark text-light">dYdX <span class="badge bg-dark text-light">9</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-danger text-light">Gitcoin <span class="badge bg-dark text-light">13</span></span></div>
            <div class="p-2 flex-fill"><span class="badge bg-secondary text-light">PoolTogether <span class="badge bg-dark text-light">17</span></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function handleLinkClick() {
  console.log("tempest");
}
