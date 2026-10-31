function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="logo" aria-label="QRify home">
          <span className="logo-mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="logo-text">QRify</span>
        </a>

        <nav className="nav-links" aria-label="Main">
          <a href="#home">Home</a>
          <a href="#generator">Generate</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
