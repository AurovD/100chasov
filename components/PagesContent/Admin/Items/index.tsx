import type { NextPage } from 'next'
import React, {useCallback} from "react";
import AddItem from "../UI/AddItem";
import useCategoriesStore from "../../../../store/categories";
import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "../../../../types/items";
import {useUserStore} from "../../../../store/user";
import usePopupStore from "../../../UI/Popup/store";
import RemoveCategory from "../UI/Popups/RemoveCategory";

const Items: NextPage = () => {
    const getCategories = useCategoriesStore(state => state.getCategories);
    const categories = useCategoriesStore(state => state.categories);
    const token = useUserStore(state => state.token);

    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);


    const handleRemoveEvent = (id: string, title: string) => {
        openPopup();
        changeContent("Удалить категорию", <RemoveCategory category_id={id} title={title} />);
    };




    useQuery<CategoryType[], unknown>({
        queryKey: ["categories"],
        queryFn: getCategories,
        enabled: !!token,
    });

    // if (isLoading) return <p>Загрузка...</p>;
    // if (error) return <p>Ошибка при загрузке категорий</p>;

    return (
      <div>
          {categories.length === 0 && <AddItem />}
          {categories.map((category) => (
              <div key={String(category.id)}>
                  <p>
                      {category.title}
                  </p>
                  <div onClick={() => handleRemoveEvent(category.id, category.title)}>
                      Удалить
                  </div>
                  <AddItem parent_id={category.id}/>
              </div>
          ))}
      </div>
    );
};

export default Items;
