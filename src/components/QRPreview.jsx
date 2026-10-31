function QRPreview({ qrImage, qrValue }) {
  return (
    <section className="preview-card" aria-live="polite">
      <h2>QR Code Preview</h2>

      {qrImage ? (
        <div className="preview-ready">
          <div className="qr-frame">
            <img src={qrImage} alt={`QR code for ${qrValue}`} />
          </div>
          <p className="preview-caption">
            Encoded content: <strong>{qrValue}</strong>
          </p>
        </div>
      ) : (
        <div className="preview-empty">
          <div className="empty-icon" aria-hidden="true">
            ▦
          </div>
          <p>
            Your QR code will appear here. Enter text or a website URL and click
            Generate QR Code.
          </p>
        </div>
      )}
    </section>
  )
}

export default QRPreview
