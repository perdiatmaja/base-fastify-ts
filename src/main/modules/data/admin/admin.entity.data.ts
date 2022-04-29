import { AdminAttributes } from "../../../models/admin.model";
import BaseEntityData from "../base/base_entity.data";

interface AdminEntityData extends BaseEntityData {
    getAdminByEmail(email: string): Promise<AdminAttributes>
}

export default AdminEntityData