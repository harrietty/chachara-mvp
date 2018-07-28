export default (language) => {
  switch (language) {
  case 'es':
    return require('./img/flags/es.png');

  case 'eng':
    return require('./img/flags/uk.png');

  case 'it':
    return require('./img/flags/it.png');
  
  case 'fr':
    return require('./img/flags/fr.png');
  }
};
