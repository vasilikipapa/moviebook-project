import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'
import { BadRequestError } from '../utils/errors'

const validate = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    if (!result.success) {
      return next(new BadRequestError(result.error.issues[0]?.message || 'Validation failed'))
    }

    req.body = result.data.body

    next()
  }
}

export default validate
