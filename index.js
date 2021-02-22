const core = require('@actions/core');
const github = require('@actions/github');

try {

  const tag = core.getInput('tag');
  const env_variable = core.getInput('env-variable');
  const default_value = core.getInput('default-value');
  const tag_position = core.getInput('tag-position');


  var output_value = default_value;
  console.log(`The Default Value: ${output_value}`);

  var issue_body = null;

  // Find the correct body obj
  if ('issue' in github.context.payload){
    var issue_body = github.context.payload.issue.body;
  }
  else if ('pull_request' in github.context.payload){
    var issue_body = github.context.payload.pull_request.body;
  }

  if (issue_body != null){

      // Remove line breaks
      issue_body = issue_body.replace(/(\r\n|\n|\r)/gm, " ");

      // Regex wasn't working, so we have to manually do the look up
      const body_words = issue_body.split(" ");

      var i;
      var tags_found = 0;
      for (i = 0; i < body_words.length; i++){
        if (body_words[i] == tag){
            if ((i + 1) < body_words.length){
                if (tag_position == -1){
                  value = body_words[i + 1];

                  // Handle Tables
                  if (value == "|" && (i + 3) < body_words.length && body_words[i+3] == "|"){
                    value = body_words[i + 2];
                  }
                }
                else if (tags_found == tag_position){
                  value = body_words[i + 1];

                  // Handle Tables
                  if (value == "|" && (i + 3) < body_words.length && body_words[i+3] == "|"){
                    value = body_words[i + 2];
                  }
                  break;
                }
                tags_found++;
            }
        }
      }
  }

  console.log(`The Tag Value: ${value}`);
  core.exportVariable(env_variable, value);
  }
} catch (error) {
  core.setFailed(error.message);
}