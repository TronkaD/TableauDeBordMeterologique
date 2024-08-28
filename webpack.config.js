const path = require('path');

module.exports = {
    entry: './js/main.js', // Point d'entrée de votre application
    output: {
        filename: 'bundle.js', // Nom du fichier de sortie
        path: path.resolve(__dirname, 'dist'), // Dossier de sortie
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Fichiers à traiter
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Utiliser Babel pour transpiler
                },
            },
        ],
    },
    mode: 'development', // Mode de développement
};
