# contrib-tool/apps

Deploys the OTA Contribution Tool application.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_contrib_tool_source_repository` | Repository URL | Required |
| `ota_contrib_tool_source_repository_branch` | Git branch | `main` |
| `ota_contrib_tool_directory` | Directory name on server | Extracted from repo URL |
| `ota_contrib_tool_directory_override` | Override directory name | None |
| `ota_contrib_tool_port` | Application port | Required |
| `ota_contrib_tool_base_path` | URL base path | `''` |
| `ota_contrib_tool_collection_id` | Collection identifier | Same as directory |
| `ota_contrib_tool_pm2_home` | PM2 home directory | `/home/{{ ansible_user }}/.pm2-{{ ota_contrib_tool_collection_id }}` |

## Files Required

- `.env.secrets` in inventory directory
- `pm2.config.cjs` in inventory directory
