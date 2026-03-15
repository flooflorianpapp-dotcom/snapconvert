export type Locale = 'en' | 'hu'

export const locales: Locale[] = ['en', 'hu']
export const defaultLocale: Locale = 'en'

export const translations = {
  en: {
    // Header
    header: {
      tools: "Tools",
      howItWorks: "How It Works",
      whyUs: "Why Us",
      faq: "FAQ",
      viewAllTools: "View All Tools",
      pdfTools: "PDF Tools",
      imageTools: "Image Tools",
    },
    // Hero section
    hero: {
      title: "Image to PDF Converter",
      description: "Convert your images to PDF instantly, right in your browser. Fast, free, and completely private - no uploads to any server.",
      freeToUse: "Free to use",
      noSignUp: "No sign-up required",
      filesStayInBrowser: "Files stay in your browser",
      uploadImages: "Upload Images",
      imagesSelected: "image(s) selected",
      clearAll: "Clear all",
      convertToPdf: "Convert to PDF",
      converting: "Converting...",
      uploadError: "Please upload at least one image before converting.",
      conversionError: "Failed to convert images to PDF. Please try again.",
      formatError: "is not a supported format. Please use JPG, PNG, or WEBP.",
      sizeError: "exceeds 10MB limit.",
    },
    // How it works
    howItWorks: {
      title: "How It Works",
      subtitle: "Convert your images to PDF in three simple steps",
      step1Title: "Upload Images",
      step1Desc: "Click the upload button or drag and drop your images. We support JPG, PNG, and WEBP formats.",
      step2Title: "Arrange & Preview",
      step2Desc: "See previews of your images and arrange them in the order you want them in your PDF.",
      step3Title: "Download PDF",
      step3Desc: "Click convert and your PDF is ready instantly. Download it directly to your device.",
    },
    // Supported formats
    supportedFormats: {
      title: "Supported Formats",
      subtitle: "SnapConvert works with the most popular image formats",
      jpgName: "JPG / JPEG",
      jpgDesc: "The most common image format, perfect for photos and screenshots.",
      jpgFeature1: "Widely supported",
      jpgFeature2: "Small file sizes",
      jpgFeature3: "Good for photos",
      pngName: "PNG",
      pngDesc: "Ideal for images with transparency or sharp edges like logos.",
      pngFeature1: "Supports transparency",
      pngFeature2: "Lossless quality",
      pngFeature3: "Great for graphics",
      webpName: "WEBP",
      webpDesc: "Modern format with excellent compression and quality.",
      webpFeature1: "Superior compression",
      webpFeature2: "Supports transparency",
      webpFeature3: "Modern browsers",
    },
    // Why SnapConvert
    whySnapConvert: {
      title: "Why Use SnapConvert?",
      subtitle: "The simplest way to convert images to PDF, with privacy built in",
      fastTitle: "Lightning Fast",
      fastDesc: "Conversion happens instantly in your browser. No waiting for server processing.",
      privateTitle: "100% Private",
      privateDesc: "Your images never leave your device. Everything is processed locally.",
      noInstallTitle: "No Installation",
      noInstallDesc: "Works directly in your browser. No software to download or install.",
      mobileTitle: "Mobile Friendly",
      mobileDesc: "Works perfectly on phones and tablets. Convert on the go.",
      noAccountTitle: "No Account Needed",
      noAccountDesc: "Start converting immediately. No sign-up or login required.",
      unlimitedTitle: "Unlimited Use",
      unlimitedDesc: "Convert as many images as you want. No limits or restrictions.",
    },
    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Got questions? We have answers.",
      q1: "Is SnapConvert really free?",
      a1: "Yes, SnapConvert is completely free to use. There are no hidden fees, subscriptions, or premium features. You can convert as many images as you want without any cost.",
      q2: "Are my images secure?",
      a2: "Absolutely. Your images never leave your device. All processing happens locally in your browser using JavaScript. We don't upload, store, or have access to any of your files.",
      q3: "What image formats are supported?",
      a3: "SnapConvert supports JPG, JPEG, PNG, and WEBP image formats. These cover the vast majority of images you'll encounter on the web and from cameras.",
      q4: "Is there a file size limit?",
      a4: "Each individual image can be up to 10MB in size. There's no limit to the number of images you can combine into a single PDF.",
      q5: "Can I use SnapConvert on my phone?",
      a5: "Yes! SnapConvert is fully responsive and works great on mobile devices. You can convert images to PDF directly from your phone or tablet.",
      q6: "Do I need to create an account?",
      a6: "No account is needed. Simply open SnapConvert in your browser and start converting. We don't require registration, email verification, or any personal information.",
    },
    // Footer
    footer: {
      tagline: "Free online image converter tools. Fast, secure, and private.",
      pdfTools: "PDF Tools",
      imageConverters: "Image Converters",
      moreConverters: "More Converters",
      utilities: "Utilities",
      resources: "Resources",
      allRightsReserved: "All rights reserved.",
    },
    // Tools page
    tools: {
      title: "All Conversion Tools",
      subtitle: "Choose from our complete collection of free image conversion tools",
      imageToPdf: "Image to PDF",
      imageToPdfDesc: "Convert images to PDF documents",
      imageConverters: "Image Format Converters",
      imageConvertersDesc: "Convert between different image formats",
      pdfConverters: "PDF Converters",
      pdfConvertersDesc: "Convert PDF files to images",
      utilities: "Image Utilities",
      utilitiesDesc: "Optimize and resize your images",
      useTool: "Use Tool",
    },
    // Common
    common: {
      download: "Download",
      convert: "Convert",
      upload: "Upload",
      preview: "Preview",
      remove: "Remove",
    },
  },
  hu: {
    // Header
    header: {
      tools: "Eszközök",
      howItWorks: "Hogyan Működik",
      whyUs: "Miért Mi",
      faq: "GYIK",
      viewAllTools: "Összes Eszköz",
      pdfTools: "PDF Eszközök",
      imageTools: "Kép Eszközök",
    },
    // Hero section
    hero: {
      title: "Kép PDF Konvertáló",
      description: "Konvertálja képeit PDF formátumba azonnal, közvetlenül a böngészőjében. Gyors, ingyenes és teljesen biztonságos - nincs feltöltés semmilyen szerverre.",
      freeToUse: "Ingyenesen használható",
      noSignUp: "Regisztráció nélkül",
      filesStayInBrowser: "A fájlok a böngészőben maradnak",
      uploadImages: "Képek Feltöltése",
      imagesSelected: "kép kiválasztva",
      clearAll: "Összes törlése",
      convertToPdf: "Konvertálás PDF-be",
      converting: "Konvertálás...",
      uploadError: "Kérjük, töltsön fel legalább egy képet a konvertálás előtt.",
      conversionError: "Nem sikerült a képeket PDF-be konvertálni. Kérjük, próbálja újra.",
      formatError: "nem támogatott formátum. Kérjük, használjon JPG, PNG vagy WEBP formátumot.",
      sizeError: "meghaladja a 10MB-os korlátot.",
    },
    // How it works
    howItWorks: {
      title: "Hogyan Működik",
      subtitle: "Konvertálja képeit PDF-be három egyszerű lépésben",
      step1Title: "Képek Feltöltése",
      step1Desc: "Kattintson a feltöltés gombra vagy húzza be a képeket. JPG, PNG és WEBP formátumokat támogatunk.",
      step2Title: "Rendezés és Előnézet",
      step2Desc: "Tekintse meg a képek előnézetét és rendezze őket a kívánt sorrendbe a PDF-ben.",
      step3Title: "PDF Letöltése",
      step3Desc: "Kattintson a konvertálásra és a PDF azonnal elkészül. Töltse le közvetlenül az eszközére.",
    },
    // Supported formats
    supportedFormats: {
      title: "Támogatott Formátumok",
      subtitle: "A SnapConvert a legnépszerűbb képformátumokkal működik",
      jpgName: "JPG / JPEG",
      jpgDesc: "A leggyakoribb képformátum, tökéletes fényképekhez és képernyőképekhez.",
      jpgFeature1: "Széles körben támogatott",
      jpgFeature2: "Kis fájlméret",
      jpgFeature3: "Ideális fotókhoz",
      pngName: "PNG",
      pngDesc: "Ideális átlátszóságot tartalmazó képekhez vagy logókhoz.",
      pngFeature1: "Átlátszóság támogatás",
      pngFeature2: "Veszteségmentes minőség",
      pngFeature3: "Kiváló grafikákhoz",
      webpName: "WEBP",
      webpDesc: "Modern formátum kiváló tömörítéssel és minőséggel.",
      webpFeature1: "Kiváló tömörítés",
      webpFeature2: "Átlátszóság támogatás",
      webpFeature3: "Modern böngészők",
    },
    // Why SnapConvert
    whySnapConvert: {
      title: "Miért Válassza a SnapConvert-et?",
      subtitle: "A legegyszerűbb módja a képek PDF-be konvertálásának, beépített adatvédelemmel",
      fastTitle: "Villámgyors",
      fastDesc: "A konvertálás azonnal megtörténik a böngészőjében. Nincs várakozás a szerver feldolgozásra.",
      privateTitle: "100% Biztonságos",
      privateDesc: "A képei soha nem hagyják el az eszközét. Minden helyben kerül feldolgozásra.",
      noInstallTitle: "Telepítés Nélkül",
      noInstallDesc: "Közvetlenül a böngészőjében működik. Nincs szükség szoftver letöltésére.",
      mobileTitle: "Mobilbarát",
      mobileDesc: "Tökéletesen működik telefonokon és tableteken. Konvertáljon útközben.",
      noAccountTitle: "Fiók Nélkül",
      noAccountDesc: "Kezdjen el azonnal konvertálni. Nincs szükség regisztrációra.",
      unlimitedTitle: "Korlátlan Használat",
      unlimitedDesc: "Konvertáljon annyi képet, amennyit csak akar. Nincsenek korlátok.",
    },
    // FAQ
    faq: {
      title: "Gyakran Ismételt Kérdések",
      subtitle: "Kérdései vannak? Válaszolunk.",
      q1: "A SnapConvert valóban ingyenes?",
      a1: "Igen, a SnapConvert teljesen ingyenesen használható. Nincsenek rejtett díjak, előfizetések vagy prémium funkciók. Annyi képet konvertálhat, amennyit csak szeretne, mindenféle költség nélkül.",
      q2: "Biztonságosak a képeim?",
      a2: "Természetesen. A képei soha nem hagyják el az eszközét. Minden feldolgozás helyben történik a böngészőjében JavaScript segítségével. Nem töltünk fel, nem tárolunk és nem férünk hozzá a fájljaihoz.",
      q3: "Milyen képformátumokat támogat?",
      a3: "A SnapConvert támogatja a JPG, JPEG, PNG és WEBP képformátumokat. Ezek lefedik a webes és kamerákból származó képek túlnyomó többségét.",
      q4: "Van fájlméret korlát?",
      a4: "Minden egyes kép legfeljebb 10MB méretű lehet. Nincs korlát arra, hogy hány képet kombinálhat egyetlen PDF-be.",
      q5: "Használhatom a SnapConvert-et a telefonomon?",
      a5: "Igen! A SnapConvert teljesen reszponzív és kiválóan működik mobil eszközökön. Közvetlenül a telefonjáról vagy tabletjéről konvertálhat képeket PDF-be.",
      q6: "Létre kell hoznom fiókot?",
      a6: "Nincs szükség fiókra. Egyszerűen nyissa meg a SnapConvert-et a böngészőjében és kezdjen el konvertálni. Nem kérünk regisztrációt, e-mail megerősítést vagy személyes adatokat.",
    },
    // Footer
    footer: {
      tagline: "Ingyenes online képkonvertáló eszközök. Gyors, biztonságos és privát.",
      pdfTools: "PDF Eszközök",
      imageConverters: "Képkonvertálók",
      moreConverters: "További Konvertálók",
      utilities: "Segédeszközök",
      resources: "Források",
      allRightsReserved: "Minden jog fenntartva.",
    },
    // Tools page
    tools: {
      title: "Összes Konvertáló Eszköz",
      subtitle: "Válasszon ingyenes képkonvertáló eszközeink teljes gyűjteményéből",
      imageToPdf: "Kép PDF-be",
      imageToPdfDesc: "Képek konvertálása PDF dokumentummá",
      imageConverters: "Képformátum Konvertálók",
      imageConvertersDesc: "Konvertálás különböző képformátumok között",
      pdfConverters: "PDF Konvertálók",
      pdfConvertersDesc: "PDF fájlok konvertálása képekké",
      utilities: "Kép Segédeszközök",
      utilitiesDesc: "Képek optimalizálása és átméretezése",
      useTool: "Használat",
    },
    // Common
    common: {
      download: "Letöltés",
      convert: "Konvertálás",
      upload: "Feltöltés",
      preview: "Előnézet",
      remove: "Eltávolítás",
    },
  },
} as const

export type TranslationKeys = typeof translations.en

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.en
}

export function getLocalizedHref(href: string, locale: Locale): string {
  if (locale === 'en') return href
  return `/hu${href}`
}

// Tool names translations
export const toolNames = {
  en: {
    "Image to PDF": "Image to PDF",
    "JPG to PDF": "JPG to PDF",
    "PNG to PDF": "PNG to PDF",
    "WEBP to PDF": "WEBP to PDF",
    "HEIC to PDF": "HEIC to PDF",
    "PDF to JPG": "PDF to JPG",
    "PDF to PNG": "PDF to PNG",
    "Image to JPG": "Image to JPG",
    "Image to PNG": "Image to PNG",
    "PNG to JPG": "PNG to JPG",
    "JPG to PNG": "JPG to PNG",
    "WEBP to JPG": "WEBP to JPG",
    "WEBP to PNG": "WEBP to PNG",
    "WEBP to GIF": "WEBP to GIF",
    "HEIC to JPG": "HEIC to JPG",
    "HEIC to PNG": "HEIC to PNG",
    "SVG to PNG": "SVG to PNG",
    "SVG to JPG": "SVG to JPG",
    "BMP to JPG": "BMP to JPG",
    "BMP to PNG": "BMP to PNG",
    "GIF to JPG": "GIF to JPG",
    "GIF to PNG": "GIF to PNG",
    "TIFF to JPG": "TIFF to JPG",
    "TIFF to PNG": "TIFF to PNG",
    "Image Compressor": "Image Compressor",
    "Image Resizer": "Image Resizer",
  },
  hu: {
    "Image to PDF": "Kép PDF-be",
    "JPG to PDF": "JPG PDF-be",
    "PNG to PDF": "PNG PDF-be",
    "WEBP to PDF": "WEBP PDF-be",
    "HEIC to PDF": "HEIC PDF-be",
    "PDF to JPG": "PDF JPG-be",
    "PDF to PNG": "PDF PNG-be",
    "Image to JPG": "Kép JPG-be",
    "Image to PNG": "Kép PNG-be",
    "PNG to JPG": "PNG JPG-be",
    "JPG to PNG": "JPG PNG-be",
    "WEBP to JPG": "WEBP JPG-be",
    "WEBP to PNG": "WEBP PNG-be",
    "WEBP to GIF": "WEBP GIF-be",
    "HEIC to JPG": "HEIC JPG-be",
    "HEIC to PNG": "HEIC PNG-be",
    "SVG to PNG": "SVG PNG-be",
    "SVG to JPG": "SVG JPG-be",
    "BMP to JPG": "BMP JPG-be",
    "BMP to PNG": "BMP PNG-be",
    "GIF to JPG": "GIF JPG-be",
    "GIF to PNG": "GIF PNG-be",
    "TIFF to JPG": "TIFF JPG-be",
    "TIFF to PNG": "TIFF PNG-be",
    "Image Compressor": "Képtömörítő",
    "Image Resizer": "Képátméretező",
  },
} as const

export function getToolName(name: string, locale: Locale): string {
  return (toolNames[locale] as Record<string, string>)[name] || name
}
