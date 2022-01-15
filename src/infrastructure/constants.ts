import Joi from 'joi'

const ORGANISATION_SCHEMA = Joi.object({
  org_name: Joi.string()
    .trim()
    .required(),

  daughters: Joi.array()
    .items(Joi.link('#ORGANISATION_SCHEMA'))
    .optional()
})
  .id('ORGANISATION_SCHEMA')

export { ORGANISATION_SCHEMA }
