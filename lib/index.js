"use strict";

var _exec = require("@actions/exec");

var setup = function setup() {
  (0, _exec.exec)('docker pull vvakame/review');
};

setup();