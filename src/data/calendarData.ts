import { CalendarFeast, ChurchEvent } from '../types';

export const monthlyFeasts: CalendarFeast[] = [
  {
    dayOfMonth: 1,
    saintAm: "ልደታ ለማርያም / ቅዱስ ኤልያስ",
    saintEn: "Nativity of St. Mary & St. Elias",
    significanceAm: "የእመቤታችን ልደት መታሰቢያ እና የነቢዩ ኤልያስ በዓል",
    significanceEn: "Commemoration of the Nativity of the Theotokos and the Prophet Elias",
    color: "from-blue-500/20 to-blue-700/20"
  },
  {
    dayOfMonth: 3,
    saintAm: "በዓታ ለማርያም",
    saintEn: "Presentation of St. Mary into the Temple",
    significanceAm: "እመቤታችን በሦስት ዓመቷ ወደ ቤተ መቅደስ የገባችበት መታሰቢያ",
    significanceEn: "St. Mary entered the holy temple dedicated to divine worship at age 3",
    color: "from-cyan-500/20 to-cyan-700/20"
  },
  {
    dayOfMonth: 5,
    saintAm: "አቡነ ገብረ መንፈስ ቅዱስ",
    saintEn: "Abune Gebre Menfes Qiddus",
    significanceAm: "የታላቁ ጻድቅ አቡነ ገብረ መንፈስ ቅዱስ ወርሃዊ በዓል",
    significanceEn: "Monthly feast of the great desert hermit Abune Gebre Menfes Qiddus",
    color: "from-amber-500/20 to-amber-700/20"
  },
  {
    dayOfMonth: 7,
    saintAm: "ሥላሴ (ቅድስት ሥላሴ)",
    saintEn: "Holy Trinity (Qiddist Selassie)",
    significanceAm: "የአንድነቱና የሦስትነቱ ምሥጢር የሚዘከርበት ታላቅ በዓል",
    significanceEn: "Veneration of the Holy Trinity, One God in Three Persons",
    color: "from-yellow-500/20 to-yellow-700/20"
  },
  {
    dayOfMonth: 12,
    saintAm: "ሊቀ መላእክት ቅዱስ ሚካኤል (የደብራችን ጠባቂ)",
    saintEn: "Archangel St. Michael (Our Parish Patron)",
    significanceAm: "የላፍቶ ደብረ ትጉሃን አጥቢያችን ዋና የበዓለ ንግሥ ጠባቂ ሊቀ መላእክት",
    significanceEn: "Chief Patron Saint and protector of Lafto Debre Teguhan parish",
    color: "from-amber-500/30 to-rose-600/30"
  },
  {
    dayOfMonth: 19,
    saintAm: "ቅዱስ ገብርኤል ሊቀ መላእክት",
    saintEn: "Archangel St. Gabriel",
    significanceAm: "የብስራቱ መልአክ ቅዱስ ገብርኤል ወርሃዊ መታሰቢያ",
    significanceEn: "Monthly commemoration of Archangel Gabriel, harbinger of good tidings",
    color: "from-teal-500/20 to-teal-700/20"
  },
  {
    dayOfMonth: 21,
    saintAm: "እመቤታችን ቅድስት ድንግል ማርያም",
    saintEn: "The Holy Virgin Mary",
    significanceAm: "የእመቤታችን የአምላክ እናት ኪዳነ ምሕረት ወርሃዊ በዓል",
    significanceEn: "Monthly veneration of the Mother of God, Covenant of Mercy",
    color: "from-indigo-500/20 to-indigo-700/20"
  },
  {
    dayOfMonth: 23,
    saintAm: "ቅዱስ ጊዮርጊስ ሰማዕት",
    saintEn: "St. George the Great Martyr",
    significanceAm: "የሰማዕታት አለቃ የልዳው ኮከብ ቅዱስ ጊዮርጊስ",
    significanceEn: "Feast of St. George, prince of martyrs and defender of truth",
    color: "from-rose-500/20 to-rose-700/20"
  },
  {
    dayOfMonth: 27,
    saintAm: "መድኃኔዓለም (የዓለም አዳኝ)",
    saintEn: "Medhane Alem (Savior of the World)",
    significanceAm: "የጌታችንና የመድኃኒታችን የኢየሱስ ክርስቶስ የማዳን ሥራ መታሰቢያ",
    significanceEn: "Celebration of our Lord and Savior Jesus Christ, Redeemer of creation",
    color: "from-purple-500/20 to-purple-700/20"
  },
  {
    dayOfMonth: 29,
    saintAm: "በዓለ ወልድ (የልደት መታሰቢያ)",
    saintEn: "Be'ale Wold (Nativity of the Son)",
    significanceAm: "የጌታችን ሰው የመሆንና የመገለጡ ምስጢር በየወሩ የሚዘከርበት",
    significanceEn: "Monthly feast commemorating the Holy Incarnation and Birth of Christ",
    color: "from-emerald-500/20 to-emerald-700/20"
  }
];

export const upcomingEvents: ChurchEvent[] = [
  {
    id: "ev-1",
    titleAm: "የሐምሌ 23 የሰንበት ት/ቤቱ የምሥረታ በዓል",
    titleEn: "Annual Sunday School Foundation Anniversary",
    dateAm: "ሐምሌ 23 ቀን",
    dateEn: "July 30 (Hamle 23)",
    timeAm: "ከጠዋቱ 2:00 - 10:00 ቀትር",
    timeEn: "8:00 AM - 4:00 PM",
    locationAm: "ላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ዋና አዳራሽ",
    locationEn: "Lafto Debre Teguhan St. Michael Main Hall",
    descAm: "በ1983 ዓ.ም የተመሰረተው ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት የተማሪዎች የምርቃት፣ የዝማሬና የታሪክ ዘገባ ዓመታዊ በዓል።",
    descEn: "Celebrating the founding anniversary since 1991, with student graduations, spiritual canticles, and achievement exhibitions.",
    category: "celebration"
  },
  {
    id: "ev-2",
    titleAm: "የወርሃዊ ቅዱስ ሚካኤል ንግሥና ዝማሬ",
    titleEn: "Monthly St. Michael Liturgical Vigil & Chants",
    dateAm: "በየወሩ 12 ቀን",
    dateEn: "12th of Every Ethiopian Month",
    timeAm: "ከሌሊቱ 10:00 - ጠዋቱ 4:00",
    timeEn: "4:00 AM - 10:00 AM",
    locationAm: "ቤተ መቅደስና የሰንበት ት/ቤት አደባባይ",
    locationEn: "Church Sanctuary & Sunday School Plaza",
    descAm: "የማኅሌተ ጽጌ፣ የበገና ዝማሬና የቅዳሴ ጸሎት ከሰንበት ትምህርት ቤቱ መዘምራን ጋር።",
    descEn: "Nocturnal Mahlet vigil, traditional Begena psalmody, and Divine Liturgy led by the youth choir.",
    category: "worship"
  },
  {
    id: "ev-3",
    titleAm: "የአዲስ ተማሪዎች ምዝገባና ኦሬንቴሽን",
    titleEn: "New Students Intake & Orientation",
    dateAm: "የመስከረም መጨረሻ - ጥቅምት መጀመሪያ",
    dateEn: "Late September - Early October",
    timeAm: "ቅዳሜና እሁድ ሙሉ ቀን",
    timeEn: "Saturdays & Sundays All Day",
    locationAm: "የትምህርትና ስልጠና ክፍል ቢሮ ቁጥር 4",
    locationEn: "Education & Training Office Rm 4",
    descAm: "ለሕፃናት (ማቴዎስ፣ ማርቆስ፣ ሉቃስ) እና ለአዋቂዎች የአብነትና የመዝሙር ትምህርቶች ምዝገባ።",
    descEn: "Open enrollment for children divisions and adult traditional theological disciplines.",
    category: "study"
  },
  {
    id: "ev-4",
    titleAm: "የሙያና በጎ አድራጎት ዓመታዊ የድጋፍ መርሐ ግብር",
    titleEn: "Annual Charity & Community Outreach",
    dateAm: "በዓመታዊ በዓላት ዋዜማ",
    dateEn: "Eve of Major Feasts",
    timeAm: "ከጠዋቱ 3:00 ጀምሮ",
    timeEn: "From 9:00 AM onwards",
    locationAm: "በጎ አድራጎት ማስተባበሪያ ማዕከል",
    locationEn: "Charity Coordination Center",
    descAm: "ለአቅመ ደካሞች፣ ለአረጋውያንና ለሕፃናት የምግብ፣ የአልባሳትና የትምህርት ቁሳቁስ ድጋፍ ማሰባሰብና ማከፋፈል።",
    descEn: "Distribution of food, clothing, and educational supplies to underprivileged community families and orphans.",
    category: "charity"
  }
];

export const weeklySchedule = [
  {
    dayAm: "ቅዳሜ (ከእኩለ ቀን በኋላ)",
    dayEn: "Saturday Afternoon",
    timeAm: "8:30 - 11:30 ከሰዓት",
    timeEn: "2:30 PM - 5:30 PM",
    titleAm: "የወጣቶችና የአዋቂዎች ትምህርት፣ የመዝሙርና የከበሮ ስልጠና",
    titleEn: "Youth & Adult Classes, Choir & Instrument Training"
  },
  {
    dayAm: "እሁድ ጠዋት",
    dayEn: "Sunday Morning",
    timeAm: "12:00 - 3:30 ጠዋት",
    timeEn: "6:00 AM - 9:30 AM",
    titleAm: "ሥርዓተ ቅዳሴና የጋራ ጸሎት",
    titleEn: "Divine Liturgy & Congregational Worship"
  },
  {
    dayAm: "እሁድ ረፋድ",
    dayEn: "Sunday Mid-Morning",
    timeAm: "3:30 - 6:00 ቀትር",
    timeEn: "9:30 AM - 12:00 PM",
    titleAm: "የሕፃናትና ታዳጊዎች ሰንበት ትምህርት (ማቴዎስ፣ ማርቆስ፣ ሉቃስ)",
    titleEn: "Children Sunday School Classes (All Grades)"
  },
  {
    dayAm: "እሁድ ከሰዓት",
    dayEn: "Sunday Afternoon",
    timeAm: "8:00 - 11:00 ከሰዓት",
    timeEn: "2:00 PM - 5:00 PM",
    titleAm: "ጠቅላላ የሰንበት ት/ቤት ጉባኤ፣ ስብከተ ወንጌልና የክፍላት ሪፖርት",
    titleEn: "General Sunday School Assembly, Sermon & Ministry Updates"
  }
];
