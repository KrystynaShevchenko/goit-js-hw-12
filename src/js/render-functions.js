'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.gallery');

export function imageTemplate(data) {
  const markup = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
  <div class="image-description">
    <p><b>Likes: </b>${likes}</p>
    <p><b>Views: </b>${views}</p>
    <p><b>Comments: </b>${comments}</p>
    <p><b>Downloads: </b>${downloads}</p>
  </div>
  </a>
</li>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
  });
  lightbox.refresh();
}
