import { photoModalCloseClickHandler, photoModalOpen } from '../utils/fullscreen-modal.js';

const COMMENTS_TO_SHOW = 5;

let currentComments = [];

const picturePhoto = document.querySelector('.big-picture__img img');
const closeModalButton = document.querySelector('.big-picture__cancel');
const pictureDescription = document.querySelector('.social__caption');
const pictureLikeCounter = document.querySelector('.likes-count');
const pictureAllComments = document.querySelector('.comments-count');
const commentLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');

function renderAllComments(commentsData) {
  const commentFragment = document.createDocumentFragment();

  commentsData.forEach(({ avatar, name, message }) => {
    const comment = commentItem.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentFragment.append(comment);
  });

  return commentFragment;
}

function showFirstComments(comments) {
  const displayedComments = comments.slice(0, COMMENTS_TO_SHOW);
  const renderFirstComments = renderAllComments(displayedComments);

  commentCount.firstChild.textContent = `${displayedComments.length  } из  `;
  commentList.appendChild(renderFirstComments);

  if (displayedComments.length === comments.length) {
    commentLoader.classList.add('hidden');
  }
}

function commentLoadClickHandler() {
  const additionalComments = currentComments.slice(
    commentList.children.length,
    commentList.children.length + COMMENTS_TO_SHOW,
  );
  const renderMoreComments = renderAllComments(additionalComments);

  commentList.appendChild(renderMoreComments);

  if (currentComments.length === commentList.children.length) {
    commentLoader.classList.add('hidden');
  }

  commentCount.firstChild.textContent = `${commentList.children.length  } из  `;
}


export function renderFullPicture(url, description, likes, comments) {
  photoModalOpen();

  picturePhoto.src = url;
  pictureDescription.textContent = description;
  pictureLikeCounter.textContent = likes;
  pictureAllComments.textContent = comments.length;

  commentList.innerHTML = '';
  currentComments = comments;

  closeModalButton.addEventListener('click', photoModalCloseClickHandler);
  commentLoader.addEventListener('click', commentLoadClickHandler);
  showFirstComments(comments);
}

