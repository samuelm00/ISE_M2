import { DiscussionCategoryNoSql, Subscription } from "@news-app/api-model";
import { categoriesIdMap } from "./db-filler.category";
import { usersIdMap } from "./db-filler.user";

export async function fillSubscriptionTable() {
    const subscriptions : any = await Subscription.findAll();
    return Promise.all( subscriptions.map( async (subscription) => {
        await DiscussionCategoryNoSql.updateOne(
            {_id: categoriesIdMap.get(subscription.DiscussionCategoryId)},
            {$push : {users: usersIdMap.get(subscription.UserId)}}
        );
        return subscriptions;
    }));
}