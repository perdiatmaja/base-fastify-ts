const Application = require("./js/src/main/application")
const BaseRouter = require("./js/src/main/modules/app/base.router")
const AppConfig = require("./js/src/main/configs/app.config")

export * from "./ts/decorators/methods"
export * from "./ts/decorators/parameters"
export * from "./ts/decorators/classes"

export { Application as SpringifyApp }
export { BaseRouter as Router }
export { AppConfig as SpringifyConfig }