import type { NextPage } from 'next'
import Header from "../components/Header";
import Button from "../components/UI/Buttons/Button";
import React, {useState} from "react";
import usePopupStore from "../components/UI/Popup/store";
import BannerButton from "../components/UI/Buttons/Button";

const Home: NextPage = () => {
    const popup = usePopupStore((state) => state.status);
    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);

    const banner = <p>
        Интернет-аукцион «100 часов» даёт вам возможность купить товары со скидкой. Цены на каждый товар
        непрерывно снижаются — на 1% в час, то есть через 99 часов цена уменьшается до 1%.

        Посетители делают свои ставки в аукционах. Когда цена опускается до самой высокой ставки, аукцион
        завершается, а человек, который сделал эту ставку, побеждает. Хотите победить? Делайте самую высокую
        ставку — выше, чем лучшая на этот момент.

        Когда вы сделаете ставку, другие участники увидят это и могут обойти вас, передвинув свою ставку
        выше. Поэтому отслеживайте аукционы, в которых вы участвуете.

        Как начать? Зарегистрируйтесь — нужен только номер телефона, вам придёт смс с паролем. Откройте
        интересный вам активный аукцион или запустите новый. Передвиньте бегунок на шкале до цены, по
        которой хотите сделать ставку, нажмите «Сделать ставку» — и всё, ждите, пока товар подешевеет до
        вашей ставки! Повысить ставку можно так же.

        Товар в любой момент можно купить по текущей цене, для этого сделайте ставку по текущей цене
        предложения — и вы победитель, забирайте покупку :)
    </p>

    const handleEvent = () => {
        openPopup();
        changeContent("Как это работает?", banner);
    };

  return (
    <div className={popup ? "visible" : ""}>
        <Header/>
        <div className="banner">
            <div className="wrapper"></div>
            <h1>Приветствуем вас на сайте «100 часов»</h1>
            <p>Это интернет-аукцион, где вы можете купить любой товар за 1/100 от его цены. Каждый час всё, что мы
                продаём,
                дешевеет на 1%, а по какой цене сделать ставку, решаете вы.</p>
            <BannerButton action={handleEvent} className="banner_button">
                {/*<BannerButton text={"Как это работает?"}/>*/}{"Как это работает?"}
            </BannerButton>
        </div>
    </div>
  )
}

export default Home;