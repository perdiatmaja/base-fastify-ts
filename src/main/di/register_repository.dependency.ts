import { container } from 'tsyringe';
import RepositoryToken from '../constants/repository.token';
import AdminRepository from '../modules/domain/admin/repository/admin.repository';
import AdminEntityRepository from '../modules/data/admin/admin_entity.repository';
const registerRepositoryDependency = () => {
    container.registerSingleton<AdminRepository>(RepositoryToken.ADMIN_REPOSITORY, AdminEntityRepository)
}

export default registerRepositoryDependency