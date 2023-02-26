import { AdminAttributes } from '../../../../models/admin.model';
import { injectable } from 'tsyringe';
import LoginAdminDTO from "../../../domain/admin/dto/login_admin.dto";
import loginAdminDTOMapper from '../../../domain/admin/mapper/admin_login_dto.mapper';
import AdminAuthContract, { LoginAdminRequest } from "./admin_auth.contract";
import IncorrectPasswordError from '../../../../error/incorrect_password.error';
import GetAdminByEmailUseCase from '../../../domain/admin/interactor/get_admin_by_email.interactor';

@injectable()
class AdminAuthService implements AdminAuthContract {
    private readonly getAdminByEmailUseCase: GetAdminByEmailUseCase

    constructor(
        getAdminByEmailUseCase: GetAdminByEmailUseCase
    ) {
        this.getAdminByEmailUseCase = getAdminByEmailUseCase
    }

    async loginAdmin(request: LoginAdminRequest): Promise<LoginAdminDTO> {
        const admin = await this.getAdminByEmailUseCase.blockingExecute({
            email: request.email
        });
        if (admin.password !== request.password) {
            throw new IncorrectPasswordError();
        }
        return loginAdminDTOMapper(admin, "");
    }
}

export default AdminAuthService