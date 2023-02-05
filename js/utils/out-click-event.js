export function isOutsideEvent(evt) {
  return evt.target.matches('section');
}
