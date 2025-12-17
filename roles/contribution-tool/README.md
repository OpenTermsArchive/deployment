# contribution-tool/apps

Deploys the OTA Contribution Tool application.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_contribution_tool_source_repository` | Repository URL | Required |
| `ota_contribution_tool_source_repository_branch` | Git branch | `main` |
| `ota_contribution_tool_directory` | Directory name on server | Extracted from repo URL |
| `ota_contribution_tool_directory_override` | Override directory name | None |
| `ota_contribution_tool_port` | Application port | Required |
| `ota_contribution_tool_base_path` | URL base path | `''` |
| `ota_contribution_tool_collection_id` | Collection identifier | Same as directory |
| `ota_contribution_tool_pm2_home` | PM2 home directory | `/home/{{ ansible_user }}/.pm2-{{ ota_contribution_tool_collection_id }}` |

## Files Required

- `.env` in inventory directory
- `pm2.config.cjs` in inventory directory
