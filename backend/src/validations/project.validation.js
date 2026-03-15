import Joi from "joi";

export const projectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  capacity: Joi.number().required(),
  location: Joi.string().required(),
});
