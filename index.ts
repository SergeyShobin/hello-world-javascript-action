import {CreateArtifactParameters} from "@actions/artifact/lib/internal/contracts";
import {getRuntimeUrl, getWorkFlowRunId} from "@actions/artifact/lib/internal/config-variables";
import {getApiVersion} from "@actions/artifact/lib/internal/utils";

import * as core from '@actions/core'
import * as github from '@actions/github'
import * as artifact from '@actions/artifact'
import * as uploadArtifact from '@actions/upload-artifact'

async function run(): Promise<void> {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet')
    const inputs = uploadArtifact.getInputs()
    const searchResult = await uploadArtifact.findFilesToUpload(inputs.searchPath)
    console.log(`Hello ${nameToGreet}!`);
    console.log(`searchResult ${searchResult}!`);
//   const maxRetentionStr = parseInt(process.env['GITHUB_RETENTION_DAYS'])
//   const parameters: CreateArtifactParameters = {
//       Type: 'actions_storage',
//       Name: '123313',
//       RetentionDays: maxRetentionStr,
//   }
//   const artifactUrl = `${getRuntimeUrl()}_apis/pipelines/workflows/${getWorkFlowRunId()}/artifacts?api-version=${getApiVersion()}`
//   console.log(`Artifact Url: ${artifactUrl}`)
    const time = (new Date()).toTimeString()
    core.setOutput("time", time)
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

// function getRuntimeToken() {
//   const token = process.env['ACTIONS_RUNTIME_TOKEN']
//   if (!token) {
//     throw new Error('Unable to get ACTIONS_RUNTIME_TOKEN env variable')
//   }
//   return token
// }

// function getRuntimeUrl() {
//   const runtimeUrl = process.env['ACTIONS_RUNTIME_URL']
//   if (!runtimeUrl) {
//     throw new Error('Unable to get ACTIONS_RUNTIME_URL env variable')
//   }
//   return runtimeUrl
// }

// function getWorkFlowRunId() {
//   const workFlowRunId = process.env['GITHUB_RUN_ID']
//   if (!workFlowRunId) {
//     throw new Error('Unable to get GITHUB_RUN_ID env variable')
//   }
//   return workFlowRunId
// }
//
// function getApiVersion() {
//   return '6.0-preview'
// }