// //!ALL PROJECTS ARRAYS
const allSingerInfo = [];
const basketArrays = new Set([]);
const favoriteArrays = new Set([]);
//! variabales

const coverSinger = document.querySelector(".singer__cover");
const profileSinger = document.querySelector(".singer__profile-box");
const nameSinger = document.querySelector(".singer__profile-title");
const followersSinger = document.getElementById("Followers");
const followingSinger = document.getElementById("following");
const favoriteSinger = document.getElementById("favorite");
const viewrSinger = document.getElementById("viewMusic");
const musicList = document.getElementById("MusicList");
const swiperList = document.getElementById("swiper-wrapper");
const footer = document.querySelector(".footer");
const basketElm = document.querySelector(".header__links-shop");
const basketBox = document.querySelector(".header__card");
const basketList = document.querySelector(".header__card-box");
const basketSize = document.querySelector(".header__links-text");
const totalPriceElm = document.querySelector(".header__card-total-value");
const favoriteList = document.querySelector(".main__content-inside");
const dateElm = document.querySelector(".header__item-date-box");
const timeElm = document.querySelector(".header__item-time-box");

//! play music

const playMusic = (source, id) => {
  const allMusicIcon = document.querySelectorAll(".main__content-play-icon");
  allMusicIcon.forEach((icon) => {
    icon.classList.replace("fa-pause", "fa-play");
  });
  const musicIcon = document.querySelector(`.play${id}`);
  if (musicIcon) {
    musicIcon.classList.replace("fa-play", "fa-pause");
  }
  const createAudioElm = document.createElement("audio");
  createAudioElm.classList.add("footer__audio");
  createAudioElm.setAttribute("controls", "");
  createAudioElm.innerHTML = `<source class="footer__audio-source" type="audio/mpeg" src="${source}" >
`;
  footer.style.display = "block";
  createAudioElm.play();
  footer.append(createAudioElm);
};
0;
///! culculate Total Price funk

const culculateTotalPrice = () => {
  const convertbasket = Array.from(basketArrays);
  const totalPrice = convertbasket.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.price;
  }, 0);
  totalPriceElm.textContent = `$${totalPrice}`;
};
//! remove Card music

const removeCard = (musicId) => {
  const findMusicElm = Array.from(basketArrays).find(
    (item) => item.id == musicId
  );
  basketArrays.delete(findMusicElm);
  showCard();
  culculateTotalPrice();
};

//! showCard
const showCard = () => {
  //! empty basket List
  basketList.innerHTML = "";
  //! show item basket
  basketArrays.forEach((basket) => {
    const musicItemElm = document.createElement("div");
    musicItemElm.className = `header__card-item item${basket.id}`;
    musicItemElm.innerHTML = `<div class="header__card-info">
  <img class="header__card-img" src="${basket.cover}">
  <span class="header__card-text">${basket.name}</span>
</div>
<span class="header__card-price">$${basket.price}</span>`;
    basketList.prepend(musicItemElm);
    musicItemElm.addEventListener("click", (event) => {
      const musicIdElm = event.currentTarget.classList[1].slice(4);
      removeCard(musicIdElm);
    });

    //! show size basket
    basketSize.textContent = basketArrays.size;
  });
};

//! find singer funk

const findSingerFunc = (singerId) => {
  const findSinger = allSingerInfo.find((event) => event.id == singerId);
  return findSinger;
};

//! add to card funk

const addToCard = (soundId, singerId) => {
  const findSinger = findSingerFunc(singerId);
  const findSounds = findSinger.sounds.find((event) => event.id == soundId);
  basketArrays.add(findSounds);
  showCard();
  culculateTotalPrice();
};
//! remove Favorite music
const removeFavorite = (musicId) => {
  const favoriteMusicElm = Array.from(favoriteArrays).find(
    (item) => item.id == musicId
  );
  favoriteArrays.delete(favoriteMusicElm);
  showFavorite();
};
//! showFavorite
const showFavorite = () => {
  //! empty basket List
  favoriteList.innerHTML = "";
  //! show item basket
  favoriteArrays.forEach((favorite) => {
    const favoriteItemElm = document.createElement("div");
    favoriteItemElm.className = `main__content-singer item${favorite.id}`;
    favoriteItemElm.innerHTML = `
    <img class="main__content-singer-img" 
    src="${favorite.cover}" >
      <span class="main__content-singer-delete">delete in Favorite</span>`;
    favoriteList.prepend(favoriteItemElm);
    favoriteItemElm.addEventListener("click", (event) => {
      const favoriteIdElm = event.currentTarget.classList[1].slice(4);
      removeFavorite(favoriteIdElm);
    });
  });

  //! show Favorite text

  favoriteArrays.size == 0
    ? (favoriteList.textContent = "There is nothing to show")
    : "";
};
//! add to Favorite funk

const addToFavorite = (soundId, singerId) => {
  const findSinger = findSingerFunc(singerId);
  const findSounds = findSinger.sounds.find((event) => event.id == soundId);
  favoriteArrays.add(findSounds);
  showFavorite();
};
//! create singer pages
createSingerPages = (singer) => {
  //! addcover
  coverSinger.innerHTML = `
  <img
   class="singer__cover-image"
   src="${singer.coverUrl}"/>`;
  //   //!  addprofile
  profileSinger.innerHTML = `<img
 class="singer__profile-img"
 src="${singer.profileUrl}" />`;

  //!  change name
  nameSinger.textContent = singer.nameSinger;

  // //! change info
  followersSinger.textContent = singer.followers;
  followingSinger.textContent = singer.following;
  favoriteSinger.textContent = singer.favoriteRate;
  viewrSinger.textContent = singer.viewMusic;

  //! music list imfo
  singer.sounds.forEach((sound) => {
    const createItemElm = document.createElement("li");
    createItemElm.className = "main__content-item";
    createItemElm.innerHTML = `<div class="main__content-details">
   <div class="main__content-box">
     <div class="main__content-img">
       <img
         class="main__content-pic"
         src="${sound.cover}"
       />
       <div class="main__content-play" onclick="playMusic('${sound.source}','${sound.id}')">
         <i
           class="fa-solid fa-play play${sound.id} main__content-play-icon"
         ></i>
       </div>
     </div>
     <span class="main__content-text">${sound.name}</span>
   </div>
 <div class="main__content-times">
     <span class="main__content-time">${sound.time}</span>
   </div>
   <div class="main__content-times">
    <span class="main__content-time">$${sound.price}</span>
 </div>
 </div>
 <div class="main__content-cart">
   <div class="main__content-times" onclick="addToCard('${sound.id}','${singer.id}')">
    <span class="main__content-card">ADD TO CARD</span>
  </div>
   <div class="main__content-times" onclick="addToFavorite('${sound.id}','${singer.id}')">
     <i class="fa-regular fa-heart main__content-icon "></i>
      </div>
 </div>`;
    musicList.append(createItemElm);
  });
};
//!ADD SINGER INFO FUNC
const addSingerInfo = (
  nameSinger,
  followers,
  following,
  favoriteRate,
  viewMusic,
  profileUrl,
  coverUrl,
  songs
) => {
  const singerInfo = {
    id: Math.ceil(new Date().getTime() * Math.random()),
    nameSinger,
    profileUrl,
    coverUrl,
    followers,
    following,
    favoriteRate,
    viewMusic,
    sounds: [...songs],
  };
  allSingerInfo.push(singerInfo);
};

//!GET SINGER INFO FUNC
const getSingerInfo = () => {
  //!Tataloo Info
  const AmirTataloo = [
        {
      id: 20,
      name: "Behesht",
      price: 90,
      cover: "public/Music/Tatallo/tataloo - Behesht.jpg",
      time: "10:12",
      source: "public/Music/Tatallo/4_5920269288303759432.mp3",
    },
    {
      id: 1,
      name: "Bi Manam Misheh",
      price: 45,
      cover: "public/Music/Tatallo/BiManamMishe.webp",
      time: "8:08",
      source: "public/Music/Tatallo/BiManamMishe.mp3",
    },
       {
      id: 21,
      name: "Taziyane",
      price: 45,
      cover: "public/Music/Tatallo/download.jpg",
      time: "7:23",
      source: "public/Music/Tatallo/Taziyane.mp3",
    },
    {
      id: 2,
      name: "Eide Emsal",
      price: 65,
      cover: "public/Music/Tatallo/eidEmsal.webp",
      time: "4:18",
      source: "public/Music/Tatallo/eidEmsal.mp3",
    },
    {
      id: 3,
      name: "ManBahatGhahram",
      price: 25,
      cover: "public/Music/Tatallo/ManBahatGhahram.webp",
      time: "5:46",
      source: "public/Music/Tatallo/ManBahatGhahram.mp3",
    },
    {
      id: 4,
      name: "Shab Yalda",
      price: 35,
      cover: "public/Music/Tatallo/shabYalda.webp",
      time: "6:42",
      source: "public/Music/Tatallo/shabYalda.mp3",
    },
  ];
  addSingerInfo(
    "AmirTataloo",
    "1,245,233",
    "10",
    "3",
    "11,245,233",
    "public/images/Tatallo/profile.jpg",
    "public/images/Tatallo/cover.jpg",
    AmirTataloo
  );
  //!Shayea Info
  const Shayea = [
    {
      id: 5,
      name: "AzAval",
      price: 35,
      cover: "public/Music/shayea/azAval.jpg",
      time: "3:36",
      source: "public/Music/shayea/azAval.mp3",
    },
    {
      id: 6,
      name: "HameMan",
      price: 45,
      cover: "public/Music/shayea/hameMan.webp",
      time: "4:32",
      source: "public/Music/shayea/HameMan.mp3",
    },
    {
      id: 7,
      name: "Vaysin Aghab",
      price: 55,
      cover: "public/Music/shayea/vaysin aghab.webp",
      time: "3:31",
      source: "public/Music/shayea/vaysin aghab.mp3",
    },
    {
      id: 8,
      name: "Tangi Nafas",
      price: 55,
      cover: "public/Music/shayea/tangiNafas.webp",
      time: "4:32",
      source: "public/Music/shayea/tangiNafas.mp3",
    },
  ];
  addSingerInfo(
    "Mohammad Reza Shayea",
    "2,245,233",
    "1",
    "2",
    "16,245,233",
    "public/images/Shayea/profile.jpg",
    "public/images/Shayea/cover.jpg",
    Shayea
  );
  //!swift Info
  const swift = [
    {
      id: 9,
      name: "Blank Space",
      price: 35,
      cover: "public/Music/swift/Blank Space.jpg",
      time: "3:51",
      source: "public/Music/swift/Blank Space.mp3",
    },
    {
      id: 10,
      name: "carma",
      price: 45,
      cover: "public/Music/swift/carma.jpg",
      time: "3:24",
      source: "public/Music/swift/carma.mp3",
    },
    {
      id: 11,
      name: "Miss Americana",
      price: 55,
      cover: "public/Music/swift/Miss Americana.jpg",
      time: "3:54",
      source: "public/Music/swift/Miss Americana.mp3",
    },
  ];
  addSingerInfo(
    "taylor swift",
    "81,245,233",
    "15",
    "4",
    "35,245,233",
    "public/images/Taylor Swift/profile.jpg",
    "public/images/Taylor Swift/cover.jpg",
    swift
  );
  //!shadmehr Info
  const shadmehr = [
    {
      id: 12,
      name: "Ghalbe Man",
      price: 35,
      cover: "public/Music/ShadMehr/GhalbeMan.webp",
      time: "3:19",
      source: "public/Music/ShadMehr/GhalbeMan.mp3",
    },
    {
      id: 13,
      name: "taghdir",
      price: 45,
      cover: "public/Music/ShadMehr/taghdir.webp",
      time: "4:41",
      source: "public/Music/ShadMehr/taghdir.mp3",
    },
    {
      id: 14,
      name: "ghazi",
      price: 55,
      cover: "public/Music/ShadMehr/ghazi.webp",
      time: "3:20",
      source: "public/Music/ShadMehr/ghazi.mp3",
    },
    {
      id: 15,
      name: "Mosafer",
      price: 55,
      cover: "public/Music/ShadMehr/Mosafer.webp",
      time: "5:13",
      source: "public/Music/ShadMehr/Mosafer.mp3",
    },
  ];
  addSingerInfo(
    "Shadmehr Aghili",
    "8,245,233",
    "20",
    "2",
    "55,245,233",
    "public/images/ShadMehr/profile.jpg",
    "public/images/ShadMehr/cover.jpg",
    shadmehr
  );
};
//! create Singer Click HandLer
const createSingerClickHandLer = (singerId) => {
  const findSinger = allSingerInfo.find((event) => event.id === singerId);
  //! empty musicList
  musicList.innerHTML = "";
  createSingerPages(findSinger);
};

//! other singer info

const otherSingerInfo = () => {
  allSingerInfo.forEach((singer, index) => {
    const createSingerElm = document.createElement("div");
    createSingerElm.className = "swiper-slide main__swipper-slide";
    createSingerElm.innerHTML = `<img
     class="w-100 main__swipper-img"
    src="${singer.profileUrl}"
        />`;
    swiperList.append(createSingerElm);
    //! actice first Element
    if (index === 0) {
      createSingerElm.classList.add("active");
    }
    createSingerElm.addEventListener("click", (event) => {
      createSingerClickHandLer.bind(createSingerClickHandLer, singer.id)();
      const allSlide = document.querySelectorAll(".main__swipper-img");

      //! remove class

      allSlide.forEach((slide) => {
        slide.parentElement.classList.remove("active");
      });
      //! add class
      event.target.parentElement.classList.add("active");
    });
  });
};

//! show Card Funk

const showCardClicHandler = () => {
  basketBox.classList.toggle("hidden");
};

//! get day Func

const getDateFunc = () => {
  const newDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(newDate);
  dateElm.textContent = dateFormatter;
};

//! get Time Func

const getTimeFunc = () => {
  setInterval(() => {
    const newDate = new Date();
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(newDate);
    timeElm.textContent = timeFormatter;
  }, 1000);
};

//! call projects func

getSingerInfo();
//! call date func
getDateFunc();

//! call time func
getTimeFunc();

//! lood func
document.addEventListener("load", createSingerPages(allSingerInfo[0]));
document.addEventListener("load", otherSingerInfo());

//! show Card

basketElm.addEventListener("click", showCardClicHandler);
