# pm2/manage

Manages PM2 processes for OTA applications.

By default, the role stops and then starts the applications. Use `tasks_from: stop` or `tasks_from: start` to run only one of these steps, for example to stop the applications before updating their code.

Starting the applications also generates and enables a systemd unit named `pm2-<ota_pm2_app_id>`, which restarts the applications of this PM2 home after a reboot.

## Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ota_pm2_app_directory` | Application directory name | Yes |
| `ota_pm2_home` | PM2 home directory path | Yes |
| `ota_pm2_app_id` | Application identifier, used to name the systemd startup unit | Yes |

## Files Required

- `pm2.config.cjs` in inventory directory

## Tags

- `start` - Start applications
- `stop` - Stop applications
- `restart` - Restart applications
