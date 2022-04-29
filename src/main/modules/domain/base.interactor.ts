export type NO_PARAM_TYPE = ""
export const NO_PARAM = "" as NO_PARAM_TYPE

export type OrderType = 'ASC' | 'DESC'

export const Order = {
    ASC: 'ASC' as OrderType,
    DESC: 'DESC' as OrderType
}

export interface OrderInteractorParam {
    column: string
    type: OrderType
}

abstract class BaseInteractor<T, P> {

    protected abstract buildPromise(param: P): Promise<T>

    blockingExecute(param: P): Promise<T> {
        return new Promise(async (res, rej) => {
            try {
                res(await this.buildPromise(param))
            } catch (error) {
                rej(error)
            }
        })
    }
}

export default BaseInteractor