# Open Terms Archive Ansible Collection

This repository contains the `opentermsarchive.deployment` Ansible Collection. This ansible collection provides playbooks to set up the infrastructure of and deploy Open Terms Archive applications.

## Installation

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to use this collection.

This collection can be installed from Ansible Galaxy manually with the `ansible-galaxy` command-line tool:

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

Once installed, some playbooks are available to deploy the two main Open Terms Archive applications: [Engine](https://github.com/OpenTermsArchive/engine) and [Federated API](https://github.com/OpenTermsArchive/federated-api).

Each playbook can be executed using the `ansible-playbook` command-line tool:

```sh
ansible-playbook opentermsarchive.deployment.<playbook-name>
```

Refer to the application related sections below for a list of available playbooks.

_It is possible to check a playbook execution without actually applying changes with `check` and `diff` options:_

```sh
ansible-playbook opentermsarchive.deployment.<playbook-name> --check --diff
```

> See [Ansible Using collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html) for more information about ansible collections.

- - -

### Engine application

Available playbooks for the engine application:

| Playbook name | Description | Command example |
| --- | --- | --- |
| `engine.infrastructure` | Set up and configure the infrastructure required by the Open Terms Archive engine | `ansible-playbook opentermsarchive.deployment.engine.infrastructure` |
| `engine.application` | Deploy the Open Terms Archive engine | `ansible-playbook opentermsarchive.deployment.engine.application` |
| `engine.all` | Set up infrastructure and deploy the Open Terms Archive engine | `ansible-playbook opentermsarchive.deployment.engine.all` |

#### Configuration

Available [variables](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html) are listed below, along with default values:

| Variable | Description | Default value |
| --- | --- | --- |
| `ota_engine_config_path` | Path to the engine config file related to the inventory file | `../config/production.json` |
| `ota_engine_declarations_branch` | Git branch of the declarations repository to use | `main` |
| `ota_engine_snapshots_branch` | Git branch of the snapshots repository to use | `main` |
| `ota_engine_versions_branch` | Git branch of the versions repository to use | `main` |
| `ota_engine_declarations_directory` | Directory path where the code will be deployed on the server | Value declared in the `name` key in the engine config file |

These variable can be overriden in the inventory file, for example:

```yml
all:
  hosts:
    127.0.0.1:
      ansible_user: debian
      ota_engine_config_path: ./engine_config.json
      ota_engine_declarations_branch: new-feature
```

#### Tags

Available [tags](https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html) to refine what will happen, use them with `--tags`:

| Tag | Description | Command example |
| --- | --- | --- |
| `start` | Start the engine | `ansible-playbook opentermsarchive.deployment.engine.application --tags start` |
| `stop` | Stop the engine | `ansible-playbook opentermsarchive.deployment.engine.application --tags stop` |
| `restart` | Restart the engine | `ansible-playbook opentermsarchive.deployment.engine.application --tags restart` |
| `update-declarations` | Update service declarations (pull declarations, install dependencies, and restart engine) | `ansible-playbook opentermsarchive.deployment.engine.application --tags update-declarations` |

- - -

### Federated API application

Available playbooks for the Federated API application:

| Playbook name | Description | Command example |
| --- | --- | --- |
| `federated_api.infrastructure` | Set up and configure the infrastructure required by the Open Terms Archive federated API | `ansible-playbook opentermsarchive.deployment.federated_api.infrastructure` |
| `federated_api.application` | Deploy the Open Terms Archive federated API | `ansible-playbook opentermsarchive.deployment.federated_api.application` |
| `federated_api.all` | Set up infrastructure and deploy the Open Terms Archive federated API | `ansible-playbook opentermsarchive.deployment.federated_api.all` |

#### Configuration

Available variables are listed below, along with default values:

| Variable | Description | Default value |
| --- | --- | --- |
| `ota_federated_api_repo` | Repository URL of the federated API code | `https://github.com/OpenTermsArchive/federated-api.git` |
| `ota_federated_api_directory` | Directory path where the code will be deployed on the server | `federated-api` |
| `ota_federated_api_branch` | Git branch of the federated API repository to use | `main` |

These variables can be overridden in the inventory file, for example:

```yml
all:
  hosts:
    127.0.0.1:
      ansible_user: debian
      ota_federated_api_repo: https://github.com/OpenTermsArchive/federated-api.git
      ota_federated_api_branch: new-feature
```

#### Tags

Available [tags](https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html) to refine what will happen, use them with `--tags`:

| Tag | Description | Command example |
| --- | --- | --- |
| `start` | To only start the Federated API | `ansible-playbook opentermsarchive.deployment.federated_api.application --tags start` |
| `stop` | To only stop the Federated API | `ansible-playbook opentermsarchive.deployment.federated_api.application --tags stop` |
| `restart` | To only restart the Federated API | `ansible-playbook opentermsarchive.deployment.federated_api.application --tags restart` |

- - -

## Development

### Requirements

1. Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).
2. Install [Vagrant](https://www.vagrantup.com/downloads).
3. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) to manage virtual machines. If Docker is prefered, or on an Apple Silicon machine, install [Docker](https://docs.docker.com/get-docker/) instead.
4. Create a dedicated SSH key with no password: `ssh-keygen -f ~/.ssh/ota-vagrant -q -N ""`. This key will be automatically used by Vagrant.

> VirtualBox is not compatible with Apple Silicon (M1…) processors. To use vagrant on this kind of machine, specifying the Docker provider will be required. Since MongoDB cannot be installed on ARM, it is skipped in the infrastructure installation process. This means the MongoDB storage repository cannot be tested with Vagrant with an Apple Silicon processor.

## Usage

For testing this collection, a virtual machine description file is provided, inside the `tests` folder, to be used with [Vagrant](https://www.vagrantup.com).

All following commands must be executed from the `tests` folder:

    cd tests

### Launch VM

```sh
vagrant up
```

> With an Apple Silicon processor or to use Docker instead of VirtualBox, use `vagrant up --provider=docker`.

Then the code can be deployed to the running machine with all the options described before.

### Test collection

Test locally the changes to the collection before opening a pull request:

Remove all traces of previous tests to ensure that changes do not work by coincidence:
```sh
vagrant destroy
vagrant up
```

Start by applying changes on the virtual machine:

```sh
ansible-playbook ../playbooks/engine/all.yml
```

Connect through SSH to the virtual machine and check that everything works as intended:
```sh
vagrant ssh
pm2 logs
```

### Vagrant quick reference

#### Connect to the virtual machine

```sh
vagrant up
vagrant ssh  # use "vagrant" as password
```

#### Start again with a clean virtual machine

```sh
vagrant halt  # stop machine
vagrant destroy  # remove machine
vagrant up
```

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
