import { NextFunction, Request, Response } from 'express'
import AuthService from '../routes/users/auth-service'

const authService = new AuthService()

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[0]
  const payload = authService.verifyJwt(token)

  if (!payload) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }

  ;(req as any).username = payload.username
  ;(req as any)._id = payload.id
  next()
}
