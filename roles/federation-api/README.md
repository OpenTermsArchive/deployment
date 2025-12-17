# federation-api/apps

Deploys the OTA Federation API application.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_federation_api_source_repository` | Repository URL | Required |
| `ota_federation_api_source_repository_branch` | Git branch | `main` |
| `ota_federation_api_directory` | Directory name on server | Extracted from repo URL |
| `ota_federation_api_directory_override` | Override directory name | None |
| `ota_federation_api_config_file` | Config file name (without .json) | `production` |
| `ota_federation_api_collection_id` | Collection identifier | Same as directory |
| `ota_federation_api_pm2_home` | PM2 home directory | `/home/{{ ansible_user }}/.pm2-{{ ota_federation_api_collection_id }}` |

## Files Required

- `.env` in inventory directory
- `pm2.config.cjs` in inventory directory
- `config/production.json` in repository
