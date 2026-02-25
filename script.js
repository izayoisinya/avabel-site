const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

function isPC() {
  return window.innerWidth >= 1024;
}

// 開く
function openMenu() {
  nav.classList.add("active");
  overlay.classList.add("active");
}

// 閉じる
function closeMenu() {
  nav.classList.remove("active");
  overlay.classList.remove("active");
}

// オーバーレイクリック
overlay.addEventListener("click", closeMenu);

// 右端スワイプで開く
document.addEventListener("touchstart", (e) => {
  if (isPC()) return;
  
  const startX = e.touches[0].clientX;
  
  if (startX > window.innerWidth - 40) {
    openMenu();
  }
});

// メニュー内スワイプで閉じる
nav.addEventListener("touchstart", (e) => {
  if (isPC()) return;
  
  const startX = e.touches[0].clientX;
  
  nav.addEventListener("touchend", function handler(ev) {
    const endX = ev.changedTouches[0].clientX;
    
    if (endX > startX + 80) {
      closeMenu();
    }
    
    nav.removeEventListener("touchend", handler);
  });
});