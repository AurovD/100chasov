import {useEffect, useMemo, useState} from "react";
import {CategoryType} from "../types/categories";

export const useSortedCategories = (categories: CategoryType[]) => {


    const sortedData = useMemo(() => {
        const map: Record<string, CategoryType & { children?: CategoryType[] }> = {};
        categories.forEach(cat => {
            map[cat.id] = { ...cat, children: [] };
        });

        const tree: (CategoryType & { children?: CategoryType[] })[] = [];

        categories.forEach(cat => {
            if (cat.parent_id && map[cat.parent_id]) {
                map[cat.parent_id].children!.push(map[cat.id]);
            } else {
                tree.push(map[cat.id]);
            }
        });

        return tree;
    }, [categories]);

    return sortedData;
}