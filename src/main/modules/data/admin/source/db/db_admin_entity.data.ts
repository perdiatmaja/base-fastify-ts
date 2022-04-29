import AdminModel, { AdminAttributes } from './../../../../../models/admin.model';
import { injectable } from 'tsyringe';
import BaseDBDataEntity from "../../../base/base_db.data.entity";
import AdminEntityData from "../../admin.entity.data";

@injectable()
class DBAdminEntityData extends BaseDBDataEntity implements AdminEntityData {

    getAdminByEmail(email: string): Promise<AdminAttributes> {
        return this.wrapperWithDataNotFound("Admin", AdminModel.findOne({
            where: {
                email
            }
        }))
    }
}

export default DBAdminEntityData