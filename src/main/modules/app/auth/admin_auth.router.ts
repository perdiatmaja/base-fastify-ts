import { inject, injectable } from "tsyringe";
import ContractToken from "../../../constants/contract.token";
import BaseRouter from "../base.router";
import AdminAuthContract from "./contract/admin_auth.contract";
import { GET } from "../../../decorators/methods";
import { QueryParam } from "../../../decorators/parameters";
import LoginAdminDTO from "../../domain/admin/dto/login_admin.dto";
import { PathMapping } from "../../../decorators/classes";

@injectable()
@PathMapping("/v1/admin")
class AdminAuthRouter extends BaseRouter {
    private readonly service: AdminAuthContract

    constructor(@inject(ContractToken.ADMIN_AUTH_CONTRACT) service: AdminAuthContract) {
        super()
        this.service = service
    }

    @GET("/info")
    public async login(@QueryParam("email") email: string): Promise<LoginAdminDTO> {
        const adminData = await this.service.getInfo({
            email: email
        })
        
        return adminData
    }
}

export default AdminAuthRouter