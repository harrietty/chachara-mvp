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

  case 'ru':
    return require('./img/flags/ru.png');

  case 'german':
    return require('./img/flags/de.png');
  
  case 'danish':
    return require('./img/flags/dk.png');

  case 'norwegian':
    return require('./img/flags/no.png');

  case 'polish':
    return require('./img/flags/pl.png');
  
  case 'portuguese':
    return require('./img/flags/pt.png');
  }
};
