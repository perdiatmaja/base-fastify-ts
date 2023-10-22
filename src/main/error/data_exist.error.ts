import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class DataExistError extends BaseError {
    constructor() {
        super(ErrorConstant.DATA.ALREADY_EXIST, 404)
    }
}

export default DataExistError