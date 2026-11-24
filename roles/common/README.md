# common

Installs base system packages required by all OTA applications.

Also enables automatic updates with [`unattended-upgrades`](https://github.com/mvo5/unattended-upgrades): every day, the server installs the updates selected by the default configuration of its distribution, without waiting for a deployment. These include security updates, but not packages from third-party repositories such as NodeSource or MongoDB, and the server is never rebooted. Installed updates are logged in `/var/log/unattended-upgrades/unattended-upgrades.log`.
