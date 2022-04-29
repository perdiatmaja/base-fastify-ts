import { AdminAttributes } from './../../../../models/admin.model';

interface AdminRepository {
    getAdminByEmail(email: string): Promise<AdminAttributes>
}

export default AdminRepository