import { singleton } from 'tsyringe';
import AdminAuthRoute from './auth/admin_auth.route';
import BaseRoute from './base.route';

@singleton()
class RoutesInitialazer {
    private readonly routes: BaseRoute[] = []

    constructor(
        adminAuthRoute: AdminAuthRoute
    ) {
        this.routes.push(adminAuthRoute)
    }

    initRoutes() {
        this.routes.forEach((route) => route.initRoute())
    }
}

export default RoutesInitialazer