'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchGallery } from './js/pixabay-api';
import { imageTemplate } from './js/render-functions';
import { galleryEl } from './js/render-functions';

const formEl = document.querySelector('.img-search-form');
const loaderEl = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.load-more-btn');

let query;
let page;
let maxPage;

formEl.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  hideLoadBtn();
  galleryEl.innerHTML = '';
  query = e.target.elements.query.value.trim();
  page = 1;

  if (query === '') {
    showError('Sorry, there are no search terms entered. Please try again!');
    return;
  }
  showLoaderEl();
  try {
    const data = await fetchGallery(query, page);
    maxPage = Math.ceil(data.totalHits / 15);
    if (data.totalHits === 0) {
      hideLoaderEl();
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    imageTemplate(data);
  } catch (err) {
    showError(err);
  }

  hideLoaderEl();
  checkBtnVisibleStatus();
  e.target.reset();
}

async function onLoadMoreClick() {
  page += 1;
  showLoaderEl();

  try {
    const data = await fetchGallery(query, page);
    imageTemplate(data);
  } catch (err) {
    showError(err);
  }

  hideLoaderEl();
  checkBtnVisibleStatus();

  const height = galleryEl.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

function showLoadBtn() {
  btnLoadMore.classList.remove('hidden');
}

function hideLoadBtn() {
  btnLoadMore.classList.add('hidden');
}

function showLoaderEl() {
  loaderEl.classList.remove('hidden');
}

function hideLoaderEl() {
  loaderEl.classList.add('hidden');
}

function showError(msg) {
  iziToast.error({
    message: msg,
    messageColor: 'white',
    backgroundColor: 'red',
    position: 'topRight',
  });
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
    showError("We're sorry, but you've reached the end of search results.");
  } else {
    showLoadBtn();
  }
}
