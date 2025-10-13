
import React from "react";
import Button from "../../../../../UI/Buttons/Button";
import {fetchRequest} from "../../../../../../helpers/fetch-request";
import {useMutation, useQueryClient} from "@tanstack/react-query";



const RemoveCategory: React.FC<{parent_id: string, title: string}> = ({ parent_id, title }) => {


    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await fetchRequest(`/categories/${parent_id}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            // Обновляем кэш категорий после удаления
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const handleRemove = () => {
        mutation.mutate();
    };


    return <div className={"d-flex flex-column"}>
      Вы действительно ходите удалить категорию {title}?
      <Button type={"button"} >
          Удалить
      </Button>
  </div>;
};

export default RemoveCategory;

