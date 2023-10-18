import { inject, injectable } from "tsyringe";
import Application from "../../../application";
import ContractToken from "../../../constants/contract.token";
import BaseRouter from "../base.router";
import AdminAuthContract from "./contract/admin_auth.contract";
import LoginAdminBody from "./schema/login_admin.body";
import PathMapping from "../../../decorators/path_mapping.decorator";
import LoginAdminDTO from "../../domain/admin/dto/login_admin.dto";
import AuthRequired from "../../../decorators/method/auth_required.decorator";
import { POST } from "../../../decorators/method";
import { RequestBody } from "../../../decorators/parameters";

@injectable()
@PathMapping("/v1/admin")
class AdminAuthRouter extends BaseRouter {
    private readonly service: AdminAuthContract

    constructor(@inject(ContractToken.ADMIN_AUTH_CONTRACT) service: AdminAuthContract) {
        super()
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