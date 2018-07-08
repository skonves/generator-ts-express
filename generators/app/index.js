"use strict";

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("code", { type: Boolean, default: true });
    this.option("vscode", { type: Boolean, default: false });
  }

  initializing() {
    this.composeWith(require.resolve("generator-ts-console/generators/app"), {
      code: false,
      vscode: this.options.vscode
    });
  }

  writing() {
    if (this.options.code) {
      [
        "specs/v0.json",
        "src/index.ts",
        "src/v0.ts",
        "src/utils/errors.ts"
      ].forEach(file => {
        this.fs.copy(this.templatePath(file), this.destinationPath(file));
      });
    }
  }

  install() {
    this.npmInstall([
      "express",
      "@types/express",
      "uuid",
      "@types/uuid",
      "body-parser",
      "@types/body-parser",
      "openapi-router",
      "swagger-ui-express"
    ]);
  }
};
