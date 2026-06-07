import type { Request, Response } from 'express'
import MovieService from './service'

class Controller {
  async index(req: Request, res: Response) {
    const { type = 'now_playing', page = 1 } = req.query

    const data = await MovieService.getList(type as string, Number(page))
    res.json(data)
  }
}

export default new Controller()
