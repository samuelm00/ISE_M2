import { IUserVoteProps, UserVote } from "@news-app/api-model";

export async function getVotesOfPost (req,res) {
    const postId:number = req.params.id;

    const userVotes: UserVote[] = await UserVote.findAll();

    const response: IUserVoteProps[] =  userVotes.map((userVote) => ({
        id: userVote.id,
        datetime: userVote.datetime,
        isUpvote: userVote.isUpvote,
    }));

    return res.status(200).json(response);
}