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

function addRoute(generatorContext, answers) {
    // Getting new route from python file.
    let newRoute = generatorContext.fs.read(
        generatorContext.templatePath("../../common/templates/new-route.py")
    );

    newRoute = newRoute.replace(
        RegExp("\\#{customRoute}", "gm"),
        answers.customRoute
    );

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

module.exports = {
    addRoute: addRoute
};
