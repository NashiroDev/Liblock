import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Navbar() {
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
                <button className="nav-link dropdown-toggle text-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
          <form className="form-inline ms-2">
            <ul className="navbar-nav">
              <li className="nav-item">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              </li>
              <li className="nav-item ms-2">
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
              </li>
            </ul>
          </form>
          <ul className="navbar-nav ms-4">
            <li><ConnectButton 
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
              showBalance={false}
              />
            </li>
          </ul>
        </div>
      </nav>
    );
  }