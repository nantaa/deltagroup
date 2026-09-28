module.exports = {
  apps: [
    {
      name: 'dnp-frontend',
      script: '.next/standalone/delta-nusantara-persada/frontend/server.js',
      cwd: '/var/www/delta-nusantara/deltagroup/delta-nusantara-persada/frontend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
}
