import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

class DataNotFoundError extends BaseError {
    constructor(entity: string = "") {
        super({
            code: ErrorConstant.DATA.NOT_FOUND.code,
            message: `${entity.length > 0 ? entity + " " : entity}${ErrorConstant.DATA.NOT_FOUND.message}`
        }, 404)
    }
}

export default DataNotFoundError