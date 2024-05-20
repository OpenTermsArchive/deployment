module.exports = {
  apps: [
    {
      name: 'ota',
      script: 'npm',
      args: 'run start:schedule',
      max_restarts: 2,
      min_uptime: '1h', // Set a relatively high duration (more than the longest run) so that restarts that occur before this duration has elapsed are considered unstable.
      restart_delay: 10800000,
    },
    {
      name: 'ota-api',
      script: 'npm',
      args: 'run start:api',
    },
    {
      name: 'ota-release',
      script: 'npm',
      args: 'run dataset:schedule',
      max_restarts: 2,
      min_uptime: '1h', // Set a relatively high duration (more than the longest run) so that restarts that occur before this duration has elapsed are considered unstable.
      restart_delay: 15 * 60 * 1000,
    },
    {
      name: 'ota-federation-api',
      script: 'npm',
      args: 'run start:federation-api',
      max_restarts: 2,
      min_uptime: '1h', // Set a relatively high duration (more than the longest run) so that restarts that occur before this duration has elapsed are considered unstable.
      restart_delay: 15 * 60 * 1000,
    }
  ],
};
