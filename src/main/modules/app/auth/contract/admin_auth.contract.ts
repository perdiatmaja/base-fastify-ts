import LoginAdminDTO from "../../../domain/admin/dto/login_admin.dto"

export interface LoginAdminRequest {
    email: string
    password: string
}

interface AdminAuthContract {
    loginAdmin(request: LoginAdminRequest): Promise<LoginAdminDTO>
}

export default AdminAuthContract