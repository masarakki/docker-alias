import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

const setup = () => {
  const image = getInput('image');
  exec(`docker pull ${image}`);
};

setup();
