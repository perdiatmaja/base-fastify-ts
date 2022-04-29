import BaseDataFactory from "./base.data.factory"
import BaseEntityData from "./base_entity.data"
import { DataSourceDB } from "./data.source"

abstract class BaseEntityRepository<D extends BaseEntityData> {
    private readonly baseDataFactory: BaseDataFactory<D>

    constructor(baseDataFactory: BaseDataFactory<D>) {
        this.baseDataFactory = baseDataFactory
    }

    createDbData(): D {
        return this.baseDataFactory.createData(DataSourceDB)
    }
}

export default BaseEntityRepository