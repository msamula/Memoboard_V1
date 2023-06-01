export function GetWindowSize() {
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  document.documentElement.style.setProperty('--width', `${width - (width * 0.1)}px`);
  document.documentElement.style.setProperty('--height', `${height - (height * 0.15)}px`);
}
