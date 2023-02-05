import { isEscEvent } from './esc-event.js';
import { isOutsideEvent } from './out-click-event.js';

export function openAlert(type, message, buttonText) {
  const alertTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alert = alertTemplate.cloneNode(true);

  const closeAlertButton = alert.querySelector(`.${type}__button`);

  if (message) {
    alert.querySelector(`.${type}__title`).textContent = message;
    closeAlertButton.textContent = buttonText;
  }

  function alertCloseClickHandler() {
    alert.remove();

    closeAlertButton.removeEventListener('click', alertCloseClickHandler);
    document.removeEventListener('click', onOutCloseClickHandler);
    document.removeEventListener('keydown', escCloseKeyHandler);
  }

  function escCloseKeyHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      alert.remove();
    }

    closeAlertButton.removeEventListener('click', alertCloseClickHandler);
    document.removeEventListener('click', onOutCloseClickHandler);
    document.removeEventListener('keydown', escCloseKeyHandler);
  }

  function onOutCloseClickHandler(evt) {
    if ( isOutsideEvent(evt)) {
      evt.preventDefault();
      alert.remove();
    }
  }

  document.body.append(alert);

  closeAlertButton.addEventListener('click', alertCloseClickHandler);
  document.addEventListener('click', onOutCloseClickHandler);
  document.addEventListener('keydown', escCloseKeyHandler);
}

