import { inject, injectable } from "tsyringe";
import Application from "../../../application";
import ContractToken from "../../../constants/contract.token";
import BaseRoute from "../base.route";
import AdminAuthContract from "./contract/admin_auth.contract";
import LoginAdminBody from "./schema/login_admin.body";
import { FastifyRequest } from "fastify";
import POST from "../../../decorators/post_mapping.decorator";
import PathMapping from "../../../decorators/path_mapping.decorator";
import LoginAdminDTO from "../../domain/admin/dto/login_admin.dto";

@injectable()
@PathMapping("/v1/admin")
class AdminAuthRoute extends BaseRoute {
    private readonly service: AdminAuthContract

    constructor(application: Application, @inject(ContractToken.ADMIN_AUTH_CONTRACT) service: AdminAuthContract) {
        super(application)
        this.service = service
    }

    @POST("/auth/login")
    public async login(request: FastifyRequest<{ Body: LoginAdminBody }>): Promise<LoginAdminDTO> {
        const adminData = await this.service.loginAdmin({
            email: request.body.email,
            password: request.body.password
        })
        
        return adminData
    }
}

export default AdminAuthRoute