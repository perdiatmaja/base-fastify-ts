import "reflect-metadata"
import Application from './application'
import dotenv from 'dotenv'

try {
    const env = `.env${process.argv.length > 2 ? ".".concat(process.argv[2]) : ""}`
    dotenv.config({ path: `${process.env.PWD}/${env}` })

    Application.start()
} catch (err) {
    console.error(err)
    process.exit(1)
}