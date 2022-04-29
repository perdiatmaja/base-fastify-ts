import { injectable } from "tsyringe";
import BaseDataFactory from "../../base/base.data.factory";
import AdminEntityData from "../admin.entity.data";
import DBAdminEntityData from "./db/db_admin_entity.data";

@injectable()
class AdminDataFactory extends BaseDataFactory<AdminEntityData> {
    constructor(db: DBAdminEntityData) {
        super(db)
    }
}

export default AdminDataFactory