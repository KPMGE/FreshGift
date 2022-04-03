import express from 'express'
import dotenv from 'dotenv'
import { setupRoutes } from './routes'

dotenv.config()
const app = express()
app.use(express.json())
setupRoutes(app)

export { app }
