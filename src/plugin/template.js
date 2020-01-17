
export function videoTemplateModal(episode) {
  return `
  <div class="modal micromodal-slide" id="modal-video-${episode.id}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        <header class="modal__header">
          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
        </header>
        <main class="modal__content" id="modal-1-content">
          <iframe width="560" height="315" src="${episode.url}" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </main>
      </div>
    </div>
  </div>`;
}

export function videoTemplate(episode) {
  return `
  <div class="Hero__video--item" data-micromodal-trigger="modal-video-${episode.id}">
            <div class="video__image">
              <p class="video__title">${episode.title}</p>
              <img src=${episode.img} alt="">
              <div class="video__button--play">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 41.999 41.999"
                  style="enable-background:new 0 0 41.999 41.999;" xml:space="preserve">
                  <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
	c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
	c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z" />
                  <g>
                  </g>
                </svg>
              </div>
              <p class="video__description">${episode.description}</p>
            </div>
          </div>
  `;
}

  