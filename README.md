# Github Action: No Repeat JSON Keys

A GitHub action to prevent repeating keys in JSON files.

## Contributing

1. `npm install`

2. Make changes to action.js

3. `npm run build`

## Example Workflow

`./github/workflows/no-repeat.yml`

```yaml
name: Check for repeat keys in JSON files
on: [pull_request, push]
jobs:
  check-repeat-keys:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Check JSON files
        uses: obfuscatedgenerated/no-repeat-json-action@v1.2
        env:
          JSON_FILES: file.json,another_file.json
```
