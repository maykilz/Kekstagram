import { sendFormData } from '../utils/api.js';
import { openAlert } from '../utils/popup-alert.js';
import { uploadModalCloseClickHandler } from '../utils/upload-modal.js';
import { resetFileInput } from './file-upload.js';

const photoUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = photoUploadForm.querySelector('.text__hashtags');
const commentInput = photoUploadForm.querySelector('.text__description');

const HASHTAG_VALID_REGEX = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

function hashtagValidInputHandler() {
  const hashTagArray = hashtagsInput.value.toLowerCase().trim().split(' ');
  const uniqueHashTagArray = new Set(hashTagArray);

  if (!hashtagsInput.value) {
    hashtagsInput.setCustomValidity('');

    return false;
  }

  for (let i = 0; i < hashTagArray.length; i++) {
    if (!HASHTAG_VALID_REGEX.test(hashTagArray[i])) {
      hashtagsInput.setCustomValidity(
        `Хэш-тег должен начинается с символа # (решётка)

        Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.

        Максимальная длинна хэш-тега не должна превышать ${MAX_HASHTAG_LENGTH} символов (включая решетку)`,
      );

      return false;
    } else if (hashTagArray.length > MAX_HASHTAG_NUMBERS) {
      hashtagsInput.setCustomValidity(`Хэш-тегов не должно быть больше чем ${MAX_HASHTAG_NUMBERS}`);
    } else if (hashTagArray.length !== uniqueHashTagArray.size) {
      hashtagsInput.setCustomValidity('Хэш-теги не должны повторяться');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }

  hashtagsInput.reportValidity();
}

function commentsValidInputHandler() {
  const inputLength = commentInput.value.length;

  if (inputLength > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity(`Превышен лимит на ${inputLength - MAX_COMMENT_LENGTH} символов!`);
  } else {
    commentInput.setCustomValidity('');
  }
}

function resetUploadForm() {
  photoUploadForm.reset();

  uploadModalCloseClickHandler();
  resetFileInput();
}

hashtagsInput.addEventListener('input', hashtagValidInputHandler);
commentInput.addEventListener('input', commentsValidInputHandler);

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendFormData(
    () => {
      resetUploadForm(),
      openAlert('success');
    },
    () => {
      resetUploadForm(),
      openAlert('error');
    },
    new FormData(photoUploadForm),
  );
});
