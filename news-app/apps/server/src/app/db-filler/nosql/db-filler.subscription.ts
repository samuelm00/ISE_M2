import { Subscription, UserNoSql } from "@news-app/api-model";
import { categoriesIdMap } from "./db-filler.category";
import { usersIdMap } from "./db-filler.user";

export async function fillSubscriptionTable() {
    const subscriptions : any = await Subscription.findAll();
    return Promise.all( subscriptions.map( async (subscription) => {
        await UserNoSql.updateOne(
            {_id: usersIdMap.get(subscription.UserId)},
            {$push : {subscriptions: categoriesIdMap.get(subscription.DiscussionCategoryId)}}
        );
        return subscriptions;
    }));
}