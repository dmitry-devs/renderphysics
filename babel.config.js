module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/typescript'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/proposal-object-rest-spread'
    ],
    env: {
        "test": {
            "presets": [["@babel/preset-env", {"modules": false}], "@babel/preset-react", '@babel/typescript'],
            "plugins": [
                "transform-es2015-modules-commonjs",
                "dynamic-import-node",
                '@babel/plugin-proposal-class-properties',
                '@babel/proposal-object-rest-spread'
            ]
        },
    }
};