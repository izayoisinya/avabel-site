const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");
const body = document.body;

let startX = 0;
let currentX = 0;
let isDragging = false;

// オーバーレイクリックで閉じる
overlay.addEventListener("click", () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("no-scroll");
});

function isPC() {
  return window.innerWidth >= 1024;
}

// タッチ開始
document.addEventListener("touchstart", (e) => {
  if (isPC()) return; // PCでは無効
  startX = e.touches[0].clientX;
  if (startX > window.innerWidth - 80 || nav.classList.contains("active")) {
    isDragging = true;
    nav.style.transition = "none";
  }
});

// タッチ移動
document.addEventListener("touchmove", (e) => {
  if (isPC() || !isDragging) return;
  currentX = e.touches[0].clientX;
  let diff = currentX - startX;
  
  if (!nav.classList.contains("active")) {
    let move = Math.min(100, Math.max(0, 100 - diff));
    nav.style.transform = `translateX(${move}%)`;
  } else {
    let move = Math.min(100, Math.max(0, diff));
    nav.style.transform = `translateX(${move}%)`;
  }
});

// タッチ終了
document.addEventListener("touchend", () => {
  if (isPC() || !isDragging) return;
  let diff = currentX - startX;
  const threshold = window.innerWidth * 0.3;
  
  if (!nav.classList.contains("active") && (diff < -80 || currentX < window.innerWidth - threshold)) {
    nav.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("no-scroll");
  } else if (nav.classList.contains("active") && (diff > 80 || currentX > window.innerWidth - threshold)) {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  }
  
  nav.style.transition = "";
  nav.style.transform = "";
  isDragging = false;
});