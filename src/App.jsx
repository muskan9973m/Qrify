import Navbar from './components/Navbar'
import QRGenerator from './components/QRGenerator'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">College Mini Project</p>
          <h1>Generate Your QR Code Instantly</h1>
          <p className="hero-text">
            QRify turns any text or website URL into a scannable QR code. Preview it,
            customize the colors and size, then download a PNG file for your presentation,
            poster, or assignment.
          </p>
        </section>

        <QRGenerator />
      </main>

      <Footer />
    </div>
  )
}

export default App
