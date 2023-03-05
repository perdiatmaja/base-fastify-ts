import { AdminAttributes } from '../../../../models/admin.model';
import LoginAdminDTO from '../dto/login_admin.dto';
import SecurityUtil from '../../../../utils/security.util';
import AdminDTO from '../dto/admin.dto';

const adminDTOMapper = (admin: AdminAttributes): AdminDTO => {
    return {
        email: admin.email,
        name: admin.name,
        role: admin.role
    }
}

const tokenMapper = (loginId: string): string => {
    return SecurityUtil.signJwt({
        loginId
    })
}

const loginAdminDTOMapper = (admin: AdminAttributes, loginId: string): LoginAdminDTO => {
    return {
        token: tokenMapper(loginId),
        userInfo: adminDTOMapper(admin)
    }
}

export default loginAdminDTOMapper