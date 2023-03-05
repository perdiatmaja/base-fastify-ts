import { inject, injectable } from "tsyringe";
import Application from "../../../application";
import ContractToken from "../../../constants/contract.token";
import BaseRouter from "../base.router";
import AdminAuthContract from "./contract/admin_auth.contract";
import LoginAdminBody from "./schema/login_admin.body";
import PathMapping from "../../../decorators/path_mapping.decorator";
import LoginAdminDTO from "../../domain/admin/dto/login_admin.dto";
import { GET, POST } from "../../../decorators/method";
import { NotEmpty, PathParam, QueryParam, RequestBody } from "../../../decorators/parameters";
import AuthRequired from "../../../decorators/method/auth_required.decorator";
import JwtRequired from "../../../decorators/method/jwt_required.decorator";
import AdminDTO from "../../domain/admin/dto/admin.dto";

@injectable()
@PathMapping("/v1/admin")
class AdminAuthRouter extends BaseRouter {
    private readonly service: AdminAuthContract

    constructor(application: Application, @inject(ContractToken.ADMIN_AUTH_CONTRACT) service: AdminAuthContract) {
        super(application)
        this.service = service
    }

    @AuthRequired
    @POST("/auth/login")
    public async login(@RequestBody body: LoginAdminBody): Promise<LoginAdminDTO> {
        const adminData = await this.service.loginAdmin({
            email: body.email,
            password: body.password
        })
        
        return adminData
    }
}

export default AdminAuthRouter