const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem"
}

const CSSSelectors = [
  {
    selector: ".logo a",
    propAndValue: [
      { property: "font-size", min: 1.8, max: 2.8 },
      { property: "line-height", min: 2, max: 3 }
    ]
  }
]

const SizeAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    document.getElementsByTagName('head')[0].appendChild(styleEl)
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
        const size = SizeAdjust.callScaleWithParameters(Number(min), Number(max)).toFixed(2)

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