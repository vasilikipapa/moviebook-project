import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'
import { BadRequestError } from '../utils/errors'

const validate = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseData: Record<string, any> = {
      body: req.body
    }

    const result = schema.safeParse(parseData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      
      result.error.issues.forEach(issue => {
        const field = issue.path[issue.path.length - 1]?.toString()
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      })
      
      return next(new BadRequestError(fieldErrors, true))
    }

    req.body = result.data.body

    next()
  }
}

export default validate
