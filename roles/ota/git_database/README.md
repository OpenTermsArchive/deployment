# ota/git_database

Sets up Git-based storage for versions, snapshots and tracking-results.

The repository is cloned only if it is not on the server yet. The content of an existing clone is left to the engine, which publishes its commits itself, so that the commits it has not published yet are never discarded, unless a reset is explicitly requested with `ota_git_database_reset`. Only request it while the applications writing to the repository are stopped.

## Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ota_git_database_repository` | Git repository URL | Yes |
| `ota_git_database_directory` | Local directory path | Yes |
| `ota_git_database_branch` | Git branch to clone, and to reset to | Yes |
| `ota_git_database_reset` | Reset an existing clone to the state of its remote branch, discarding the commits that are not on the remote and any uncommitted change | No, `false` by default |
| `ota_github_bot_key_path` | SSH key path for authentication | Yes |
