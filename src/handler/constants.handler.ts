import * as Joi from 'joi';

const CREATE_ORGANISATION_SCHEMA = Joi.object({
  org_name: Joi.string()
    .trim()
    .required(),

  daughters: Joi.array()
    .items(Joi.link('#CREATE_ORGANISATION_SCHEMA'))
    .optional()
})
  .id('CREATE_ORGANISATION_SCHEMA');

const LIST_ORGANISATION_SCHEMA = Joi.object({
  organisation: Joi.string()
    .required(),

  offset: Joi.string()
    .required()
})

export { CREATE_ORGANISATION_SCHEMA, LIST_ORGANISATION_SCHEMA };
