import {Controller} from "@hotwired/stimulus"
import confetti from "canvas-confetti"

const inlineStylesFormObject = (styles = {}) => {
  const resultAsArray = Object.keys(styles).map((property) => {
    const value = styles[property]

    return `${property}:${value}`
  })

  return resultAsArray.join(";")
}

class Confetti extends Controller {
  static targets = ["element"]
  static values = {
    follow: {
      type: Boolean,
      default: true
    },

    // Type of animation basic|school-pride|stars
    animation: {
      type: String,
      default: 'basic'
    },

    duration: {
      type: Number,
      default: 5 // number of seconds
    },

    firstColor: {
      type: String,
      default: "#0886DE"
    },

    secondColor: {
      type: String,
      default: "#FF6154"
    },

    particleCount: {
      type: Number,
      default: 100
    },
    startVelocity: {
      type: Number,
      default: 20
    },
    spread: {
      type: Number,
      default: 360
    },
    ticks: {
      type: Number,
      default: 90
    },

    debug: {
      type: Boolean,
      default: false
    }
  }

  clicked = false
  canvasElement = null

  get canvas() {
    if (this.canvasElement) {
      return this.canvasElement
    }

    // Create a canvas as big as the screen and make it fixed and ontop of everything
    const myCanvas = document.createElement("canvas")
    myCanvas.style.cssText = inlineStylesFormObject({
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      "pointer-events": "none",
      "z-index": "9999",
    })

    // Add it to the DOM
    document.body.appendChild(myCanvas)

    // Cache it
    this.canvasElement = myCanvas

    return this.canvasElement
  }

  get instance() {
    return confetti.create(this.canvas, {
      resize: true,
      useWorker: true,
    })
  }

  spray(e) {
    e.preventDefault()

    this.log("Spraying")

    this.getStyle(e).then(() => {
      this.log("Finished animation")
      if (this.followValue) {
        // Actually follow the link
        if (this.clicked === false) {
          this.followLink()
        }

        this.clicked = true
      }
    })
  }

  getStyle(e) {
    switch (this.animationValue) {
      case 'basic':
      default:
        return this.basic(e)
      case 'school-pride':
        return this.schoolPride(e)
      case 'stars':
        return this.stars(e)
    }
  }

  basic(e) {
    this.log("Basic started")

    return this.instance({
      particleCount: this.particleCountValue,
      startVelocity: this.startVelocityValue,
      spread: this.spreadValue,
      ticks: this.ticksValue,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
    })
  }

  stars(e) {
    this.log("Stars started")

    var defaults = {
      spread: this.spreadValue,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: this.startVelocityValue,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        this.instance({
          ...defaults,
          particleCount: this.particleCountValue,
          // scalar: 1.2,
          shapes: ['star']
        });
      }, 70);

      this.instance({
        ...defaults,
        particleCount: this.particleCountValue,
        // scalar: 0.75,
        shapes: ['star']
      }).then(() => {
        this.log("Stars ended")
        resolve()
      });
    })
  }

  schoolPride(e) {
    this.log("School pride started")
    return new Promise((resolve) => {
      var end = Date.now() + (this.durationValue * 1000);
      // go Buckeyes!
      var colors = [this.firstColorValue, this.secondColorValue];
      const vm = this;

      (function frame() {
        vm.instance({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        vm.instance({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          vm.log("School pride ended")
          resolve()
        }
      })();
    })
  }

  followLink() {
    this.log("Following link")
    // Create a link
    const link = document.createElement("a")
    link.style.cssText = inlineStylesFormObject({
      opacity:0,
      display: "hidden"
    })
    link.href = this.context.element.href
    link.target = this.context.element.target
    // Add it to the DOM
    document.body.appendChild(link)
    // Click it
    link.click()
    this.log("Followed link")

    // Mark it as clicked and reset the state
    setTimeout(() => {
      this.log("Reset state")
      this.clicked = false
    }, 1);
  }

  log(message) {
    if (this.debugValue) {
      console.log(`[Stimulus confetti] ${message}`)
    }
  }
}

export { Confetti }