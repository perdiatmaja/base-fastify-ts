interface BasePlugin {
    init(): Promise<void>
}

export default BasePlugin