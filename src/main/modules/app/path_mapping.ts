interface PathMapping {
    type?: string
    path?: string
    jwtRequired?: boolean
    authRequired?: boolean
    roleLevel?: number
    userType?: number
}

export default PathMapping