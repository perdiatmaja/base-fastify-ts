import { AdminAttributes } from './../../../models/admin.model';
import { singleton } from "tsyringe";
import AdminRepository from "../../domain/admin/repository/admin.repository";
import BaseEntityRepository from "../base/base_entity.repository";
import AdminEntityData from "./admin.entity.data";
import AdminDataFactory from "./source/admin.data.factory";

@singleton()
class AdminEntityRepository extends BaseEntityRepository<AdminEntityData> implements AdminRepository {

    constructor(dataFactory: AdminDataFactory) {
        super(dataFactory)
    }

    getAdminByEmail(email: string): Promise<AdminAttributes> {
        return this.createDbData().getAdminByEmail(email)
    }
}

export default AdminEntityRepository