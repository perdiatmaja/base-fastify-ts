import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class InvalidDataError extends BaseError {
    constructor() {
        super(ErrorConstant.DATA.INVALID, 400)
    }
}

export default InvalidDataError