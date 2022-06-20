import { DiscussionCategory, Subscription, User } from "@news-app/api-model";

const subscriptions = [];
export async function fillSubscriptionTable() {
    const users = await User.findAll();
    const categories = await DiscussionCategory.findAll();

    users.forEach(async (user) => {
        categories.forEach( async (category) => {
            if(Math.floor(Math.random()*100) > 50) {
                subscriptions.push({
                    UserId: user.id,
                    DiscussionCategoryId: category.id
                });
            }
        })
    });

    return await Subscription.bulkCreate(subscriptions);
}