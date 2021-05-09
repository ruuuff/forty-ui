const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem"
}

const CSSSelectors = [
  {
    selector: "h1",
    propAndValue: [
      { property: "font-size", min: 0, max: 6 },
      { property: "line-height", min: 0, max: 10 }
    ]
  },

  {
    selector: "h2, h3",
    propAndValue: [
      { property: "font-size", min: 0, max: 3.2 },
      { property: "line-height", min: 0, max: 5.3 }
    ]
  },

  {
    selector: "#banner .content p, #first-section > article p",
    propAndValue: [
      { property: "font-size", min: 0, max: 1.3 },
      { property: "line-height", min: 0, max: 2.1 },
      { property: "letter-spacing", min: 0, max: 0.3 }
    ]
  },

  {
    selector: "#header a.logo, #header nav, .btn-container .btn, label",
    propAndValue: [
      { property: "font-size", min: 0, max: 1.5 },
      { property: "line-height", min: 0, max: 2.4 }
    ]
  },

  {
    selector: "#secondary-section .container p, input, textarea, #contact section:last-child .content, .icon",
    propAndValue: [
      { property: "font-size", min: 0, max: 1.86 },
      { property: "line-height", min: 0, max: 3.0 }
    ]
  },

  {
    selector: "#contact section:last-child header h3",
    propAndValue: [
      { property: "font-size", min: 0, max: 2.5 },
      { property: "line-height", min: 0, max: 4.1 }
    ]
  },

  {
    selector: "footer .credits ul",
    propAndValue: [
      { property: "font-size", min: 0, max: 1.5 },
      { property: "line-height", min: 0, max: 1.5 }
    ]
  },
]

const SizeAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    document.querySelector('head').appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by SizeAdjust (github.com/ruuuff) -->")
  },

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value

    return value
  },

  callScaleWithParameters(min, max) {
    return SizeAdjust.scale(Number(document.documentElement.clientWidth), Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  innerStyles() {
    const style = document.querySelector('head style:last-child')
    style.innerHTML = ""

    CSSSelectors.forEach(({ selector, propAndValue }) => {
      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(({ property, min, max }) => {
        const size = SizeAdjust.callScaleWithParameters(min, max).toFixed(2)

        style.insertAdjacentHTML("beforeend", `  ${property}: ${size + Options.measure};`)
      })
      style.insertAdjacentHTML("beforeend", `}
      `)
    })
  },
}

SizeAdjust.createStyleEl()
SizeAdjust.innerStyles()
window.addEventListener('resize', SizeAdjust.innerStyles)