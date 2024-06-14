import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import S3Service from './cloud_storage/s3'
import cors from "cors"
import initWebsockets from "./routes/songs/ws-controller";

const s3 = S3Service.getInstance();
//s3.setBucketName("nf-2024-bahauddin-top-2")
//s3.setBucketPolicy("nf-2024")
//s3.listBuckets()

connectDB()

const app = express()

app.use(express.json())
app.use(logger)
app.use(cors())
//app.use(express.urlencoded({ extended: true }));

app.use('/api/v5', globalRouter)

const server = createServer(app)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000/api/v5')
})

initWebsockets(server)