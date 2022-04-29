const FastifyHook = {
    ON_REQUEST: 'onRequest' as 'onRequest',
    PRE_PARSING: 'preParsing' as 'preParsing',
    PRE_VALIDATION: 'preValidation' as 'preValidation',
    PRE_HANDLER: 'preHandler' as 'preHandler',
    PRE_SERIALIZATION: 'preSerialization' as 'preSerialization',
    ON_ERROR: 'onError' as 'onError',
    ON_SEND: 'onSend' as 'onSend',
    ON_RESPONSE: 'onResponse' as 'onResponse',
    ON_TIMEOUT: 'onTimeout' as 'onTimeout',
    ON_READY: 'onReady' as 'onReady',
    ON_ROUTE: 'onClose' as 'onClose',
    ON_REGISTER: 'onRegister' as 'onRegister'
}

export default FastifyHook