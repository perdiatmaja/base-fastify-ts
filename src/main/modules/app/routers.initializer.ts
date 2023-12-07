import { container, singleton } from 'tsyringe';
import FileUtils from '../../utils/file.utils';
import BasePlugin from 'configs/base.plugin';

@singleton()
class RoutesInitializer implements BasePlugin {
    
    async init() {
        const directoryPath: string = `${process.cwd()}${process.env.ROUTER_PATH}`
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

export = RoutesInitializer