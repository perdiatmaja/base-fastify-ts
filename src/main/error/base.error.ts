export interface ErrorType {
    code: number
    message: string
}

abstract class BaseError extends Error {
    readonly code: number

    constructor(errorType: ErrorType) {
        super(errorType.message)
        this.code = errorType.code
    }
}

export default BaseError