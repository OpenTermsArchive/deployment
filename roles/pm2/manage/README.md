# pm2/manage

Manages PM2 processes for OTA applications.

## Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ota_pm2_app_directory` | Application directory name | Yes |
| `ota_pm2_home` | PM2 home directory path | Yes |

## Files Required

- `pm2.config.cjs` in inventory directory

## Tags

- `start` - Start applications
- `stop` - Stop applications
- `restart` - Restart applications
