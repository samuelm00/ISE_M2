import { IUserVoteProps, UserVote } from "@news-app/api-model";
import { responseJson } from "../../util/util.response";

export async function getVotesOfPost(req, res) {

    try {
        const userVotes: UserVote[] = await UserVote.findAll({
            where:
                { discussionPostId: req.params.id },
        });

        const response: IUserVoteProps[] = userVotes.map((userVote) => ({
            id: userVote.id,
            datetime: userVote.datetime,
            isUpvote: userVote.isUpvote,
        }));

        return res.status(200).json(responseJson({ payload: response }));
    } catch (error) {
        return res.status(400).json(responseJson({ error: error.message }));
    }
}