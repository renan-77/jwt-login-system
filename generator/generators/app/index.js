"use strict";
const Generator = require("yeoman-generator");
const customUtils = require("../common/custom_utils");

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                name: "dbName",
                message: "Enter your database name",
                default: "db-default"
            }
        ]);
    }

    writing() {
        /**
         * Generator for the backend.
         */

        this.fs.copy(
            this.templatePath("backend"),
            this.destinationPath("backend")
        );

        this.fs.copyTpl(
            this.templatePath("backend/config.py"),
            this.destinationPath("backend/config.py"),
            { dbName: this.answers.dbName }
        );

        /**
         * Generator for the frontend.
         */
        this.fs.copy(
            this.templatePath("frontend"),
            this.destinationPath("frontend")
        );

        this.config.set("destination", this.destinationPath(""));
    }
};
