# contribution-tool

Deploys the OTA Contribution Tool application.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_contribution_tool_repository` | Repository URL | Required |
| `ota_contribution_tool_repository_branch` | Git branch | `main` |
| `ota_contribution_tool_directory` | Directory name on server | Extracted from repo URL |
| `ota_contribution_tool_directory_override` | Override directory name | None |
| `ota_contribution_tool_collection_id` | Collection identifier | Same as directory |
| `ota_contribution_tool_pm2_home` | PM2 home directory | `/home/{{ ansible_user }}/.pm2-{{ ota_contribution_tool_collection_id }}` |

## Files Required

- `.env` in inventory directory (can be vault-encrypted)
- `pm2.config.cjs` in inventory directory

## Configuration from .env

The following values are read from the `.env` file:

| .env Variable | Description |
|---------------|-------------|
| `PORT` | Application port |
| `NEXT_PUBLIC_BASE_PATH` | URL base path (optional, defaults to empty string) |
