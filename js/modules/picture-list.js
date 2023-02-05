import { fetchPhotos } from '../utils/api.js';
import { debounce } from '../utils/debounce.js';
import { openAlert } from '../utils/popup-alert.js';
import { activateFilters, filterByComments, filterByDefault, filterByRandom } from './filter-list.js';
import { renderFullPicture } from './fullscreen-photo.js';

const RERENDER_DELAY = 500;

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterContainer = document.querySelector('.img-filters');

function removeOldList() {
  picturesContainer.querySelectorAll('.picture').forEach((item) => item.remove());
}

function createPictureList(pictureData) {
  const pictureListFragment = document.createDocumentFragment();
  removeOldList();

  pictureData.forEach(({ id, url, description, likes, comments }) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.href = `#${id}`;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;

    picture.addEventListener('click', () => {
      renderFullPicture(url, description, likes, comments);
    });

    pictureListFragment.append(picture);
  });

  picturesContainer.append(pictureListFragment);
}

export function renderPictureList(pictureData) {
  createPictureList(pictureData);

  function changeFilterHandler(evt) {
    const target = evt.target;

    switch (target.id) {
      case 'filter-default':
        createPictureList(
          filterByDefault(pictureData),
        );
        break;
      case 'filter-random':
        createPictureList(
          filterByRandom(pictureData),
        );
        break;
      case 'filter-discussed':
        createPictureList(
          filterByComments(pictureData),
        );
        break;
    }
  }

  filterContainer.addEventListener('click', debounce(changeFilterHandler, RERENDER_DELAY));
}

export function getPictureList() {
  fetchPhotos()
    .then((data) => {
      renderPictureList(data),
      activateFilters();
    })
    .catch(() => {
      openAlert('error', 'Ошибка загрузки данных с сервера', 'закрыть');
    });
}

getPictureList();

