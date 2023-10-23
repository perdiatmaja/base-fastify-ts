import Application from './application'

try {
    Application.start()
} catch (err) {
    console.error(err)
    process.exit(1)
}