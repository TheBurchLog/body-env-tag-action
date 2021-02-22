const core = require('@actions/core');
const github = require('@actions/github');

try {

  const tag = core.getInput('tag');
  const env_variable = core.getInput('env-variable');
  const default_value = core.getInput('default-value');
  const tag_position = core.getInput('tag-position');

  var issue_body = github.context.payload.issue.body;
  issue_body = issue_body.replace(/(\r\n|\n|\r)/gm, " ");
  console.log(`The issue body: ${issue_body}`);

  const body_words = issue_body.split(" ");

  var i;
  var tags_found = 0;
  for (i = 0; i < body_words.length; i++){
    if (body_words[i] == tag){
        if ((i + 1) < body_words.length){
            if (tag_position == -1){
              value = body_words[i + 1];
              if (value == "|" && (i + 2) < body_words.length){
                value = body_words[i + 2];
              }
            }
            else if (tags_found == tag_position){
              value = body_words[i + 1];
              if (value == "|" && (i + 2) < body_words.length){
                value = body_words[i + 2];
              }
              break;
            }
            tags_found++;
        }
    }
  }

  //const re = new RegExp("(?<=" + tag + "\\s)(\\w+)");
  // const re = new RegExp(tag + "(.*?)[\\s]");


  // const tags = re.exec(issue_body);
//  const tags = issue_body.matchAll(re);
//  console.log(`The tags: ${tags}`);
//
//  console.log(`Tag Position: ${tag_position}`);
//  var value = default_value;
//  var i;
//  for (i = 0; i < tags.length; i++){
//    if (tag_position == -1){
//      value = tags[i];
//    }
//    else if (i == tag_position){
//      value = tags[i];
//      break;
//    }
//  }



  core.exportVariable(env_variable, value);

  console.log(`The event payload: ${value}`);
} catch (error) {
  core.setFailed(error.message);
}