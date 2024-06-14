import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import { BucketLocationConstraint, S3 } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'
import S3Service from './cloud_storage/s3'

const s3 = S3Service.getInstance();
s3.setBucketName("nf-2024-bahauddin-top")
//s3.listBuckets()

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(logger)
app.use('/api/v5', globalRouter)

const server = createServer(app)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000/api/v5')
})
