import { Sequelize } from "sequelize-typescript";
import { inject } from "tsyringe";
import DataNotFoundError from "../../../error/data_not_found.error";

abstract class BaseSourceDataEntity {
    private readonly sequelize: Sequelize

    constructor(@inject(Sequelize) sequelize: Sequelize) {
        this.sequelize = sequelize
    }

    protected wrapperWithDataNotFound<T>(entity: string | undefined, promiseQuery: Promise<T | null>): Promise<T> {
        return new Promise((resolve, reject) => {
            promiseQuery.then((data) => {
                if (data !== null) {
                    return resolve(data)
                } else {
                    reject(new DataNotFoundError(entity ? entity : ""))
                }
            }).catch(reject)
        })
    }
}

export default BaseSourceDataEntity