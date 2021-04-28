"use strict";
const Generator = require("yeoman-generator");
const customUtils = require("../common/custom_utils");

// Creating array of prompt for the model name.
const model = [
    {
        type: "input",
        name: "modelName",
        message: "What is the name of the model?"
    }
];

// Creating array of prompts for defining fields, the last prompt asks the user if it wants to add a new field.
const fields = [
    {
        type: "input",
        name: "fieldName",
        message: "Enter Field name:"
    },
    {
        type: "list",
        name: "fieldType",
        message: "Choose datatype for field:",
        choices: ["StringField", "IntField", "BooleanField"]
    },
    {
        type: "list",
        name: "addNew",
        message: "Add new field to model?",
        choices: ["Yes", "No"]
    }
];

// Creating arrays to be populated from input.
const fieldNames = [];
const fieldTypes = [];

module.exports = class extends Generator {
    // Prompts the name of the model.
    promptingModel() {
        return this.prompt(model).then((answers) => {
            this.modelName = answers.modelName
        });
    }

    // Prompts fields as long as the answer for adding new fields is Yes.
    promptingFields() {
        return this.prompt(fields).then(answers => {

            // Adding items to array based on current input.
            fieldNames.push(answers.fieldName);
            fieldTypes.push(answers.fieldType);

            // Checking if the user wants to add another field.
            if (answers.addNew === "Yes") {
                // Assigning values from array to a class variable.
                this.fieldNames = fieldNames;
                this.fieldTypes = fieldTypes;

                // Calling the prompts again.
                return this.promptingFields();
            }
        });
    }

    writing(){
        // Calling method to write new model file.
        customUtils.addModel(this, this.modelName, this.fieldNames, this.fieldTypes);
    }
};
