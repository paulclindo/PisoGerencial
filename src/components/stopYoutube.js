import Micromodal from "micromodal"
import "../Micromodal.css"

function stopYoutube() {

  Micromodal.init({
    onClose: modal => {
      const video = modal.querySelector("iframe")
      const realSrc = video.getAttribute("src")
      video.setAttribute("src", "")
      setTimeout(() => {
        video.setAttribute("src", realSrc)
      }, 100)
    },
  });
}

export default stopYoutube