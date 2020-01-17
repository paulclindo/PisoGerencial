import "glider-js/glider.css";
import "normalize.css";
import "./mysocial.scss";
import "./styles.scss";
import "./loader.css";
import socialChat from "./components/chat";
import Glider from "glider-js/glider";
import {episodes} from "./video.json"
import {videoTemplate, videoTemplateModal} from "./plugin/template"

import stopYoutube from "./components/stopYoutube";
import MicroModal from "micromodal"
//Variables from DOM
const $loader = document.querySelector(".loader");
const $content = document.querySelector(".content");
const $form = document.querySelector("#formMail");
const $message = document.querySelector("#message");
const $sendButton = document.querySelector("#sendButton");
const valuebtn = $sendButton.value;
$loader.style.display = "block";



const createElementHtml = htmlString => {
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = htmlString;
  return html.body.children[0];
};

const $slider = document.querySelector("#slider-videos")
const $modalVideo = document.querySelector("#modal-video")

//Sorting videos
const sortEpisodes = episodes.sort((a, b) => b.id - a.id);
const allModalVideos = sortEpisodes.map(episode => {
  return videoTemplateModal(episode);
});

const allVideos = sortEpisodes.map(episode => {
  return videoTemplate(episode);
});

//Loop for append all Modals
for (let i = 0; i < allModalVideos.length; i++) {
  const domAllVideos = createElementHtml(allModalVideos[i]);
  $modalVideo.append(domAllVideos);
}
//Loop for append all videos in Glider
for (let i = 0; i < allVideos.length; i++) {
  const domVideos = createElementHtml(allVideos[i]);
  $slider.append(domVideos);
}

window.onload = function() {

  $loader.style.opacity = 0;
  $content.style.opacity = 1;
  $loader.remove();

  socialChat("271842162861500", "#e9dc34");
  MicroModal.init();
  stopYoutube();


  new Glider(document.querySelector(".glider"), {
    slidesToScroll: 1,
    // slidesToShow: 1.5,
    exactWidth: 600,
    // dots: ".dots",
    // dragVelocity: 2,
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next"
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 1020,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1.5,
          // slidesToScroll: "auto",
          itemWidth: 450,
          duration: 0.25
        }
      },
      {
        // screens greater than >= 775px
        breakpoint: 768,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1.5,
          slidesToScroll: "auto",
          itemWidth: 400,
          duration: 0.25
        }
      },
      {
        // screens greater than >= 320
        breakpoint: 320,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          itemWidth: 300,
          duration: 0.25
        }
      }
    ]
  });

  $form.addEventListener("submit", e => {
    e.preventDefault();

    $sendButton.value = "Enviando...";

    //Validate email sent
    const email = document.querySelector("#email").value;
    const $message = document.querySelector("#message");

    const vEmail = validateEmail(email);

    function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (vEmail) {
      getData()
        .then(() => {
          $message.innerHTML =
            "Te has registrado satisfactoriamente. Revisa tu correo!";
          $message.style.opacity = 1;
          $message.style.color = "white";
          $message.style.background = "#383838";
          $message.style.padding = "8px 10px";
          $message.style.display = "inline-block";
          $message.style.lineHeight = 1.5;
          $message.style.borderRadius = "8px";
          $message.style.height = "auto";
          $sendButton.value = valuebtn;
          $form.remove();
          // setTimeout(() => {
          //   $message.style.opacity = 0;
          //   $form.reset();
          // }, 3500);
        })
        .catch(() => {
          $message.innerHTML = "Vuelve a intentarlo más tarde, por favor.";
          $message.style.opacity = 1;
          $sendButton.value = valuebtn;
          setTimeout(() => {
            $message.style.opacity = 0;
            $form.reset();
          }, 3500);
        });
    } else {
      $sendButton.value = valuebtn;
      $message.innerHTML = "Por favor, ingresa un correo válido.";
      $message.style.opacity = 1;
      setTimeout(() => {
        $message.style.opacity = 0;
        $form.reset();
      }, 2000);
    }

    async function getData() {
      const {
        data: { idcont }
      } = await createContact(email);

      try {
        // const URL = "http://192.168.1.239:4003/mails/mailsend";
        const URL = "https://potencie.com:15010/mails/mailsend";
        const remitents = [
          "mjimenez@themadmedia.com",
          "lsanchez@themadmedia.com",
          "lzapata@themadmedia.com"
        ];
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contentmail: {},
            datasend: [
              {
                mailpage: "79eeef36fe20054db4196b38d07cffad",
                email: email,
                idcont: idcont,
                cc: remitents
              }
            ]
          })
        });
        const data = await response.json();
        return data;
        // console.log(data);
      } catch (error) {
        // console.log(`Hubo un error : ${error.message}`);
      }
    }
  });

  const createContact = async email => {
    try {
      const URL = "https://potencie.com:15007/contacts/create";

      // const URL = "http://192.168.1.239:8088/contacts/create";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tradename: email,
          typeuser: "PERSON",
          nicknameowner: "POTENCIE",
          nicknamecreator: "JVILLANESBO",
          vinculate_tags: [{ id_tag: 70, id_table: 1, state: true }],
          email: [
            {
              email: email
            }
          ]
        })
      });

      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error.message);
    }
  };
};
