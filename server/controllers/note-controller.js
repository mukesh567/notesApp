import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";
import Note from "../models/Note.js";
import User from "../models/User.js";

//Create note
export const createNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Note is required",
        errors.mapped()
      )
    );
  }

  try {
    const result = await Note.create({
      userId: req.userId,
      title: req.body.title,
      desc: req.body.desc,
      videolink: req.body.videolink,
      imagelink : req.body.imagelink,
      color: req.body.color,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { notes: result },
        }
      );

      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", result)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something went wrong",
        error
      )
    );
  }
};

//Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const noteList = await User.findById(req.userId)
      .select("-password")
      .populate("notes")
      .exec();

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "All note's list", noteList)
    );
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Error when fetched notes",
        error
      )
    );
  }
};


//Delete note
export const removeNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "note id is required",
        errors.mapped()
      )
    );
  }

  try {
    const result = await Note.findOneAndDelete({
      userId: req.userId,
      _id: req.body.note_id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          $pull: { notes: req.body.note_id },
        }
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, "note Deleted", null));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not deleted", null)
    );
  }
};
