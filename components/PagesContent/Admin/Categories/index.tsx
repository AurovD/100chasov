import type { NextPage } from 'next'
import React from "react";
import AddItem from "../UI/Categories/AddItem";
import useCategoriesStore from "../../../../store/categories";
import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "../../../../types/items";
import {useUserStore} from "../../../../store/user";
import usePopupStore from "../../../UI/Popup/store";
import RemoveCategory from "../UI/Categories/Popups/RemoveCategory";
import {useSortedCategories} from "../../../../hooks/useSortedCategories";
import clsx from "clsx";
import styles from "./Categories.module.scss";
import EditCategory from "../UI/Categories/Popups/EditCategory";
import Link from "next/link";


const Category: React.FC<{
    categories: CategoryType[];
    handleRemoveEvent: (id: string, title: string) => void;
    handleEditEvent: (id: string, title: string) => void;
}> = ({ categories, handleRemoveEvent, handleEditEvent }) => {
    return (
      <>
        {categories.length > 0 &&
          categories.map((category) => (
            <div
              key={String(category.id)}
              className={clsx(styles.category_container)}
            >
              <Link className={clsx(styles.logo_mobile)} href="/admin/categories/khkhj">
                <p className={clsx(styles.category_title)}>{category.title}</p>
              </Link>

              <div
                onClick={() => handleRemoveEvent(category.id, category.title)}
              >
                Удалить
              </div>
              <div onClick={() => handleEditEvent(category.id, category.title)}>
                Редактировать
              </div>

              <AddItem parent_id={category.id} />

              {category.children && category.children.length > 0 && (
                <Category
                  categories={category.children}
                  handleRemoveEvent={handleRemoveEvent}
                  handleEditEvent={handleEditEvent}
                />
              )}
            </div>
          ))}
      </>
    );
};



const Categories: NextPage = () => {
    const getCategories = useCategoriesStore(state => state.getCategories);
    const categories = useCategoriesStore(state => state.categories);
    const token = useUserStore(state => state.token);

    const openPopup = usePopupStore((state) => state.openPopup);
    const changeContent = usePopupStore((state) => state.changeContent);


    const handleRemoveEvent = (id: string, title: string) => {
        openPopup();
        changeContent("Удалить категорию", <RemoveCategory category_id={id} title={title} />);
    };
    const handleEditEvent = (id: string, title: string) => {
        openPopup();
        changeContent("Редактировать категорию", <EditCategory category_id={id} title={title} />);
    };

    const sortedCategories = useSortedCategories(categories);



    useQuery<CategoryType[], unknown>({
        queryKey: ["categories"],
        queryFn: getCategories,
        enabled: !!token,
    });

    // if (isLoading) return <p>Загрузка...</p>;
    // if (error) return <p>Ошибка при загрузке категорий</p>;

    return (
      <div>
          <AddItem />
          <Category  categories={sortedCategories}
                 handleRemoveEvent={handleRemoveEvent}
                     handleEditEvent={handleEditEvent}
          />
      </div>
    );
};

export default Categories;
