"use strict";

var fs = _interopRequireWildcard(require("fs"));
var _core = require("@actions/core");
var _exec = require("@actions/exec");
var _io = require("@actions/io");
var _uuid = require("uuid");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
const setup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    const image = (0, _core.getInput)('image');
    const commands = (0, _core.getInput)('commands').split(',');
    const dockerBinDir = '/opt/docker-bin';
    (0, _exec.exec)(`docker pull ${image}`);
    yield (0, _io.mkdirP)(dockerBinDir);
    commands.forEach(command => {
      const uuid = (0, _uuid.v4)();
      const script = `
#!/bin/sh

docker run --name ${uuid} --workdir /github/workspace --rm -e INPUT_REVIEW_VERSION -e INPUT_COMMAND -e INPUT_CONFIG -e HOME -e GITHUB_REF -e GITHUB_SHA -e GITHUB_REPOSITORY -e GITHUB_RUN_ID -e GITHUB_RUN_NUMBER -e GITHUB_ACTOR -e GITHUB_WORKFLOW -e GITHUB_HEAD_REF -e GITHUB_BASE_REF -e GITHUB_EVENT_NAME -e GITHUB_WORKSPACE -e GITHUB_ACTION -e GITHUB_EVENT_PATH -e RUNNER_OS -e RUNNER_TOOL_CACHE -e RUNNER_TEMP -e RUNNER_WORKSPACE -e ACTIONS_RUNTIME_URL -e ACTIONS_RUNTIME_TOKEN -e GITHUB_ACTIONS=true --entrypoint ${command} -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "$(pwd)":"/github/workspace" ${image} $1`;
      fs.writeFileSync(`${dockerBinDir}/${command}`, script, {
        mode: 0o0755
      });
    });
    (0, _core.addPath)(dockerBinDir);
  });
  return function setup() {
    return _ref.apply(this, arguments);
  };
}();
setup();