interface BasePlugin {
    init(): Promise<void>
}

export = BasePlugin