"use strict";
const Generator = require("yeoman-generator");
const backend = require("./backend");
const frontend = require("./frontend");

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                name: "projectName",
                message: "Enter your project name",
                default: "project-default"
            },
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
        backend.createFiles(this);

        /**
         * Generator for the frontend.
         */
        frontend.createFiles(this);

        this.config.set("destination", this.destinationPath(""));
    }
};
