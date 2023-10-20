import LoginAdminDTO from "../../../domain/admin/dto/login_admin.dto"

export interface GetInfoRequest {
    email: string
}

interface AdminAuthContract {
    getInfo(request: GetInfoRequest): Promise<LoginAdminDTO>
}

export default AdminAuthContract