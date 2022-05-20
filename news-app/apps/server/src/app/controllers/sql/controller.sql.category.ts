import { DiscussionCategory, IDiscussionCategoryProps } from "@news-app/api-model";

export async function getAllCategories (req,res) {
    // load from dd
    const categories: DiscussionCategory[] = await DiscussionCategory.findAll();

    const response: IDiscussionCategoryProps[] = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
    }));

    return res.status(200).json(response);
}

export async function getCategoryByID (req,res) {
    const id = req.params.id;

    const category: DiscussionCategory = await DiscussionCategory.findOne({where:{id: id}});

    const response: IDiscussionCategoryProps =  {
        id: category.id,
        name: category.name,
        description: category.description,
    };

    return res.status(200).json(response);
}