import "reflect-metadata"
import { container } from 'tsyringe';
import Application from "./application";
import registerContractDependency from "./di/register_contract.dependency";
import registerRepositoryDependency from "./di/register_repository.dependency";
import DBInitialazer from "./configs/db.initialazer";
import RoutesInitialazer from "./modules/app/routes.initialazer";
import registerAppDependecny from "./di/register_app.dependency";
import registerDBDependecny from "./di/register_db.dependency";

const start = () => {
    registerDBDependecny()
    registerRepositoryDependency()
    registerContractDependency()
    registerAppDependecny()

    const routesInitialazer = container.resolve(RoutesInitialazer)
    const dbInitialazer = container.resolve(DBInitialazer)
    const app = container.resolve(Application)

    dbInitialazer.initModels()
    routesInitialazer.initRoutes()
    app.start()
}

export default start
