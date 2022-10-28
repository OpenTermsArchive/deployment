# Open Terms Archive Ansible Collection

This repository contains the `ota.deployment` Ansible Collection. This ansible collection provides roles and playbooks to set up the infrastructure of and deploy Open Terms Archive.

## Usage

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to use this collection.

This collection can be installed from Ansible Galaxy manually with the `ansible-galaxy` command-line tool:

    ansible-galaxy collection install ota.deployment

It can also be included in a `requirements.yml` file using the format:

```yaml
---
collections:
- name: ota.deployment
```

And installed with the command:

    ansible-galaxy collection install -r requirements.yml

Once installed, the `deploy` playbook can be used using the `ansible-playbook` command-line tool:

    ansible-playbook ota.deployment.deploy

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
ansible-playbook ota.deployment.deploy
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
```
ansible-playbook ota.deployment.deploy --tags infra
```

- To setup the `Open Terms Archive` engine only:
```
ansible-playbook ota.deployment.deploy --tags engine
```

- Check deployment without actually applying changes:
```
ansible-playbook ota.deployment.deploy --check --diff
```

- Update the Open Terms Archive engine only, without applying changes to the infrastructure:
```
ansible-playbook ota.deployment.deploy --tags update
```

- Update services declarations only:
```
ansible-playbook ota.deployment.deploy --tags update-declarations
```

- Stop the Open Terms Archive engine only:
```
ansible-playbook ota.deployment.deploy --tags stop
```

## Development

### Requirements

1. Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).
2. Install [Vagrant](https://www.vagrantup.com/downloads).
3. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) to manage virtual machines. If you prefer Docker, or have an Apple Silicon machine, install [Docker](https://docs.docker.com/get-docker/) instead.
4. Create a dedicated SSH key with no password: `ssh-keygen -f ~/.ssh/ota-vagrant -q -N ""`. This key will be automatically used by Vagrant.

> VirtualBox is not compatible with Apple Silicon (M1…) processors. If you have such a machine, you will need to use the Docker provider. Since MongoDB cannot be installed on ARM, it is skipped in the infrastructure installation process. This means you cannot test the MongoDB storage repository with Vagrant with an Apple Silicon processor.

## Usage

For testing this collection, a virtual machine description file is provided, inside the `tests` folder, to be used with [Vagrant](https://www.vagrantup.com).

All following commands must be executed from the `tests` folder:

    cd tests

### Launch VM

If you’re on an Apple Silicon processor or want to use Docker instead of VirtualBox, use `vagrant up --provider=docker`.

In all other cases, use `vagrant up` 🙂

You can then deploy the code to the running machine with all the options described before.

### Test collection

To test locally your changes to the collection before opening a pull request:

- `vagrant destroy && vagrant up`: Remove all traces of previous tests to ensure that your changes do not work by coincidence.
- `ansible-playbook ../playbooks/deploy.yml`: Start by applying your changes on the virtual machine.
- `vagrant ssh`, `pm2 logs`…: Connect through SSH to the virtual machine and check that everything works as intended.

### Vagrant quick reference

#### Connect to the virtual machine

```
vagrant up
vagrant ssh  # use "vagrant" as password
```

#### Start again with a clean virtual machine

```
vagrant halt  # stop machine
vagrant destroy  # remove machine
vagrant up
```

#### Troubleshooting

##### Remote host identification has changed

In case you get that kind of error:

```
fatal: [127.0.0.1]: UNREACHABLE! => changed=false
  msg: |-
    Failed to connect to the host via ssh: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
    …
  unreachable: true
```

It may be because you already have a `known_host` registered with the same IP and port. To solve this, remove it from the entries using `ssh-keygen -R [127.0.0.1]:2222`.

##### Connection refused

If you have the following error:

```
Failed to connect to the host via ssh: ssh: connect to host 127.0.0.1 port 2222: Connection refused
```

You may have a collision on the default port `2222` used by Vagrant to forward SSH commands.
Run the following command to know which ports are forwarded for the virtual machine:

```
vagrant port
```

It should display something like that:

```
The forwarded ports for the machine are listed below. Please note that
these values may differ from values configured in the Vagrantfile if the
provider supports automatic port collision detection and resolution.

    22 (guest) => 2200 (host)
```

Modify the Ansible SSH options in the `ops/inventories/dev.yml` file with the proper `ansible_ssh_port`:

```
all:
  children:
    vagrant:
      hosts:
        127.0.0.1:
          […]
          ansible_ssh_port: 2200
          […]
```

---

## License

The code for this software is distributed under the European Union Public Licence (EUPL) v1.2.
Contact the author if you have any specific need or question regarding licensing.
