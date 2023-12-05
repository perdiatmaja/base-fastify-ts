import { Sequelize } from "sequelize-typescript";
import { injectable } from "tsyringe";
import AdminModel from "../models/admin.model";
import BasePlugin from "./base.config";

@injectable()
class DBInitializer implements BasePlugin {
    private readonly sequelize: Sequelize

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize
    }

    init() {
        const models = [
            AdminModel
        ]

        this.sequelize.addModels(models)

        this.sequelize.sync().then(() => console.info("DB Initialized"))
    }
}

export = DBInitializer