import comment from '../models/comment.js';
import post from '../models/post.js';
import user from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';

export const getPost = catchAsync(async (req, res) => {
    const result = await post.find({});
    return res.json(result);
})

// Required
// {
//     "user":"638340d7660e803aa59677c9" ,
//     "content": [
//         {
//             "type": "image",
//             "url":"imageurl.com"
//         }
//     ],
//     "likes": [],
//     "description": "First Post please like & share",
//     "comments": [],
//     "reported": []
// }

export const createPost = catchAsync(async (req, res) => {
    const data = req.body;

    const newPost = new post(data);
    const result = await newPost.save();

    return res.status(201).json(result);
})

// To do ---------------------------------------------
// {userId}
export const toggleLikePost = catchAsync(async (req, res) => {
    const _id = req.params.id;
    const { userId } = req.body;
    const postData = await post.findById(_id);

    if (!postData.likes.includes(userId)) {
        await postData.updateOne({ $push: { likes: userId } })
        return res.status(201).json({ msg: "Post is liked" });
    }

    await postData.updateOne({ $pull: { likes: userId } });

    return res.status(201).json({ msg: "Post is disliked" });
})

// {userId}
export const toggleSavedPost = catchAsync(async (req, res) => {
    const _id = req.params.id;
    const { userId } = req.body;
    const userData = await user.findById(userId);

    if (!userData.saved.includes(_id)) {
        await userData.updateOne({ $push: { saved: _id } })
        return res.status(201).json({ msg: "Post is Saved" });
    }

    await userData.updateOne({ $pull: { saved: _id } });

    return res.status(201).json({ msg: "Post is unSaved" });
})

export const getComment = catchAsync(async (req, res) => {
    const _id = req.params.id;

    const postData = await post.findById(_id).populate('comments');

    return res.status(201).json(postData);
})

// Required
// {
//     "userId": "",
//     "text": "First Comment",
// }
export const createComment = catchAsync(async (req, res) => {
    const _id = req.params.id;
    const { userId, text } = req.body;
    const newComment = new comment({
        user: userId,
        text,
    })
    const result = await newComment.save();
    const postObject = await post.findById(_id);
    await postObject.updateOne({ $push: { comments: result.id } });

    return res.status(201).json({ msg: "Comment is created" });
})

// {userId}
export const report = catchAsync(async (req, res) => {
    const _id = req.params.id;
    const { userId } = req.body;

    const postObject = await post.findById(_id);
    if (postObject.reported.includes(userId)) {
        return res.status(201).json({ msg: "Already Reported" });
    }

    await post.findByIdAndUpdate(_id, { $push: { reported: userId } });


    return res.status(201).json({ msg: "reported Successfully" });
})



