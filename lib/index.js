"use strict";

var _core = require("@actions/core");

var _exec = require("@actions/exec");

var setup = function setup() {
  var dockerImage = (0, _core.getInput)('image');
  (0, _exec.exec)("docker pull ".concat(dockerImage));
};

setup();