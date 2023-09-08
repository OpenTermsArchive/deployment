# Changelog

All changes that impact users of this module are documented in this file, in the [Common Changelog](https://common-changelog.org) format with some additional specifications defined in the CONTRIBUTING file. This codebase adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

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
