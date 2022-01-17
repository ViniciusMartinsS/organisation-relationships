import * as Joi from 'joi';

const SCHEMA_LIST = 'LIST_ORGANISATION_SCHEMA';
const SCHEMA_CREATE = 'CREATE_ORGANISATION_SCHEMA';

const CREATE_ORGANISATION_SCHEMA = Joi.object({
  org_name: Joi.string()
    .trim()
    .required(),

  daughters: Joi.array()
    .items(Joi.link(`#${SCHEMA_CREATE}`))
    .optional()
})
  .id(SCHEMA_CREATE);

const LIST_ORGANISATION_SCHEMA = Joi.object({
  organisation: Joi.string()
    .required(),

  offset: Joi.string()
    .required()
});

export {
  CREATE_ORGANISATION_SCHEMA,
  LIST_ORGANISATION_SCHEMA,
  SCHEMA_CREATE,
  SCHEMA_LIST
};
