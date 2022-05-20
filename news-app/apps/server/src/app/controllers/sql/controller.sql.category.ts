import { IDiscussionCategoryProps } from "@news-app/api-model";

export function getAllCategories (req,res) {
    // load from db
    const categories: IDiscussionCategoryProps[] = [];

    res.json(categories);
}

export function getCategoryByID (req,res) {
    const id:number = req.params.id;
    // load from db
    const category: IDiscussionCategoryProps = null;

    res.json(category);
}