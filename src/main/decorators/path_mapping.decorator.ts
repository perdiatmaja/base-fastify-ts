function PathMapping(mainPath: string) {
    return function (target: any) {
        target.prototype["mainPath"] = mainPath
        return target
    }
}

export default PathMapping