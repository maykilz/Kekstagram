import { isEscEvent } from './esc-event.js';

const modalOverlay = document.querySelector('.big-picture');
const closeButton = document.querySelector('#upload-cancel');
const commentLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

function escCloseKeyHandler(evt) {
  const inputFocus = evt.target.matches('input:focus') || evt.target.matches('textarea:focus');

  if (inputFocus) {
    return false;
  }

  if (isEscEvent(evt)) {
    evt.preventDefault();

    photoModalCloseClickHandler();
  }
}

export function photoModalOpen() {
  modalOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', photoModalCloseClickHandler);
  document.addEventListener('keydown', escCloseKeyHandler);
}

export function photoModalCloseClickHandler() {
  modalOverlay.classList.add('hidden');
  commentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', photoModalCloseClickHandler);
  document.removeEventListener('keydown', escCloseKeyHandler);
}
