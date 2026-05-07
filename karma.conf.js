module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/app/hello-world.spec.ts'
        ],
        browsers: ['Chrome'],
        singleRun: true,
        reporters: ['progress'],
        preprocessors: {
            'src/app/hello-world.spec.ts': ['webpack']
        },
        webpack: {
            // Configurações do webpack
        }
    });
};