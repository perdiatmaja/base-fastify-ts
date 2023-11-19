const SpringifyApp = require("../src/main/application")
const Router = require("../src/main/modules/app/base.router")

const ClassDecorator = require("../src/main/decorators/classes/index")
const MethodDecorator = require("../src/main/decorators/methods/index")
const ParamDecorator = require("../src/main/decorators/parameters/index")

module.exports = SpringifyApp.default
module.exports.default = SpringifyApp.default

module.exports.SpringifyApp = SpringifyApp.default
module.exports.Router = Router.default

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