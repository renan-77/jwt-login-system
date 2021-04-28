function createFiles(generatorContext){
    generatorContext.fs.copy(
        generatorContext.templatePath("frontend"),
        generatorContext.destinationPath("frontend")
    );

    generatorContext.fs.copyTpl(
        generatorContext.templatePath("frontend/package.json"),
        generatorContext.destinationPath("frontend/package.json"),
        {"projectName": generatorContext.answers.projectName}
    );

    generatorContext.fs.copyTpl(
        generatorContext.templatePath("frontend/src/index.html"),
        generatorContext.destinationPath("frontend/src/index.html"),
        {"projectName": generatorContext.answers.projectName}
    );
}

module.exports = {
    createFiles: createFiles
};
