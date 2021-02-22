const core = require('@actions/core');
const github = require('@actions/github');

try {

  const tag = core.getInput('tag');
  const env_variable = core.getInput('env-variable');
  const default_value = core.getInput('default-value');
  const tag_position = core.getInput('tag-position');

  const context = JSON.stringify(github.context, undefined, 2)
  console.log(`The context payload: ${context}`);

  const issue_body = context.issue.body;
  console.log(`The issue payload: ${issue_body}`);

  const re = new RegExp("(?<=" + tag + "\\s)(\\w+)");

  const tags = re.exec(issue_body);
  console.log(`The tags: ${tags}`);


  var value = default_value;
  var i;
  for (i = 0; i < tags.length; i++){
    value = tags[i]
  }



  core.exportVariable(env_variable, value);

  console.log(`The event payload: ${value}`);
} catch (error) {
  core.setFailed(error.message);
}