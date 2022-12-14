# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

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
