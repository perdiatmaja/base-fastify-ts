import { DataSource, DataSourceCache, DataSourceDB } from "./data.source";

abstract class BaseDataFactory<T> {
    private readonly cacheDataEntity?: T
    private readonly dbDataEntity: T

    constructor(dbDataEntity: T, cacheDataEntity?: T) {
        this.dbDataEntity = dbDataEntity
        this.cacheDataEntity = cacheDataEntity
    }

    protected getDBDataEntity(): T {
        return this.dbDataEntity
    }

    protected getCacheDataEntity(): T {
        return this.cacheDataEntity!
    }

    createData(source: DataSource): T {
        switch (source) {
            case DataSourceCache:
                return this.getCacheDataEntity()
            case DataSourceDB:
            default:
                return this.getDBDataEntity()
        }
    }
}

export default BaseDataFactory