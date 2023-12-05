import "reflect-metadata"
import dotenv from 'dotenv'

try {
    const env = `.env${process.argv.length > 2 ? ".".concat(process.argv[2]) : ""}`
    dotenv.config({ path: `${process.env.PWD}/${env}` })
} catch (err) {
    console.error(err)
    process.exit(1)
}