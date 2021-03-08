import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {getLocales} from 'react-native-localize'
import en from './locales/en.json'
import fr from './locales/fr.json'
import af from './locales/af.json'
import ar from './locales/ar.json'
import bg from './locales/bg.json'
import bn from './locales/bn.json'
import da from './locales/da.json'
import de from './locales/de.json'
import el from './locales/el.json'
import es from './locales/es.json'
import eu from './locales/eu.json'
import hi from './locales/hi.json'
import is from './locales/is.json'
import ja from './locales/ja.json'
import km from './locales/km.json'
import ko from './locales/ko.json'
import lt from './locales/lt.json'
import ml from './locales/ml.json'
import ne from './locales/ne.json'
import no from './locales/no.json'
import pa from './locales/pa.json'
import pl from './locales/pl.json'
import pt from './locales/pt.json'
import ro from './locales/ro.json'
import ru from './locales/ru.json'
import sk from './locales/sk.json'
import sr from './locales/sr.json'
import sv from './locales/sv.json'
import tr from './locales/tr.json'
import zh from './locales/zh.json'

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {translation: en},
    fr: {translation: fr},
    af: {translation: af},
    ar: {translation: ar},
    bg: {translation: bg},
    bn: {translation: bn},
    da: {translation: da},
    de: {translation: de},
    el: {translation: el},
    es: {translation: es},
    eu: {translation: eu},
    hi: {translation: hi},
    is: {translation: is},
    ja: {translation: ja},
    km: {translation: km},
    ko: {translation: ko},
    lt: {translation: lt},
    ml: {translation: ml},
    ne: {translation: ne},
    no: {translation: no},
    pa: {translation: pa},
    pl: {translation: pl},
    pt: {translation: pt},
    ro: {translation: ro},
    ru: {translation: ru},
    sk: {translation: sk},
    sr: {translation: sr},
    sv: {translation: sv},
    tr: {translation: tr},
    zh: {translation: zh}
  },
})

export default i18n