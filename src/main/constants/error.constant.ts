const ErrorConstant = {
    DB: {
        VALIDATION_FAILED: {
            code: 2000,
            message: "DB Validation failed"
        }
    },
    GENERAL: {
        code: 3000,
        message: "System Busy."
    },
    TOKEN: {
        INVALID: {
            code: 4000,
            message: "Invalid Token."
        },
        EXPIRED: {
            code: 4001,
            message: "Expired Token."
        }
    },
    DATA: {
        NOT_FOUND: {
            code: 5000,
            message: 'Data not Found.'
        },
        ALREADY_EXIST: {
            code: 5002,
            message: "Data already exist."
        },
        INVALID: {
            code: 5003,
            message: "Data invalid."
        }
    },
    ACCESS: {
        ACCESS_DENIED: {
            code: 7000,
            message: "Access denied."
        },
        NO_SUCH_ROLE_MESSAGE: {
            code: 7002,
            message: "No such role."
        },
        UNAUTHORIZED_ACCESS: {
            code: 7001,
            message: "Unauthorized Access."
        },
        INCORRECT_PASSWORD: { code: 7003, message: "Password is incorrect." }
        , ORIGIN_NOT_ALLOWED: {
            code: 7004,
            message: "Your origin is not allowed"
        },
        ROUTE_NOT_FOUND: {
            code: 7005,
            message: "Route Not Found"
        }
    }
}

export default ErrorConstant