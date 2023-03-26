const { model, Schema, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const conts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    // tlds: { allow: ["com", "net", "org", ".co.uk", ".ca"] },
  }),
  phone: Joi.string(),
});

const schemas = {
  addSchema,
};

const Cont = model("contact", conts);

module.exports = {
  Cont,
  schemas,
};
