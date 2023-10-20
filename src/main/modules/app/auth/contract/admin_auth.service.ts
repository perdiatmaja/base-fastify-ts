import { injectable } from 'tsyringe';
import LoginAdminDTO from "../../../domain/admin/dto/login_admin.dto";
import loginAdminDTOMapper from '../../../domain/admin/mapper/admin_login_dto.mapper';
import AdminAuthContract, { GetInfoRequest } from "./admin_auth.contract";
import GetAdminByEmailUseCase from '../../../domain/admin/interactor/get_admin_by_email.interactor';
import { Transactional } from '../../../../decorators/method';

@injectable()
class AdminAuthService implements AdminAuthContract {
    private readonly getAdminByEmailUseCase: GetAdminByEmailUseCase

    constructor(
        getAdminByEmailUseCase: GetAdminByEmailUseCase
    ) {
        this.getAdminByEmailUseCase = getAdminByEmailUseCase
    }

    @Transactional()
    async getInfo(request: GetInfoRequest): Promise<LoginAdminDTO> {
        const admin = await this.getAdminByEmailUseCase.execute({
            email: request.email
        })
        return loginAdminDTOMapper(admin, "")
    }
}

export default AdminAuthService