import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import QRPreview from './QRPreview'
import Customization from './Customization'

const DEFAULTS = {
  fgColor: '#312e81',
  bgColor: '#ffffff',
  size: 256,
}

function buildQrImage(value, fgColor, bgColor, size) {
  return QRCode.toDataURL(value, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: {
      dark: fgColor,
      light: bgColor,
    },
  })
}

function makeFileName(value) {
  const safeName = value
    .replace(/^https?:\/\//i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .toLowerCase()

  return `qrify-${safeName || 'qr-code'}.png`
}

function QRGenerator() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [qrImage, setQrImage] = useState('')
  const [error, setError] = useState('')
  const [fgColor, setFgColor] = useState(DEFAULTS.fgColor)
  const [bgColor, setBgColor] = useState(DEFAULTS.bgColor)
  const [size, setSize] = useState(DEFAULTS.size)
  const [isBusy, setIsBusy] = useState(false)

  const handleGenerate = async (event) => {
    event.preventDefault()

    const value = text.trim()

    if (!value) {
      setError('Please enter some text or a website URL to generate a QR code.')
      return
    }

    setError('')
    setIsBusy(true)

    try {
      const image = await buildQrImage(value, fgColor, bgColor, size)
      setQrValue(value)
      setQrImage(image)
    } catch {
      setError('Could not generate a QR code. Try a shorter message or a valid URL.')
      setQrValue('')
      setQrImage('')
    } finally {
      setIsBusy(false)
    }
  }

  useEffect(() => {
    if (!qrValue) {
      return
    }

    let cancelled = false

    buildQrImage(qrValue, fgColor, bgColor, size)
      .then((image) => {
        if (!cancelled) {
          setQrImage(image)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not update the QR code with the selected colors or size.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [fgColor, bgColor, size, qrValue])

  const handleDownload = () => {
    if (!qrImage) {
      return
    }

    const link = document.createElement('a')
    link.href = qrImage
    link.download = makeFileName(qrValue)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReset = () => {
    setText('')
    setQrValue('')
    setQrImage('')
    setError('')
    setFgColor(DEFAULTS.fgColor)
    setBgColor(DEFAULTS.bgColor)
    setSize(DEFAULTS.size)
  }

  return (
    <section className="generator" id="generator">
      <form className="input-card" onSubmit={handleGenerate}>
        <h2>Enter your content</h2>
        <p>Type a message, contact details, or paste a website URL.</p>

        <label htmlFor="qr-input" className="sr-only">
          Text or website URL
        </label>
        <textarea
          id="qr-input"
          rows="6"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            if (error) {
              setError('')
            }
          }}
          placeholder="Example: https://www.yourwebsite.com or Hello from QRify"
        />

        {error ? (
          <p className="error-message" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary" disabled={isBusy}>
          {isBusy ? 'Generating...' : 'Generate QR Code'}
        </button>
      </form>

      <div className="result-column">
        <QRPreview qrImage={qrImage} qrValue={qrValue} />

        <Customization
          fgColor={fgColor}
          bgColor={bgColor}
          size={size}
          onFgColorChange={setFgColor}
          onBgColorChange={setBgColor}
          onSizeChange={setSize}
        />

        <div className="action-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDownload}
            disabled={!qrImage}
          >
            Download QR Code
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  )
}

export default QRGenerator
