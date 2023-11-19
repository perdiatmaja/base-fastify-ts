interface BaseResponse<T> {
    message: string
    code: number
    data: undefined | T
    statusCode?: number
    requestId: string
}

export default BaseResponse