import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: "matthew",
    titleAm: "የማቴዎስ ምድብ (ዕድሜ 4 - 7)",
    titleEn: "Matthew Group (Ages 4 - 7)",
    targetAm: "ለሕፃናት (ቅድመ መደበኛ)",
    targetEn: "Early Childhood (Pre-K to 1st Grade)",
    descAm: "ሕፃናት የእግዚአብሔርን ፍቅር፣ ማማተብን፣ አበው ቅዱሳንን፣ አጫጭር ጸሎቶችንና የሕፃናት መዝሙራትን በደስታ የሚማሩበት የመጀመሪያ ደረጃ።",
    descEn: "Young children learn God's love, making the Sign of the Cross, short prayers, Bible heroes, and joyful hymns in a warm, welcoming environment.",
    scheduleAm: "እሁድ 3:30 - 5:30 ጠዋት",
    scheduleEn: "Sundays 9:30 AM - 11:30 AM",
    topicsAm: [
      "ማማተብና መሠረታዊ ጸሎቶች (አቡነ ዘበሰማያት)",
      "የመጽሐፍ ቅዱስ አባቶችና ታሪኮች (ኖኅ፣ ዳዊት፣ ሳሙኤል)",
      "የሕፃናት መንፈሳዊ መዝሙራት",
      "ክርስቲያናዊ ሥነ-ምግባርና መከባበር"
    ],
    topicsEn: [
      "The Sign of the Cross & The Lord's Prayer (Abune ZebeSemayat)",
      "Inspiring Scripture Stories (Noah, David, Samuel)",
      "Children's Hymns & Songs",
      "Christian Manners and Mutual Love"
    ],
    level: "children"
  },
  {
    id: "mark",
    titleAm: "የማርቆስ ምድብ (ዕድሜ 8 - 12)",
    titleEn: "Mark Group (Ages 8 - 12)",
    targetAm: "ለሕፃናት (መካከለኛ ደረጃ)",
    targetEn: "Junior Youth (Grades 2 - 6)",
    descAm: "የቅድስት ቤተክርስቲያንን ሰባቱን ምስጢራት፣ አሥርቱን ትእዛዛት፣ የቤተክርስቲያን ንዋያተ ቅድሳትን እና የመጀመሪያ ደረጃ ግዕዝ ንባብን ያጠናሉ።",
    descEn: "Deepens foundational Orthodox dogma, the Seven Holy Sacraments, the Ten Commandments, church artifacts, and introductory Ge'ez reading.",
    scheduleAm: "እሁድ 3:00 - 5:30 ጠዋት",
    scheduleEn: "Sundays 9:00 AM - 11:30 AM",
    topicsAm: [
      "ሰባቱ ምስጢራተ ቤተክርስቲያን መግቢያ",
      "አሥርቱ ትእዛዛትና የበዓላት ትርጉም",
      "የግዕዝ ፊደላትና የንባብ ልምምድ",
      "የቅዱሳን መላእክትና ጻድቃን ታሪክ"
    ],
    topicsEn: [
      "The Seven Holy Sacraments (Misterat)",
      "The Ten Commandments & Major Feasts",
      "Ge'ez Alphabets and Sacred Reading Practice",
      "Lives of the Holy Angels and Saints"
    ],
    level: "children"
  },
  {
    id: "luke",
    titleAm: "የሉቃስ ምድብ (ዕድሜ 13 - 17)",
    titleEn: "Luke Group (Ages 13 - 17)",
    targetAm: "ለታዳጊዎችና ለወጣቶች",
    targetEn: "Teens & Secondary Youth",
    descAm: "በወጣትነት ዕድሜ የሚገጥሙ ተግዳሮቶችን በእምነት ማሸነፍ፣ የነገረ ሃይማኖት ትምህርት፣ የቅዱስ ያሬድ ዜማ እና የመንፈሳዊ አገልግሎት ጥበብን ያዳብራሉ።",
    descEn: "Equips adolescents to live a pure Orthodox life amidst modern culture, covering theology, St. Yared hymns, and church service preparation.",
    scheduleAm: "ቅዳሜ 8:30 - 11:30 ከሰዓት | እሁድ 3:00 ጠዋት",
    scheduleEn: "Saturdays 2:30 PM - 5:30 PM | Sundays 9:00 AM",
    topicsAm: [
      "አምስቱ አዕማደ ምስጢር በጥልቀት",
      "የእቅበተ እምነት (Apologetics) መሠረቶች",
      "የከበሮና ጸናጽል መሠረታዊ ምቶች",
      "የክርስትና ሕይወትና የዘመኑ ፈተናዎች"
    ],
    topicsEn: [
      "The Five Pillars of Faith in depth",
      "Foundations of Orthodox Apologetics",
      "Traditional Liturgical Chanting & Instruments",
      "Christian Walk & Overcoming Peer Pressures"
    ],
    level: "youth"
  },
  {
    id: "abnet_adult",
    titleAm: "የአብነት ትምህርት ክፍል (ለወጣቶችና አዋቂዎች)",
    titleEn: "Traditional Abnet School (Youth & Adults)",
    targetAm: "ለሁሉም ዕድሜ አዋቂዎች",
    targetEn: "Adults & Serious Students",
    descAm: "ትውፊታዊውን የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ የአብነት ትምህርት ቤት ሥርዓት መሠረት ያደረገ የንባብ፣ የዜማ፣ የውዳሴ ማርያምና የቅኔ ትምህርት።",
    descEn: "Authentic traditional theological school covering liturgical Ge'ez chanting, Psalmody, Wudase Maryam, and Qene poetry.",
    scheduleAm: "ሰኞ፣ ረቡዕ፣ አርብ 11:30 - 1:30 ምሽት",
    scheduleEn: "Mon, Wed, Fri 5:30 PM - 7:30 PM",
    topicsAm: [
      "የግዕዝ ንባብና የዜማ ምልክቶች (ይዘት፣ ርክርክ፣ ድፋት)",
      "ውዳሴ ማርያምና አንቀጸ ብርሃን በዜማ",
      "ጾመ ድጓ እና ምዕራፍ",
      "የአቋቋም ስልጠና (ዝማሬ ከነከበሮው)"
    ],
    topicsEn: [
      "Ge'ez Reading and St. Yared Musical Notations",
      "Wudase Maryam and Anqetse Berhan Chants",
      "Tsome Digua and Me'raf Liturgical Books",
      "Liturgical Movement & Aquaquam Mastery"
    ],
    level: "adult"
  },
  {
    id: "choir_adult",
    titleAm: "የመዝሙርና የዝማሬ ሥልጠና",
    titleEn: "Sacred Choir & Hymnody Training",
    targetAm: "ለመዘምራንና ለመላው ወጣቶች",
    targetEn: "Choir Members & Enthusiasts",
    descAm: "በሰንበት ትምህርት ቤቱ መዘምራን ክፍል የሚያገለግሉበትን ዜማ፣ የድምጽ ቅንብር፣ የመዝሙር ግጥምና የዜማ መሣሪያዎች (በገና፣ ከበሮ፣ ጸናጽል) ስልጠና።",
    descEn: "Comprehensive vocal training, hymnody composition, Begena (King David's 10-string harp), and ceremonial liturgical accompaniment.",
    scheduleAm: "ቅዳሜ 9:00 - 12:00 ከሰዓት",
    scheduleEn: "Saturdays 3:00 PM - 6:00 PM",
    topicsAm: [
      "የበገና መደርደርና ማስተካከል ስልጠና",
      "የድምጽ አጠቃቀምና የጋራ ዝማሬ ስምምነት",
      "የበዓላትና የአጽዋማት ልዩ መዝሙራት",
      "የመዝሙር መንፈሳዊ ሥነ-ስርዓት"
    ],
    topicsEn: [
      "Begena (King David's Harp) Tuning & Playing",
      "Vocal Harmony and Collective Praise",
      "Seasonal Feasts & Great Lent Hymns",
      "Liturgical Dignity of the Choir"
    ],
    level: "adult"
  },
  {
    id: "theology_adult",
    titleAm: "የመጽሐፍ ቅዱስና የነገረ መለኮት ጥናት",
    titleEn: "Bible Study & Patristic Theology",
    targetAm: "ለምዕመናንና ለአዲስ ተማሪዎች",
    targetEn: "Parishioners & Seekers",
    descAm: "የብሉይና የሐዲስ ኪዳን መጻሕፍት ትርጓሜ፣ የሐዋርያት ቀኖና እና የቅዱሳን አበው ትምህርቶች የሚተነተኑበት ሳምንታዊ ክፍል።",
    descEn: "In-depth expository Bible study, Patristic theological literature (Haymanote Abew), and practical Christian ethics.",
    scheduleAm: "እሁድ ከቅዳሴ በኋላ 4:30 - 6:30 ቀትር",
    scheduleEn: "Sundays after Liturgy 10:30 AM - 12:30 PM",
    topicsAm: [
      "የወንጌል ጥናትና ትርጓሜ",
      "የቅዱሳን አበው ታሪክና ምክር",
      "የቤተክርስቲያን ታሪክ በኢትዮጵያና በዓለም",
      "የጥያቄና መልስ መድረክ"
    ],
    topicsEn: [
      "Gospel Exposition and Context",
      "Patristic Wisdom & Lives of Desert Fathers",
      "History of the Church in Ethiopia & Antiquity",
      "Interactive Q&A Session"
    ],
    level: "adult"
  }
];

