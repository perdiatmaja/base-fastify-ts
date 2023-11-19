const SpringifyApp = require("./js/src/main/application")
const AppConfig = require("./js/src/main/configs/app.config")
const Router = require("./js/src/main/modules/app/base.router")
const Response = require("./js/src/main/modules/app/base_response")

const ClassDecorator = require("./js/src/main/decorators/classes/index")
const MethodDecorator = require("./js/src/main/decorators/methods/index")
const ParamDecorator = require("./js/src/main/decorators/parameters/index")

module.exports = SpringifyApp.default
module.exports.default = SpringifyApp.default

module.exports.SpringifyApp = SpringifyApp.default
module.exports.SpringifyRouter = Router.default
module.exports.SpringifyConfig = AppConfig.default
module.exports.SpringifyResponse = Response

module.exports.PathMapping = ClassDecorator.PathMapping

module.exports.GET = MethodDecorator.GET
module.exports.POST = MethodDecorator.POST
module.exports.PUT = MethodDecorator.PUT
module.exports.PATCH = MethodDecorator.PATCH
module.exports.DELETE = MethodDecorator.DELETE

module.exports.AuthRequired = MethodDecorator.AuthRequired
module.exports.Transactional = MethodDecorator.Transactional
module.exports.JwtRequired = MethodDecorator.JwtRequired

module.exports.MultipartFile = ParamDecorator.MultipartFile
module.exports.MultipartParam = ParamDecorator.MultipartParam
module.exports.NotEmpty = ParamDecorator.NotEmpty
module.exports.PathParam = ParamDecorator.PathParam
module.exports.QueryParam = ParamDecorator.QueryParam
module.exports.Request = ParamDecorator.Request
module.exports.RequestBody = ParamDecorator.RequestBody