// axios
import axios from 'axios';

// iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery-list'),
  loader: document.querySelector('span'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

let page = 1;
let totalPage = 0;
let searchQuery = '';
let y = 0;
const perPage = 40;

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  showLoader();
  hiddenLoadMoreBtn();
  const form = event.currentTarget;
  searchQuery = form.elements.search.value;

  try {
    const data = await fetchImg(searchQuery);

    if (!data.total) {
      const error =
        'Sorry, there are no images matching your search query. Please try again!';
      onFetchError(error);
    } else {
      renderGallery(data);
      showLoadMoreBtn();
      page += 1;
      totalPage = data.totalHits / perPage;
    }
  } catch (e) {
    onFetchError(e.message);
  } finally {
    hiddenLoader();
  }

  refs.form.reset();
}

async function fetchImg(tags) {
  const params = new URLSearchParams({
    per_page: perPage,
    page: page,
  });

  try {
    const response = await instance.get(
      `https://pixabay.com/api/?key=41464538-044fa7fe64ee4a60fb4972757&q=${tags}&${params}`
    );
    // console.log(response.data);
    return response.data;
  } catch (e) {
    onFetchError(e.message);
  }
}

function renderGallery(data) {
  const imagesData = data.hits;
  const images = imagesData.map(image => {
    return {
      preview: image.webformatURL,
      original: image.largeImageURL,
      description: image.tags,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
      likes: image.likes,
    };
  });

  const galleryString = images.reduce(
    (
      html,
      { preview, original, description, views, comments, downloads, likes }
    ) => {
      return (
        html +
        `<li class="gallery">
          <a class="gallery-link" href=${original} >       
           <img
            class="gallery-image"
            src=${preview}
            alt="${description}"
            />          <ul class="desc">
            <li class="desc-item">
              <h2 class="desc-title">likes</h2>
              <p class="desc-text">${likes}</p>
            </li>
            <li class="desc-item">
              <h2 class="desc-title">views</h2>
              <p class="desc-text">${views}</p>
            </li>
            <li class="desc-item">
              <h2 class="desc-title">comments</h2>
              <p class="desc-text">${comments}</p>
            </li>
            <li class="desc-item">
              <h2 class="desc-title">downloads</h2>
              <p class="desc-text">${downloads}</p>
            </li>
          </ul></a>
        </li>`
      );
    },
    ''
  );

  refs.gallery.insertAdjacentHTML('beforeend', galleryString);

  const galleryItem = document.querySelector('.gallery');
  const rect = galleryItem.getBoundingClientRect();
  y = rect.height * 2;
  // console.log(rect.height);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

function onFetchError(errorMessage = 'Something went wrong!') {
  iziToast.error({
    position: 'topRight',
    message: errorMessage,
  });
}

async function onLoadMoreBtnClick(event) {
  hiddenLoadMoreBtn();
  showLoader();

  if (page > totalPage) {
    hiddenLoader();
    return iziToast.show({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  try {
    const data = await fetchImg(searchQuery);
    renderGallery(data);
    windowScroll(y);
    showLoadMoreBtn();
    page += 1;
  } catch (e) {
    onFetchError(e.message);
  } finally {
    hiddenLoader();
  }
}

function showLoader() {
  refs.loader.hidden = false;
  refs.loader.classList.add('loader');
}

function hiddenLoader() {
  refs.loader.hidden = true;
  refs.loader.classList.remove('loader');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hiddenLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function windowScroll(y) {
  window.scrollBy({
    top: y,
    behavior: 'smooth',
  });
}
