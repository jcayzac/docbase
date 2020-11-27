module.exports = {
  rewrite: [
    {
      from: '/docbase/(.*)',
      to: '/$1'
    }
  ],
  directory: 'docs',
  logFormat: 'stats',
  keepAliveTimeout: 0,
  maxConnections: 60,
  hostname: 'localhost',
  port: 5000,
  static: {
    maxage: 0,
  },
}
