import { injectable } from "tsyringe";
import BaseRouter from "./base.router";
import { GET } from "../../decorators/methods";
import { PathMapping } from "../../decorators/classes";

@injectable()
@PathMapping("/demo")
class AdminAuthRouter extends BaseRouter {
    @GET("/hello-world")
    public async login(): Promise<string> {
        return `Hellow World`
    }
}

export default AdminAuthRouter