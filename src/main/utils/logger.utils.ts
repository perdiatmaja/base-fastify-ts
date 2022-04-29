import { configure, getLogger, LoggingEvent } from "log4js";
import RouteNotFoundError from "../error/route_not_found.error";

const CONSOLE_ENABLE = process.env.CONSOLE_ENABLE === "true"

const createNewLogger = (logType: string) => {
    configure({
        appenders: {
            app: {
                type: "file",
                filename: "log/app.log",
                layout: {
                    type: 'pattern',
                    pattern: "[%x{ln}] %-5p %m",
                    tokens: {
                        ln: (data: LoggingEvent) => {
                            const currentTime = new Date()
                            return `${currentTime.getMonth() + 1}-${currentTime.getDate()}-${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}`
                        }
                    }
                }
            }
        },
        categories: {
            default: { appenders: ["app"], level: logType, enableCallStack: false }
        }
    });

    return getLogger()
}

const CLASS_NAME = 'Class Name:'
const MESSAGE = 'Message:'

class AppLogger {
    private static readonly errorLogger = createNewLogger('error')
    private static readonly infoLogger = createNewLogger('info')
    private constructor() { }

    private static e(message: string) {
        if (CONSOLE_ENABLE) {
            console.log("ERROR :", message)
        }
        this.errorLogger.error(message)
    }

    private static i(message: string) {
        if (CONSOLE_ENABLE) {
            console.log("INFO :", message)
        }
        this.infoLogger.info(message)
    }

    static writeError(error: Error) {
        let log = CLASS_NAME + error.constructor.name + ','
        log += MESSAGE + error.message

        if (error instanceof RouteNotFoundError) {
            log += ` at ${error.path}`
        } else {
            log += `\nStack: ${error.stack}`
        }

        this.e(log)
    }

    static writeInfo(message: string) {
        let log = message
        this.i(log)
    }
}

export default AppLogger