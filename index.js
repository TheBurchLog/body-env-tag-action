const core = require('@actions/core');
const github = require('@actions/github');

try {

  const tag = core.getInput('tag');
  const env_variable = core.getInput('env-variable');
  const default_value = core.getInput('default-value');
  const tag_position = core.getInput('tag-position');

  const issue_body = github.context.payload.issue.body;
  console.log(`The issue body: ${issue_body}`);

  const re = new RegExp("(?<=" + tag + "\\s)(\\w+)");

  const tags = re.exec(issue_body);
  console.log(`The tags: ${tags}`);

  console.log('Tag Position: ${tag_position}')
  var value = default_value;
  var i;
  for (i = 0; i < tags.length; i++){
    if (tag_position == -1){
      value = tags[i];
    }
    else if (i == tag_position){
      value = tags[i];
      break;
    }
  }



  core.exportVariable(env_variable, value);

  console.log(`The event payload: ${value}`);
} catch (error) {
  core.setFailed(error.message);
}