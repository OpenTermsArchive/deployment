# Open Terms Archive Ansible Collection

This repository contains the `opentermsarchive.deployment` Ansible Collection. This ansible collection provides roles and playbooks to set up the infrastructure of and deploy Open Terms Archive.

## Usage

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

Once installed, the `deploy` playbook can be used using the `ansible-playbook` command-line tool:

```sh
ansible-playbook opentermsarchive.deployment.deploy
```

See [Ansible Using collections](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html) for more information about ansible collections.

### Configuration

Available variables are listed below, along with default values:

- `ota_config_path`: Path to the engine config file related to the inventory file. Default: `../config/production.json`.
- `ota_declarations_branch`: Git branch of the declarations repository to use. Default: `main`.
- `ota_snapshots_branch`: Git branch of the snapshots repository to use. Default: `main`.
- `ota_versions_branch`: Git branch of the versions repository to use. Default: `main`.
- `ota_declarations_directory`: Directory path where the code will be deploy on the server. Default: the value declared in the `name` key in the engine config file.

### Commands

- To set up a full [(phoenix)](https://martinfowler.com/bliki/PhoenixServer.html) server:
```
ansible-playbook opentermsarchive.deployment.deploy
```

Some [tags](https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html) are available to refine what will happen, use them with `--tags`:

- **Server setup:**
    - `infra`: to only setup the infrastructure
    - `engine`: to only setup the `Open Terms Archive` engine (the infrastructure must have been put in place at least once before)
- **Engine control:**
    - `setup`: to only setup system dependencies required by the engine (cloning repo, installing engine dependencies, all config files, and so on…)
    - `start`: to start the engine
    - `stop`: to stop the engine
    - `restart`: to restart the engine
    - `update`: to update the engine (pull code, install dependencies and restart engine)
    - `update-declarations`: to update services declarations (pull declarations, install dependencies and restart engine)


#### Refined commands examples

- To setup the infrastructure only:
```sh
ansible-playbook opentermsarchive.deployment.deploy --tags infra
```

- To setup the `Open Terms Archive` engine only:
```sh
ansible-playbook opentermsarchive.deployment.deploy --tags engine
```

- Check deployment without actually applying changes:
```sh
ansible-playbook opentermsarchive.deployment.deploy --check --diff
```

- Update the Open Terms Archive engine only, without applying changes to the infrastructure:
```sh
ansible-playbook opentermsarchive.deployment.deploy --tags update
```

- Update services declarations only:
```sh
ansible-playbook opentermsarchive.deployment.deploy --tags update-declarations
```

- Stop the Open Terms Archive engine only:
```sh
ansible-playbook opentermsarchive.deployment.deploy --tags stop
```

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
ansible-playbook ../playbooks/deploy.yml
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
