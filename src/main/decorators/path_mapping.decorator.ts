/**
 * Class decorator to register class as main a router
 */

function PathMapping(mainPath: string) {
    return function (target: any) {
        const decoratedTarget = target
        decoratedTarget.prototype["mainPath"] = mainPath
        return decoratedTarget
    }
}

export default PathMapping