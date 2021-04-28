// function createRoute(generatorContext, answers) {
//     // Getting new route from python file.
//     let newRoute = generatorContext.fs.read(
//         generatorContext.templatePath("../../common/templates/new-route.py")
//     );
//
//     newRoute = newRoute.replace(
//         RegExp("\\#{customRoute}", "gm"),
//         answers.customRoute
//     );
//
//     // Assigning file to a string variable.
//     let stringFile = generatorContext.fs.read(
//         generatorContext.templatePath("backend/app/routes.py")
//     );
//
//     // Replacing string elements.
//     stringFile = stringFile.replace(
//         "#new-route-here",
//         `${newRoute} \n#new-route-here`
//     );
//
//     // Writing file from customized string.
//     generatorContext.fs.write(
//         generatorContext.destinationPath(
//             "/backend/app/routes.py"
//         ),
//         stringFile
//     );
// }


/**
 * Function to get contents of a file dynamically based on input as a string.
 * @param generatorContext - The context of the generator (this).
 * @param fileName - the name of the file.
 * @param placeHolder - the placeholder to be changed on the file.
 * @returns string - file as a string.
 */
function getFileContent(generatorContext, fileName, placeHolder){
    // Getting new route from python file.
    let file = generatorContext.fs.read(
        generatorContext.templatePath(`../../common/templates/${fileName}`)
    );

    file = file.replace(
        RegExp(`\\#{${placeHolder}}`, "gm"),
        generatorContext.answers.customRoute
    );

    return file
}

/**
 * Function to add new backend route.
 * @param generatorContext - The context of the generator (this).
 */
function addRoute(generatorContext) {

    // Getting contents from file as a string.
    let newRoute = getFileContent(generatorContext, generatorContext.answers,'new-route.py', 'customRoute');

    // Assigning file to a string variable.
    let stringFile = generatorContext.fs.read(
        generatorContext.config.get("destination") + "/backend/app/routes.py"
    );

    // Replacing string elements.
    stringFile = stringFile.replace(
        "#new-route-here",
        `${newRoute} \n#new-route-here`
    );

    // Writing file from customized string.
    generatorContext.fs.write(
        generatorContext.destinationPath("backend/app/routes.py"),
        stringFile
    );
}

/**
 * Function to add a new model for the database.
 * @param generatorContext - The context of the generator (this).
 * @param modelName - The modelName variable from input.
 * @param fieldNames -  The fieldNames array from input.
 * @param fieldTypes - The filedTypes array from input.
 */
function addModel(generatorContext, modelName, fieldNames, fieldTypes){
    // Creating a string to be added to file.
    let modelField = ''

    // Populating that string dynamically based on input length and contents.
    for(let i=0; i < fieldNames.length; i++){
        // Adding fields to modelField string with custom variables from input.
        modelField = modelField + `    ${fieldNames[i]} = db.${fieldTypes[i]}()\n`
    }

    // Copying model file as a dynamic model based on input.
    let stringFile = generatorContext.fs.copyTpl(
        generatorContext.templatePath("model.py"),
        generatorContext.config.get("destination") + `/backend/app/models/${modelName}.py`,
        //Replacing the first modelName string character to the upper case letter.
        {'modelName': modelName.replace(modelName.charAt(0), modelName.charAt(0).toUpperCase()),
        'fields': modelField }
    );

}

/**
 * Function to add new form on new component.
 * @param generatorContext
 */
function addForm(generatorContext, formName, fieldNames, fieldTypes){
    let fieldsTs = '';
    let fieldsHtml = '';

    for(let i=0; i < fieldNames.length; i++){

        fieldsTs = fieldsTs + `${fieldNames[i]}: new FormControl('', Validators.required),\n`;

        fieldsHtml = fieldsHtml + `<mat-form-field>
            <mat-label>${fieldNames[i]}</mat-label>
            <input type="${fieldTypes[i]}" matInput placeholder="${fieldNames[i]}" formControlName="${fieldNames[i]}">
        </mat-form-field>\n`;
    }

    generatorContext.log("Ts fields are: " + fieldsTs);
    generatorContext.log("Html fields are: " + fieldsHtml);
}

module.exports = {
    addRoute: addRoute,
    addModel: addModel,
    addForm: addForm,
};
