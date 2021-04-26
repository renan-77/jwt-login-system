"use strict";
const Generator = require("yeoman-generator");
const customUtils = require("../common/custom_utils");

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                name: "customRoute",
                message: "Enter new route to be added",
                default: "newRoute"
            }
        ]);
    }

    writing() {
        customUtils.addRoute(this, this.answers);
    }
};
