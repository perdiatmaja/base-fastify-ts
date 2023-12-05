import { container } from 'tsyringe';
import Application from "../application"
import AppConfig from "../configs/app.config"
import RoutesInitializer from "../modules/app/routers.initializer"

const registerAppDependency = () => {
    container.registerSingleton<Application>(Application)
    container.registerSingleton<AppConfig>(AppConfig)
    container.registerSingleton<RoutesInitializer>(RoutesInitializer)
}

export default registerAppDependency