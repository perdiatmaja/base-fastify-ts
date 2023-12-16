import { injectable } from "tsyringe";
import BaseRouter from "../../../../main/modules/app/base.router";
import { GET } from "../../../../main/decorators/methods";
import { PathMapping } from "../../../../main/decorators/classes";

@injectable()
@PathMapping("/demo")
class DemoRouter extends BaseRouter {

    @GET("/hello-world")
    public async login(): Promise<string> {
        return `Hellow World`
    }
}

export default DemoRouter