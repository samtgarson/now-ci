import cookieSession from 'cookie-session'

export default async (req, res) => new Promise(resolve => {
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000
  })(req, res, resolve)
})
