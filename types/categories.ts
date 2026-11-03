
export interface CategoryType  {
    title: string,
    id: string,
    parent_id: string,
    children?: CategoryType[]
    message?: string,
    link: string
    success?: boolean
}