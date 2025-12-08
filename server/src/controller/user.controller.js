import expressAsyncHandler from "express-async-handler";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import UserModel from "../models/user.model.js";
import { OK } from "../constants/http.js";

export const updateProfile = expressAsyncHandler(async (req, res) => {
  // Implementation for updating user profile
  const { profilePicture: base64 } = req.body;

  // const file = req.files.profilePic;
  // const base64 = `data:${file.mimetype};base64,${file.data.toString("base64")}`;

  // console.log(base64);

  const userId = req.user._id;

  const result = await uploadToCloudinary(base64);

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { profilePicture: result.url },
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

export const getUsersForSidebar = expressAsyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  const filteredUsers = await UserModel.find({
    _id: { $ne: currentUserId },
  }).select("-password");

  res.status(OK).json(filteredUsers);
});
