import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "home": "Home",
                "about": "About",
                "trainings": "Trainings",
                "login": "Login",
                "logout": "Logout",
                "book": "Book Slot"
            }
        },
        pl: {
            translation: {
                "home": "Główna",
                "about": "O nas",
                "trainings": "Treningi",
                "login": "Zaloguj",
                "logout": "Wyloguj",
                "book": "Zarezerwuj"
            }
        }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;