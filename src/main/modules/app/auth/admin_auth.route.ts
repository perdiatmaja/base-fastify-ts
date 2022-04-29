import { inject, injectable } from "tsyringe";
import Application from "../../../application";
import ContractToken from "../../../constants/contract.token";
import BaseRoute from "../base.route";
import { AuthRoutesConstant as RoutesConstatnt } from "./constant/auth.routes.constant";
import AdminAuthContract from "./contract/admin_auth.contract";
import LoginAdminBody from "./schema/login_admin.body";

@injectable()
class AdminAuthRoute extends BaseRoute {
    private readonly service: AdminAuthContract

    constructor(application: Application, @inject(ContractToken.ADMIN_AUTH_CONTRACT) service: AdminAuthContract) {
        super(application)
        this.service = service
    }


    initRoute(): void {
        this.initAdminLogin()
    }

    private initAdminLogin() {
        this.registerPostRoute<LoginAdminBody>(RoutesConstatnt.LOGIN, async (req, rep) => {
            const loginAdminDTO = await this.service.loginAdmin(req.body)

            rep.send(this.sendSuccess(loginAdminDTO))
        })
    }
}

export default AdminAuthRoute