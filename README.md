# Github Action: No Repeat JSON Keys

A GitHub action to prevent repeating keys in JSON files.

### Example Workflow

```yaml
name: Check for repeat keys in JSON files
on: [pull_request, push]
jobs:
  check-repeat-keys:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Check JSON files
        uses: obfuscatedgenerated/no-repeat-json-action@v1
        env:
          JSON_FILES: file.json,another_file.json
```