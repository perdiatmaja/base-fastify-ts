import { Sequelize } from "sequelize-typescript"
import { Dialect } from "sequelize/types"
import { container } from "tsyringe"
import EnvConfig from "../constants/env_config.constant"

const registerDBDependecny = () => {
    const injectDb = () => {
        const envConfig = container.resolve(EnvConfig)
        const sequelize = new Sequelize(envConfig.DB_NAME, envConfig.DB_USERNAME, envConfig.DB_PASSWORD, {
            dialect: envConfig.DB_DIALECT as Dialect,
            host: envConfig.DB_HOST,
            port: envConfig.DB_PORT,
            logging: envConfig.DB_LOG,
            define: {
                timestamps: true,
                freezeTableName: true
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        })

        container.register<Sequelize>(Sequelize, { useValue: sequelize })
    }
    injectDb()
}

export default registerDBDependecny