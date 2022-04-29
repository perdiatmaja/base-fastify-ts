import { inject, injectable } from "tsyringe";
import RepositoryToken from "../../../../constants/repository.token";
import { AdminAttributes } from "../../../../models/admin.model";
import AdminRepository from "../repository/admin.repository";
import BaseInteractor from "../../base.interactor";

export interface GetAdminByEmailUseCaseParam {
    email: string
}

@injectable()
class GetAdminByEmailUseCase extends BaseInteractor<AdminAttributes, GetAdminByEmailUseCaseParam> {
    private readonly adminRepository: AdminRepository

    constructor(@inject(RepositoryToken.ADMIN_REPOSITORY) adminRepository: AdminRepository) {
        super()
        this.adminRepository = adminRepository
    }

    protected async buildPromise(param: GetAdminByEmailUseCaseParam): Promise<AdminAttributes> {
        return this.adminRepository.getAdminByEmail(param.email)
    }
}

export default GetAdminByEmailUseCase