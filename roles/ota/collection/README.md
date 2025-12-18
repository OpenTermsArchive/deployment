# ota/collection

Deploys OTA engine collections.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_collection_repository` | Repository URL | Required |
| `ota_collection_repository_branch` | Git branch | `main` |
| `ota_directory` | Directory name on server | Extracted from repo URL |
| `ota_collection_id` | Collection identifier | Same as directory |
| `ota_pm2_home` | PM2 home directory | `/home/{{ ansible_user }}/.pm2-{{ ota_collection_id }}` |
| `ota_github_bot_key_path` | SSH key path | `/home/{{ ansible_user }}/.ssh/ota-github-bot-key-{{ ota_collection_id }}` |

## Files Required

- `pm2.config.cjs` in inventory directory (required)
- `.env` in inventory directory (optional)
- `github-bot-private-key` in inventory directory (required for SSH repos)
