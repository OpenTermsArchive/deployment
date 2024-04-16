# Changelog

All changes that impact users of this module are documented in this file, in the [Common Changelog](https://common-changelog.org) format with some additional specifications defined in the CONTRIBUTING file. This codebase adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 1.2.0 - 2024-04-16

_Full changeset and discussions: [#39](https://github.com/OpenTermsArchive/deployment/pull/39)._

> Development of this release was supported by the [French Ministry for Foreign Affairs](https://www.diplomatie.gouv.fr/fr/politique-etrangere-de-la-france/diplomatie-numerique/) through its ministerial [State Startups incubator](https://beta.gouv.fr/startups/open-terms-archive.html) under the aegis of the Ambassador for Digital Affairs.

### Added

- Enable the deployment of the Open Terms Archive Engine and Federated API applications on a single server; refer to the [added playbooks](https://github.com/OpenTermsArchive/deployment#engine-and-federated-api-applications)

## 1.1.1 - 2024-04-08

_Full changeset and discussions: [#38](https://github.com/OpenTermsArchive/deployment/pull/38)._

> Development of this release was supported by the [French Ministry for Foreign Affairs](https://www.diplomatie.gouv.fr/fr/politique-etrangere-de-la-france/diplomatie-numerique/) through its ministerial [State Startups incubator](https://beta.gouv.fr/startups/open-terms-archive.html) under the aegis of the Ambassador for Digital Affairs.

### Changed

- Update package metadata

## 1.1.0 - 2024-03-14

_Full changeset and discussions: [#35](https://github.com/OpenTermsArchive/deployment/pull/35)._

> Development of this release was supported by the [French Ministry for Foreign Affairs](https://www.diplomatie.gouv.fr/fr/politique-etrangere-de-la-france/diplomatie-numerique/) through its ministerial [State Startups incubator](https://beta.gouv.fr/startups/open-terms-archive.html) under the aegis of the Ambassador for Digital Affairs.

### Changed

- Enable configuration of engine restart delay with `ota_engine_restart_delay` variable

## 1.0.0 - 2024-03-08

_Full changeset and discussions: [#34](https://github.com/OpenTermsArchive/deployment/pull/34)._

> Development of this release was supported by the [French Ministry for Foreign Affairs](https://www.diplomatie.gouv.fr/fr/politique-etrangere-de-la-france/diplomatie-numerique/) through its ministerial [State Startups incubator](https://beta.gouv.fr/startups/open-terms-archive.html) under the aegis of the Ambassador for Digital Affairs.

_No actual code changes were made in this release, but it signifies that the public API can now [be considered stable](https://semver.org/spec/v2.0.0.html#spec-item-5)._

## 0.1.1 - 2024-02-20

_Full changeset and discussions: [#32](https://github.com/OpenTermsArchive/deployment/pull/32)._

> Development of this release was supported by the [French Ministry for Foreign Affairs](https://www.diplomatie.gouv.fr/fr/politique-etrangere-de-la-france/diplomatie-numerique/) through its ministerial [State Startups incubator](https://beta.gouv.fr/startups/open-terms-archive.html) under the aegis of the Ambassador for Digital Affairs.

### Fixed

- Ensure snapshots and versions repositories use correct SSH key

## 0.1.0 - 2024-02-20

_Full changeset and discussions: [#30](https://github.com/OpenTermsArchive/deployment/pull/30)._

> Development of this release was supported by the [French Ministry for Foreign Affairs](https://www.diplomatie.gouv.fr/fr/politique-etrangere-de-la-france/diplomatie-numerique/) through its ministerial [State Startups incubator](https://beta.gouv.fr/startups/open-terms-archive.html) under the aegis of the Ambassador for Digital Affairs.

### Changed

- **Breaking:** Extract embedded secrets and make them configurable; update your inventory to include secrets through configuration

## 0.0.16 - 2023-12-04

> Development of this release was [supported](https://nlnet.nl/project/TOSDR-OTA/) by the [NGI0 Entrust Fund](https://nlnet.nl/entrust), a fund established by [NLnet](https://nlnet.nl/) with financial support from the European Commission's [Next Generation Internet](https://www.ngi.eu) programme, under the aegis of DG CNECT under grant agreement N°101069594.

### Changed

- Rename the `federated-api` role to `federated_api` to comply with Ansible Galaxy constraints.

## 0.0.15 - 2023-12-04

> Development of this release was [supported](https://nlnet.nl/project/TOSDR-OTA/) by the [NGI0 Entrust Fund](https://nlnet.nl/entrust), a fund established by [NLnet](https://nlnet.nl/) with financial support from the European Commission's [Next Generation Internet](https://www.ngi.eu) programme, under the aegis of DG CNECT under grant agreement N°101069594.

### Added

- Add playbook to setup and deploy the Open Terms Archive federated API

### Changed

- **Breaking:** Rename `deploy` playbook to setup the infrastructure and deploy engine to `engine.all`; update your scripts accordingly
- **Breaking:** Rename variable `ota_config_path` to `ota_engine_config_path`; update your inventory file accordingly
- **Breaking:** Rename variable `ota_declarations_directory` to `ota_engine_declarations_directory`; update your inventory file accordingly
- **Breaking:** Rename variable `ota_declarations_branch` to `ota_engine_declarations_branch`; update your inventory file accordingly
- **Breaking:** Rename variable `ota_snapshots_branch` to `ota_engine_snapshots_branch`; update your inventory file accordingly
- **Breaking:** Rename variable `ota_versions_branch` to `ota_engine_versions_branch`; update your inventory file accordingly

### Removed

- **Breaking:** Remove tag `setup`; use the application deployment playbook as replacement in your scripts `ansible-playbook opentermsarchive.deployment.engine.application`
- **Breaking:** Remove tag `update`; use the application deployment playbook as replacement in your scripts `ansible-playbook opentermsarchive.deployment.engine.application`
- **Breaking:** Remove tag `engine`; use the application deployment playbook as replacement in your scripts `ansible-playbook opentermsarchive.deployment.engine.application`
- **Breaking:** Remove tag `infra`; use the infrastructure set up playbook as replacement in your scripts `ansible-playbook opentermsarchive.deployment.engine.infrastructure`

### Fixed

- Ensure that the configuration for the port of the collection metadata API is successfully applied to the Nginx configuration

## 0.0.14 - 2023-10-11

### Fixed

- Ensure that the Nodesource GPG key import does not get stuck

## 0.0.13 - 2023-10-06

### Changed

- Upgrade NodeJS to version 20 and NPM to version 10

## 0.0.12 - 2023-09-08

### Fixed

- Fix MongoDB data directory permissions

## 0.0.11 - 2023-09-06

### Changed

- Lock pm2 major version

### Fixed

- Ensure NPM version is compatible with NodeJS version

## 0.0.10 - 2023-07-03

### Added

- Launch API server; expect to have a npm command `start:api` defined in the declarations package
- Install NGINX as a reverse proxy to expose the API with a rate limiter

## 0.0.9 - 2023-04-05

### Added

- Automate linting with GitHub Actions
- Specification of changelog format

### Changed

- Specification of changelog format is now in CONTRIBUTING

## 0.0.8 - 2023-01-26

### Added

- Schedule dataset release; expect to have a npm command `dataset:schedule` defined in the declarations package

## 0.0.7 - 2023-01-26

### Fixed

- Fix version update in `galaxy.yml` in the release workflow

## 0.0.6 - 2022-12-13

### Changed

- Ensure that publishing to Ansible Galaxy is only done when publishing to GitHub is successful

## 0.0.5 - 2022-12-13

### Changed

- Expect to have a npm command `start:schedule` define in the declarations package

### Fixed

- Ensure paths for given Git storage configuration are relative to current declarations directory

## 0.0.4 - 2022-11-08

### Added

- Define default value for `ota_config_path`

### Changed

- Change namespace from `ota` to `opentermsarchive`

## 0.0.3 - 2022-10-28

### Added

- Add documentation for available variables

### Changed

- Move and consolidate all test-related files in the `tests` folder.

### Removed

- Print debug output

## 0.0.2 - 2022-10-28

### Changed

- Fix some lintint errors and warnings
- Commit `galaxy.yml` in the release process

## 0.0.1 - 2022-10-28

### Added

- Automate publishing with GitHub Actions
