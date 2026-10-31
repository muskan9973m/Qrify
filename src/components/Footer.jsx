function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="about">
      <div className="footer-inner">
        <p className="footer-brand">QRify</p>
        <p>A college mini-project QR Code Generator built with React.js, Vite, and the qrcode library.</p>
        <p className="footer-copy">© {year} QRify. For educational use.</p>
      </div>
    </footer>
  )
}

export default Footer
