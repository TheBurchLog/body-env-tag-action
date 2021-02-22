const core = require('@actions/core');
const github = require('@actions/github');

try {

  const tag = core.getInput('tag');
  const env_variable = core.getInput('env-variable');
  const default_value = core.getInput('default-value');
  const tag_position = core.getInput('tag-position');

  const context = JSON.stringify(github.context, undefined, 2)
  console.log(`The event payload: ${context}`);

  const issue_body = github.context.issue.body;
  const re = new RegExp("(?<=" + tag + "\\s)(\\w+)");

  const tags = re.exec(issue_body);

  value = default_value;

  core.exportVariable(env_variable, value);

  console.log(`The event payload: ${value}`);
} catch (error) {
  core.setFailed(error.message);
}