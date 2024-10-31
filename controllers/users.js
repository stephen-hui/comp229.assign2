let UserModel = require("../models/users");

module.exports.list = async function (req, res, next) {
  try {
    let list = await UserModel.find({}, "-password");

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.userByID = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    const user = await UserModel.findOne({ _id: uID }, "-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let user = new UserModel(req.body);
    let result = await UserModel.create(user);

    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let uID = req.params.userID;

    let updateUser = new UserModel(req.body);
    updateUser._id = uID;

    let result = await UserModel.updateOne({ _id: uID }, updateUser);

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "User updated successfully.",
      });
    } else {
      throw new Error("User not updated. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.remove = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    let result = await UserModel.deleteOne({ _id: uID });
    console.log(result);

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "User deleted successfully.",
      });
    } else {
      throw new Error("User not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
