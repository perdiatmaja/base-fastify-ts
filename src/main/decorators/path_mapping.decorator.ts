import BaseRouter from "../modules/app/base.router"

function customConstructor(constructor: any): any {
    function newConstructor(...args: any[]) {
        return new constructor(...args)
    }

    newConstructor.prototype = constructor.prototype

    return newConstructor
}

function PathMapping(mainPath: string) {
    return function (target: any) {
        const decoratedTarget = customConstructor(target)
        decoratedTarget.prototype["mainPath"] = mainPath
        return decoratedTarget
    }
}

export default PathMapping