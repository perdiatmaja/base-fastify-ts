import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class UnauthorizedAccessError extends BaseError {
    constructor() {
        super(ErrorConstant.ACCESS.UNAUTHORIZED_ACCESS)
    }
}

export default UnauthorizedAccessError