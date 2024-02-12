import { asyncHandler } from "../../utility/asyncHandler.js";
import { ApiError } from "../../utility/ApiError.js";
import { ApiResponse } from "../../utility/ApiResponse.js";
import { validateEmail } from "../../utility/validation.js";
import { User } from "../../models/ecommerce/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { userName, fullName, email, password } = req.body;

  if (
    [userName, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields is required");
  }

  if (!validateEmail(email)) {
    throw new ApiError(401, "Invalid email format");
  }

  const isUserExists = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUserExists) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while creating the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

export { registerUser };
