const path = require('path');

module.exports = {
  entry: './src/js/index.js', // Votre point d'entrée
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie
  },
  mode: 'production', // Mode de build
};
