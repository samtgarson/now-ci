import { json, send, createError } from 'micro'
import crypto from 'crypto'
import bufferEq from 'buffer-equal-constant-time'
import Build from '../models/build'
const secret = process.env['SECRET_KEY']

const signBlob = (blob) => (
  'sha1=' + crypto.createHmac('sha1', secret).update(blob).digest('hex')
)

const isSecure = async (req) => {
  const payload = JSON.stringify(await json(req))
  const sig = req.headers['x-hub-signature'] || ''
  const computedSig = new Buffer(signBlob(payload))
  return bufferEq(new Buffer(sig), computedSig)
}

export default async (req, res) => {
  const secure = await isSecure(req)
  if (!secure) throw createError(401, 'X-Hub-Signature does not match blob signature')
  const payload = await json(req)
  const build = Build.create(payload)
  build.run()
  return send(res, 200, 'Success')
}
