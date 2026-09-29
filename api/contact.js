const { Pool } = require('pg')

const pool = global.__cakeHavenPool || new Pool({ connectionString: process.env.DATABASE_URL })
if (process.env.NODE_ENV !== 'production') global.__cakeHavenPool = pool

function sendJson(res, status, body) {
  res.status(status).json(body)
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body || {}
    const cleanName = typeof name === 'string' ? name.trim() : ''
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const cleanMessage = typeof message === 'string' ? message.trim() : ''

    if (!cleanName || cleanName.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanMessage.length < 10 || cleanMessage.length > 4000) {
      return sendJson(res, 400, { error: 'Please provide a valid name, email, and message.' })
    }

    await pool.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)',
      [cleanName, cleanEmail, cleanMessage],
    )

    return sendJson(res, 201, { message: 'Inquiry received' })
  } catch (error) {
    console.error('[v0] Contact submission failed:', error)
    return sendJson(res, 500, { error: 'We could not save your note. Please try again.' })
  }
}

module.exports.config = { api: { bodyParser: { sizeLimit: '16kb' } } }

