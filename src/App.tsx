"use client";
import { useState, useEffect } from "react";
import cutegif_01 from "./assets/CUTEGIF_01.gif";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [gifsLoaded, setGifsLoaded] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const waitingGifs = [
    "https://media.tenor.com/rPAM20SrLsAAAAAM/picoozi-cute-cat.gif",
    cutegif_01,
    "https://media.tenor.com/mMdUSERZgGUAAAAM/kiss-love.gif",
    "https://media.tenor.com/UIOgr3Zw97sAAAAM/cute.gif",
    "https://media.tenor.com/J9mOaXMbKygAAAAM/mochi-pet.gif",
    "https://media.tenor.com/D75xzWpkx30AAAAM/why-hello.gif",
    "https://media.tenor.com/aGiJKEun9CYAAAAj/wow-excited.gif",
    "https://media.tenor.com/PLQ-msOeeLUAAAAj/dudu-on-top-bubu-hearts.gif",
    "https://media.tenor.com/WC1PVy3eXeQAAAAj/dudu-playing-with-ball-happy.gif",
    "https://media.tenor.com/qKvWT2UBPCIAAAAM/peach-and-goma-temper-tantrum.gif",
  ];

  useEffect(() => {
    const preloadGifs = async () => {
      const loadPromises = waitingGifs.map((gif) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.src = gif;
        });
      });

      const successGif = new Image();
      successGif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
      loadPromises.push(new Promise((resolve) => {
        successGif.onload = () => resolve();
      }));

      await Promise.all(loadPromises);
      setGifsLoaded(true);
    };

    preloadGifs();
  }, []);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setCurrentGifIndex((prevIndex) => (prevIndex + 1) % waitingGifs.length);
  };

  const getNoButtonText = () => {
    const phrases = [
      "Нет",
      "Ты уверен(а)?",
      "А если я попрошу очень вежливо?",
      "Пожалуйста",
      "С шоколадкой в придачу",
      "А если подарю мороженое?",
      "ПРОШУ ТЕБЯ, СОЛНЫШКО",
      "Но :*(",
      "Я не переживу отказ",
      "Всё, я умираю",
      "Теперь ты говоришь с призраком",
      "Пожалуйста, котёнок",
      ":((((",
      "ОЧЕНЬ ПРОШУ",
      "Я таю от грусти",
      "Может всё-таки да?",
      "Ну пожалуйста-пожалуйста",
      "Ты разбиваешь мне сердце",
      "Даже звёзды говорят, что надо соглашаться",
      "Я не сдамся!",
      "Твоё 'нет' делает меня сильнее",
      "Я готов ждать вечность",
      "Может быть, передумаешь?",
      "Я принесу тебе луну с неба",
      "Все котята мира просят тебя согласиться",
      "Нет, это не вариант :)",
      "Я буду делать с тобой подарки для твоих тк",
      "Судьба свела нас не просто так",
      "Я не смогу без тебя",
      "Ты моё счастье",
      "Обещаю много обнимашек",
      "Ты разбиваешь моё сердечко",
      "Я уже купил нам мороженое",
      "Давай не будем торопиться с отказом",
      "У меня есть печеньки!",
      "И чай!",
      "Я подарю тебе весь мир",
      "Я сделаю тебя счастливее",
      "Я буду чистить тебе мандаринки",
      "Я буду тебя утешать",
      "Я всегда буду любить тебя",
      "Ты моё счастье",
      "Люблю тебя",
    ];
    
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  if (!gifsLoaded) {
    return <div className="flex h-screen items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="my-4 text-4xl font-bold">УРААААА!!! Я люблю тебя, солнышко!!</div>
          <div className="my-4 text-4xl font-bold">ТЫ ЛУЧШАЯ!!!❤️‍🔥❤️‍🔥❤️‍🔥</div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src={waitingGifs[currentGifIndex]}
          />
          <h1 className="my-4 text-4xl">Солнышко, ты примешь мою валентинку?</h1>
          <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Да
            </button>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "Нет" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}