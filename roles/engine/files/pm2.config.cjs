module.exports = {
  apps: [
    {
      name: 'ota',
      script: 'npm',
      args: 'run track',
      max_restarts: 2,
      min_uptime: '1h', // Set a relatively high duration (more than the longest run) so that restarts that occur before this duration has elapsed are considered unstable.
      restart_delay: 15 * 60 * 1000,
    }
  ],
};