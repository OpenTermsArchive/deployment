# Open Terms Archive Ansible Collection

This repository contains the `opentermsarchive.deployment` Ansible collection. This Ansible collection provides playbooks to set up the infrastructure of and deploy Open Terms Archive applications.

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

> See “[Using collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html)” in Ansible’s user guide for more information about Ansible collections.

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

| Variable | Description | Default value | Required |
| --- | --- | --- | --- |
| `ota_engine_github_bot_private_key` | SSH private key contents for GitHub user with privileges on snapshots and versions repositories | No default value | ✔︎ |
| `ota_engine_github_token` | GitHub token to enable issue creation on the declarations repository and publish releases on versions repository | No default value | ✔︎ |
| `ota_engine_smtp_password` | Password for the SMTP server used for sending error notifications by email | No default value | - |
| `ota_engine_sendinblue_api_key` | SendInBlue API key used to send email notifications | No default value | - |
| `ota_engine_config_path` | Path to the engine config file, relative to the inventory file | `../config/production.json` | - |
| `ota_engine_declarations_branch` | [Git branch or tag](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddeftree-ishatree-ishalsotreeish) of the declarations repository to use | `main` | - |
| `ota_engine_snapshots_branch` | [Git branch or tag](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddeftree-ishatree-ishalsotreeish) of the snapshots repository to use | `main` | - |
| `ota_engine_versions_branch` | [Git branch or tag](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddeftree-ishatree-ishalsotreeish) of the versions repository to use | `main` | - |
| `ota_engine_declarations_directory` | Path of the directory where the code will be deployed on the server | Value declared in the `name` key in the engine config file | - |
| `ota_engine_restart_delay` | Delay, in milliseconds, before restarting the engine after a crash | `10800000` _(3 hours)_ | - |

For encryption of sensitive configuration entries, please refer to the [dedicated section](#encrypt-sensitive-configuration-entries).

These variables can be overriden in the inventory file, for example:

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

| Variable | Description | Default value | Required |
| --- | --- | --- | --- |
| `ota_federated_api_repo` | Repository URL of the federated API code | `https://github.com/OpenTermsArchive/federated-api.git` | - |
| `ota_federated_api_directory` | Path of the directory where the code will be deployed on the server | `federated-api` | - |
| `ota_federated_api_branch` | [Git branch or tag](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddeftree-ishatree-ishalsotreeish) of the federated API repository to use | `main` | - |
| `ota_federated_api_smtp_password` | Password for the SMTP server used for sending errors notifications by email. | - | - |

For encryption of sensitive configuration entries, please refer to the [dedicated section](#encrypt-sensitive-configuration-entries).

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

### Engine and Federated API applications

Available playbooks to deploy both the Open Terms Archive Engine and Federated API applications on a single server.

| Playbook name | Description | Command example |
| --- | --- | --- |
| `engine_and_federated_api.infrastructure` | Set up and configure the infrastructure required by the Open Terms Archive engine and federated API applications | `ansible-playbook opentermsarchive.deployment.engine_and_federated_api.infrastructure` |
| `engine_and_federated_api.application` | Deploy the Open Terms Archive engine and federated API applications | `ansible-playbook opentermsarchive.deployment.engine_and_federated_api.application` |
| `engine_and_federated_api.all` | Set up infrastructure and deploy the Open Terms Archive engine and federated API applications | `ansible-playbook opentermsarchive.deployment.engine_and_federated_api.all` |

#### Configuration

Available variables are listed below, along with default values:

| Variable | Description | Default value | Required |
| --- | --- | --- | --- |
| `ota_reverse_proxy_engine_path` | Path where the collection API embed with the engine will be available | `/collection-api` | - |
| `ota_reverse_proxy_federated_api_path` | Path where the federated API will be available | `/federation-api` | - |

- - -

## Encrypt sensitive configuration entries

Certain configuration entries contain sensitive information that should be encrypted to ensure security. Ansible provides a convenient way to encrypt such strings using its built-in [vault feature](https://docs.ansible.com/ansible/2.9/user_guide/vault.html):

```sh
ansible-vault encrypt_string --name <sensitive-config-name> <sensitive-config-content>
```

For example, to encrypt the GitHub bot private key used by the engine to push updates:

```sh
ansible-vault encrypt_string --name 'ota_engine_github_bot_private_key' '-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
…
UlcCkBZ5IkI0eNAAAAE25kcG50QE1CUC1OZHBudC5sYW4BAgMEBQYH
-----END OPENSSH PRIVATE KEY-----
'
```

The encrypted result will look like this:

```sh
ota_engine_github_bot_private_key: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          62313438616266383732353634343736623532666365643364396464633732613966636235616261
          3136656665316437613434323561613732373361306161640a306132316531356537373862363838
          66363763613833373530633831653163303961376331393761366261633561656463626563383931
          3361643836623239660a333134626139626465303234313366313433653261376437316231363834
          32643261303534366333383131633430396366343631656363663965633964663331346231663166
          3331316462356461373134303666613035393335333139613639
```

Then it can be used directly in the inventory file:

```yml
all:
  hosts:
    127.0.0.1:
      ansible_user: debian
      ota_engine_config_path: ./engine_config.json
      ota_engine_declarations_branch: new-feature
      ota_engine_github_bot_private_key: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          62313438616266383732353634343736623532666365643364396464633732613966636235616261
          3136656665316437613434323561613732373361306161640a306132316531356537373862363838
          66363763613833373530633831653163303961376331393761366261633561656463626563383931
          3361643836623239660a333134626139626465303234313366313433653261376437316231363834
          32643261303534366333383131633430396366343631656363663965633964663331346231663166
          3331316462356461373134303666613035393335333139613639
```

Repeat the process for each sensitive configuration entry that needs encryption.

Please note that the data will be stored unencrypted on the deployment server.

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

Testing the Ansible collection locally is crucial to ensure that changes function properly before submitting them as a pull request.

The testing environment is preconfigured for Open Terms Archive maintainers. For other contributors, the configuration file `tests/engine_config.json` needs to be updated to specify repositories where they have authorizations. Additionally, the `ota_engine_github_bot_private_key` value in the inventory file `tests/inventory.yml` should be updated.

Follow these instructions to test the collection in a local environment:

- Ensure you have a clean testing environment to prevent interference from previous configurations:
```sh
vagrant destroy
vagrant up
```

- Apply the changes to the virtual machine:
```sh
ansible-playbook ../playbooks/engine/all.yml
```

- Connect to the virtual machine to verify that changes were applied successfully:
```sh
vagrant ssh # use "vagrant" as password
```

- Check that everything works as intended within the virtual machine. Depending on the nature of changes made, you can monitor logs or execute commands to validate functionality:
```sh
pm2 logs
```

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
