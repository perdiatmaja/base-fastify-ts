import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

const onPrevalidationHook = (_: FastifyRequest, __: FastifyReply, done: HookHandlerDoneFunction) => {
    done()
}

export default onPrevalidationHook