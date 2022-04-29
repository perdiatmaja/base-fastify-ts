import { Sequelize } from "sequelize-typescript";
import { inject } from "tsyringe";
import BaseSourceDataEntity from "./base_source.data.entity";

abstract class BaseCacheDataEntity extends BaseSourceDataEntity {
    constructor(@inject(Sequelize) sequelize: Sequelize) {
        super(sequelize)
    }
}

export default BaseCacheDataEntity