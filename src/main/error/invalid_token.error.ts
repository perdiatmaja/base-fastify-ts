import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class InvalidTokenError extends BaseError {
    constructor() {
        super(ErrorConstant.TOKEN.INVALID)
    }
}

export default InvalidTokenError