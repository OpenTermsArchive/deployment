# Open Terms Archive Ansible Collection

This repository contains the `opentermsarchive.deployment` Ansible collection. This Ansible collection provides playbooks to set up the infrastructure of and deploy Open Terms Archive applications.

To prevent confusion between the notion of Ansible [Collection](https://docs.ansible.com/ansible/latest/collections_guide/index.html) and an Open Terms Archive [Collection](https://docs.opentermsarchive.org/#collection), this documentation will refer to Ansible Collection only as “Playbook”, as this is the main entry point to interact with it.

## Installation

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to use this playbook.

This playbook can be installed from Ansible Galaxy manually with the `ansible-galaxy` command-line tool:

```sh
ansible-galaxy collection install opentermsarchive.deployment
```

It can also be included in a `requirements.yml` file using the format:

```yaml
---
collections:
- name: opentermsarchive.deployment
```

And installed with the command:

```sh
ansible-galaxy collection install -r requirements.yml
```

## Usage

Once installed, the playbook `deploy` allows to set up and deploy an Open Terms Archive [collection](https://docs.opentermsarchive.org/#collection) powered by the [Engine](https://github.com/OpenTermsArchive/engine).

The playbook can be executed using the `ansible-playbook` command-line tool:

```sh
ansible-playbook opentermsarchive.deployment.deploy
```

_It is possible to check the playbook execution without actually applying changes with the `check` and `diff` options:_

```sh
ansible-playbook opentermsarchive.deployment.deploy --check --diff
```

> See “[Using collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html)” in Ansible’s user guide for more information about Ansible collections.

## Configuration

Configuration is done through various files located in the `deployment` folder. Below is an example of the directory structure:

```plaintext
deployment/
  ├── inventory.yml
  ├── pm2.config.cjs
  ├── github-bot-private-key
  └── .env
```

- ### Inventory File — `inventory.yml`

**This file is mandatory**

The `inventory.yml` file defines the hosts and the variables required for the deployment. This file should contain all the necessary variables as described below.

| Variable                       | Description                                                                                                                | Required or default value |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `ota_source_repository`        | URL of the declarations repository to deploy                                                                               | **required**              |
| `ota_source_repository_branch` | [Git branch or tag](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddeftree-ishatree-ishalsotreeish) of the source repository | `main`                    |

These variables are defined in the inventory file, for example:

```yaml
all:
  hosts:
    127.0.0.1:
      ansible_user: debian
      ota_source_repository: https://github.com/OpenTermsArchive/demo-declarations.git
      ota_source_repository_branch: main
```

The playbook will automatically derive:
- `ota_directory`: The directory where the code will be deployed (extracted from the repository URL, e.g., `demo-declarations`)
- `ota_collection_id`: The collection identifier used for PM2 and nginx configuration (directory name without the `-declarations` suffix, e.g., `demo`)

#### Changes on an existing deployment

If the `ota_source_repository` is changed on an existing target, the application has to be [stopped](#playbook-execution-refinement) before the new configuration is deployed.

- ### PM2 Configuration File — `pm2.config.cjs`

**This file is mandatory**

The `pm2.config.cjs` file is used to configure the [PM2](https://pm2.keymetrics.io) process manager, which is used to start the applications.

- ### GitHub Bot Private Key — `github-bot-private-key`

The `github-bot-private-key` file contains a private SSH key for accessing and pushing to SSH Git URLs. This file is required if `ota_source_repository` is an SSH Git URL or if the URLs for versions and/or snapshots repositories in the `config/production.json` file of the source repository are SSH Git URLs.

It is strongly recommended to [encrypt this file](#file-encryption) if it is checked in to a public repository.

- ### Environment Variables File — `.env`

The `.env` file contains the environment variables for the deployed applications.

It is strongly recommended to [encrypt this file](#file-encryption) if it is checked in to a public repository.

## File encryption

Sensitive configuration files should be encrypted using [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html).

Examples of encrypting and decrypting a file:

- Encrypt the `github-bot-private-key` file: `ansible-vault encrypt github-bot-private-key`
- Decrypt the `github-bot-private-key` file: `ansible-vault decrypt github-bot-private-key`
- Encrypting with a password stored in a file:
  - `echo 'your_password' > vault.key`
  - `ansible-vault encrypt --vault-password-file vault.key github-bot-private-key`

To run the playbook with encrypted files:

```sh
ansible-playbook playbook.yml --ask-vault-pass
```

Or with a password file:

```sh
ansible-playbook playbook.yml --vault-password-file vault.key
```

Please note that encrypted files will be decrypted and stored in plaintext on the deployment server. Always protect access to your production server.

## Playbook execution refinement

Use [tags](https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html) to refine playbook execution. Example commands:

| Tag             | Description                             | Command Example                                                                  |
|-----------------|-----------------------------------------|----------------------------------------------------------------------------------|
| `start`         | Start Open Terms Archive applications   | `ansible-playbook opentermsarchive.deployment.deploy --tags start`               |
| `stop`          | Stop Open Terms Archive applications    | `ansible-playbook opentermsarchive.deployment.deploy --tags stop`                |
| `restart`       | Restart Open Terms Archive applications | `ansible-playbook opentermsarchive.deployment.deploy --tags restart`             |
| `infrastructure`| Set up the infrastructure only          | `ansible-playbook opentermsarchive.deployment.deploy --tags infrastructure`      |
| `infrastructure`| Skip the infrastructure                 | `ansible-playbook opentermsarchive.deployment.deploy --skip-tags infrastructure` |

- - -

## Development

### Requirements

1. Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).
2. Install [Vagrant](https://www.vagrantup.com/downloads).
3. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) to manage virtual machines. If Docker is preferred, or on an Apple Silicon machine, install [Docker](https://docs.docker.com/get-docker/) instead.
4. Create a dedicated SSH key with no password: `ssh-keygen -f ~/.ssh/ota-vagrant -q -N ""`. This key will be automatically used by Vagrant.

> VirtualBox is not compatible with Apple Silicon (M1…) processors. To use vagrant on this kind of machine, specifying the Docker provider will be required. Since MongoDB cannot be installed on ARM, it is skipped in the infrastructure installation process. This means the MongoDB storage repository cannot be tested with Vagrant with an Apple Silicon processor.

### Usage

For testing this collection, a virtual machine description file is provided, inside the `tests` folder, to be used with [Vagrant](https://www.vagrantup.com).

All following commands must be executed from the `tests` folder:

    cd tests

#### Launch VM

```sh
vagrant up
```

> With an Apple Silicon processor or to use Docker instead of VirtualBox, use `vagrant up --provider=docker`.

Then the code can be deployed to the running machine with all the options described before.

#### Test collection

Testing the Ansible collection locally is crucial to ensure that changes function properly before submitting them as a pull request.

The testing environment is preconfigured for Open Terms Archive maintainers. For other contributors, the inventory file `tests/inventory.yml` needs to be updated to specify repositories where they have authorizations. Additionally, the `github-bot-private-key` file should be updated.

Follow these instructions to test the collection in a local environment:

- Ensure you have a clean testing environment to prevent interference from previous configurations:
```sh
vagrant destroy
vagrant up
```

- Apply the changes to the virtual machine:
```sh
ansible-playbook ../playbooks/deploy.yml
```

- Connect to the virtual machine to verify that changes were applied successfully:
```sh
vagrant ssh # use "vagrant" as password
```

- Check that everything works as intended within the virtual machine. Depending on the nature of changes made, you can monitor logs or execute commands to validate functionality:
```sh
pm2 logs
```

#### Troubleshooting

If you encounter a `Permission denied` error at the “Gathering Facts” step of the playbook, this most likely means the Vagrant-managed SSH key is not loaded in your SSH agent.

1. Identify which SSH key is used by Vagrant:

```sh
vagrant ssh-config | grep IdentityFile
```

2. Add the private key to your SSH agent:

```sh
ssh-add /path/to/your/vagrant/private_key
```

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
