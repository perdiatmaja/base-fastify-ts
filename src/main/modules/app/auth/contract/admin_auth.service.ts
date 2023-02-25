import { AdminAttributes } from '../../../../models/admin.model';
import { injectable } from 'tsyringe';
import LoginAdminDTO from "../../../domain/admin/dto/login_admin.dto";
import loginAdminDTOMapper from '../../../domain/admin/mapper/admin_login_dto.mapper';
import AdminAuthContract, { LoginAdminRequest } from "./admin_auth.contract";
import IncorrectPasswordError from '../../../../error/incorrect_password.error';
import GetAdminByEmailUseCase from '../../../domain/admin/interactor/get_admin_by_email.interactor';
import EventLogConstant from '../constant/event_log.constant';

@injectable()
class AdminAuthService implements AdminAuthContract {
    private readonly getAdminByEmailUseCase: GetAdminByEmailUseCase

    constructor(
        getAdminByEmailUseCase: GetAdminByEmailUseCase
    ) {
        this.getAdminByEmailUseCase = getAdminByEmailUseCase
    }

    loginAdmin(request: LoginAdminRequest): Promise<LoginAdminDTO> {
        return this.getAdminByEmailUseCase.blockingExecute({
            email: request.email
        }).then(async (admin: AdminAttributes) => {
            if (admin.password !== request.password) {
                await this.saveEventLog(EventLogConstant.status.FAILED, admin.id)
                throw new IncorrectPasswordError()
            }

            return loginAdminDTOMapper(admin, await this.saveEventLog(EventLogConstant.status.SUCCESS, admin.id))
        })
    }

    private saveEventLog(status: number, userId: string): Promise<string> {
        return this.getAdminByEmailUseCase.blockingExecute({
            email: ""
        }).then(async (_: AdminAttributes) => {
            return ""
        })
    }
}

export default AdminAuthService