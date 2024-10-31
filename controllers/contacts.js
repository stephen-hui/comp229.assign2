let ContactModel = require("../models/contacts");

module.exports.list = async function (req, res, next) {
  try {
    let list = await ContactModel.find();
    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.contactByID = async function (req, res, next) {
  try {
    let cID = req.params.contactID;
    const contact = await ContactModel.findOne({ _id: cID });
    res.json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let contact = new ContactModel(req.body);
    let result = await ContactModel.create(contact);

    res.json({
      success: true,
      message: "Contact created successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let cID = req.params.contactID;

    let updateContact = new ContactModel(req.body);
    updateContact._id = cID;

    let result = await ContactModel.updateOne({ _id: cID }, updateContact);

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "Contact updated successfully.",
      });
    } else {
      throw new Error("Contact not updated. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.remove = async function (req, res, next) {
  try {
    let cID = req.params.contactID;

    let result = await ContactModel.deleteOne({ _id: cID });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "Contact deleted successfully.",
      });
    } else {
      throw new Error("Contact not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
