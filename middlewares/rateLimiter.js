const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 5, duration: 1
});

exports.rateLimiter = (req, res, next) => {
  const key = req.headers['cl-x-token'] || req.ip;
  rateLimiter.consume(key)
    .then(() => next())
    .catch(() => res.status(429).json({ success: false, message: 'Too many requests' }));
};
