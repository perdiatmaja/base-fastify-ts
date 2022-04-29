import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class CorsError extends BaseError {
    constructor() {
        super(ErrorConstant.ACCESS.ORIGIN_NOT_ALLOWED)
    }
}

export default CorsError