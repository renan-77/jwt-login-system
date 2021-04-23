/**
 * Function to check if the file to be written has the needle to be replaced.
 * @param appContext - The context of the class extended to Generator (this).
 * @param needle - A string in reference to a comment in the file to be replaced.
 * @param filePath - The full path for the file to be written.
 */
function checkNeedle(appContext, needle, filePath) {
    appContext.log("Checking needle here");

    // Reading file and assigning a string list to a variable.
    let lines = appContext.fs.read(filePath, "utf8").split("\n");

    // Checking if needle is in the string list 'lines', if it is, checks it's index.
    let otherwiseLineIndex = 0;
    lines.forEach(function(line, i) {
        if (line.indexOf(needle) !== -1) {
            otherwiseLineIndex = i;
        }
    });

    appContext.log("Index of needle: " + otherwiseLineIndex);
}

/**
 * Function to append new route to the routes.py file.
 * @param appContext - The context of the class extended to Generator (this).
 * @param projectName - The name of the project from the answers list. (this.answers.projectName)
 * @param routeName - The route to be added also provided in the answers list. (this.answers.routeName)
 */
function routeAdd(appContext, projectName, routeName) {
    appContext.log("Adding new route");
    const newRoute = `
# Creating user route for get and post requests.
@api.route('/${routeName}')
class ${routeName}All(Resource):
    def get(self):
        return
    def post(self):
        return
@api.route('/${routeName}_id')
class ${routeName}WithId(Resource):
    def get(self):
        return
    def post(self):
        return
`;

    appContext.fs.copy(
        appContext.templatePath("backend/app/routes.py"),
        appContext.destinationPath(projectName + "/backend/app/routes.py")
    );

    appContext.fs.append(
        appContext.destinationPath(projectName + "/backend/app/routes.py"),
        newRoute
    );
}

module.exports = {
    routeAdd: routeAdd,
    checkNeedle: checkNeedle
};
