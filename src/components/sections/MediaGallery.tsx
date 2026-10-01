import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { 
  FileText, Download, Image as ImageIcon, Newspaper, ExternalLink, Sparkles, 
  X, ZoomIn, MapPin, Calendar, Phone, Building, Briefcase, Heart, BookOpen, 
  Compass, Check, Copy, Tag, Info, ArrowUpRight, Target
} from 'lucide-react';
import churchPhoto from '../../assets/church-community.jpg';
import churchBuildingImg from '../../assets/church-building.jpg';
import newYearGreetingImg from '../../assets/new-year-greeting-2019.png';
import socialMediaQrImg from '../../assets/social-media-channels-qr.png';
import pilgrimageZiqualaImg from '../../assets/pilgrimage-ziquala.jpg';
import jobVacancyMarketingImg from '../../assets/job-vacancy-marketing.jpg';
import pilgrimageGishenImg from '../../assets/pilgrimage-gishen.png';
import charityMaedEnagaraImg from '../../assets/charity-maed-enagara.png';
import bookEqub11thImg from '../../assets/book-equb-11th.jpg';
import outreachNetelaImg from '../../assets/outreach-1netela-1temaqi.jpg';
import choirTrainingImg from '../../assets/choir-trainers-training.png';
import onlineAbnetImg from '../../assets/online-abnet-education.png';
import annualMezmurStudyImg from '../../assets/annual-mezmur-study-day.png';
import monthlyPrayerImg from '../../assets/monthly-prayer-gathering.png';
import hosannaEveImg from '../../assets/hosanna-eve-special.png';
import bloodDonationImg from '../../assets/blood-donation-drive.jpg';
import fridayPrayerImg from '../../assets/friday-regular-prayer.jpg';

interface GalleryItem {
  id: number;
  image: string;
  categoryKey: 'all' | 'pilgrimage' | 'charity' | 'books' | 'mezmur' | 'prayer' | 'jobs' | 'media';
  titleAm: string;
  titleEn: string;
  categoryAm: string;
  categoryEn: string;
  purposeBadgeAm: string;
  purposeBadgeEn: string;
  purposeDescAm: string;
  purposeDescEn: string;
  datesAm?: string;
  datesEn?: string;
  locationAm?: string;
  locationEn?: string;
  phones?: string[];
  links?: { label: string; url: string }[];
  bankDetails?: { bank: string; account: string; name?: string }[];
}

export const MediaGallery: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [activeTab, setActiveTab] = useState<'gallery' | 'news' | 'files'>('gallery');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'pilgrimage' | 'charity' | 'books' | 'mezmur' | 'prayer' | 'jobs' | 'media'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: pilgrimageGishenImg,
      categoryKey: 'pilgrimage',
      titleAm: "የነግሥ ጉዞ ወደ ግሸን ደብረ ከርቤ ማርያም ገዳም",
      titleEn: "Spiritual Pilgrimage to Gishen Debre Kerbe Mariam Monastery",
      categoryAm: "መንፈሳዊ ጉዞ",
      categoryEn: "Pilgrimage",
      purposeBadgeAm: "የነግሥ ጉዞ",
      purposeBadgeEn: "Annual Pilgrimage",
      purposeDescAm: "በዓለ መስቀልንና የግሸን ደብረ ከርቤ ማርያም ዓመታዊ ክብረ በዓልን በታሪካዊው ገዳም በጸሎት፣ በዝማሬና በበረከት ለማክበር የተዘጋጀ ሳምንታዊ መንፈሳዊ ጉዞ (ማረፊያና ምግብ ጨምሮ)።",
      purposeDescEn: "A blessed week-long pilgrimage to celebrate the Feast of the Holy Cross and St. Mary at historic Gishen monastery, including lodging and meals.",
      datesAm: "መነሻ፦ መስከረም 17/2019 ዓ.ም | መመለሻ፦ መስከረም 24/2019 ዓ.ም",
      datesEn: "Departure: Meskerem 17, 2019 | Return: Meskerem 24, 2019",
      locationAm: "በላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ፍኖተ ትጉሃን ሰንበት ት/ቤት ሱቅ",
      locationEn: "Finote Teguhan Sunday School Shop, Lafto St. Michael Church",
      phones: ["0924242724", "0900568851"]
    },
    {
      id: 2,
      image: pilgrimageZiqualaImg,
      categoryKey: 'pilgrimage',
      titleAm: "የነግሥ ጉዞ ወደ ደብረ ከዋክብት ዝቋላ አቡነ ገብረ መንፈስ ቅዱስ አንድነት ገዳም",
      titleEn: "Pilgrimage to Mount Ziquala Abune Gebre Menfes Qidus Monastery",
      categoryAm: "መንፈሳዊ ጉዞ",
      categoryEn: "Pilgrimage",
      purposeBadgeAm: "የነግሥ ጉዞ",
      purposeBadgeEn: "Sacred Pilgrimage",
      purposeDescAm: "በታላቁ አቡነ ገብረ መንፈስ ቅዱስ ገዳም ዓመታዊ ክብረ በዓል ላይ በመገኘት የበረከት ተሳታፊ ለመሆን የተዘጋጀ መንፈሳዊ ጉዞ።",
      purposeDescEn: "Spiritual journey to participate in the annual feast and receive blessings at historic Mount Ziquala monastery.",
      datesAm: "መነሻ፦ ረቡዕ ጥቅምት 04/2019 ዓ.ም | መመለሻ፦ ሐሙስ ጥቅምት 05/2019 ዓ.ም",
      datesEn: "Departure: Tikimt 04, 2019 | Return: Tikimt 05, 2019",
      locationAm: "በላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ፍኖተ ትጉሃን ሰንበት ት/ቤት ሱቅ",
      locationEn: "Finote Teguhan Sunday School Shop, Lafto St. Michael Church",
      phones: ["0924242724", "0900568851"]
    },
    {
      id: 3,
      image: charityMaedEnagaraImg,
      categoryKey: 'charity',
      titleAm: "«ማዕድ እናጋራ» — የአዲስ ዓመት በዓል የቤት ለቤት ማዕድ የማጋራት ድጋፍ",
      titleEn: "'Share a Table' — Household Holiday Feast Sharing Charity Campaign",
      categoryAm: "በጎ አድራጎት",
      categoryEn: "Charity & Giving",
      purposeBadgeAm: "ማዕድ እናጋራ",
      purposeBadgeEn: "Table Sharing",
      purposeDescAm: "«በቸርነትህ ዓመትን ታቀዳጃለህ።» (መዝ 64:11) — ለአቅመ ደካሞችና ለተቸገሩ ወገኖች በዓሉን በተሟላ ማዕድ እንዲያሳልፉ የቤት ለቤት ማዕድ የማጋራት የገንዘብ እና ዓይነት ድጋፍ ማሰባሰብ (የአንድ ሰው ጥቅል 2,500 ብር፤ በዓይነት፦ ዶሮ፣ ሽንኩርት፣ ዘይት፣ እንቁላልና ስንዴ)።",
      purposeDescEn: "'You crown the year with Your goodness' (Ps 65:11) — Mobilizing holiday meals for vulnerable households (2,500 ETB package or in-kind: chicken, onions, oil, eggs, wheat).",
      datesAm: "የአዲስ ዓመት 2019 ዓ.ም በዓል",
      datesEn: "Ethiopian New Year 2019 E.C.",
      bankDetails: [
        { bank: "የኢትዮጵያ ንግድ ባንክ (CBE)", account: "1000568274311", name: "ምትኩ & እየሩሳሌም & ስንታየሁ" },
        { bank: "አዋሽ ባንክ (Awash Bank)", account: "151123546" },
        { bank: "ቴሌብር (Telebirr)", account: "0938952971" }
      ],
      phones: ["0910472337", "0913492009", "0941600824"]
    },
    {
      id: 4,
      image: bookEqub11thImg,
      categoryKey: 'books',
      titleAm: "11ኛው ዙር የመንፈሳዊ መጻሕፍት እቁብ",
      titleEn: "11th Round Spiritual Books Equb & Reading Circle",
      categoryAm: "ትምህርትና መጻሕፍት",
      categoryEn: "Books & Education",
      purposeBadgeAm: "የመጻሕፍት እቁብ",
      purposeBadgeEn: "Book Equb",
      purposeDescAm: "ምዕመናንና ተማሪዎች መንፈሳዊ፣ ሥርዓታዊና ነገረ መለኮታዊ መጻሕፍትን በየወሩ በዕጣ አማራጮች (ባለ 200፣ 300፣ 500፣ 1,000፣ 2,000 ብር) እንዲያነቡና የንባብ ባህል እንዲዳብር የተዘጋጀ።",
      purposeDescEn: "Promoting Christian reading by acquiring spiritual, canonical, and doctrinal books through affordable monthly Equb tiers (200, 300, 500, 1000, 2000 ETB).",
      datesAm: "የምዝገባ ጊዜ፦ ከጷጉሜ 1 – መስከረም 5/2019 ዓ.ም",
      datesEn: "Registration: Pagumen 1 – Meskerem 5, 2019",
      locationAm: "በሰንበት ት/ቤት ቤተ መጻሕፍት",
      locationEn: "Sunday School Library, Lafto St. Michael Church",
      phones: ["0993751672", "0915580252"]
    },
    {
      id: 5,
      image: jobVacancyMarketingImg,
      categoryKey: 'jobs',
      titleAm: "ትጉሃን ንዋየ ቅድሳት ማምረቻ — የማርኬቲንግ ሠራተኛ ክፍት የሥራ ቦታ",
      titleEn: "Tiguhan Sacred Vestments — Marketing Officer Job Vacancy",
      categoryAm: "ልማትና ሥራ",
      categoryEn: "Careers & Development",
      purposeBadgeAm: "ክፍት የሥራ ቦታ",
      purposeBadgeEn: "Job Vacancy",
      purposeDescAm: "የሰንበት ት/ቤቱ የልማት ተቋም በክርስቲያናዊ ልብስና የቅድሳት እቃዎች ማምረቻ ዘርፍ ለወጣቶች የሥራ ዕድል ለመፍጠር ያወጣው ማስታወቂያ (0 ዓመት ልምድ፣ ደመወዝ በድርድር)።",
      purposeDescEn: "Career opportunity at the Sunday School's ecclesiastical vestments production enterprise welcoming fresh graduates (0 years experience, negotiable salary).",
      datesAm: "የማመልከቻ ማብቂያ ቀን፦ እስከ መስከረም 05/2019 ዓ.ም",
      datesEn: "Application Deadline: Until Meskerem 5, 2019",
      locationAm: "የፍኖተ ትጉሃን ልማት ተቋም አስተዳደር (አዲስ አበባ)",
      locationEn: "Finote Teguhan Development Enterprise Admin, Addis Ababa",
      links: [
        { label: "Telegram CV Submission", url: "https://t.me/tguhancv" },
        { label: "Email: amhamezgebu1987@gmail.com", url: "mailto:amhamezgebu1987@gmail.com" }
      ],
      phones: ["0949892974", "0913424960"]
    },
    {
      id: 6,
      image: newYearGreetingImg,
      categoryKey: 'media',
      titleAm: "እንኳን ለ2019 ዓ.ም አዲስ ዓመት በሰላም አደረሳችሁ",
      titleEn: "Happy Ethiopian New Year 2019 E.C. (Transition to St. Luke Year)",
      categoryAm: "የበዓል መልእክት",
      categoryEn: "Holiday Greeting",
      purposeBadgeAm: "የበዓል መልእክት",
      purposeBadgeEn: "New Year Blessing",
      purposeDescAm: "«እንኳን ከዘመነ ማርቆስ ወደ ዘመነ ሉቃስ በሰላም አሸጋገራችሁ» — የፍኖተ ትጉሃን ሰንበት ትምህርት ቤት ለመላው ምዕመናን ያስተላለፈው ይፋዊ የሰላምና የበረከት የአዲስ ዓመት መልእክት።",
      purposeDescEn: "Official holiday blessing from Finote Teguhan Sunday School wishing a joyful transition to the year of St. Luke.",
      datesAm: "መስከረም 1፣ 2019 ዓ.ም",
      datesEn: "September 11, 2026"
    },
    {
      id: 7,
      image: socialMediaQrImg,
      categoryKey: 'media',
      titleAm: "የፍኖተ ትጉሃን ሰንበት ት/ቤት ይፋዊ የማኅበራዊ ሚዲያ ገጾች (QR Codes)",
      titleEn: "Official Social Media Channels & QR Codes (Telegram, Instagram, Facebook)",
      categoryAm: "ማኅበራዊ ሚዲያ",
      categoryEn: "Digital Media",
      purposeBadgeAm: "ዲጂታል ሚዲያ",
      purposeBadgeEn: "Social QR Codes",
      purposeDescAm: "የሰንበት ት/ቤቱን ትምህርቶች፣ መዝሙራትና ወቅታዊ ማስታወቂያዎች በቴሌግራም (@tiguhan_media)፣ ኢንስታግራም (@tiguhan_media) እና ፌስቡክ (tiguhan media) በቀላሉ በQR ኮድ ስካን አድርገው ይከታተሉ።",
      purposeDescEn: "Scan the official QR codes to follow our verified channels: Telegram (@tiguhan_media), Instagram (@tiguhan_media), and Facebook (tiguhan media).",
      links: [
        { label: "Telegram: @tiguhan_media", url: "https://t.me/tiguhan_media" },
        { label: "Instagram: @tiguhan_media", url: "https://instagram.com/tiguhan_media" }
      ]
    },
    {
      id: 8,
      image: churchPhoto,
      categoryKey: 'media',
      titleAm: "የፍኖተ ትጉሃን ሰንበት ትምህርት ቤት አባላትና ምዕመናን በአንድነት",
      titleEn: "Finote Teguhan Sunday School Members & Parishioners Fellowship",
      categoryAm: "አገልግሎት",
      categoryEn: "Ministry",
      purposeBadgeAm: "ማኅበራዊ አገልግሎት",
      purposeBadgeEn: "Parish Fellowship",
      purposeDescAm: "በላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን በየሳምንቱ የሚከናወን የሕፃናት፣ የወጣቶችና የአባላት መንፈሳዊ ዝማሬ፣ ትምህርትና የአንድነት ጉባኤ።",
      purposeDescEn: "Weekly choir liturgy, youth education, and parishioner spiritual congregation at Lafto St. Michael Church."
    },
    {
      id: 9,
      image: churchBuildingImg,
      categoryKey: 'media',
      titleAm: "የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን ህንፃ",
      titleEn: "Lafto Debre Teguhan St. Michael Church Sanctuary",
      categoryAm: "ደብራችን",
      categoryEn: "Our Parish",
      purposeBadgeAm: "የደብሩ ህንፃ",
      purposeBadgeEn: "Parish Sanctuary",
      purposeDescAm: "በአዲስ አበባ ደቡብ ምዕራብ ላፍቶ የሚገኘው ታሪካዊውና ግርማ ሞገስ ያለው የደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን ህንፃ።",
      purposeDescEn: "The beautiful historic cathedral of Debre Teguhan St. Michael in southwest Addis Ababa."
    },
    {
      id: 10,
      image: outreachNetelaImg,
      categoryKey: 'charity',
      titleAm: "«1 ነጠላ ለ 1 ተጠማቂ» — ሐዋርያዊ የጥምቀት ልብስ ድጋፍ ማሰባሰብ",
      titleEn: "'1 Netela for 1 Baptized' — Apostolic Baptismal Garment Drive",
      categoryAm: "በጎ አድራጎት",
      categoryEn: "Charity & Outreach",
      purposeBadgeAm: "ሐዋርያዊ ዘመቻ",
      purposeBadgeEn: "Apostolic Garment Drive",
      purposeDescAm: "በተለያዩ የገጠርና አዳዲስ አጥቢያዎች በወንጌል አምነው ለተጠመቁ ወገኖች የጥምቀት ነጠላ በማሰባሰብ የክርስትና ክብርን ለማልበስ የተዘጋጀ ሐዋርያዊ የበጎ አድራጎት ዘመቻ። ማንኛውም ምእመን አዲስ ወይም ንጹሕ ነጠላ በማበርከት የበረከቱ ተሳታፊ መሆን ይችላል።",
      purposeDescEn: "An apostolic charity initiative mobilizing white baptismal shawls (Netela) to clothe newly baptized converts in rural outreach parishes with the dignity of Christ.",
      datesAm: "የዘመቻው ወቅት፦ ቀጣይነት ያለው የበጎ አድራጎት ማሰባሰብ",
      datesEn: "Ongoing Parish Outreach Campaign",
      locationAm: "በላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ፍኖተ ትጉሃን ሰንበት ት/ቤት ሱቅና ቢሮ",
      locationEn: "Finote Teguhan Sunday School Office & Shop, Lafto St. Michael Church",
      phones: ["0924242724", "0910472337"]
    },
    {
      id: 11,
      image: choirTrainingImg,
      categoryKey: 'mezmur',
      titleAm: "የመዝሙር አሰልጣኞች ስልጠና — የመዝሙር ክፍል",
      titleEn: "Sacred Choir Instructors Training Program — Hymn Department",
      categoryAm: "መዝሙርና ስልጠና",
      categoryEn: "Choir Training",
      purposeBadgeAm: "የአሰልጣኞች ስልጠና",
      purposeBadgeEn: "Instructor Course",
      purposeDescAm: "የመዝሙር አሰልጣኝ ለመሆን ፍላጎትና አቅም ላላቸው የሰንበት ትምህርት ቤት አባላት የያሬዳዊ ዜማ፣ የከበሮ አመታትና የመሪነት ክህሎት ስልጠና ለመስጠት የተዘጋጀ።",
      purposeDescEn: "Intensive spiritual training program preparing dedicated members in traditional St. Yared canticles, sacred drumming, and liturgical choir leadership.",
      datesAm: "የምዝገባ ጊዜ፦ ከሚያዝያ 29 እስከ ግንቦት 9",
      datesEn: "Registration Period: Miazia 29 to Ginbot 9",
      locationAm: "ፍኖተ ትጉሃን ሰንበት ት/ቤት መዝሙር ክፍል (በGoogle Form ምዝገባ)",
      locationEn: "Sunday School Choir Dept (Registration via Google Form)",
      phones: ["0900885161", "0979075782"]
    },
    {
      id: 12,
      image: onlineAbnetImg,
      categoryKey: 'books',
      titleAm: "ኦንላይን አብነት መማር ለምትፈልጉ አባላት (ቃል ንባብ፣ ዜማ፣ ቅዳሴ)",
      titleEn: "Online Traditional Abnet Theological Education (Zema & Qidase)",
      categoryAm: "አብነትና ትምህርት",
      categoryEn: "Online Abnet School",
      purposeBadgeAm: "የኦንላይን ትምህርት",
      purposeBadgeEn: "Virtual Abnet Classes",
      purposeDescAm: "በአገር ውስጥና በውጭ አገር ሆነው በአካል ተገኝተው ለመማር ላልቻሉ አባላት ጥንታዊውን የቤተክርስቲያን ቃል ንባብ፣ ያሬዳዊ ዜማና የቅዳሴ ትምህርት በኦንላይን በምስልና በድምፅ ለማስተማር የተዘጋጀ።",
      purposeDescEn: "Virtual traditional theological seminary program delivering authentic Ethiopian Orthodox liturgical reading (Qal Nibab), Yaredic chants (Zema), and Divine Liturgy (Qidase) globally.",
      datesAm: "ትምህርት፦ በቋሚነት በኦንላይን የሚሰጥ",
      datesEn: "Ongoing Online Classes",
      locationAm: "በኦንላይን (Telegram / Zoom) — ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት",
      locationEn: "Online via Telegram & Zoom — Finote Teguhan Sunday School",
      phones: ["0923642357"],
      links: [
        { label: "Telegram: @onABINET", url: "https://t.me/onABINET" }
      ]
    },
    {
      id: 13,
      image: annualMezmurStudyImg,
      categoryKey: 'mezmur',
      titleAm: "ዓመታዊ የመዝሙር ጥናት ቀን — ኅዳር 7",
      titleEn: "Annual Sacred Hymn Study & Choral Practice Day — Hidar 7",
      categoryAm: "መዝሙርና ስልጠና",
      categoryEn: "Sacred Choir Day",
      purposeBadgeAm: "ዓመታዊ ጥናት",
      purposeBadgeEn: "Annual Choral Vigil",
      purposeDescAm: "በሰንበት ትምህርት ቤቱ አዳራሽ በመዝሙር ክፍል አዘጋጅነት የሚካሄድ፤ ተማሪዎችና ምእመናን አዳዲስና ጥንታዊ ያሬዳዊ ዝማሬዎችን፣ የከበሮና የበገና ስልቶችን በኅብረት የሚያጠኑበት ታላቅ መንፈሳዊ ጉባኤ።",
      purposeDescEn: "A grand annual spiritual assembly where Sunday school members practice sacred Yaredic hymns, Begena melodies, and liturgical chants in harmony.",
      datesAm: "ቀን፦ ኅዳር 7 ቀን",
      datesEn: "Date: Hidar 7",
      locationAm: "በፍኖተ ትጉሃን ሰንበት ትምህርት ቤቱ አዳራሽ (መዝሙር ክፍል)",
      locationEn: "Finote Teguhan Sunday School Main Hall (Choir Dept)"
    },
    {
      id: 14,
      image: bloodDonationImg,
      categoryKey: 'charity',
      titleAm: "31ኛ ዙር የደም ልገሳ መርሐ ግብር — «የወገን ደም ለወገን ሕይወት!»",
      titleEn: "31st Round Community Blood Donation Drive",
      categoryAm: "በጎ አድራጎት",
      categoryEn: "Charity & Health",
      purposeBadgeAm: "የደም ልገሳ",
      purposeBadgeEn: "Blood Donation Drive",
      purposeDescAm: "በሕመም ምክንያት ደም ለሚያስፈልጋቸው ወገኖች ፈጥኖ በመድረስ ሕይወት ለማዳን ከኢትዮጵያ ደምና ቲሹ ባንክ አገልግሎት ጋር በመተባበር የተዘጋጀ 31ኛው ዙር የደም ልገሳ ሰብአዊና መንፈሳዊ መርሐ ግብር።",
      purposeDescEn: "Saving lives through voluntary blood donation in partnership with the Ethiopian Blood and Tissue Bank Service — 31st edition.",
      datesAm: "እሑድ ፤ መጋቢት 7 ቀን | ከጠዋቱ 02:00 - 07:00 ቀትር",
      datesEn: "Sunday, Megabit 7 | 8:00 AM - 1:00 PM",
      locationAm: "ላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤ/ክ (የፍኖተ ትጉሃን ሰ/ት/ቤት)",
      locationEn: "Lafto Debre Teguhan St. Michael Church Grounds"
    },
    {
      id: 15,
      image: monthlyPrayerImg,
      categoryKey: 'prayer',
      titleAm: "ወርኃዊ የጸሎት መርሐ ግብር — እሑድ ነሐሴ 18",
      titleEn: "Monthly Parish Prayer Assembly — Sunday Nehase 18",
      categoryAm: "ጸሎትና ጉባኤ",
      categoryEn: "Prayer Gathering",
      purposeBadgeAm: "ወርኃዊ ጸሎት",
      purposeBadgeEn: "Monthly Vigil",
      purposeDescAm: "ምእመናንና የሰንበት ትምህርት ቤት አባላት በኅብረት ወደ አምላካችን የሚያቀርቡት፣ በሊቀ መላእክት ቅዱስ ሚካኤል አማላጅነት የሚከናወን ወርኃዊ የተማፅኖ፣ የምስጋናና የጸሎት መርሐ ግብር።",
      purposeDescEn: "A solemn monthly prayer and supplication service gathering the parish faithful under the intercession of the Archangel Saint Michael.",
      datesAm: "እሑድ ነሐሴ 18 ቀን | ጠዋት 04:00 (10:00 AM)",
      datesEn: "Sunday Nehase 18 | 10:00 AM Morning",
      locationAm: "በፍኖተ ትጉሃን ሰንበት ት/ቤት አዳራሽ",
      locationEn: "Finote Teguhan Sunday School Assembly Hall"
    },
    {
      id: 16,
      image: fridayPrayerImg,
      categoryKey: 'prayer',
      titleAm: "ዓርብ መደበኛ የጸሎት መርሐ ግብር — 4 ታኅሣሥ",
      titleEn: "Regular Friday Evening Prayer Service — Tahsas 4",
      categoryAm: "ጸሎትና ጉባኤ",
      categoryEn: "Friday Prayer",
      purposeBadgeAm: "መደበኛ ጸሎት",
      purposeBadgeEn: "Regular Service",
      purposeDescAm: "በየሳምንቱ ዓርብ ምሽት የሚካሄድ፤ ምእመናን የሳምንቱን ድካም በቅዱስ ሚካኤል ጥበቃ ስር አሳልፈው በጸሎትና በምስጋና የሚተጉበት መደበኛ የጸሎት መርሐ ግብር።",
      purposeDescEn: "Weekly Friday evening prayer gathering for thanksgiving, contemplation, and communal intercession at the Sunday School.",
      datesAm: "4 ታኅሣሥ | ማታ 12:00 (6:00 PM)",
      datesEn: "Tahsas 4 | 6:00 PM Evening",
      locationAm: "በፍኖተ ትጉሃን ሰንበት ት/ቤት አዳራሽ",
      locationEn: "Finote Teguhan Sunday School Assembly Hall"
    },
    {
      id: 17,
      image: hosannaEveImg,
      categoryKey: 'prayer',
      titleAm: "«ምሽት ሆሳዕና ምን አለ?» — 05 ሚያዝያ የሆሳዕና ዋዜማ መርሐ ግብር",
      titleEn: "'Hosanna Eve: What Awaits?' — Special Hosanna Vigil Program",
      categoryAm: "ጸሎትና ጉባኤ",
      categoryEn: "Feast Vigil",
      purposeBadgeAm: "የበዓል ዋዜማ",
      purposeBadgeEn: "Eve Fellowship",
      purposeDescAm: "በታላቁ የሆሳዕና በዓል ዋዜማ ለወጣቶችና ለምእመናን የተዘጋጀ መንፈሳዊ ትምህርት፣ ጥያቄና መልስ፣ ያሬዳዊ የሆሳዕና ዝማሬና የበዓል ዝግጅት ልዩ መርሐ ግብር።",
      purposeDescEn: "A joyful and enlightening spiritual eve gathering featuring biblical youth questions, traditional Hosanna hymns, and spiritual reflection.",
      datesAm: "ቀን፦ 05 ሚያዝያ",
      datesEn: "Date: Miazia 05",
      locationAm: "በፍኖተ ትጉሃን ሰንበት ትምህርት ቤት",
      locationEn: "Finote Teguhan Sunday School Hall"
    }
  ];

  const newsItems = [
    {
      id: 1,
      titleAm: "የግሸን ደብረ ከርቤና የዝቋላ አቡነ ገብረ መንፈስ ቅዱስ የነግሥ ጉዞ ምዝገባ ተጀመረ",
      titleEn: "Pilgrimage Registration Opens for Gishen Mariam & Mount Ziquala",
      dateAm: "መስከረም 2019",
      dateEn: "September 2026",
      descAm: "ለ2019 ዓ.ም የመስቀል በዓልና ዓመታዊ ንግሥ ወደ ግሸን ደብረ ከርቤ (መስከረም 17-24) እንዲሁም ወደ ደብረ ከዋክብት ዝቋላ ገዳም (ጥቅምት 4-5) የሚደረጉ መንፈሳዊ የነግሥ ጉዞዎች ምዝገባ በሰንበት ት/ቤቱ ሱቅ ተጀምሯል።",
      descEn: "Registration is open at the Sunday School shop for spiritual pilgrimages to historic Gishen Debre Kerbe (Meskerem 17-24) and Mount Ziquala (Tikimt 4-5).",
      badge: "መንፈሳዊ ጉዞ"
    },
    {
      id: 2,
      titleAm: "«ማዕድ እናጋራ» — ለአቅመ ደካሞች የአዲስ ዓመት የበዓል ድጋፍ ማሰባሰብ ተጀመረ",
      titleEn: "'Share a Table' — New Year Holiday Food Package Drive Launched",
      dateAm: "መስከረም 2019",
      dateEn: "September 2026",
      descAm: "የሰንበት ትምህርት ቤታችን የበጎ አድራጎት ክፍል ለተቸገሩ ወገኖች በዓሉን በተሟላ ማዕድ እንዲያሳልፉ የቤት ለቤት ማዕድ የማጋራት ድጋፍ (የአንድ ሰው ጥቅል 2,500 ብር ወይም በዓይነት) ማሰባሰብ ጀምሯል።",
      descEn: "Our charity ministry is mobilizing holiday meal packages (2,500 ETB per family or in-kind donations) so vulnerable families can celebrate with joy.",
      badge: "በጎ አድራጎት"
    },
    {
      id: 3,
      titleAm: "11ኛው ዙር የመንፈሳዊ መጻሕፍት እቁብ ምዝገባ ተጀመረ",
      titleEn: "11th Round Spiritual Books Equb Registration Now Open",
      dateAm: "መስከረም 2019",
      dateEn: "September 2026",
      descAm: "ምዕመናንና የሰንበት ት/ቤት ተማሪዎች መንፈሳዊ መጻሕፍትን በየወሩ በዕጣ አማራጮች (ባለ 200 እስከ 2,000 ብር) እንዲያነቡና የንባብ ባህል እንዲያዳብሩ የተዘጋጀው 11ኛው ዙር የመጻሕፍት እቁብ በቤተ መጻሕፍቱ ክፍል እየተመዘገበ ነው።",
      descEn: "Registration for the 11th round of the spiritual book savings circle (200 to 2,000 ETB shares) is ongoing at the Sunday School library.",
      badge: "ትምህርት"
    },
    {
      id: 4,
      titleAm: "«1 ነጠላ ለ 1 ተጠማቂ» — ሐዋርያዊ የጥምቀት ነጠላ ማሰባሰብ ተጀመረ",
      titleEn: "'1 Netela for 1 Baptized' — Apostolic Garment Drive Underway",
      dateAm: "ጥቅምት 2019",
      dateEn: "October 2026",
      descAm: "በአዳዲስ አጥቢያዎች በወንጌል አምነው ለተጠመቁ ወገኖች የጥምቀት ነጠላ በማሰባሰብ የክርስትና ክብርን ለማልበስ የተዘጋጀ የበጎ አድራጎት ዘመቻ። ማንኛውም አዲስ ወይም ንጹሕ ነጠላ በፍኖተ ትጉሃን ሰንበት ት/ቤት ሱቅ ማስረከብ ይቻላል።",
      descEn: "Mobilizing baptismal shawls for newly baptized converts in rural outreach parishes. Donations can be dropped off at the Sunday School shop.",
      badge: "በጎ አድራጎት"
    },
    {
      id: 5,
      titleAm: "የመዝሙር አሰልጣኞች ስልጠና ምዝገባ በGoogle Form ተጀመረ",
      titleEn: "Choir Instructor Leadership Training Registration Open",
      dateAm: "ሚያዝያ 2019",
      dateEn: "May 2026",
      descAm: "የመዝሙር አሰልጣኝ ለመሆን ፍላጎትና ተሰጥዖ ላላቸው አባላት ከሚያዝያ 29 እስከ ግንቦት 9 የሚቆይ የያሬዳዊ ዜማና አመራር ስልጠና ምዝገባ በመዝሙር ክፍሉ ተጀምሯል።",
      descEn: "Intensive St. Yared hymn training and choral leadership course registration from Miazia 29 to Ginbot 9 via Google Form.",
      badge: "ስልጠና"
    },
    {
      id: 6,
      titleAm: "31ኛው ዙር የደም ልገሳ መርሐ ግብር — እሑድ መጋቢት 7",
      titleEn: "31st Round Blood Donation Campaign — Sunday Megabit 7",
      dateAm: "መጋቢት 2019",
      dateEn: "March 2026",
      descAm: "«የወገን ደም ለወገን ሕይወት!» ከኢትዮጵያ ደምና ቲሹ ባንክ ጋር በመተባበር እሑድ መጋቢት 7 ከጠዋቱ 2:00 እስከ 7:00 በደብረ ትጉሃን ቅዱስ ሚካኤል ቅጥር ግቢ ይካሄዳል።",
      descEn: "Join us this Sunday Megabit 7 from 8:00 AM to 1:00 PM at St. Michael grounds to save lives through voluntary blood donation.",
      badge: "ማኅበራዊ"
    },
    {
      id: 7,
      titleAm: "የኦንላይን አብነት ትምህርት ምዝገባ (ቃል ንባብ፣ ዜማ፣ ቅዳሴ) ተጀመረ",
      titleEn: "Online Traditional Abnet Education Enrollment Open",
      dateAm: "ቋሚ መርሐ ግብር",
      dateEn: "Year-Round",
      descAm: "በአካል ተገኝተው መማር ላልቻሉ አባላት ጥንታዊውን የቤተክርስቲያን ቃል ንባብ፣ ዜማና ቅዳሴ በTelegram (@onABINET) እና በZoom የሚሰጥ የኦንላይን አብነት ትምህርት ምዝገባ ተጀምሯል።",
      descEn: "Enrollment is open for virtual traditional theological courses covering liturgical recitation, Yaredic music, and Qidase via Telegram (@onABINET).",
      badge: "አብነት"
    }
  ];

  const downloadableFiles = [
    {
      id: 1,
      titleAm: "የሰንበት ትምህርት ቤቱ መተዳደሪያ ደንብ (PDF)",
      titleEn: "Sunday School Constitution & Bylaws (PDF)",
      size: "1.4 MB",
      dateAm: "2026 እትም",
      dateEn: "2026 Edition"
    },
    {
      id: 2,
      titleAm: "የመንፈሳዊ መዝሙራት ግጥሞች ስብስብ (PDF)",
      titleEn: "Sacred Hymn Lyrics & Chants Compendium (PDF)",
      size: "3.2 MB",
      dateAm: "ቅጽ 1",
      dateEn: "Vol. 1"
    },
    {
      id: 3,
      titleAm: "የዓመታዊ በዓላትና ዝግጅቶች መርሃ ግብር (PDF)",
      titleEn: "Annual Liturgical Feasts & Events Guide (PDF)",
      size: "850 KB",
      dateAm: "2019/2026 ዓ.ም",
      dateEn: "2026/2027 Calendar"
    },
    {
      id: 4,
      titleAm: "የሕፃናት ሰንበት ት/ቤት ሥርዓተ ትምህርት መመሪያ (PDF)",
      titleEn: "Children Sunday School Syllabus & Activity Guide (PDF)",
      size: "2.1 MB",
      dateAm: "የመምህራን መመሪያ",
      dateEn: "Teachers Guide"
    }
  ];

  const triggerDownload = (filename: string) => {
    const blob = new Blob([
      `የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት\nሰነድ፦ ${filename}\nቀን፦ 2026 ዓ.ም\n\nይህ ሰነድ በፍኖተ ትጉሃን ሰንበት ትምህርት ቤት ትምህርትና ስልጠና ክፍል የተዘጋጀ ኦፊሴላዊ መረጃ ነው።`
    ], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredGallery = galleryItems.filter(item => {
    if (galleryFilter === 'all') return true;
    return item.categoryKey === galleryFilter;
  });

  return (
    <section id="media" className="py-24 bg-[#061514] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "መረጃና ማዕከል" : "Media & Publications"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.navMedia}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {isAmharic 
              ? "የሰንበት ትምህርት ቤቱን ወቅታዊ ማስታወቂያዎች፣ የምስል ማዕከልና ዓላማቸውን እንዲሁም ጠቃሚ ሰነዶችን እዚህ ያገኛሉ" 
              : "Explore parish announcements, photo moments with their purposes, and ecclesiastical publications"}
          </p>
        </div>

        {/* Primary Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-[#0b2422] border border-amber-500/30 shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              <ImageIcon size={16} />
              <span>{isAmharic ? "የምስል ማዕከልና ዓላማቸው" : "Photo Gallery & Purposes"}</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              <Newspaper size={16} />
              <span>{isAmharic ? "ዜናዎችና መረጃ" : "Parish News"}</span>
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'files'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              <FileText size={16} />
              <span>{isAmharic ? "ጠቃሚ ሰነዶች (PDF)" : "Downloadable Files"}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Photo Gallery with Purpose Filters */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            {/* Gallery Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {[
                { key: 'all', labelAm: 'ሁሉም ፎቶዎች (17)', labelEn: 'All Photos (17)' },
                { key: 'pilgrimage', labelAm: 'የነግሥ ጉዞ (2)', labelEn: 'Pilgrimages (2)' },
                { key: 'charity', labelAm: 'በጎ አድራጎት (3)', labelEn: 'Charity & Giving (3)' },
                { key: 'mezmur', labelAm: 'መዝሙርና ስልጠና (2)', labelEn: 'Choir & Chants (2)' },
                { key: 'books', labelAm: 'አብነትና መጻሕፍት (2)', labelEn: 'Abnet & Education (2)' },
                { key: 'prayer', labelAm: 'ጸሎትና ጉባኤ (3)', labelEn: 'Prayer & Services (3)' },
                { key: 'jobs', labelAm: 'ክፍት የሥራ ቦታ (1)', labelEn: 'Job Vacancies (1)' },
                { key: 'media', labelAm: 'ማኅበራዊና ደብራችን (4)', labelEn: 'Media & Fellowship (4)' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setGalleryFilter(f.key as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    galleryFilter === f.key
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'bg-[#09201e] border border-emerald-800/80 text-emerald-200/80 hover:text-white hover:border-amber-400/50'
                  }`}
                >
                  {isAmharic ? f.labelAm : f.labelEn}
                </button>
              ))}
            </div>

            {/* Gallery Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-3xl overflow-hidden border-2 border-amber-500/30 hover:border-amber-400 shadow-xl bg-[#09201e] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image Thumbnail with Overlay */}
                    <div className="h-64 sm:h-72 overflow-hidden relative bg-[#041211]">
                      <img
                        src={item.image}
                        alt={isAmharic ? item.titleAm : item.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061514] via-[#061514]/20 to-transparent pointer-events-none" />

                      {/* Purpose Tag Badge (Top Left) */}
                      <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#061514]/90 backdrop-blur-md text-amber-300 border border-amber-500/40 shadow flex items-center gap-1">
                        <Target size={11} className="text-amber-400" />
                        <span>{isAmharic ? item.purposeBadgeAm : item.purposeBadgeEn}</span>
                      </span>

                      {/* Category Badge (Top Right) */}
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow">
                        {isAmharic ? item.categoryAm : item.categoryEn}
                      </span>

                      {/* Hover Indicator */}
                      <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/75 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-medium backdrop-blur-sm">
                        <ZoomIn size={14} />
                        <span>{isAmharic ? "አጉላና ዓላማውን እይ" : "View Purpose"}</span>
                      </div>
                    </div>

                    {/* Card Content & Purpose Highlight */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                        {isAmharic ? item.titleAm : item.titleEn}
                      </h3>

                      {/* Purpose Box */}
                      <div className="p-3 rounded-2xl bg-[#051614] border border-amber-500/20 text-xs text-emerald-100/90 space-y-1">
                        <div className="font-bold text-amber-400 text-[11px] flex items-center gap-1.5">
                          <Info size={12} className="text-amber-400 shrink-0" />
                          <span>{isAmharic ? "የዚህ ፎቶ ዋና ዓላማ፦" : "Primary Purpose:"}</span>
                        </div>
                        <p className="line-clamp-2 text-emerald-200/90 leading-relaxed">
                          {isAmharic ? item.purposeDescAm : item.purposeDescEn}
                        </p>
                      </div>

                      {/* Key Indicators */}
                      <div className="space-y-1.5 text-xs text-emerald-300/80 pt-1">
                        {item.datesAm && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar size={13} className="text-amber-400 shrink-0" />
                            <span className="truncate">{isAmharic ? item.datesAm : item.datesEn}</span>
                          </div>
                        )}
                        {item.locationAm && (
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin size={13} className="text-amber-400 shrink-0" />
                            <span className="truncate">{isAmharic ? item.locationAm : item.locationEn}</span>
                          </div>
                        )}
                        {item.phones && item.phones.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Phone size={13} className="text-amber-400 shrink-0" />
                            <span>{item.phones.join(' | ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-5 pb-5 pt-0">
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-xl bg-[#0e332f] hover:bg-[#12423d] text-amber-300 hover:text-white border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>{isAmharic ? "ሙሉውን ዓላማና ፎቶ እይ" : "View Purpose & Details"}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: News Articles */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="p-6 rounded-3xl bg-[#09201e]/85 border-2 border-amber-500/25 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {news.badge}
                    </span>
                    <span className="text-xs text-emerald-300/60 font-mono">
                      {isAmharic ? news.dateAm : news.dateEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {isAmharic ? news.titleAm : news.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed mb-4">
                    {isAmharic ? news.descAm : news.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-900/60">
                  <span className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 cursor-pointer">
                    <span>{isAmharic ? "ሙሉውን አንብብ" : "Read Full Story"}</span>
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Downloadable Files */}
        {activeTab === 'files' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
            {downloadableFiles.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-[#09201e]/90 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-between gap-4 shadow-lg group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                      {isAmharic ? doc.titleAm : doc.titleEn}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-300/70 mt-1">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{isAmharic ? doc.dateAm : doc.dateEn}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => triggerDownload(isAmharic ? doc.titleAm : doc.titleEn)}
                  className="p-2.5 rounded-xl bg-[#061514] border border-emerald-800 text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-amber-500/20 transition-all shrink-0 cursor-pointer"
                  title="Download File"
                >
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo & Purpose Detailed Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[94vh] bg-[#071918] border-2 border-amber-400/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-amber-500/20 flex items-center justify-between bg-[#041211]">
              <div className="flex items-center gap-2 overflow-hidden pr-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-slate-950 shrink-0">
                  {isAmharic ? selectedItem.purposeBadgeAm : selectedItem.purposeBadgeEn}
                </span>
                <span className="text-sm sm:text-base font-bold text-white truncate">
                  {isAmharic ? selectedItem.titleAm : selectedItem.titleEn}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full hover:bg-emerald-900/60 text-emerald-200 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content: 2 Columns on desktop, scrollable */}
            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[82vh]">
              {/* Left Column: Full Image Poster with zoom capability */}
              <div className="lg:col-span-7 p-4 sm:p-6 bg-[#030d0c] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-amber-500/20">
                <img
                  src={selectedItem.image}
                  alt={isAmharic ? selectedItem.titleAm : selectedItem.titleEn}
                  className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                />
              </div>

              {/* Right Column: Complete Purpose, Info, and Action details */}
              <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 text-left bg-[#071918]">
                {/* Title and Category */}
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                    {isAmharic ? selectedItem.categoryAm : selectedItem.categoryEn}
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-tight">
                    {isAmharic ? selectedItem.titleAm : selectedItem.titleEn}
                  </h3>
                </div>

                {/* Primary Purpose Detailed Callout */}
                <div className="p-4 rounded-2xl bg-[#092320] border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Target size={15} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "የፎቶውና የአገልግሎቱ ዋና ዓላማ፦" : "Mission & Purpose:"}</span>
                  </div>
                  <p className="text-sm text-emerald-100/95 leading-relaxed">
                    {isAmharic ? selectedItem.purposeDescAm : selectedItem.purposeDescEn}
                  </p>
                </div>

                {/* Schedule / Dates if present */}
                {selectedItem.datesAm && (
                  <div className="p-3.5 rounded-xl bg-[#051614] border border-emerald-800/80 space-y-1">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Calendar size={14} className="text-amber-400 shrink-0" />
                      <span>{isAmharic ? "ቀንና መርሃ ግብር" : "Date & Schedule"}:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium pl-5">
                      {isAmharic ? selectedItem.datesAm : selectedItem.datesEn}
                    </p>
                  </div>
                )}

                {/* Registration Location if present */}
                {selectedItem.locationAm && (
                  <div className="p-3.5 rounded-xl bg-[#051614] border border-emerald-800/80 space-y-1">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <MapPin size={14} className="text-amber-400 shrink-0" />
                      <span>{isAmharic ? "የመመዝገቢያ ቦታ" : "Registration Place"}:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium pl-5">
                      {isAmharic ? selectedItem.locationAm : selectedItem.locationEn}
                    </p>
                  </div>
                )}

                {/* Bank Accounts if present (Maed Enagara) */}
                {selectedItem.bankDetails && selectedItem.bankDetails.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Building size={14} className="text-amber-400 shrink-0" />
                      <span>{isAmharic ? "የባንክ ሂሳብ ቁጥሮች (ድጋፍ ለማድረግ)" : "Donation Bank Accounts"}:</span>
                    </div>
                    <div className="space-y-2">
                      {selectedItem.bankDetails.map((b, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#051614] border border-emerald-800/80 flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="font-bold text-emerald-200">{b.bank}</div>
                            <div className="font-mono text-sm text-amber-300 font-bold">{b.account}</div>
                            {b.name && <div className="text-[11px] text-emerald-400/80">{b.name}</div>}
                          </div>
                          <button
                            onClick={() => copyToClipboard(b.account, `bank-${idx}`)}
                            className="p-2 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-200 hover:text-white hover:border-amber-400 transition-all shrink-0 cursor-pointer"
                            title="Copy Account"
                          >
                            {copiedBank === `bank-${idx}` ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Telephone Contact if present */}
                {selectedItem.phones && selectedItem.phones.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Phone size={14} className="text-amber-400 shrink-0" />
                      <span>{isAmharic ? "ለበለጠ መረጃ በስልክ ይደውሉ" : "Contact Phone Numbers"}:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone}`}
                          className="px-3.5 py-2 rounded-xl bg-[#0e332f] hover:bg-[#12423d] border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                        >
                          <Phone size={12} className="text-amber-400" />
                          <span>{phone}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* External links if present (Telegram, Email, etc.) */}
                {selectedItem.links && selectedItem.links.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {selectedItem.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
                      >
                        <span>{link.label}</span>
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

