export enum StatusCode {
  SUCCESS_RESPONSE = 2010,
  ERR_USER_NAME_EXIST = 5020,
  ERR_SER_NAME_NOT_FOUND = 5021,
  ERR_TO_DO_ID_NOT_FOUND = 5022,
  ERR_PASSWORD_IS_WRONG = 5023,
  ERR_EMAIL_EXIST = 5023,
  ERR_PARAM_ERROR = 5010,
  ERR_TO_MANY_REQUESTS = 5011,
  ERR_AUTH_FAILED = 5098,
  ERR_INTERNAL = 5099,
}

export default StatusCode;