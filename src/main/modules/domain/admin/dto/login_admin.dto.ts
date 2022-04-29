import AdminDTO from "./admin.dto"

interface LoginAdminDTO {
    token: string,
    userInfo: AdminDTO
}

export default LoginAdminDTO