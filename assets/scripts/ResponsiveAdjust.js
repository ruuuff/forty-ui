const Options = {
  minWidth: 480,
  maxWidth: 1365,
  measure: "rem"
}

const CSSDeclarations = [
  {
    selector: "h1",
    propAndValue: [
      { property: "font-size", min: 3.2, max: 6.066 },
      { property: "line-height", min: 5.28, max: 10 }
    ]
  },

  {
    selector: "h2, h3",
    propAndValue: [
      { property: "font-size", min: 2.4, max: 3.2 },
      { property: "line-height", min: 3.9, max: 5.3 }
    ]
  },

  {
    selector: "#banner .content p, #first-section > article p",
    propAndValue: [
      { property: "font-size", min: 1.1, max: 1.3 },
      { property: "line-height", min: 1.8, max: 2.1 },
    ]
  },

  {
    selector: "#header a.logo, #header nav, .btn-container .btn, label",
    propAndValue: [
      { property: "font-size", min: 1.28, max: 1.5 },
      { property: "line-height", min: 2.1, max: 2.4 }
    ]
  },

  {
    selector: "#secondary-section .container p, input, textarea, #contact section:last-child .content, .icon",
    propAndValue: [
      { property: "font-size", min: 1.6, max: 1.86 },
      { property: "line-height", min: 2.6, max: 3.0 }
    ]
  },

  {
    selector: "#contact section:last-child header h3",
    propAndValue: [
      { property: "font-size", min: 2, max: 2.5 },
      { property: "line-height", min: 3.3, max: 4.1 }
    ]
  },

  {
    selector: "footer .credits ul",
    propAndValue: [
      { property: "font-size", min: 1.28, max: 1.5 },
      { property: "line-height", min: 1.28, max: 1.5 }
    ]
  },

  {
    selector: ".btn-container .btn",
    propAndValue: [
      { property: "height", min: 4.48, max: 5.2 },
    ]
  },

  {
    selector: ".icon",
    propAndValue: [
      { property: "width", min: 3.2, max: 3.7 },
      { property: "height", min: 3.2, max: 3.7 },
    ]
  },

  {
    selector: ".btn-container .btn",
    propAndValue: [
      { property: "height", min: 4.4, max: 5.2 },
    ]
  },

  {
    selector: "#header .logo, #header nav .menu",
    propAndValue: [
      { property: "letter-spacing", min: 0.4, max: 0.45 },
    ]
  },

  {
    selector: ".btn-container .btn, #contact form label",
    propAndValue: [
      { property: "letter-spacing", min: 0.32, max: 0.37 },
    ]
  },

  {
    selector: "#banner .content p, #first-section > article p",
    propAndValue: [
      { property: "letter-spacing", min: 0.28, max: 0.32 },
    ]
  },
  
  {
    selector: "h1, #secondary-section .container p, #contact section:last-child header h3, #contact section:last-child .content a, #contact section:last-child .content p, footer .credits ul li",
    propAndValue: [
      { property: "letter-spacing", min: 0.04, max: 0.046 },
    ]
  },
]

const ResponsiveAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    styleEl.setAttribute("id", "size-adjust")
    document.querySelector('head').appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by ResponsiveAdjust (github.com/ruuuff/responsive-adjust) -->")
  },

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value

    return value
  },

  callScaleWithParameters(min, max) {
    return ResponsiveAdjust.scale(Number(document.documentElement.clientWidth), Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  formatSize(sizeToFormat) {
    return parseFloat(sizeToFormat.toFixed(3))
  },

  innerStyles() {
    const style = document.querySelector('head style#size-adjust')
    style.innerHTML = ""

    CSSDeclarations.forEach(({ selector, propAndValue }, index) => {
      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(({ property, min, max }) => {
        const size = ResponsiveAdjust.formatSize(ResponsiveAdjust.callScaleWithParameters(min, max))

        style.insertAdjacentHTML("beforeend", `  ${property}: ${size + Options.measure};`)
      })
      style.insertAdjacentHTML("beforeend", index !== CSSDeclarations.length - 1 ? `}
      ` : `}`)
    })
  },
}

ResponsiveAdjust.createStyleEl()
ResponsiveAdjust.innerStyles()
window.addEventListener('resize', ResponsiveAdjust.innerStyles)