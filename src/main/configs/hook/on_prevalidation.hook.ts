import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

const onPrevalidationHook = (request: FastifyRequest, _: FastifyReply, done: HookHandlerDoneFunction) => {
    done()
}

export default onPrevalidationHook