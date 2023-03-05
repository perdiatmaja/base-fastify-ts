interface PathMapping {
    type?: string
    path?: string
    jwtRequired?: boolean
    authRequired?: boolean
    roleLevel?: number
}

export default PathMapping