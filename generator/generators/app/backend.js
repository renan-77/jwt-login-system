function createFiles(generatorContext){
    generatorContext.fs.copy(
        generatorContext.templatePath("backend"),
        generatorContext.destinationPath("backend")
    );

    generatorContext.fs.copyTpl(
        generatorContext.templatePath("backend/config.py"),
        generatorContext.destinationPath("backend/config.py"),
        { dbName: generatorContext.answers.dbName }
    );
}

module.exports = {
    createFiles: createFiles
};
