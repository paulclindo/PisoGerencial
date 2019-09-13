import "glider-js/glider.css"
import "normalize.css"
import "./mysocial.scss"
import "./styles.scss"
import "./loader.css"
import socialChat from "./components/chat"
import Glider from "glider-js/glider"

import stopYoutube from "./components/stopYoutube"



//Variables from DOM
const $loader = document.querySelector(".loader")
const $content = document.querySelector(".content")
const $form = document.querySelector("#formMail")

$loader.style.display = "block"

window.onload = function () {

  $loader.style.opacity = 0
  $content.style.opacity = 1

  $loader.remove()
  socialChat("271842162861500", "#e9dc34")
  new Glider(document.querySelector('.glider'), {
    slidesToScroll: 1,
    slidesToShow: 1.5,
    draggable: true,
    exactWidth: 400,
    dots: '.dots',
    dragVelocity: 2,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    responsive: [

      {
        // screens greater than >= 775px
        breakpoint: 1020,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1.5,
          slidesToScroll: 'auto',
          itemWidth: 450,
          duration: 0.25,

        }
      },
      {
        // screens greater than >= 775px
        breakpoint: 768,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1.5,
          slidesToScroll: 'auto',
          itemWidth: 300,
          duration: 0.25,

        }
      },
      {
        // screens greater than >= 320
        breakpoint: 320,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          itemWidth: 200,
          duration: 0.25,

        }
      }
    ]
  })


  stopYoutube()

}