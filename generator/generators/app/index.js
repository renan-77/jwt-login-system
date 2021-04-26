"use strict";
const Generator = require("yeoman-generator");
const customUtils = require("../custom_utils");

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                name: "projectName",
                message: "Enter your project name"
            },
            {
                name: "dbName",
                message: "Enter your database name",
                default: "db-default"
            },
            {
                type: "list",
                name: "user_model",
                message: "Would you like to have custom routes?",
                choices: ["Yes", "No"]
            },
            {
                name: "customRoute",
                message: "Enter custom API routes (Separate them by spaces)",
                default: "newRoute"
            }
        ]);
    }

    writing() {
        /**
         * Generator for the backend.
         */

        this.fs.copy(
            this.templatePath("backend"),
            this.destinationPath(this.answers.projectName + "/backend")
        );

        this.fs.copyTpl(
            this.templatePath("backend/config.py"),
            this.destinationPath(
                this.answers.projectName + "/backend/config.py"
            ),
            { dbName: this.answers.dbName }
        );

        /**
         * Dynamic Routes Implementation
         */

        customUtils.routeAdd(
            this,
            this.answers.projectName,
            this.answers.customRoute
        );

        customUtils.checkNeedle(
            this,
            "#new-route-here",
            this.destinationPath(
                this.answers.projectName + "/backend/app/routes.py"
            )
        );

        // // Creating array of words from the input string.
        // let routes = this.answers.customRoute.split(" ");
        // // Loop iterates through array.
        // for (let i = 0; i < routes.length; i++) {
        //     // Creating instance of mock_route in destination as a python file with custom variables based on iteration.
        //     this.fs.copyTpl(
        //         this.templatePath("mock_route.txt"),
        //         this.destinationPath(this.answers.projectName + "/custom_route.py"),
        //         // Getting routes from user input array.
        //         { customRoute: routes[i] }
        //     );
        //
        //     // Assigning variable to current custom_route.py from iteration.
        //     let currentFile = this.fs.read(this.destinationPath(
        //         this.answers.projectName + "/custom_route.py"
        //         ),
        //         "utf8"
        //     );
        //
        //     // At the first iteration it creates a new routes.py file based on the original one in templates.
        //     if (i === 0){
        //         // Copies routes.py
        //         this.fs.copy(
        //             this.templatePath("backend/app/routes.py"),
        //             this.destinationPath(this.answers.projectName + "/backend/app/routes.py")
        //         );
        //         // Appending data from currentFile to routes.py in destination.
        //         this.fs.append(
        //             this.destinationPath(this.answers.projectName + "/backend/app/routes.py"), currentFile
        //         );
        //     } else {
        //         // Appending data from currentFile to routes.py in destination.
        //         this.fs.append(
        //             this.destinationPath(this.answers.projectName + "/backend/app/routes.py"), currentFile
        //         );
        //     }
        // }
        //
        // // Deleting custom_route.py
        // this.fs.delete(this.destinationPath(this.answers.projectName + "/custom_route.py"));

        /**
         * Generator for the frontend.
         */
        // this.fs.copy(
        //     this.templatePath("frontend/angular.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/angular.json")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/karma.conf.js"),
        //     this.destinationPath(this.answers.projectName + "/frontend/karma.conf.js")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/package.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/package.json")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/tsconfig.app.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/tsconfig.app.json")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/tsconfig.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/tsconfig.json")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/tsconfig.spec.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/tsconfig.spec.json")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/tslint.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/tslint.json")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/.browserslistrc"),
        //     this.destinationPath(this.answers.projectName + "/frontend/.browserslistrc")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/.editorconfig"),
        //     this.destinationPath(this.answers.projectName + "/frontend/.editorconfig")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/.gitignore"),
        //     this.destinationPath(this.answers.projectName + "/frontend/.gitignore")
        // );

        /**
         * e2e/
         */
        // this.fs.copy(
        //     this.templatePath("frontend/e2e/protractor.conf.js"),
        //     this.destinationPath(this.answers.projectName + "/frontend/e2e/protractor.conf.js")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/e2e/tsconfig.json"),
        //     this.destinationPath(this.answers.projectName + "/frontend/e2e/tsconfig.json")
        // );
        //
        // // src/
        // this.fs.copy(
        //     this.templatePath("frontend/e2e/src/app.e2e-spec.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/e2e/src/app.e2e-spec.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/e2e/src/app.po.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/e2e/src/app.po.ts")
        // );
        //
        //
        // /**
        //  * src/
        //  */
        // this.fs.copy(
        //     this.templatePath("frontend/src/favicon.ico"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/favicon.ico")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/index.html"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/index.html")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/main.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/main.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/polyfills.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/polyfills.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/styles.css"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/styles.css")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/test.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/test.ts")
        // );
        //
        // /**
        //  * src/app/
        //  */
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/app.component.css"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/app.component.css")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/app.component.html"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/app.component.html")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/app.component.spec.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/app.component.spec.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/app.component.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/app.component.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/app.module.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/app.module.ts")
        // );
        //
        // /**
        //  * src/app/auth/
        //  */
        // // guards/
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/guards/auth.guard.spec.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/guards/auth.guard.spec.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/guards/auth.guard.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/guards/auth.guard.ts")
        // );
        //
        // // interceptors/
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/interceptors/backend.interceptor.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/interceptors/backend.interceptor.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/interceptors/token.interceptor.spec.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/interceptors/token.interceptor.spec.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/interceptors/token.interceptor.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/interceptors/token.interceptor.ts")
        // );
        //
        // // services/
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/services/auth.service.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/services/auth.service.ts")
        // );
        // this.fs.copy(
        //     this.templatePath("frontend/src/app/auth/services/auth.service.spec.ts"),
        //     this.destinationPath(this.answers.projectName + "/frontend/src/app/auth/services/auth.service.spec.ts")
        // );

        /**
         * src/app/home/
         */
    }

    install() {}
};
