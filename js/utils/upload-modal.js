import { resetEffectSettings } from '../modules/effects-control.js';
import { resetFileInput } from '../modules/file-upload.js';
import { resetScaleModifier } from '../modules/photo-scale-control.js';
import { isEscEvent } from './esc-event.js';

const photoUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

function escCloseKeyHandler(evt) {
  const inputFocus = evt.target.matches('input:focus') || evt.target.matches('textarea:focus');

  if (inputFocus) {
    return false;
  }

  if (isEscEvent(evt)) {
    evt.preventDefault();

    uploadModalCloseClickHandler();
  }
}

export function uploadModalOpen() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', uploadModalCloseClickHandler);
  document.addEventListener('keydown', escCloseKeyHandler);
}

export function uploadModalCloseClickHandler() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  photoUploadForm.reset();
  resetEffectSettings();
  resetScaleModifier();
  resetFileInput();

  closeButton.removeEventListener('click', uploadModalCloseClickHandler);
  document.removeEventListener('keydown', escCloseKeyHandler);
}
