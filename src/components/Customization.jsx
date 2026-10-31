const SIZE_OPTIONS = [
  { label: 'Small (128px)', value: 128 },
  { label: 'Medium (256px)', value: 256 },
  { label: 'Large (384px)', value: 384 },
  { label: 'Extra Large (512px)', value: 512 },
]

function Customization({ fgColor, bgColor, size, onFgColorChange, onBgColorChange, onSizeChange, disabled }) {
  return (
    <section className="custom-card">
      <h2>Customize</h2>
      <p className="custom-hint">
        Change colors and size. The preview updates automatically after a QR code is generated.
      </p>

      <div className="custom-grid">
        <label className="color-field">
          <span>QR code color</span>
          <div className="color-row">
            <input
              type="color"
              value={fgColor}
              onChange={(event) => onFgColorChange(event.target.value)}
              disabled={disabled}
              aria-label="QR code color"
            />
            <span className="color-hex">{fgColor}</span>
          </div>
        </label>

        <label className="color-field">
          <span>Background color</span>
          <div className="color-row">
            <input
              type="color"
              value={bgColor}
              onChange={(event) => onBgColorChange(event.target.value)}
              disabled={disabled}
              aria-label="Background color"
            />
            <span className="color-hex">{bgColor}</span>
          </div>
        </label>

        <label className="size-field">
          <span>QR code size</span>
          <select
            value={size}
            onChange={(event) => onSizeChange(Number(event.target.value))}
            disabled={disabled}
            aria-label="QR code size"
          >
            {SIZE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default Customization
