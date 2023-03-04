import { singleton } from 'tsyringe';
import AdminAuthRouter from './auth/admin_auth.router';
import BaseRouter from './base.router';

@singleton()
class RoutesInitialazer {
    private readonly routes: BaseRouter[] = []

    constructor(
        adminAuthRoute: AdminAuthRouter
    ) {
        this.routes.push(adminAuthRoute)
    }

    initRoutes() {
        this.routes.forEach((route) => route.initRoute())
    }
}

export default RoutesInitialazer