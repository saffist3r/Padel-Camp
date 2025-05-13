export const translations = {
  en: {
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
  },
  fr: {
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
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.fr.tournament; 