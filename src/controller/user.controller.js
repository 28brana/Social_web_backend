import user from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";

export const getUsers = catchAsync(async (req, res) => {
    const { query } = req;

    const page = query.page || 1;
    const limit = query.limit || 5;

    const result = await user.find({}).skip((page - 1) * limit).limit(limit);
    return res.json(result);
})

export const getUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await user.findById(id);
    return res.json(result);
})

// To do-----------------------------------------------------
export const followUser = catchAsync(async (req, res) => {
    // another user that we want to follow
    const { id } = req.params;
    // me user
    const { userId } = req.body;

    const userObject = await user.findById(userId);
    if (!userObject.followings.includes(id)) {
        await userObject.updateOne({ $push: { followings: id } })
    }

    const anotherObject = await user.findById(id);
    if (!anotherObject.followers.includes(userId)) {
        await anotherObject.updateOne({ $push: { followers: userId } });
    }

    return res.json({ msg: "Already follow" });
})
export const unFollowUser = catchAsync(async (req, res) => {
    // another user that we want to unfollow
    const { id } = req.params;
    // me user
    const { userId } = req.body;

    const userObject = await user.findById(userId);
    if (userObject.followings.includes(id)) {
        await userObject.updateOne({ $pull: { followings: id } })
    }

    const anotherObject = await user.findById(id);
    if (anotherObject.followers.includes(userId)) {
        await anotherObject.updateOne({ $pull: { followers: userId } });
    }

    return res.json({ msg: "Already follow" });
})
export const editUser = catchAsync(async (req, res) => {
    // another user that we want to unfollow
    const { id } = req.params;
    // me user
    const { bio, email, profile } = req.body;

    await user.findByIdAndUpdate(id, {
        $set: {
            bio,
            email,
            profile,
        }
    })
    return res.json({ msg: "Edit Successfully" });
})
export const changePassword = catchAsync(async (req, res) => {
    // another user that we want to unfollow
    const { id } = req.params;
    // me user
    const { oldPassword, newPassword } = req.body;

    const userObject = await user.findById(id);
    const passwordMatch = await bcrypt.compare(oldPassword, userObject.password);

    if (!passwordMatch) {
        return res.json({ msg: "Wrong Password" });
    }


    await userObject.updateOne({
        $set: {
            password: await bcrypt.hash(newPassword, 10)
        }
    })
    return res.json({ msg: "Password Change Succesfully " });
})

// export const blockUser = catchAsync(async (req, res) => {
//     // another user that we want to unfollow
//     const { id } = req.params;
//     // me user
//     const { userId } = req.body;

//     const userObject = await user.findById(userId);
//     if (userObject.followings.includes(id)) {
//         await userObject.updateOne({ $pull: { followings: id } })
//     }

//     const anotherObject = await user.findById(id);
//     if (anotherObject.followers.includes(id)) {
//         await anotherObject.updateOne({ $pull: { followers: userId } });
//     }

//     return res.json({ msg: "Already follow" });
// })

