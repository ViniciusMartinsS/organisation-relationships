const INTERNAL_ERROR_CODE = 'SY500'
const INVALID_PAYLOAD_ERROR_CODE = 'SY400'

const ERROR = {
  INTERNAL_LIST: { code: INTERNAL_ERROR_CODE, trace: 'list' },
  INTERNAL_CREATE: { code: INTERNAL_ERROR_CODE, trace: 'create' },
  INVALID_PAYLOAD_CREATE: { code: INVALID_PAYLOAD_ERROR_CODE, trace: 'validate' }
}

export { ERROR }
