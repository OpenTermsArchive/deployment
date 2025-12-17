# nginx/configure

Configures NGINX reverse proxy for OTA applications.

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ota_nginx_collection_id` | Collection identifier for config files | Required |
| `ota_nginx_endpoints` | List of endpoints with basePath and port | Required |
| `ota_nginx_config_template` | Rate limit config template path | Required |
| `ota_nginx_reverse_proxy_config_template` | Reverse proxy config template path | Required |
| `ota_nginx_server_config_template` | Server block template path | Required |
| `ota_rate_limit_rate` | Request rate limit | `10r/s` |
| `ota_rate_limit_burst` | Burst limit | `5` |
| `ota_rate_limit_zone_size` | Zone memory size | `10m` |
