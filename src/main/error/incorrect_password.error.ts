import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class IncorrectPasswordError extends BaseError {
    constructor() {
        super(ErrorConstant.ACCESS.INCORRECT_PASSWORD)
    }
}

export default IncorrectPasswordError