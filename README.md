# Pull Request / Issue Tag Extractor from Body

Searches the body of the Pull Request or Issue to find the word coming right after a `tag` 
that was defined. This replicates the function of features like `fixes:`.

## Example Use Case

When there are dependencies in your actions that are unique only to that Pull Request, 
you can define that in your Pull Request body and extract those variables to make
decisions on which action to run next.

**Pull Request Example 1**
``` 
This Pull request requires dependency-version: 2.3
```

**Pull Request Example 2**
``` markdown
This Pull request requires:

| package | version|
| --- | ---|
| dependency-version: | 2.3 |
```

**Action**
```yaml
- name: Extract Dependency Version
  uses: TheBurchLog/body-env-tag-action@1.0
  with:
    tag: 'dependency-version:'
    env-variable: 'dependency-version'
    default-value: '2.0'
```

Now their is an environment variable assigned after this action that contains the dependency version
of 2.3 that can be utilized for an install script.

## Create Workflow

Create a workfow (eg: `.github/workflows/example.yml`) to utilize the Extractor in action with content.

```yaml
name: PR-Issue-ExtractorActions

on: [issues, pull_request]

jobs:
  Test_Action:
    runs-on: ubuntu-latest
    env:
      MY_TAG: 'nope'

    name: Test Local Action
    steps:
      - uses: actions/checkout@v2

      - name: Run Action
        uses: TheBurchLog/body-env-tag-action@1.0
        with:
          tag: 'body-tag:'
          env-variable: 'MY_TAG'
          default-value: 'missing'
          tag-position: -1

      - name: Test
        shell: bash
        run: echo "${{env.MY_TAG}}"
```

*Note: The environment variable was defined outside of the scope of the Step*

### Inputs

| Name | Description | Default |
| --- | --- | --- |
| tag| The tag placed inside the Body of the Issue or Pull Request before the value is defined | body-tag: |
| env-variable | The environment variable to map the tag value to | body-tag |
| default-value | If the tag is not found, the default value to be provided | null |
| tag-position | If multiple tags are found, which tag position should be returned (-1 = last). If tag position is higher than found, the default value is provided | -1 |