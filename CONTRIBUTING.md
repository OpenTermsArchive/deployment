First of all, thanks for taking the time to contribute! 🎉👍

## Changelog

All changes to the codebase that impact users must be documented in the [`CHANGELOG.md`](./CHANGELOG.md) file.

The format to use is [Common Changelog](https://common-changelog.org), with the following additional specifications:

1. The `unreleased` section of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) is preserved with the addition of a tag to specify which type of release should be published and to foster discussions about it inside pull requests. This tag should be one of the names mandated by SemVer, within brackets: `[patch]`, `[minor]` or `[major]`. For example: `## Unreleased [minor]`.
2. Each listed change must provide an actionable way to adapt the user’s codebase, either directly in the changelog or through instructions or links.
3. Changes are a single sentence with no punctuation (like all examples given in Common Changelog).
4. Since each release is produced automatically from a single pull request, the [notice](https://common-changelog.org/#23-notice) is always used to link to the source pull request rather than [references](https://common-changelog.org/#242-references), which would always reference the same pull request. References can instead link to relevant specific parts of an RFC, decision record or diff.

## Versioning

### SemVer

This module follows the [semantic versioning](https://semver.org) v2 standard.

The public API used for determining breaking changes is the exposed Ansible commands, and not the resulting infrastructure. For example, a major upgrade to the installed Node version can be a minor change, but is not a major change: it is expected that running this playbook may manipulate the entire global installs on the server. On the other hand, a change to the playbook name must trigger a major update, even if the result of executing it yields exactly the same infrastructure as before.
