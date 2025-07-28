
import React from "react";
import Button from "../../Buttons/Button";
import usePopupStore from "../../Popup/store";
import Phone from "../Phone";

const ErrorPopup: React.FC = () => {
  const changeContent = usePopupStore((state) => state.changeContent);

  const phone = <Phone />;

  const returnHandler = () => {
    changeContent("Вход", phone);
  };

  return (
    <div className={"d-flex flex-column"}>
      <div>Проверьте соединение с интернетом или зайдите позже</div>
      <Button action={returnHandler}>Вернутся назад</Button>
    </div>
  );
};

export default ErrorPopup;

