import "reflect-metadata"
import dotenv from 'dotenv'
import { container } from "tsyringe"
import Application from "./application"

try {
    const env = `.env${process.argv.length > 2 ? ".".concat(process.argv[2]) : ""}`
    dotenv.config({ path: `${process.env.PWD}/${env}` })
    const app: Application = container.resolve(Application)
    
    app.start()
} catch (err) {
    console.error(err)
    process.exit(1)
}