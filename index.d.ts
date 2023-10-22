import Application from "./src/main/application"
import BaseRouter from "./src/main/modules/app/base.router"

export declare const application: Application
export declare const baseRouter: BaseRouter

export * from "./src/main/decorators/method"
export * from "./src/main/decorators/parameters"
export * from "./src/main/decorators/classes"

export { baseRouter as Router }
export { application as SpringifyApp }