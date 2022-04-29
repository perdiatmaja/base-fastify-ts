import { Static, Type } from '@sinclair/typebox'

const LoginAdmin = Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String()
});

type LoginAdminBody = Static<typeof LoginAdmin>;

export default LoginAdminBody