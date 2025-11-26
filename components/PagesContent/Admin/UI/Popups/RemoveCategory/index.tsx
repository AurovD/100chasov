
import React from "react";
import Button from "../../../../../UI/Buttons/Button";
import {fetchRequest} from "../../../../../../helpers/fetch-request";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useCategoriesStore from "../../../../../../store/categories";
import {useUserStore} from "../../../../../../store/user";
import usePopupStore from "../../../../../UI/Popup/store";



const RemoveCategory: React.FC<{category_id: string, title: string}> = ({ category_id, title }) => {

    const token = useUserStore(state => state.token);
    const closePopup = usePopupStore((state) => state.closePopup);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await fetchRequest(`/admin/category/remove?id=${category_id}`, "DELETE", undefined, token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            closePopup();
        },
    });

    const handleRemove = () => {
        mutation.mutate();
    };


    return <div className={"d-flex flex-column"}>
      Вы действительно ходите удалить категорию {title}?
      <Button action={handleRemove} type={"submit"}>
          Удалить
      </Button>
  </div>;
};

export default RemoveCategory;

