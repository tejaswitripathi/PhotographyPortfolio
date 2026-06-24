const app = document.querySelector("#app");
const mainSlides = [...document.querySelectorAll(".main-slide")];
const pageButtons = [...document.querySelectorAll(".page-button")];
const arrowButtons = [...document.querySelectorAll(".nav-arrow")];
const shootCards = [...document.querySelectorAll(".shoot-card")];
const shootBackgrounds = [...document.querySelectorAll(".shoot-bg")];
const detailStrip = document.querySelector("#detail-strip");
const detailBg = document.querySelector(".detail-bg");
const musicToggle = document.querySelector("#music-toggle");

const clickSound = document.querySelector("#click-sound");
const enterSound = document.querySelector("#enter-sound");
const backSound = document.querySelector("#back-sound");
const mainSound = document.querySelector("#main-sound");

const mainPages = ["about", "selected-shoots", "videography"];
const shoots = [
  {
    slug: "dark_fantasy",
    title: "Dark fantasy",
    music: "assets/selected_shoots/dark_fantasy/hide.opus",
    cover: "assets/selected_shoots/dark_fantasy/cover.jpg",
    images: [
      "assets/selected_shoots/dark_fantasy/_DSC8828.jpg",
      "assets/selected_shoots/dark_fantasy/_DSC8883.jpg",
      "assets/selected_shoots/dark_fantasy/_DSC8899.jpg",
      "assets/selected_shoots/dark_fantasy/_DSC8917.jpg"
    ]
  },
  {
    slug: "orbital_opulence",
    title: "Orbital opulence",
    music: "assets/selected_shoots/orbital_opulence/pain.opus",
    cover: "assets/selected_shoots/orbital_opulence/cover.jpg",
    images: [
      "assets/selected_shoots/orbital_opulence/_DSC0020.jpg",
      "assets/selected_shoots/orbital_opulence/_DSC0096.jpg",
      "assets/selected_shoots/orbital_opulence/_DSC0113.jpg",
      "assets/selected_shoots/orbital_opulence/_DSC9969.jpg"
    ]
  },
  {
    slug: "game_on",
    title: "Game on",
    music: "assets/selected_shoots/game_on/girl_like_me.opus",
    cover: "assets/selected_shoots/game_on/cover.jpg",
    images: [
      "assets/selected_shoots/game_on/_DSC7595.jpg",
      "assets/selected_shoots/game_on/_DSC7648.jpg",
      "assets/selected_shoots/game_on/_DSC7763.jpg",
      "assets/selected_shoots/game_on/_DSC7935.jpg"
    ]
  }
];

const fadeTokens = new WeakMap();
const shootAudio = shoots.map((shoot) => {
  const audio = new Audio(shoot.music);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;
  return audio;
});

let mainIndex = 0;
let shootIndex = 0;
let mode = "main";
let unlockedAudio = false;
let musicMuted = false;

function playOneShot(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function unlockAudio() {
  if (unlockedAudio) return;
  unlockedAudio = true;
  [clickSound, enterSound, backSound, mainSound, ...shootAudio].forEach((audio) => {
    audio.muted = false;
  });
  syncAmbientAudio();
}

function pauseMusic() {
  [mainSound, ...shootAudio].forEach((audio) => {
    if (!audio) return;
    fadeTokens.set(audio, (fadeTokens.get(audio) || 0) + 1);
    audio.pause();
    audio.volume = 0;
  });
}

function updateMusicToggle() {
  musicToggle.setAttribute("aria-pressed", String(musicMuted));
  musicToggle.setAttribute("aria-label", musicMuted ? "Unmute music" : "Mute music");
}

function fadeAudio(audio, targetVolume, duration = 120) {
  if (!audio) return;

  const startVolume = audio.volume;
  const clampedTarget = Math.max(0, Math.min(1, targetVolume));
  const startedAt = performance.now();
  const fadeToken = (fadeTokens.get(audio) || 0) + 1;
  fadeTokens.set(audio, fadeToken);

  if (clampedTarget > 0) {
    audio.play().catch(() => {});
  }

  function tick(now) {
    if (fadeTokens.get(audio) !== fadeToken) return;

    const progress = Math.min((now - startedAt) / duration, 1);
    const nextVolume = startVolume + (clampedTarget - startVolume) * progress;
    audio.volume = Math.max(0, Math.min(1, nextVolume));

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    audio.volume = clampedTarget;
    if (clampedTarget === 0) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  requestAnimationFrame(tick);
}

function syncRoute() {
  const page = mainPages[mainIndex];
  if (mode === "main") {
    history.replaceState(null, "", `#/${page}`);
  } else if (mode === "shoots") {
    history.replaceState(null, "", `#/selected-shoots/${shoots[shootIndex].slug}`);
  } else {
    history.replaceState(null, "", `#/selected-shoots/${shoots[shootIndex].slug}/gallery`);
  }
}

function syncAmbientAudio() {
  if (musicMuted) {
    pauseMusic();
    return;
  }

  if (!unlockedAudio) return;

  if (mode === "main") {
    stopShootAudio();
    fadeAudio(mainSound, .62, 180);
  } else if (mode === "shoots") {
    fadeAudio(mainSound, 0, 110);
    playShootAudio(shootIndex);
  } else {
    fadeAudio(mainSound, 0, 110);
    stopShootAudio();
  }
}

function setMode(nextMode) {
  mode = nextMode;
  app.dataset.mode = nextMode;

  syncAmbientAudio();

  syncRoute();
}

function setMainSlide(nextIndex) {
  mainIndex = Math.max(0, Math.min(mainSlides.length - 1, nextIndex));
  app.dataset.mainSlide = String(mainIndex);

  mainSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === mainIndex);
  });

  if (mode === "main") syncAmbientAudio();

  syncRoute();
}

function openCurrentMainPage() {
  const page = mainPages[mainIndex];

  if (page === "selected-shoots") {
    setMode("shoots");
    return;
  }

  setMode("main");
}

function stopShootAudio() {
  shootAudio.forEach((audio) => fadeAudio(audio, 0, 90));
}

function playShootAudio(index) {
  if (musicMuted || !unlockedAudio) return;

  shootAudio.forEach((audio, audioIndex) => {
    fadeAudio(audio, audioIndex === index ? .72 : 0, audioIndex === index ? 110 : 80);
  });
}

function setShoot(nextIndex) {
  const clampedIndex = Math.max(0, Math.min(shoots.length - 1, nextIndex));
  if (clampedIndex === shootIndex && mode === "shoots") return;

  shootIndex = clampedIndex;
  app.dataset.shoot = String(shootIndex);

  shootCards.forEach((card, index) => {
    card.classList.toggle("is-active", index === shootIndex);
    card.classList.toggle("is-previous", index < shootIndex);
    card.classList.toggle("is-next", index === shootIndex + 1);
    card.classList.toggle("is-after", index > shootIndex + 1);
  });

  shootBackgrounds.forEach((bg, index) => {
    bg.classList.toggle("is-active", index === shootIndex);
  });

  if (mode === "shoots") {
    playShootAudio(shootIndex);
  }

  syncRoute();
}

function openShoot() {
  const shoot = shoots[shootIndex];
  detailBg.style.backgroundImage = `url("${shoot.cover}")`;
  detailStrip.replaceChildren();

  shoot.images.forEach((src) => {
    const image = document.createElement("img");
    image.src = src;
    image.alt = shoot.title;
    detailStrip.append(image);
  });

  setMode("detail");
  requestAnimationFrame(() => {
    detailStrip.scrollTo({ left: 0, behavior: "instant" });
  });
}

function closeShoot() {
  setMode("shoots");
}

function handleArrow(direction) {
  unlockAudio();

  if (mode === "detail") {
    playOneShot(direction === "left" ? backSound : clickSound);
    if (direction === "left") closeShoot();
    return;
  }

  if (mode === "shoots") {
    if (direction === "left") {
      playOneShot(backSound);
      returnFromShoots();
      return;
    }

    playOneShot(clickSound);
    if (direction === "up") setShoot(shootIndex - 1);
    if (direction === "down") setShoot(shootIndex + 1);
    if (direction === "right") {
      setMainSlide(2);
      setMode("main");
    }
    return;
  }

  playOneShot(clickSound);
  if (direction === "left") setMainSlide(mainIndex - 1);
  if (direction === "right") setMainSlide(mainIndex + 1);
}

function returnFromShoots() {
  setMainSlide(0);
  setMode("main");
}

function handleEnter() {
  unlockAudio();
  playOneShot(enterSound);

  if (mode === "shoots") {
    openShoot();
    return;
  }

  if (mode === "detail") {
    closeShoot();
    return;
  }

  openCurrentMainPage();
}

document.addEventListener("keydown", (event) => {
  const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"];
  if (!keys.includes(event.key)) return;

  event.preventDefault();

  if (event.key === "ArrowLeft") handleArrow("left");
  if (event.key === "ArrowRight") handleArrow("right");
  if (event.key === "ArrowUp") handleArrow("up");
  if (event.key === "ArrowDown") handleArrow("down");
  if (event.key === "Enter") handleEnter();
});

document.addEventListener("pointerdown", unlockAudio, { once: true });

musicToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  unlockAudio();
  musicMuted = !musicMuted;
  updateMusicToggle();

  if (musicMuted) {
    pauseMusic();
  } else {
    syncAmbientAudio();
  }
});

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    unlockAudio();
    playOneShot(enterSound);
    openCurrentMainPage();
  });
});

arrowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    unlockAudio();
    playOneShot(clickSound);

    if (action === "previous-main") setMainSlide(mainIndex - 1);
    if (action === "next-main") setMainSlide(mainIndex + 1);
    if (action === "close-shoot") closeShoot();
  });
});

document.querySelector(".shoots-back").addEventListener("click", () => {
  unlockAudio();
  playOneShot(backSound);
  returnFromShoots();
});

shootCards.forEach((card) => {
  const index = Number(card.dataset.shootIndex);

  card.addEventListener("pointerenter", () => {
    unlockAudio();
    setShoot(index);
  });

  card.addEventListener("focus", () => {
    unlockAudio();
    setShoot(index);
  });

  card.querySelector(".shoot-button").addEventListener("click", (event) => {
    event.stopPropagation();
    unlockAudio();
    playOneShot(enterSound);
    setShoot(index);
    openShoot();
  });

  card.querySelectorAll(".shoot-step").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      unlockAudio();
      playOneShot(clickSound);
      setShoot(index);

      if (button.dataset.action === "previous-shoot") {
        setShoot(shootIndex - 1);
      }

      if (button.dataset.action === "next-shoot") {
        setShoot(shootIndex + 1);
      }
    });
  });
});

function hydrateFromHash() {
  const [, page, shootSlug, gallery] = window.location.hash.split("/");

  if (page === "selected-shoots") {
    const foundShoot = shoots.findIndex((shoot) => shoot.slug === shootSlug);
    mainIndex = 1;
    setMainSlide(1);
    setShoot(foundShoot >= 0 ? foundShoot : 0);
    setMode(gallery ? "detail" : "shoots");
    if (gallery) openShoot();
    return;
  }

  if (page === "videography") {
    setMainSlide(2);
    setMode("main");
    return;
  }

  setMainSlide(0);
  setMode("main");
}

window.addEventListener("hashchange", hydrateFromHash);
updateMusicToggle();
hydrateFromHash();
