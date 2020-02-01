import * as fs from 'fs';
import { getInput, addPath } from '@actions/core';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';
import uuidv4 from 'uuid/v4';

const setup = async () => {
  const image = getInput('image');
  const commands = getInput('commands').split(',');
  exec(`docker pull ${image}`);

  await mkdirP('docker-bin');
  commands.forEach((command) => {
    const uuid = uuidv4();
    const script = `
#!/bin/sh

docker run --name ${uuid} --workdir /github/workspace --rm -e INPUT_REVIEW_VERSION -e INPUT_COMMAND -e INPUT_CONFIG -e HOME -e GITHUB_REF -e GITHUB_SHA -e GITHUB_REPOSITORY -e GITHUB_RUN_ID -e GITHUB_RUN_NUMBER -e GITHUB_ACTOR -e GITHUB_WORKFLOW -e GITHUB_HEAD_REF -e GITHUB_BASE_REF -e GITHUB_EVENT_NAME -e GITHUB_WORKSPACE -e GITHUB_ACTION -e GITHUB_EVENT_PATH -e RUNNER_OS -e RUNNER_TOOL_CACHE -e RUNNER_TEMP -e RUNNER_WORKSPACE -e ACTIONS_RUNTIME_URL -e ACTIONS_RUNTIME_TOKEN -e GITHUB_ACTIONS=true --entrypoint ${command} -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "$(pwd)":"/github/workspace" ${image} $1`;
    fs.writeFileSync(`docker-bin/${command}`, script, { mode: 0o0755 });
  });
  addPath('./docker-bin');
};

setup();
