function PathMapping(mainPath: string) {
    return function (target: any) {
        const decoratedTarget = target
        decoratedTarget.prototype["mainPath"] = mainPath
        return decoratedTarget
    }
}

export default PathMapping