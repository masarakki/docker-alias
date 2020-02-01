import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

const setup = () => {
  const dockerImage = getInput('image');
  exec(`docker pull ${dockerImage}`);
};

setup();
