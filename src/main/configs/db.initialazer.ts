import { Sequelize } from "sequelize-typescript";
import { injectable } from "tsyringe";
import AdminModel from "../models/admin.model";

@injectable()
class DBInitialazer {
    private readonly sequelize: Sequelize

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize
    }

    initModels() {
        const models = [
            AdminModel
        ]

        this.sequelize.addModels(models)

        this.sequelize.sync().then(() => console.info("DB Initialized"))
    }
}

export default DBInitialazer