# github

Sets up GitHub bot SSH key for repository access.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_github_bot_key` | Path to store SSH key on server | `/home/{{ ansible_user }}/.ssh/ota-github-bot-key-{{ ota_collection_id }}` |

## Files Required

- `github-bot-private-key` in inventory directory

## Notes

- Adds GitHub SSH fingerprints to known_hosts
- Supports collection-scoped keys for multi-tenant deployment
