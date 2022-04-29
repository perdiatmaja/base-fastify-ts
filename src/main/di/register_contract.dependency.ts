import { container } from 'tsyringe';
import ContractToken from '../constants/contract.token';
import AdminAuthContract from '../modules/app/auth/contract/admin_auth.contract';
import AdminAuthService from '../modules/app/auth/contract/admin_auth.service';

const registerContract = () => {
    container.register<AdminAuthContract>(ContractToken.ADMIN_AUTH_CONTRACT, AdminAuthService)
}

const registerContractDependency = () => {
    registerContract()
}

export default registerContractDependency