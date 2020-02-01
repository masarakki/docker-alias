import { exec } from '@actions/exec';

const setup = () => {
  exec('docker pull vvakame/review');
};

setup();
