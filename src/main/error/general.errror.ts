import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class GeneralError extends BaseError {
    constructor() {
        super(ErrorConstant.GENERAL, 500)
    }
}

export default GeneralError