import { FindAttributeOptions, Includeable, Transaction, WhereOptions } from 'sequelize';
import { Omit } from 'sequelize-typescript/dist/shared/types';
import { CountOptions, FindOptions } from 'sequelize/types';

interface BaseCountoptions<A> {
    where?: WhereOptions<A>,
    include?: Includeable | Includeable[],
    distinct?: boolean,
    col?: string,
    logging?: boolean | ((sql: string, timing?: number) => void),
    benchmark?: boolean,
    transaction?: Transaction,
    attributes?: FindAttributeOptions,
    paranoid?: boolean,
    useMaster?: boolean
}

export const constructCountOptions = <A>(countOptions: BaseCountoptions<A>): Omit<CountOptions<A>, 'group'> => {
    const {
        attributes, benchmark, col, distinct, include, logging, paranoid, transaction, useMaster, where
    } = countOptions

    return {
        attributes,
        benchmark,
        col,
        distinct,
        include,
        logging,
        paranoid,
        transaction,
        useMaster,
        where
    }
}

interface BaseRepository<A, I> {
    createNewData(param: A): Promise<A>
    getById(id: I): Promise<A>
    getList(findOptions: FindOptions<A>): Promise<A[]>
    update(param: A): Promise<boolean>
    count(param: Omit<CountOptions<A>, 'group'>): Promise<number>
}

export default BaseRepository