class MovieService {
  async getList(type: string, page: number) {
    const THEMOVIEDB_ACCESS_TOKEN = process.env.THEMOVIEDB_ACCESS_TOKEN

    if (!THEMOVIEDB_ACCESS_TOKEN) {
      throw new Error('The Movie Database access token is not configured')
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${THEMOVIEDB_ACCESS_TOKEN}`
      }
    }
    
    try {
      const response = await fetch(
        `${process.env.THEMOVIEDB_API_URL}/movie/${type}?language=en-US&page=${page}`,
        options
      )
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Failed to fetch movie list')
    }
  }
}

export default new MovieService()
