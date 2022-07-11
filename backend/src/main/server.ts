import dotenv from 'dotenv'
import { app } from "./config/app"
import { env } from "./config/env"

dotenv.config()

app.listen(env.port, () => console.log(`Listening on port ${env.port}...`))
