# ota/apps

Deploys OTA Engine collections.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_collection_repository` | Repository URL | Required |
| `ota_collection_repository_branch` | Git branch | `main` |
| `ota_directory` | Directory name on server | Extracted from repo URL |
| `ota_collection_id` | Collection identifier | Same as directory |
| `ota_pm2_home` | PM2 home directory | `/home/{{ ansible_user }}/.pm2-{{ ota_collection_id }}` |
| `ota_github_bot_key` | SSH key path | `/home/{{ ansible_user }}/.ssh/ota-github-bot-key-{{ ota_collection_id }}` |

## Files Required

- `.env` or `.env.secrets` in inventory directory
- `pm2.config.cjs` in inventory directory
- `github-bot-private-key` in inventory directory (for SSH repos)
