export type LangCode = "en" | "hi" | "bn" | "mr" | "gu" | "ta"

type Dict = Record<string, string>
type Lists = {
  categories: string[]
}

export const translations: Record<LangCode, Dict & Lists> = {
  en: {
    app_name: "HSS",
    nav_doctor: "Doctor Consultation",
    nav_labs: "Lab Tests",
    nav_beds: "Emergency Beds",
    nav_blood: "Blood Bank",
    nav_list: "List Your Centre",

    language_label: "Language",
    theme_label: "Dark Mode",

    search_nearby_centre: "Nearby Centre",
    search_date: "Date",
    search_appt_type: "Appointment Type",
    search_hospital_type: "Hospital Type",
    search_button: "Search Healthcare",

    bed_card_title: "Find Emergency Bed Now",
    bed_card_cta: "Book Bed",
    blood_card_title: "Locate Blood Bank",
    blood_card_cta: "Search Blood",

    show_map: "Show Map",

    footer_contact: "Contact: support@hindseva.in",
    footer_social: "Social: @hindseva",
    footer_disclaimer: "Disclaimer: Not a substitute for medical care.",
  } as Dict & Partial<Lists>,
  hi: {
    app_name: "HSS",
    nav_doctor: "डॉक्टर परामर्श",
    nav_labs: "लैब टेस्ट",
    nav_beds: "आपातकालीन बेड",
    nav_blood: "ब्लड बैंक",
    nav_list: "अपना केंद्र सूचीबद्ध करें",

    language_label: "भाषा",
    theme_label: "डार्क मोड",

    search_nearby_centre: "नज़दीकी केंद्र",
    search_date: "तारीख़",
    search_appt_type: "अपॉइंटमेंट प्रकार",
    search_hospital_type: "अस्पताल प्रकार",
    search_button: "स्वास्थ्य खोजें",

    bed_card_title: "आपातकालीन बेड खोजें",
    bed_card_cta: "बेड बुक करें",
    blood_card_title: "ब्लड बैंक खोजें",
    blood_card_cta: "ब्लड खोजें",

    show_map: "मैप देखें",

    footer_contact: "संपर्क: support@hindseva.in",
    footer_social: "सोशल: @hindseva",
    footer_disclaimer: "अस्वीकरण: यह चिकित्सा देखभाल का विकल्प नहीं है।",
  } as Dict & Partial<Lists>,
  bn: {
    app_name: "HSS",
    nav_doctor: "ডাক্তার পরামর্শ",
    nav_labs: "ল্যাব টেস্ট",
    nav_beds: "জরুরি বেড",
    nav_blood: "রক্ত ব্যাংক",
    nav_list: "আপনার কেন্দ্র তালিকাভুক্ত করুন",

    language_label: "ভাষা",
    theme_label: "ডার্ক মোড",

    search_nearby_centre: "কাছাকাছি কেন্দ্র",
    search_date: "তারিখ",
    search_appt_type: "অ্যাপয়েন্টমেন্ট টাইপ",
    search_hospital_type: "হাসপাতাল টাইপ",
    search_button: "স্বাস্থ্য খুঁজুন",

    bed_card_title: "জরুরি বেড খুঁজুন",
    bed_card_cta: "বেড বুক করুন",
    blood_card_title: "রক্ত ব্যাংক খুঁজুন",
    blood_card_cta: "রক্ত খুঁজুন",

    show_map: "ম্যাপ দেখুন",

    footer_contact: "যোগাযোগ: support@hindseva.in",
    footer_social: "সোশ্যাল: @hindseva",
    footer_disclaimer: "দাবিত্যাগ: এটি চিকিৎসার বিকল্প নয়।",
  } as Dict & Partial<Lists>,
  mr: {
    app_name: "HSS",
    nav_doctor: "डॉक्टर चिकित्सा",
    nav_labs: "लैब परीक्षण",
    nav_beds: "आपातकालीन बेड",
    nav_blood: "ब्लड बैंक",
    nav_list: "अपना केंद्र सूचीबद्ध करा",

    language_label: "भाषा",
    theme_label: "डार्क मोड",

    search_nearby_centre: "नज़दीकी केंद्र",
    search_date: "दिनांक",
    search_appt_type: "अपॉइंटमेंट प्रकार",
    search_hospital_type: "हास्पाताल प्रकार",
    search_button: "स्वास्थ्य शोधा",

    bed_card_title: "आपातकालीन बेड शोधा",
    bed_card_cta: "बेड बुक करा",
    blood_card_title: "ब्लड बैंक शोधा",
    blood_card_cta: "ब्लड शोधा",

    show_map: "मैप दाखवा",

    footer_contact: "संपर्क: support@hindseva.in",
    footer_social: "सोशल: @hindseva",
    footer_disclaimer: "अस्वीकरण: या चिकित्सा देखभालाचे बदल नाहीत।",
  } as Dict & Partial<Lists>,
  gu: {
    app_name: "HSS",
    nav_doctor: "ડૉક્ટર સંશોધન",
    nav_labs: "લેબ ટેસ્ટ",
    nav_beds: "દશાવાસ બેડ",
    nav_blood: "બ્લડ બેંક",
    nav_list: "તમારી સેન્ટર સૂચિ કરો",

    language_label: "ભાષા",
    theme_label: "ડાર્ક મોડ",

    search_nearby_centre: "નજદીકી સેન્ટર",
    search_date: "તારીખ",
    search_appt_type: "અપૉઇન્ટમેન્ટ પ્રકાર",
    search_hospital_type: "સર્વસંસ્થા પ્રકાર",
    search_button: "સ્વાસ્થ્ય શોધો",

    bed_card_title: "દશાવાસ બેડ શોધો",
    bed_card_cta: "બેડ બુક કરો",
    blood_card_title: "બ્લડ બેંક શોધો",
    blood_card_cta: "બ્લડ શોધો",

    show_map: "માપ દોરો",

    footer_contact: "સંપર્ક: support@hindseva.in",
    footer_social: "સોશિયલ: @hindseva",
    footer_disclaimer: "અસ્વીકાર: એટી ચિકિટ્સા પ્રત્યેષણનો બદલ નથી છે.",
  } as Dict & Partial<Lists>,
  ta: {
    app_name: "HSS",
    nav_doctor: "ஆலோகி கருத்து",
    nav_labs: "லேப் டெஸ்டுகள்",
    nav_beds: "உங்கள் கொள்வோர் மேற்காலிக்கான பலகுகள்",
    nav_blood: "இரத்த வீட்டு",
    nav_list: "உங்கள் கொள்வோரை பதிவு செய்க",

    language_label: "மொழி",
    theme_label: "இரகச்சு முறை",

    search_nearby_centre: "கருத்து மீது கொள்வோர்",
    search_date: "தேதி",
    search_appt_type: "நோக்கிய வரைவு வகை",
    search_hospital_type: "ஆலோகி வகை",
    search_button: "ஆலோகி செல்லவும்",

    bed_card_title: "மேற்காலிக்கான பலகுகளை கண்டு பெறுங்கள்",
    bed_card_cta: "பலகை கட்டுப்பாட்டு செய்க",
    blood_card_title: "இரத்த வீட்டை கண்டு பெறுங்கள்",
    blood_card_cta: "இரத்தை கண்டு பெறுங்கள்",

    show_map: "வரைபடத்தை காட்டுங்கள்",

    footer_contact: "தொடர்பு: support@hindseva.in",
    footer_social: "சமூக: @hindseva",
    footer_disclaimer: "எதிர்பார்வை: இது சுவாஸ்த்த பராடிக்கு பரிசு காலாக இல்லை.",
  } as Dict & Partial<Lists>,
}

// Provide category lists per language
translations.en.categories = [
  "All Types",
  "Cardiology",
  "Orthopedic",
  "Pediatric",
  "Neurology",
  "Dermatology",
  "Diagnostic",
]
translations.hi.categories = ["सभी प्रकार", "हृदय रोग", "हड्डी रोग", "बाल रोग", "तंत्रिका विज्ञान", "त्वचा रोग", "डायग्नोस्टिक"]
translations.bn.categories = ["সব ধরণ", "কার্ডিওলজি", "অর্থোপেডিক", "শিশু রোগ", "নিউরোলজি", "ডার্মাটোলজি", "ডায়াগনস্টিক"]
translations.mr.categories = ["सर्व प्रकार", "हृदयरोग", "बाण्डी रोग", "बाळरोग", "न्यूरोलॉजी", "डर्माटोलॉजी", "डायग्नोस्टिक"]
translations.gu.categories = ["બધા પ્રકાર", "હૃદયરોગ", "ઓર્થોપેડિક", "બાળરોગ", "ન્યુરોલોજી", "ડર્મેટોલોજી", "ડાયગ્નોસ્ટિક"]
translations.ta.categories = [
  "அனைத்து வகைகளும்",
  "இதய நோய்",
  "எலும்பியல்",
  "குழந்தை மருத்துவம்",
  "நரம்பியல்",
  "தோல் நோய்",
  "டயக்னோஸ்டிக்",
]
