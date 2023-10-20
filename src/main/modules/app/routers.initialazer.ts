import { container, singleton } from 'tsyringe';
import FileUtils from '../../utils/file.utils';

@singleton()
class RoutesInitialazer {
    initRoutes() {
        const directoryPath: string = `${process.cwd()}/src/main/modules/app`
        const filePaths: string[] = FileUtils.getFileList(directoryPath)

        for (const filePath of filePaths) {
            if (!filePath.includes(`base.router.ts`) && filePath.includes(`.router.ts`)) {
                const routerClass = require(filePath)
                const declaredRoutedClass = container.resolve(routerClass.default) as any
                declaredRoutedClass["initRoute"]()
            }
        }
    }
}

export default RoutesInitialazer