import { container, singleton } from 'tsyringe';
import FileUtils from '../../utils/file.utils';
import AdminAuthRouter from './auth/admin_auth.router';

@singleton()
class RoutesInitialazer {
    initRoutes() {
        const directoryPath: string = `${process.cwd()}/src/main/modules/app`
        const filePaths: string[] = FileUtils.getFileList(directoryPath)

        for (const filePath of filePaths) {
            if (!filePath.includes(`base`) && filePath.includes(`.router.`)) {
                const routerClass = require(filePath)
                container.resolve(AdminAuthRouter)
            }
        }
    }
}

export default RoutesInitialazer