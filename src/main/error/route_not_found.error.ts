import ErrorConstant from "../constants/error.constant";
import BaseError from "./base.error";

export interface NotFoundRouteParams {
    '*': string
}

class RouteNotFoundError extends BaseError {
    constructor(public readonly path: string) {
        super(ErrorConstant.ACCESS.ROUTE_NOT_FOUND)
    }
}

export default RouteNotFoundError