const app = document.querySelector("#app");
const mainSlides = [...document.querySelectorAll(".main-slide")];
const pageButtons = [...document.querySelectorAll(".page-button")];
const arrowButtons = [...document.querySelectorAll(".nav-arrow")];
const shootCards = [...document.querySelectorAll(".shoot-card")];
const shootBackgrounds = [...document.querySelectorAll(".shoot-bg")];
const detailStrip = document.querySelector("#detail-strip");
const detailBg = document.querySelector(".detail-bg");
const musicToggle = document.querySelector("#music-toggle");
const aboutDetail = document.querySelector("#about-detail");
const aboutCopy = document.querySelector("#about-copy");
const aboutUp = document.querySelector("#about-up");
const aboutDown = document.querySelector("#about-down");
const contactButton = document.querySelector("#contact-button");
const instagramLink = document.querySelector("#instagram-link");
const checkItOutButton = document.querySelector("#check-it-out");
const orbitalDetail = document.querySelector("#orbital-detail");
const orbitalVideo = document.querySelector("#orbital-bg");
const orbitalGrid = document.querySelector("#orbital-grid");
const orbitalSkip = document.querySelector("#orbital-skip");
const orbitalLightbox = document.querySelector("#orbital-lightbox");
const orbitalLightboxImg = document.querySelector("#orbital-lightbox-img");
const gameDetail = document.querySelector("#game-detail");
const gameBg = document.querySelector("#game-bg");
const gameSkip = document.querySelector("#game-skip");
const gameCarousel = document.querySelector("#game-carousel");
const gamePrev = document.querySelector("#game-prev");
const gameNext = document.querySelector("#game-next");
const gameMeta = document.querySelector("#game-meta");
const gameLightbox = document.querySelector("#game-lightbox");
const gameLightboxImg = document.querySelector("#game-lightbox-img");
const visualVideos = [...document.querySelectorAll("video")];

const clickSound = document.querySelector("#click-sound");
const enterSound = document.querySelector("#enter-sound");
const backSound = document.querySelector("#back-sound");
const mainSound = document.querySelector("#main-sound");

const mainPages = ["about", "selected-shoots", "videography"];
const youtubeUrl = "https://www.youtube.com/watch?v=KhVcjx1VHxk";
const orbitalRevealSeconds = 16;
const orbitalOpeningSrc = "assets/selected_shoots/orbital_opulence/background.avif";
const orbitalLoopSrc = "assets/selected_shoots/orbital_opulence/background_loop.avif";
const gameRevealSeconds = 25;
const gameOpeningSeconds = 30;
const gameOpeningSrc = "assets/selected_shoots/game_on/opening.avif";
const gameLoopSrc = "assets/selected_shoots/game_on/opening_loop.avif";
const orbitalImages = [
  "cover.avif",
  "_DSC0020.avif",
  "_DSC0096.avif",
  "_DSC9969.avif",
  "_DSC0113.avif"
];
const orbitalImageShapes = {
  "cover.avif": "portrait",
  "_DSC0020.avif": "portrait",
  "_DSC0096.avif": "landscape",
  "_DSC9969.avif": "portrait",
  "_DSC0113.avif": "portrait"
};
const gameImages = [
  "cover.avif",
  "_DSC7595.avif",
  "_DSC7648.avif",
  "_DSC7763.avif",
  "_DSC7935.avif"
];
const gameImageShapes = {
  "cover.avif": "portrait",
  "_DSC7595.avif": "portrait",
  "_DSC7648.avif": "portrait",
  "_DSC7763.avif": "landscape",
  "_DSC7935.avif": "landscape"
};
const shoots = [
  {
    slug: "dark_fantasy",
    title: "Dark fantasy",
    music: "assets/selected_shoots/dark_fantasy/hide.opus",
    cover: "assets/selected_shoots/dark_fantasy/cover.avif",
    images: [
      "assets/selected_shoots/dark_fantasy/_DSC8828.avif",
      "assets/selected_shoots/dark_fantasy/_DSC8883.avif",
      "assets/selected_shoots/dark_fantasy/_DSC8899.avif",
      "assets/selected_shoots/dark_fantasy/_DSC8917.avif"
    ]
  },
  {
    slug: "orbital_opulence",
    title: "Orbital opulence",
    music: "assets/selected_shoots/orbital_opulence/pain.opus",
    cover: "assets/selected_shoots/orbital_opulence/cover.avif",
    images: [
      "assets/selected_shoots/orbital_opulence/_DSC0020.avif",
      "assets/selected_shoots/orbital_opulence/_DSC0096.avif",
      "assets/selected_shoots/orbital_opulence/_DSC0113.avif",
      "assets/selected_shoots/orbital_opulence/_DSC9969.avif"
    ]
  },
  {
    slug: "game_on",
    title: "Game on",
    music: "assets/selected_shoots/game_on/girl_like_me.opus",
    cover: "assets/selected_shoots/game_on/cover.avif",
    images: [
      "assets/selected_shoots/game_on/_DSC7595.avif",
      "assets/selected_shoots/game_on/_DSC7648.avif",
      "assets/selected_shoots/game_on/_DSC7763.avif",
      "assets/selected_shoots/game_on/_DSC7935.avif"
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
const orbitalAudio = new Audio("assets/selected_shoots/orbital_opulence/nightvision.opus");
orbitalAudio.loop = true;
orbitalAudio.preload = "auto";
orbitalAudio.volume = 0;
const gameOpeningAudio = new Audio("assets/selected_shoots/game_on/opening_audio.opus");
gameOpeningAudio.loop = false;
gameOpeningAudio.preload = "auto";
gameOpeningAudio.volume = 0;
const gameAmbienceAudio = new Audio("assets/selected_shoots/game_on/ambience.opus");
gameAmbienceAudio.loop = true;
gameAmbienceAudio.preload = "auto";
gameAmbienceAudio.volume = 0;

let mainIndex = 0;
let shootIndex = 0;
let aboutIndex = 0;
let mode = "main";
let unlockedAudio = false;
let musicMuted = false;
let aboutTextTimer;
let openingExternalFromKeyboard = false;
let orbitalSelectedIndex = 0;
let gameSelectedIndex = 0;
let gameReady = false;
let gameLooping = false;
let orbitalMetadata = {
  "cover.avif": {
    camera: "Sony a7 IV",
    lens: "Sony FE 35mm f1.8",
    "shutter speed": "1/80",
    ISO: "1600",
    models: ["kennedy00928"]
  },
  "_DSC0020.avif": {
    camera: "Sony a7 IV",
    lens: "Sony FE 35mm f1.8",
    "shutter speed": "1/40",
    ISO: "5000",
    models: ["kennedy00928", "mk_goddesssss", "shy_town15"]
  },
  "_DSC0096.avif": {
    camera: "Sony a7 IV",
    lens: "Sony FE 35mm f1.8",
    "shutter speed": "1/60",
    ISO: "3200",
    models: ["kai1shere_", "mk_goddesssss"]
  },
  "_DSC9969.avif": {
    camera: "Sony a7 IV",
    lens: "Sony FE 35mm f1.8",
    "shutter speed": "1/80",
    ISO: "1600",
    models: ["ava_lynn003"]
  },
  "_DSC0113.avif": {
    camera: "Sony a7 IV",
    lens: "Sony FE 35mm f1.8",
    "shutter speed": "1/13",
    ISO: "160",
    models: ["mk_goddesssss"]
  },
  display: "Shot on {camera}, {lens} \n ISO {ISO}, {shutter speed} \n Model(s): {models}"
};
let orbitalRevealTimer;
let gameRevealTimer;
let gameOpeningTimer;
let gameMetadata = {
  "cover.avif": {
    camera: "Sony a7 IV",
    lens: "Sony E 16mm f2.8 with fisheye",
    "shutter speed": "1/30",
    ISO: "2000",
    models: ["m0staa_"]
  },
  "_DSC7595.avif": {
    camera: "Sony a7 IV",
    lens: "Sony E 16mm f2.8 with fisheye",
    "shutter speed": "1/30",
    ISO: "5000",
    models: ["maya.bhatii"]
  },
  "_DSC7648.avif": {
    camera: "Sony a7 IV",
    lens: "Sony E 16mm f2.8 with fisheye",
    "shutter speed": "1/30",
    ISO: "3200",
    models: ["joshywoshyboii"]
  },
  "_DSC7763.avif": {
    camera: "Sony a7 IV",
    lens: "Sony E 16mm f2.8 with fisheye",
    "shutter speed": "1/50",
    ISO: "2500",
    models: ["_yerin_yun"]
  },
  "_DSC7935.avif": {
    camera: "Sony a7 IV",
    lens: "Sony E 16mm f2.8 with fisheye",
    "shutter speed": "1/30",
    ISO: "2000",
    models: ["_yerin_yun", "weocam"]
  },
  display: "Shot on {camera}, {lens} \n ISO {ISO}, {shutter speed} \n Model(s): {models}"
};
let aboutChunks = [
  "Hi! My name is Tejaswi Tripathi, and I'm a fashion editorial photographer, as well as a videographer. I specialize in cinematic, story-driven shoots, although I like to do a little bit of everything.",
  "Currently, I'm the co-Photo/Video Director of The Fashion Network at University of Illinois, Urbana-Champaign, where I've helped produce 6 editorial shoots with over 20 models for publication.",
  "If you're interested in collaborating, if you'd like grad photos-any photography needs, really-feel free to contact me through Instagram!"
];

function playOneShot(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function playVisualVideo(video) {
  if (!video) return;
  video.play().catch(() => {});
}

function playVisualVideos() {
  visualVideos.forEach(playVisualVideo);
}

function setVideoAsset(video, posterSrc, options = {}) {
  if (!video) return;

  const { restart = false, loop = true } = options;
  const base = posterSrc.replace(/\.[^/.]+$/, "");
  const cacheToken = restart ? `?reset=${Date.now()}` : "";
  const sourceByType = {
    "video/webm": `${base}.webm${cacheToken}`,
    "video/mp4": `${base}.mp4${cacheToken}`
  };

  video.loop = loop;
  video.poster = posterSrc;
  video.querySelectorAll("source").forEach((source) => {
    const nextSrc = sourceByType[source.type];
    if (nextSrc) source.src = nextSrc;
  });
  video.load();
  video.currentTime = 0;
  playVisualVideo(video);
}

function clearVideoAsset(video) {
  if (!video) return;

  video.pause();
  video.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
  video.removeAttribute("src");
  video.load();
}

function unlockAudio() {
  if (unlockedAudio) return;
  unlockedAudio = true;
  [clickSound, enterSound, backSound, mainSound, orbitalAudio, gameOpeningAudio, gameAmbienceAudio, ...shootAudio].forEach((audio) => {
    audio.muted = false;
  });
  playVisualVideos();
  syncAmbientAudio();
}

function pauseMusic() {
  [mainSound, orbitalAudio, gameOpeningAudio, gameAmbienceAudio, ...shootAudio].forEach((audio) => {
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

function toggleMusicMute() {
  unlockAudio();
  musicMuted = !musicMuted;
  updateMusicToggle();

  if (musicMuted) {
    pauseMusic();
  } else {
    syncAmbientAudio();
  }
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
  } else if (mode === "about") {
    history.replaceState(null, "", `#/about/page/${aboutIndex + 1}`);
  } else if (mode === "video") {
    history.replaceState(null, "", "#/videography/preview");
  } else if (mode === "orbital") {
    history.replaceState(null, "", "#/selected-shoots/orbital_opulence/gallery");
  } else if (mode === "game") {
    history.replaceState(null, "", "#/selected-shoots/game_on/gallery");
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

  if (mode === "main" || mode === "about" || mode === "video") {
    fadeAudio(orbitalAudio, 0, 110);
    fadeAudio(gameOpeningAudio, 0, 110);
    fadeAudio(gameAmbienceAudio, 0, 110);
    stopShootAudio();
    fadeAudio(mainSound, .62, 180);
  } else if (mode === "shoots") {
    fadeAudio(mainSound, 0, 110);
    fadeAudio(orbitalAudio, 0, 110);
    fadeAudio(gameOpeningAudio, 0, 110);
    fadeAudio(gameAmbienceAudio, 0, 110);
    playShootAudio(shootIndex);
  } else if (mode === "orbital") {
    fadeAudio(mainSound, 0, 110);
    fadeAudio(gameOpeningAudio, 0, 110);
    fadeAudio(gameAmbienceAudio, 0, 110);
    stopShootAudio();
    fadeAudio(orbitalAudio, .74, 180);
  } else if (mode === "game") {
    fadeAudio(mainSound, 0, 110);
    fadeAudio(orbitalAudio, 0, 110);
    stopShootAudio();
    if (gameLooping) {
      fadeAudio(gameOpeningAudio, 0, 110);
      fadeAudio(gameAmbienceAudio, .7, 180);
    } else {
      fadeAudio(gameAmbienceAudio, 0, 110);
      fadeAudio(gameOpeningAudio, .82, 180);
    }
  } else {
    fadeAudio(mainSound, 0, 110);
    fadeAudio(orbitalAudio, 0, 110);
    fadeAudio(gameOpeningAudio, 0, 110);
    fadeAudio(gameAmbienceAudio, 0, 110);
    stopShootAudio();
  }
}

function setMode(nextMode) {
  mode = nextMode;
  app.dataset.mode = nextMode;

  playVisualVideos();
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

  if (page === "about") {
    openAbout();
    return;
  }

  if (page === "selected-shoots") {
    setMode("shoots");
    return;
  }

  if (page === "videography") {
    openVideo();
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
  if (shoots[shootIndex].slug === "orbital_opulence") {
    openOrbital();
    return;
  }

  if (shoots[shootIndex].slug === "game_on") {
    openGame();
    return;
  }

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

function formatShootMetadata(metadataSource, fileName) {
  const metadata = metadataSource[fileName] || {};
  const display = metadataSource.display || "Shot on {camera}, {lens} \n ISO {ISO}, {shutter speed} \n Model(s): {models}";
  const modelsMarker = "__MODELS__";
  const text = display
    .replace("{camera}", metadata.camera || "")
    .replace("{lens}", metadata.lens || "")
    .replace("{ISO}", metadata.ISO || "")
    .replace("{shutter speed}", metadata["shutter speed"] || "")
    .replace("{models}", modelsMarker);
  const fragment = document.createDocumentFragment();

  text.split("\n").forEach((line, lineIndex) => {
    if (lineIndex > 0) fragment.append(document.createElement("br"));

    if (!line.includes(modelsMarker)) {
      fragment.append(document.createTextNode(line));
      return;
    }

    const [before, after] = line.split(modelsMarker);
    fragment.append(document.createTextNode(before));
    (metadata.models || []).forEach((model, modelIndex) => {
      if (modelIndex > 0) fragment.append(document.createTextNode(", "));
      const link = document.createElement("a");
      link.href = `https://www.instagram.com/${model}`;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = `@${model}`;
      fragment.append(link);
    });
    fragment.append(document.createTextNode(after || ""));
  });

  return fragment;
}

function formatOrbitalMetadata(fileName) {
  return formatShootMetadata(orbitalMetadata, fileName);
}

function formatGameMetadata(fileName) {
  return formatShootMetadata(gameMetadata, fileName);
}

function buildOrbitalGrid() {
  if (orbitalGrid.childElementCount) return;

  orbitalImages.forEach((fileName, index) => {
    const item = document.createElement("article");
    item.className = "orbital-item";
    item.dataset.index = String(index);

    const button = document.createElement("button");
    button.className = "orbital-image-button";
    button.type = "button";
    button.setAttribute("aria-label", `Select Orbital Opulence image ${index + 1}`);

    const image = document.createElement("img");
    image.src = `assets/selected_shoots/orbital_opulence/${fileName}`;
    image.alt = "Orbital Opulence";
    image.className = `is-${orbitalImageShapes[fileName] || "portrait"}`;
    button.append(image);

    const meta = document.createElement("div");
    meta.className = "orbital-meta";
    meta.append(formatOrbitalMetadata(fileName));

    item.append(button, meta);
    orbitalGrid.append(item);

    item.addEventListener("pointerenter", () => selectOrbitalImage(index));
    button.addEventListener("focus", () => selectOrbitalImage(index));
    button.addEventListener("click", () => {
      selectOrbitalImage(index);
      openOrbitalLightbox();
    });
  });
}

function selectOrbitalImage(index) {
  orbitalSelectedIndex = Math.max(0, Math.min(orbitalImages.length - 1, index));
  [...orbitalGrid.querySelectorAll(".orbital-item")].forEach((item, itemIndex) => {
    item.classList.toggle("is-selected", itemIndex === orbitalSelectedIndex);
  });
  orbitalGrid.querySelector(".orbital-item.is-selected")?.scrollIntoView({
    block: "nearest",
    inline: "nearest",
    behavior: "smooth"
  });
}

function revealOrbitalGrid() {
  orbitalDetail.classList.add("is-revealed");
  selectOrbitalImage(orbitalSelectedIndex);
}

function openOrbitalLightbox() {
  const fileName = orbitalImages[orbitalSelectedIndex];
  orbitalLightboxImg.src = `assets/selected_shoots/orbital_opulence/${fileName}`;
  orbitalDetail.classList.add("is-zoomed");
  orbitalLightbox.setAttribute("aria-hidden", "false");
}

function closeOrbitalLightbox() {
  orbitalDetail.classList.remove("is-zoomed");
  orbitalLightbox.setAttribute("aria-hidden", "true");
}

function switchOrbitalVideo(src, shouldRestart = false, shouldLoop = false) {
  setVideoAsset(orbitalVideo, src, {
    restart: shouldRestart,
    loop: shouldLoop
  });
}

function skipOrbitalOpening() {
  clearTimeout(orbitalRevealTimer);
  switchOrbitalVideo(orbitalLoopSrc, true, true);
  revealOrbitalGrid();
}

function openOrbital() {
  buildOrbitalGrid();
  shootIndex = 1;
  app.dataset.shoot = "1";
  orbitalSelectedIndex = 0;
  orbitalDetail.classList.remove("is-revealed");
  closeOrbitalLightbox();
  selectOrbitalImage(orbitalSelectedIndex);
  clearTimeout(orbitalRevealTimer);
  setMode("orbital");
  switchOrbitalVideo(orbitalOpeningSrc, true, false);
  orbitalRevealTimer = setTimeout(revealOrbitalGrid, orbitalRevealSeconds * 1000);
}

function closeOrbital() {
  clearTimeout(orbitalRevealTimer);
  orbitalDetail.classList.remove("is-revealed");
  closeOrbitalLightbox();
  setMode("shoots");
}

function moveOrbitalSelection(direction) {
  if (orbitalDetail.classList.contains("is-zoomed")) {
    if (direction === "left") {
      playOneShot(backSound);
    } else {
      playOneShot(clickSound);
    }
    closeOrbitalLightbox();
    return;
  }

  if (!orbitalDetail.classList.contains("is-revealed")) {
    if (direction === "right") {
      playOneShot(clickSound);
      skipOrbitalOpening();
      return;
    }

    if (direction === "left") {
      playOneShot(backSound);
      closeOrbital();
      return;
    }

    playOneShot(clickSound);
    return;
  }

  const columns = 3;
  let nextIndex = orbitalSelectedIndex;

  if (direction === "left") {
    if (orbitalSelectedIndex === 0) {
      playOneShot(backSound);
      closeOrbital();
      return;
    }
    nextIndex = orbitalSelectedIndex - 1;
  }

  if (direction === "right") {
    nextIndex = Math.min(orbitalImages.length - 1, orbitalSelectedIndex + 1);
  }

  if (direction === "up") {
    nextIndex = Math.max(0, orbitalSelectedIndex - columns);
  }

  if (direction === "down") {
    const downIndex = orbitalSelectedIndex + columns;
    nextIndex = downIndex < orbitalImages.length ? downIndex : orbitalSelectedIndex;
  }

  if (nextIndex !== orbitalSelectedIndex) {
    playOneShot(clickSound);
    selectOrbitalImage(nextIndex);
  } else {
    playOneShot(clickSound);
  }
}

function buildGameCarousel() {
  if (gameCarousel.childElementCount) return;

  gameImages.forEach((fileName, index) => {
    const button = document.createElement("button");
    button.className = `game-frame is-${gameImageShapes[fileName] || "portrait"}`;
    button.type = "button";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", `Select Game On image ${index + 1}`);

    const image = document.createElement("img");
    image.src = `assets/selected_shoots/game_on/${fileName}`;
    image.alt = "Game On";
    button.append(image);

    button.addEventListener("pointerenter", () => selectGameImage(index));
    button.addEventListener("focus", () => selectGameImage(index));
    button.addEventListener("click", () => selectGameImage(index));

    gameCarousel.append(button);
  });
}

function updateGameMetadata() {
  const fileName = gameImages[gameSelectedIndex];
  gameMeta.replaceChildren(formatGameMetadata(fileName));
}

function selectGameImage(index) {
  const imageCount = gameImages.length;
  gameSelectedIndex = Math.max(0, Math.min(imageCount - 1, index));

  [...gameCarousel.querySelectorAll(".game-frame")].forEach((frame, frameIndex) => {
    const offset = frameIndex - gameSelectedIndex;
    frame.classList.toggle("is-current", offset === 0);
    frame.classList.toggle("is-prev", offset === -1);
    frame.classList.toggle("is-next", offset === 1);
    frame.classList.toggle("is-hidden", Math.abs(offset) > 1);
  });

  gamePrev.hidden = gameSelectedIndex === 0;
  gameNext.hidden = gameSelectedIndex === imageCount - 1;
  updateGameMetadata();
}

function switchGameVideo(src, shouldRestart = false, shouldLoop = false) {
  setVideoAsset(gameBg, src, {
    restart: shouldRestart,
    loop: shouldLoop
  });
}

function revealGameGallery() {
  if (gameReady) return;

  gameReady = true;
  clearTimeout(gameRevealTimer);
  gameDetail.classList.add("is-ready");
  selectGameImage(gameSelectedIndex);
}

function completeGameOpening() {
  if (gameLooping) return;

  revealGameGallery();
  gameLooping = true;
  clearTimeout(gameOpeningTimer);
  gameAmbienceAudio.currentTime = 0;
  switchGameVideo(gameLoopSrc, true, true);
  syncAmbientAudio();
}

function openGameLightbox() {
  const fileName = gameImages[gameSelectedIndex];
  gameLightboxImg.src = `assets/selected_shoots/game_on/${fileName}`;
  gameDetail.classList.add("is-zoomed");
  gameLightbox.setAttribute("aria-hidden", "false");
}

function closeGameLightbox() {
  gameDetail.classList.remove("is-zoomed");
  gameLightbox.setAttribute("aria-hidden", "true");
}

function openGame() {
  buildGameCarousel();
  shootIndex = 2;
  app.dataset.shoot = "2";
  gameSelectedIndex = 0;
  gameReady = false;
  gameLooping = false;
  gameDetail.classList.remove("is-ready", "is-zoomed");
  closeGameLightbox();
  clearTimeout(gameRevealTimer);
  clearTimeout(gameOpeningTimer);
  switchGameVideo(gameOpeningSrc, true, false);
  gameOpeningAudio.currentTime = 0;
  gameAmbienceAudio.currentTime = 0;
  selectGameImage(gameSelectedIndex);
  setMode("game");
  gameRevealTimer = setTimeout(revealGameGallery, gameRevealSeconds * 1000);
  gameOpeningTimer = setTimeout(completeGameOpening, gameOpeningSeconds * 1000);
}

function closeGame() {
  clearTimeout(gameRevealTimer);
  clearTimeout(gameOpeningTimer);
  gameReady = false;
  gameLooping = false;
  closeGameLightbox();
  gameDetail.classList.remove("is-ready");
  clearVideoAsset(gameBg);
  setMode("shoots");
}

function skipGameOpening() {
  playOneShot(clickSound);
  completeGameOpening();
}

function moveGameSelection(direction) {
  if (gameDetail.classList.contains("is-zoomed")) {
    playOneShot(direction === "left" ? backSound : clickSound);
    closeGameLightbox();
    return;
  }

  if (!gameReady) {
    if (direction === "left") {
      playOneShot(backSound);
      closeGame();
      return;
    }

    if (direction === "right") {
      skipGameOpening();
      return;
    }

    playOneShot(clickSound);
    return;
  }

  if (direction === "left") {
    if (gameSelectedIndex === 0) {
      playOneShot(backSound);
      closeGame();
      return;
    }

    playOneShot(clickSound);
    selectGameImage(gameSelectedIndex - 1);
    return;
  }

  if (direction === "right") {
    if (gameSelectedIndex === gameImages.length - 1) {
      return;
    }

    playOneShot(clickSound);
    selectGameImage(gameSelectedIndex + 1);
    return;
  }

  playOneShot(clickSound);
}

function updateAboutControls() {
  aboutUp.hidden = aboutIndex === 0;
  aboutDown.hidden = aboutIndex === aboutChunks.length - 1;
}

function hideInstagramLink() {
  aboutDetail.classList.remove("is-contact");
  instagramLink.hidden = true;
}

function setAboutText(nextIndex, animate = mode === "about", force = false) {
  const clampedIndex = Math.max(0, Math.min(aboutChunks.length - 1, nextIndex));
  if (!force && clampedIndex === aboutIndex && aboutCopy.textContent) {
    hideInstagramLink();
    updateAboutControls();
    return;
  }

  clearTimeout(aboutTextTimer);
  hideInstagramLink();
  aboutIndex = clampedIndex;

  function applyText() {
    aboutCopy.textContent = aboutChunks[aboutIndex] || "";
    updateAboutControls();
    requestAnimationFrame(() => aboutCopy.classList.remove("is-changing"));
  }

  if (animate) {
    aboutCopy.classList.add("is-changing");
    aboutTextTimer = setTimeout(applyText, 120);
  } else {
    aboutCopy.classList.remove("is-changing");
    applyText();
  }

  if (mode === "about") syncRoute();
}

function openAbout(index = 0) {
  mainIndex = 0;
  app.dataset.mainSlide = "0";
  hideInstagramLink();
  setAboutText(index, false);
  setMode("about");
}

function closeAbout() {
  setMainSlide(0);
  setMode("main");
}

function openVideo() {
  mainIndex = 2;
  app.dataset.mainSlide = "2";
  setMode("video");
}

function closeVideo() {
  setMainSlide(2);
  setMode("main");
}

function showInstagramLink() {
  aboutDetail.classList.add("is-contact");
  instagramLink.hidden = false;
}

function prepareExternalLinkOpen() {
  musicMuted = true;
  updateMusicToggle();
  pauseMusic();
}

function openYoutubeVideo() {
  prepareExternalLinkOpen();
  openingExternalFromKeyboard = true;
  checkItOutButton.click();
  openingExternalFromKeyboard = false;
}

function handleArrow(direction) {
  unlockAudio();

  if (mode === "about") {
    if (direction === "left") {
      playOneShot(backSound);
      if (aboutDetail.classList.contains("is-contact")) {
        hideInstagramLink();
        return;
      }
      closeAbout();
      return;
    }

    playOneShot(clickSound);
    if (direction === "up") setAboutText(aboutIndex - 1, true);
    if (direction === "down") setAboutText(aboutIndex + 1, true);
    return;
  }

  if (mode === "video") {
    if (direction === "left") {
      playOneShot(backSound);
      closeVideo();
      return;
    }

    playOneShot(clickSound);
    return;
  }

  if (mode === "orbital") {
    moveOrbitalSelection(direction);
    return;
  }

  if (mode === "game") {
    moveGameSelection(direction);
    return;
  }

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
    return;
  }

  playOneShot(clickSound);
  if (direction === "left") setMainSlide(mainIndex - 1);
  if (direction === "right") setMainSlide(mainIndex + 1);
}

function returnFromShoots() {
  setMainSlide(1);
  setMode("main");
}

function handleEnter() {
  unlockAudio();
  playOneShot(enterSound);

  if (mode === "about") {
    showInstagramLink();
    return;
  }

  if (mode === "video") {
    openYoutubeVideo();
    return;
  }

  if (mode === "shoots") {
    openShoot();
    return;
  }

  if (mode === "detail") {
    closeShoot();
    return;
  }

  if (mode === "orbital") {
    if (orbitalDetail.classList.contains("is-zoomed")) {
      closeOrbitalLightbox();
      return;
    }

    if (orbitalDetail.classList.contains("is-revealed")) {
      openOrbitalLightbox();
    }
    return;
  }

  if (mode === "game") {
    if (gameDetail.classList.contains("is-zoomed")) {
      closeGameLightbox();
      return;
    }

    if (!gameReady) {
      completeGameOpening();
      return;
    }

    openGameLightbox();
    return;
  }

  openCurrentMainPage();
}

document.addEventListener("keydown", (event) => {
  const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", "Escape"];
  const isMuteKey = event.key.toLowerCase() === "m";
  if (!keys.includes(event.key) && !isMuteKey) return;

  event.preventDefault();

  if (isMuteKey) {
    toggleMusicMute();
    return;
  }

  if (event.key === "Escape" && mode === "orbital" && orbitalDetail.classList.contains("is-zoomed")) {
    unlockAudio();
    playOneShot(backSound);
    closeOrbitalLightbox();
    return;
  }

  if (event.key === "Escape" && mode === "game") {
    unlockAudio();
    playOneShot(backSound);
    if (gameDetail.classList.contains("is-zoomed")) {
      closeGameLightbox();
      return;
    }
    closeGame();
    return;
  }

  if (event.key === "ArrowLeft") handleArrow("left");
  if (event.key === "ArrowRight") handleArrow("right");
  if (event.key === "ArrowUp") handleArrow("up");
  if (event.key === "ArrowDown") handleArrow("down");
  if (event.key === "Enter") handleEnter();
});

document.addEventListener("pointerdown", unlockAudio, { once: true });

musicToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMusicMute();
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

document.querySelector(".about-detail-back").addEventListener("click", () => {
  unlockAudio();
  playOneShot(backSound);
  closeAbout();
});

document.querySelector(".video-detail-back").addEventListener("click", () => {
  unlockAudio();
  playOneShot(backSound);
  closeVideo();
});

aboutUp.addEventListener("click", () => {
  unlockAudio();
  playOneShot(clickSound);
  setAboutText(aboutIndex - 1, true);
});

aboutDown.addEventListener("click", () => {
  unlockAudio();
  playOneShot(clickSound);
  setAboutText(aboutIndex + 1, true);
});

contactButton.addEventListener("click", () => {
  unlockAudio();
  playOneShot(enterSound);
  showInstagramLink();
});

checkItOutButton.addEventListener("click", () => {
  unlockAudio();
  if (!openingExternalFromKeyboard) {
    playOneShot(enterSound);
  }
  prepareExternalLinkOpen();
});

orbitalSkip.addEventListener("click", () => {
  unlockAudio();
  playOneShot(clickSound);
  skipOrbitalOpening();
});

orbitalLightbox.addEventListener("click", () => {
  unlockAudio();
  playOneShot(backSound);
  closeOrbitalLightbox();
});

orbitalVideo.addEventListener("ended", () => {
  if (mode === "orbital" && !orbitalVideo.loop) {
    switchOrbitalVideo(orbitalLoopSrc, true, true);
  }
});

document.querySelector(".game-detail-back").addEventListener("click", () => {
  unlockAudio();
  playOneShot(backSound);
  closeGame();
});

gameSkip.addEventListener("click", () => {
  unlockAudio();
  skipGameOpening();
});

gameLightbox.addEventListener("click", () => {
  unlockAudio();
  playOneShot(backSound);
  closeGameLightbox();
});

gameBg.addEventListener("ended", () => {
  if (mode === "game" && !gameLooping) {
    completeGameOpening();
  }
});

gamePrev.addEventListener("click", () => {
  unlockAudio();
  moveGameSelection("left");
});

gameNext.addEventListener("click", () => {
  unlockAudio();
  moveGameSelection("right");
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

fetch("assets/about/about.txt")
  .then((response) => response.text())
  .then((text) => {
    const normalizedText = text.replace(/\\n/g, "\n");
    const chunks = normalizedText
      .split(/\n\s*\n/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    if (chunks.length) {
      aboutChunks = chunks;
      setAboutText(aboutIndex, false, true);
    }
  })
  .catch(() => {});

fetch("assets/selected_shoots/orbital_opulence/metadata.json")
  .then((response) => response.json())
  .then((metadata) => {
    orbitalMetadata = metadata || {};
    orbitalGrid.replaceChildren();
    buildOrbitalGrid();
    selectOrbitalImage(orbitalSelectedIndex);
  })
  .catch(() => {});

fetch("assets/selected_shoots/game_on/metadata.json")
  .then((response) => response.json())
  .then((metadata) => {
    gameMetadata = metadata || {};
    gameCarousel.replaceChildren();
    buildGameCarousel();
    selectGameImage(gameSelectedIndex);
  })
  .catch(() => {});

function hydrateFromHash() {
  const [, page, shootSlug, gallery] = window.location.hash.split("/");

  if (page === "about" && shootSlug === "page") {
    const aboutPageIndex = Math.max(0, Number(gallery || 1) - 1);
    openAbout(aboutPageIndex);
    return;
  }

  if (page === "videography" && shootSlug === "preview") {
    openVideo();
    return;
  }

  if (page === "selected-shoots") {
    const foundShoot = shoots.findIndex((shoot) => shoot.slug === shootSlug);
    mainIndex = 1;
    setMainSlide(1);
    setShoot(foundShoot >= 0 ? foundShoot : 0);
    if (gallery && shootSlug === "orbital_opulence") {
      openOrbital();
      return;
    }
    if (gallery && shootSlug === "game_on") {
      openGame();
      return;
    }
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
