import { Subscription } from "@news-app/api-model";
import { categoriesSql } from "./db-filler.category";
import { userSql } from "./db-filler.user";

const subscriptions = [];
export async function fillSubscriptionTable() {

    userSql.forEach(async (user) => {
        categoriesSql.forEach( async (category) => {
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