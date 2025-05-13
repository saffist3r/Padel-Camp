import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          tournament: {
            rounds: {
              roundOf16: "Round of 16",
              quarterFinals: "Quarter Finals",
              semiFinals: "Semi Finals",
              finals: "Finals"
            },
            match: {
              vs: "vs",
              tbd: "TBD"
            }
          }
        }
      },
      fr: {
        translation: {
          tournament: {
            rounds: {
              roundOf16: "Huitièmes de finale",
              quarterFinals: "Quarts de finale",
              semiFinals: "Demi-finales",
              finals: "Finale"
            },
            match: {
              vs: "contre",
              tbd: "À déterminer"
            }
          }
        }
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 