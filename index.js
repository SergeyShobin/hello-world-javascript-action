const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require('@actions/artifact');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
//  console.log(`Hello ${nameToGreet}!`);
  const artifactUrl = `${getRuntimeUrl()}_apis/pipelines/workflows/${getWorkFlowRunId()}/artifacts?api-version=${getApiVersion()}`
  console.log(`Artifact Url: ${artifactUrl}`)
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

function getRuntimeToken() {
  const token = process.env['ACTIONS_RUNTIME_TOKEN']
  if (!token) {
    throw new Error('Unable to get ACTIONS_RUNTIME_TOKEN env variable')
  }
  return token
}

function getRuntimeUrl() {
  const runtimeUrl = process.env['ACTIONS_RUNTIME_URL']
  if (!runtimeUrl) {
    throw new Error('Unable to get ACTIONS_RUNTIME_URL env variable')
  }
  return runtimeUrl
}

function getWorkFlowRunId() {
  const workFlowRunId = process.env['GITHUB_RUN_ID']
  if (!workFlowRunId) {
    throw new Error('Unable to get GITHUB_RUN_ID env variable')
  }
  return workFlowRunId
}
