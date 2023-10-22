export interface ErrorType {
    code: number
    message: string
}

abstract class BaseError extends Error {
    readonly code: number
    statusCode: number

    constructor(errorType: ErrorType, statusCode: number) {
        super(errorType.message)
        this.code = errorType.code
        this.statusCode = statusCode
    }
}

export default BaseError