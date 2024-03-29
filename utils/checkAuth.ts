import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload, UserAuthInfoRequest } from '../types'

export default (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123') as JwtPayload

      req.userId = decoded._id

      next()
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа',
      })
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    })
  }
}
