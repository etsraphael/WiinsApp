import I18n from 'i18n-js';
import en from './locales/en.json';
import fr from './locales/fr.json';

I18n.fallbacks = true;
 
I18n.translations = {
  en,
  fr
}

export default I18n