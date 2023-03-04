import { container } from 'tsyringe';
import Application from "../application"
import AppConfig from "../configs/app.config"
import RoutesInitialazer from "../modules/app/routers.initialazer"

const registerAppDependecny = () => {
    container.registerSingleton<Application>(Application)
    container.registerSingleton<AppConfig>(AppConfig)
    container.registerSingleton<RoutesInitialazer>(RoutesInitialazer)
}

export default registerAppDependecny