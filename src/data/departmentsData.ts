import { Department } from '../types';

export const departmentsData: Department[] = [
  {
    id: "leadership",
    nameAm: "ሥራ አመራር ክፍል",
    nameEn: "Executive Administration",
    descAm: "የሰንበት ትምህርት ቤቱን አጠቃላይ አስተዳደር፣ ስትራቴጂካዊ ዕቅድ፣ አፈጻጸምና የተቀናጀ አመራር በበላይነት የሚከታተልና የሚመራ ክፍል።",
    descEn: "Oversees general administration, strategic planning, performance management, and organizational leadership of the Sunday School.",
    category: "leadership",
    articleRef: "ምዕራፍ 3፣ አንቀጽ 3",
    objectiveAm: "የሰንበት ት/ቤቱን አጠቃላይ አስተዳደራዊ፣ መንፈሳዊና ማኅበራዊ እንቅስቃሴዎች በበላይነት መምራት፤ ውሳኔዎችንና መመሪያዎችን ማስፈጸም፤ የተቋሙን ራዕይና ተልዕኮ ማሳካት።",
    objectiveEn: "To lead, oversee, and coordinate the administrative, spiritual, and organizational affairs of the Sunday School in accordance with church bylaws.",
    subSectionsAm: ["አጠቃላይ ሥራ አመራር", "ዋና ጸሐፊና ሰነዶች", "ዕቅድ፣ ክትትልና ግንኙነት"],
    subSectionsEn: ["Executive Directorate", "Secretariat & Records", "Planning, Monitoring & PR"],
    icon: "Shield",
    color: "from-amber-600/30 to-amber-900/30",
    tasksAm: [
      "የሰንበት ት/ቤቱን ጠቅላላ ጉባኤና የሥራ አመራር ስብሰባዎችን በሰብሳቢነት መምራትና ማስተባበር",
      "ዓመታዊና የረጅም ጊዜ ስትራቴጂካዊ የሥራ ዕቅድና በጀት ማዘጋጀት፣ ማጽደቅና አፈጻጸሙን መከታተል",
      "በሰንበት ት/ቤቱ ሥር ያሉትን ክፍላትና ንዑሳን ክፍላት ሥራዎችን መከታተል፣ መደገፍና መገምገም",
      "የሰንበት ት/ቤቱን የውስጥ መተዳደሪያ ደንብና የአሠራር መመሪያዎች መከበራቸውን ማረጋገጥ",
      "ከደብሩ አስተዳደር፣ ከሰበካ ጉባኤና ከሚመለከታቸው አድባራት ጋር ግንኙነት ማድረግና መወከል",
      "የአባላትንና የአገልጋዮችን መብትና ግዴታ ማስጠበቅ፣ ችግሮችን በሰላማዊ መንገድ መፍታት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "ሰብሳቢና ም/ሰብሳቢ",
        nameEn: "Chairperson & Vice Chairperson",
        dutiesAm: [
          "የሥራ አመራር ኮሚቴን በበላይነት መምራትና መወከል",
          "የስብሰባ አጀንዳዎችን ማዘጋጀትና ውሳኔዎችን ማስፈጸም",
          "ከደብሩ ሰበካ ጉባኤና አስተዳደር ጋር ግንኙነት መፍጠር"
        ]
      },
      {
        nameAm: "ዋና ጸሐፊና ም/ጸሐፊ",
        nameEn: "Secretary & Vice Secretary",
        dutiesAm: [
          "የሥራ አመራርና የጠቅላላ ጉባኤ ቃለ ጉባኤዎችን መያዝና ማደራጀት",
          "የደብዳቤዎች ልውውጥና ይፋዊ መዛግብትን በሥርዓት መጠበቅ",
          "ወቅታዊ የሥራ አፈጻጸም ሪፖርቶችን አቀናጅቶ ማዘጋጀት"
        ]
      },
      {
        nameAm: "የሥራ አመራር አባላት",
        nameEn: "Executive Committee Members",
        dutiesAm: [
          "የተመደቡባቸውን ክፍላት የሥራ እንቅስቃሴ መከታተልና መደገፍ",
          "በአመራር ውሳኔዎች ላይ ድምጽ መስጠትና በውሳኔው መሠረት መሥራት",
          "የአባላትንና የአገልግሎቱን ሰላምና አንድነት መጠበቅ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "lead-1", titleAm: "የ2026/2027 ዓመታዊ የሥራ ዕቅድና በጀት ማጽደቅ", status: "completed", subUnitAm: "አጠቃላይ ሥራ አመራር", articleRef: "አንቀጽ 3.2" },
      { id: "lead-2", titleAm: "የ14ቱ የአገልግሎት ክፍላት ወርሃዊ የሥራ አፈጻጸም ሪፖርት መገምገም", status: "in_progress", subUnitAm: "ዕቅድ፣ ክትትልና ግንኙነት", articleRef: "አንቀጽ 3.3" },
      { id: "lead-3", titleAm: "የሰንበት ት/ቤቱን የውስጥ መተዳደሪያ ደንብ ትግበራ መከታተል", status: "in_progress", subUnitAm: "አጠቃላይ ሥራ አመራር", articleRef: "አንቀጽ 3.4" },
      { id: "lead-4", titleAm: "ከደብሩ ሰበካ ጉባኤ ጋር የሩብ ዓመት የጋራ የሥራ ግምገማ ማካሄድ", status: "planned", subUnitAm: "አጠቃላይ ሥራ አመራር", articleRef: "አንቀጽ 3.5" },
      { id: "lead-5", titleAm: "የመዛግብትና ቃለ ጉባኤዎች ዲጂታል አርካይቭ ማጠናከር", status: "planned", subUnitAm: "ዋና ጸሐፊና ሰነዶች", articleRef: "አንቀጽ 3.2" }
    ]
  },
  {
    id: "audit",
    nameAm: "ኦዲትና ኢንስፔክሽን ክፍል",
    nameEn: "Audit & Inspection Committee",
    descAm: "የሰንበት ትምህርት ቤቱን የፋይናንስ፣ የንብረትና የሥራ አፈጻጸም ትክክለኛነትና ሕጋዊነት በገለልተኝነት የሚመረምርና የሚቆጣጠር ክፍል።",
    descEn: "Inspects financial books, asset inventories, and procedural compliance across all Sunday School departments.",
    category: "leadership",
    articleRef: "ምዕራፍ 3፣ አንቀጽ 5",
    objectiveAm: "የሰንበት ት/ቤቱን የፋይናንስ፣ የንብረትና የሥራ አፈጻጸም ትክክለኛነት፣ ግልጽነትና ሕጋዊነት መመርመር፤ ብክነትና ግድፈት እንዳይከሰት አስቀድሞ መከላከልና የማስተካከያ ምክረ ሃሳብ ማቅረብ።",
    objectiveEn: "To audit financial accounts and inspect physical assets, ensuring transparency, integrity, and strict adherence to regulations.",
    subSectionsAm: ["የኦዲት አገልግሎት ንዑስ ክፍል", "የኢንስፔክሽንና ቁጥጥር ንዑስ ክፍል"],
    subSectionsEn: ["Financial Audit Unit", "Compliance & Inspection Unit"],
    icon: "Shield",
    color: "from-slate-600/30 to-slate-900/30",
    tasksAm: [
      "የሰንበት ት/ቤቱን የገቢና ወጪ ሂሳቦች፣ ደረሰኞችና የባንክ እንቅስቃሴዎች በየወቅቱ መመርመር",
      "ቋሚና አላቂ ንብረቶች በአግባቡ መመዝገባቸውንና በጥበቃ ላይ መሆናቸውን ማረጋገጥ",
      "እያንዳንዱ ክፍል በተሰጠው ደንብና መመሪያ መሠረት ሥራውን ማከናወኑን ኢንስፔክት ማድረግ",
      "በምርመራ የተገኙ ግኝቶችንና የማስተካከያ እርምጃዎችን የያዘ የኦዲት ሪፖርት ለጠቅላላ ጉባኤ ማቅረብ",
      "የፋይናንስና የንብረት አያያዝ ሥርዓት እንዲሻሻል የሙያ ምክርና መመሪያ መስጠት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የኦዲት አገልግሎት ንዑስ ክፍል",
        nameEn: "Audit Service Unit",
        dutiesAm: [
          "የሒሳብ ደረሰኞች፣ የባንክ ስቴትመንቶችና የክፍያ ማዘዣዎች ትክክለኛነት ማጣራት",
          "የገቢ አሰባሰብና የወጪ ሥርዓት ደንቡን ጠብቆ መከናወኑን መፈተሽ",
          "ወቅታዊ የፋይናንስ ኦዲት ሪፖርት ማዘጋጀት"
        ]
      },
      {
        nameAm: "የኢንስፔክሽንና ቁጥጥር ንዑስ ክፍል",
        nameEn: "Inspection & Compliance Unit",
        dutiesAm: [
          "የዕቃዎችና ንዋያተ ቅድሳት ቆጠራና የመዝገብ አያያዝን መፈተሽ",
          "የውሳኔዎችና የዕቅዶች አፈጻጸም ከደንቡ ጋር መጣጣሙን መከታተል",
          "የአገልግሎት ግድፈቶችን ለይቶ የማስተካከያ ሃሳብ ማቅረብ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "audit-1", titleAm: "የሩብ ዓመት የፋይናንስ ገቢና ወጪ ኦዲት ማካሄድ", status: "completed", subUnitAm: "የኦዲት አገልግሎት ንዑስ ክፍል", articleRef: "አንቀጽ 5.1" },
      { id: "audit-2", titleAm: "የቋሚና አላቂ ንብረቶች የዓመት አጋማሽ ቆጠራና ኢንስፔክሽን ማከናወን", status: "in_progress", subUnitAm: "የኢንስፔክሽንና ቁጥጥር ንዑስ ክፍል", articleRef: "አንቀጽ 5.2" },
      { id: "audit-3", titleAm: "የመተዳደሪያ ደንብ የአሠራር ተገዢነት ግምገማ ማዘጋጀት", status: "planned", subUnitAm: "የኢንስፔክሽንና ቁጥጥር ንዑስ ክፍል", articleRef: "አንቀጽ 5.3" },
      { id: "audit-4", titleAm: "የኦዲት ግኝቶችና የማስተካከያ ምክረ ሃሳብ ሪፖርት ማቅረብ", status: "planned", subUnitAm: "የኦዲት አገልግሎት ንዑስ ክፍል", articleRef: "አንቀጽ 5.4" }
    ]
  },
  {
    id: "development",
    nameAm: "የልማት ተቋማት አስተዳደር ቦርድ",
    nameEn: "Development & Enterprise Board",
    descAm: "የሰንበት ትምህርት ቤቱን ዘላቂ ገቢ ለማረጋገጥ የምርትና አገልግሎት ትርፍ ሥራዎችን፣ አዳዲስ የገቢ ምንጮችን እና ሱቆችን ያስተዳድራል።",
    descEn: "Manages enterprise activities, spiritual merchandise, production, and income-generating sustainable projects.",
    category: "leadership",
    articleRef: "ምዕራፍ 5 (አንቀጽ 1 - 8)",
    objectiveAm: "የሰንበት ት/ቤቱን የልማት ተቋማትና የገቢ ማስገኛ ፕሮጀክቶችን በበላይነት ማስተዳደር፤ ዘላቂ የሆነ የፋይናንስ አቅም በመፍጠር ለትምህርትና ወንጌል አገልግሎት ድጋፍ ማድረግ።",
    objectiveEn: "To administer development enterprises, spiritual merchandise, pilgrimage trips, and generate sustainable funding for Sunday School ministries.",
    subSectionsAm: ["የምርት ንዑስ ክፍል", "የጉዞና አስጎብኚ ንዑስ ክፍል", "የሽያጭና ገበያ ክፍል", "የግዢና ሒሳብ ክፍል"],
    subSectionsEn: ["Production Unit", "Pilgrimage & Tours Unit", "Sales & Marketing Unit", "Procurement & Finance Unit"],
    icon: "TrendingUp",
    color: "from-emerald-600/30 to-emerald-900/30",
    tasksAm: [
      "የልማት ተቋማቱን የምርት፣ የሽያጭና የአገልግሎት እንቅስቃሴዎች በበላይነት መምራት",
      "አትራፊና መንፈሳዊ ፋይዳ ያላቸው አዳዲስ የልማትና የኢንቨስትመንት ፕሮጀክቶችን ማጥናትና መተግበር",
      "የመንፈሳዊ መጻሕፍት፣ ንዋያተ ቅድሳትና አልባሳት አቅርቦትና ሽያጭን ማስተባበር",
      "የሀገር ውስጥና የውጭ መንፈሳዊ ጉዞዎችን (Pilgrimage) ማዘጋጀትና ማስተባበር",
      "የልማት ተቋማቱን የሂሳብና የሰው ኃይል አስተዳደር ዘመናዊና ግልጽ በሆነ መንገድ መምራት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የምርት ንዑስ ክፍል",
        nameEn: "Production Unit",
        dutiesAm: [
          "መንፈሳዊ አልባሳትንና ንዋያተ ቅድሳትን በጥራት ማዘጋጀት",
          "የሻማ፣ የዕጣንና ሌሎች የቤተክርስቲያን መገልገያዎችን ማምረት",
          "የጥሬ ዕቃዎች አጠቃቀምና ብክነት ቁጥጥር"
        ]
      },
      {
        nameAm: "የጉዞና አስጎብኚ ንዑስ ክፍል",
        nameEn: "Pilgrimage & Tours Unit",
        dutiesAm: [
          "ወደ ገዳማትና ቅዱሳት መካናት የሚደረጉ መንፈሳዊ ጉዞዎችን ማቀድና መምራት",
          "የትራንስፖርት፣ የምግብና የማረፊያ ዝግጅቶችን ማስተባበር",
          "የተጓዦችን ደህንነትና መንፈሳዊ ትምህርት ማረጋገጥ"
        ]
      },
      {
        nameAm: "የሽያጭና ገበያ ንዑስ ክፍል",
        nameEn: "Sales & Marketing Unit",
        dutiesAm: [
          "የመጻሕፍት መደብሮችና የሽያጭ ሱቆችን ማስተዳደር",
          "ጥራት ያላቸው መንፈሳዊ መጻሕፍትን ለምዕመናን ተደራሽ ማድረግ",
          "የሽያጭ ሂሳብን በየዕለቱ ማወራረድና ገቢ ማድረግ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "dev-1", titleAm: "ለቀጣዩ የንግሥ በዓል የመንፈሳዊ አልባሳትና መጻሕፍት ምርት ማጠናቀቅ", status: "completed", subUnitAm: "የምርት ንዑስ ክፍል", articleRef: "ምዕራፍ 5" },
      { id: "dev-2", titleAm: "የዝቋላና የደብረ ሊባኖስ ዓመታዊ መንፈሳዊ ጉዞ መርሐግብር ማስተባበር", status: "in_progress", subUnitAm: "የጉዞና አስጎብኚ ንዑስ ክፍል", articleRef: "ምዕራፍ 5" },
      { id: "dev-3", titleAm: "የሽያጭ ሱቆች ዲጂታል የክፍያና የዕቃ መመዝገቢያ ሥርዓት መዘርጋት", status: "in_progress", subUnitAm: "የሽያጭና ገበያ ክፍል", articleRef: "ምዕራፍ 5" },
      { id: "dev-4", titleAm: "አዲስ ዘላቂ የገቢ ማስገኛ ፕሮጀክት ጥናት ማጠናቀቅ", status: "planned", subUnitAm: "የግዢና ሒሳብ ክፍል", articleRef: "ምዕራፍ 5" }
    ]
  },
  {
    id: "education",
    nameAm: "ትምህርትና ስልጠና ክፍል",
    nameEn: "Education & Training Department",
    descAm: "የዶግማ፣ የቀኖና፣ የቤተክርስቲያን ታሪክና የሥነ-ምግባር ትምህርቶችን ሥርዓተ-ትምህርት በማዘጋጀት ለተማሪዎች ጥራት ያለው መንፈሳዊ ትምህርት ያቀርባል።",
    descEn: "Develops curricula and conducts holistic spiritual education covering dogma, canon, church history, and Christian ethics.",
    category: "education",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 2",
    objectiveAm: "ተማሪዎችንና አባላትን በኦርቶዶክሳዊ ተዋሕዶ የዶግማ፣ የቀኖና፣ የታሪክና የሥነ-ምግባር ትምህርቶች በማነጽ መንፈሳዊ ሕይወታቸውን ማጎልበት፤ ብቁ አገልጋዮችን ማፍራት።",
    objectiveEn: "To educate and equip students in Orthodox dogma, canon law, patristics, and biblical ethics, preparing faithful servants.",
    subSectionsAm: ["የሥርዓተ ትምህርት ንዑስ ክፍል", "የመምህራን ንዑስ ክፍል", "የመርሐግብራት ክትትል ንዑስ ክፍል", "የስልጠና ንዑስ ክፍል"],
    subSectionsEn: ["Curriculum Development", "Teachers Unit", "Program Monitoring", "Training Unit"],
    icon: "BookOpen",
    color: "from-blue-600/30 to-blue-900/30",
    tasksAm: [
      "ከሕፃናት እስከ አዋቂ የዕድሜ እርከንን ያማከለ ዘመናዊና ኦርቶዶክሳዊ ሥርዓተ ትምህርት ማዘጋጀት",
      "ሳምንታዊና ወቅታዊ የክፍል ትምህርቶችን፣ ሴሚናሮችንና አውደ ጥናቶችን ማካሄድ",
      "ብቁ መምህራንን መመደብና የተከታታይ አቅም ማጎልበቻ ስልጠናዎችን መስጠት",
      "የፈተናና ምዘና ሥርዓት በመዘርጋት የተማሪዎችን የትምህርት አቀባበልና ደረጃ መከታተል",
      "ትምህርታዊ ጉዞዎችንና ጥናታዊ ጽሑፎች የሚቀርቡባቸውን ጉባኤያት ማዘጋጀት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የሥርዓተ ትምህርት ንዑስ ክፍል",
        nameEn: "Curriculum Development Unit",
        dutiesAm: [
          "የትምህርት ሞጁሎችንና የመማሪያ መጻሕፍትን ማዘጋጀትና ማረም",
          "ሥርዓተ ትምህርቱን ከቤተክርስቲያን ቀኖና ጋር ማጣጣም",
          "አዳዲስ የትምህርት መርጃ መሣሪያዎችን ማዘጋጀት"
        ]
      },
      {
        nameAm: "የመምህራን ንዑስ ክፍል",
        nameEn: "Teachers Affairs Unit",
        dutiesAm: [
          "ለመማሪያ ክፍሎች መምህራንን መመደብና መርሃ ግብር ማውጣት",
          "የመምህራንን መገኘትና ዝግጅት መከታተል",
          "የአስተማሪዎች የጋራ ውይይትና የልምድ ልውውጥ ማዘጋጀት"
        ]
      },
      {
        nameAm: "የመርሐግብራት ክትትል ንዑስ ክፍል",
        nameEn: "Program Monitoring Unit",
        dutiesAm: [
          "የክፍለ ጊዜያትን አጀማመርና አፈጻጸም መቆጣጠር",
          "የተማሪዎችን አቴንዳንስና የፈተና ውጤት መመዝገብ",
          "የምዘና ውጤቶችን ማጠናቀርና የምስክር ወረቀት ማዘጋጀት"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "edu-1", titleAm: "የ2026/2027 ዓ.ም አዲስ ተማሪዎች ሥርዓተ ትምህርትና ሞጁል ማከፋፈል", status: "completed", subUnitAm: "የሥርዓተ ትምህርት ንዑስ ክፍል", articleRef: "አንቀጽ 2.1" },
      { id: "edu-2", titleAm: "ለሰንበት ት/ቤት መምህራን የስነ-ዘዴና የዶግማ ስልጠና ማካሄድ", status: "in_progress", subUnitAm: "የመምህራን ንዑስ ክፍል", articleRef: "አንቀጽ 2.3" },
      { id: "edu-3", titleAm: "የሩብ ዓመት የተማሪዎች የፈተና ጥያቄዎች ዝግጅትና ምዘና ማካሄድ", status: "planned", subUnitAm: "የመርሐግብራት ክትትል ንዑስ ክፍል", articleRef: "አንቀጽ 2.4" },
      { id: "edu-4", titleAm: "የአስተማሪዎችና ተማሪዎች መንፈሳዊ ሲምፖዚየም ማዘጋጀት", status: "planned", subUnitAm: "የስልጠና ንዑስ ክፍል", articleRef: "አንቀጽ 2.5" }
    ]
  },
  {
    id: "apostolic",
    nameAm: "ሐዋርያዊ አገልግሎት ክፍል",
    nameEn: "Apostolic & Evangelism Service",
    descAm: "የወንጌልን ብርሃን ለሁሉም ለማዳረስ፣ እምነትን ለመጠበቅ (እቅበተ እምነት) እና አዳዲስ ምዕመናንን ለማጽናት የሚሰራ ቁልፍ ክፍል።",
    descEn: "Dedicated to the Great Commission: evangelical outreach, apologetics (defending Orthodox faith), and pastoral visitation.",
    category: "service",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 3",
    objectiveAm: "የጌታችን የኢየሱስ ክርስቶስን የወንጌል ብርሃን ለሁሉም ማዳረስ፤ አጥቢያውንና አጎራባች አካባቢዎችን በስብከተ ወንጌል ማነቃቃት፤ እምነትንና ቀኖናን ከኑፋቄ መጠበቅ (እቅበተ እምነት)።",
    objectiveEn: "To preach the Gospel of Christ, coordinate parish evangelism campaigns, and defend the Orthodox faith against heresies.",
    subSectionsAm: ["የስብከተ ወንጌል ማስፋፊያ", "የአጥቢያ ጉባኤያት ማስተባበሪያ", "የእቅበተ እምነት ንዑስ ክፍል"],
    subSectionsEn: ["Evangelism Outreach", "Parish Assemblies Coordination", "Apologetics & Faith Defense"],
    icon: "Flame",
    color: "from-rose-600/30 to-rose-900/30",
    tasksAm: [
      "በአጥቢያ ቤተክርስቲያንና በተለያዩ መድረኮች የወንጌል ስብከት መርሐግብራትን ማዘጋጀት",
      "የእቅበተ እምነት (Apologetics) ትምህርቶችንና ውይይቶችን በማዘጋጀት የተሳሳቱ አስተሳሰቦችን ማረም",
      "ከአጥቢያ ውጭ ባሉ ገጠራማ አድባራትና ገዳማት የወንጌል ማስፋፊያ ጉዞዎችን ማድረግ",
      "አዳዲስ ወደ ቤተክርስቲያን የሚመጡ ምዕመናንን መቀበልና በክርስትና ትምህርት ማጽናት",
      "የወንጌል ማስተማሪያ በራሪ ጽሑፎችንና ድምጸ-ምስል ዝግጅቶችን ከአግባብ ክፍሎች ጋር ማዘጋጀት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የስብከተ ወንጌል ማስፋፊያ ንዑስ ክፍል",
        nameEn: "Evangelism Outreach Unit",
        dutiesAm: [
          "አውደ ምሕረትና አውራ ጎዳና የወንጌል ጉባኤያትን ማቀድና ማስተባበር",
          "በገጠር ቀበሌዎች የሚደረጉ የስብከተ ወንጌል ጉዞዎችን ማዘጋጀት",
          "ሰባክያነ ወንጌልን መመደብና የጉባኤ ድምጽ ማስተላለፍን ማረጋገጥ"
        ]
      },
      {
        nameAm: "የአጥቢያ ጉባኤያት ንዑስ ክፍል",
        nameEn: "Parish Assemblies Unit",
        dutiesAm: [
          "ሳምንታዊና ወርሃዊ የአጥቢያ ምዕመናን ጉባኤያትን መምራት",
          "የተለያዩ የዕድሜ ማኅበራትን የወንጌል መድረክ ማስተባበር",
          "ከአጥቢያ ካህናት ጋር በመቀናጀት መንፈሳዊ ትምህርት ማድረስ"
        ]
      },
      {
        nameAm: "የእቅበተ እምነት ንዑስ ክፍል",
        nameEn: "Apologetics Unit",
        dutiesAm: [
          "የተዋሕዶ እምነት ዶግማና ቀኖና መከላከያ ጥናታዊ ጽሑፎችን ማዘጋጀት",
          "በወቅታዊ የሃይማኖት ክርክሮች ዙሪያ የማንቂያ ትምህርት መስጠት",
          "የኑፋቄ ትምህርቶችን ለይቶ በቅዱሳት መጻሕፍት ማስረጃ ማረም"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "apo-1", titleAm: "ሳምንታዊ የወጣቶችና ምዕመናን የወንጌል ጉባኤ ማስተባበር", status: "completed", subUnitAm: "የአጥቢያ ጉባኤያት ንዑስ ክፍል", articleRef: "አንቀጽ 3.1" },
      { id: "apo-2", titleAm: "የእቅበተ እምነት (የኦርቶዶክስ ተዋሕዶ እምነት ጥበቃ) ጥናታዊ አውደ ጥናት ማካሄድ", status: "in_progress", subUnitAm: "የእቅበተ እምነት ንዑስ ክፍል", articleRef: "አንቀጽ 3.2" },
      { id: "apo-3", titleAm: "ወደ ገጠር አድባራት የሚደረግ የስብከተ ወንጌል ሚሲዮን ጉዞ ማዘጋጀት", status: "planned", subUnitAm: "የስብከተ ወንጌል ማስፋፊያ", articleRef: "አንቀጽ 3.3" },
      { id: "apo-4", titleAm: "የስብከተ ወንጌል በራሪ ጽሑፎችን አዘጋጅቶ ማሰራጨት", status: "planned", subUnitAm: "የስብከተ ወንጌል ማስፋፊያ", articleRef: "አንቀጽ 3.5" }
    ]
  },
  {
    id: "choir",
    nameAm: "መዝሙር ክፍል",
    nameEn: "Sacred Choir & Hymnody",
    descAm: "የቅዱስ ያሬድን ዜማ መሠረት ያደረጉ መንፈሳዊ መዝሙራትን፣ ማኅሌትንና ዝማሬዎችን በማጥናት በበዓላትና በሰንበት ቅዳሴ የሚያገለግል።",
    descEn: "Masters St. Yared's sacred chants, traditional instruments (Begena, Kebero, Tsenatsil), and leads liturgical praises.",
    category: "creative",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 4",
    objectiveAm: "በቅዱስ ያሬድ ዜማና ሥርዓት መሠረት ፈጣሪን በመንፈሳዊ መዝሙር ማመስገን፤ ምዕመናንን በዝማሬ ማጽናናት፤ ትውልዱን በያሬዳዊ ዜማና የዜማ መሣሪያዎች ማሰልጠን።",
    objectiveEn: "To glorify God through St. Yared's ecclesiastical chants, train vocalists and sacred instrumentalists, and compose orthodox hymns.",
    subSectionsAm: ["የሥርዓተ ትምህርት ክትትል", "የአገልግሎት ማስተባበርያ", "የድርሰትና ዝግጅት ንዑስ ክፍል", "የክህሎት ማጎልበቻ"],
    subSectionsEn: ["Curriculum Monitoring", "Service Coordination", "Composition & Writing", "Skill Building (Begena/Kebero)"],
    icon: "Music",
    color: "from-amber-600/30 to-yellow-900/30",
    tasksAm: [
      "በሰንበት ቅዳሴ፣ በወርሃዊና ዓመታዊ ንግሥ በዓላት ላይ በተደራጀ መዘምራን አገልግሎት መስጠት",
      "የቅዱስ ያሬድን የዜማ ስልቶች (ግዕዝ፣ ዕዝል፣ አራራይ) እና የከበሮ፣ ጸናጽልና በገና ስልጠና መስጠት",
      "በኦርቶዶክሳዊ ትምህርተ ሃይማኖትና ሥነ-ጽሑፍ የተመሰረቱ አዳዲስ መዝሙራትን መድረስና ማስተማር",
      "ለመዘምራን መንፈሳዊ ሥነ-ምግባርና የአገልግሎት ሕይወት ተከታታይ ምክርና ክትትል ማድረግ",
      "የመዝሙር አልበሞችንና የቪዲዮ ክሊፖችን ከመገናኛ ብዙኃን ጋር በመተባበር ማዘጋጀት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የሥርዓተ ትምህርት ክትትል ንዑስ ክፍል",
        nameEn: "Curriculum Monitoring Unit",
        dutiesAm: [
          "የመዘምራንን የዜማ ትምህርት ደረጃና ተሳትፎ መመዝገብ",
          "የመዘምራን የፈተናና የምረቃ መርሐግብር ማዘጋጀት",
          "የዜማ መጻሕፍትንና የማስተማሪያ ቅጂዎችን ማደራጀት"
        ]
      },
      {
        nameAm: "የአገልግሎት ማስተባበርያ ንዑስ ክፍል",
        nameEn: "Service Coordination Unit",
        dutiesAm: [
          "በሰንበት ቅዳሴና ንግሥ በዓላት የመዘምራን ተረኛ ቡድኖችን መመደብ",
          "የመዘምራን አልባሳትና ንጽሕና ቁጥጥር ማድረግ",
          "በበዓላት ላይ የመዝሙር አገልግሎትን በሥርዓት መምራት"
        ]
      },
      {
        nameAm: "የክህሎት ማጎልበቻ ንዑስ ክፍል",
        nameEn: "Skill Enhancement Unit",
        dutiesAm: [
          "የበገና ስልጠና ለሰንበት ት/ቤት ተማሪዎች ማካሄድ",
          "የከበሮ፣ ጸናጽልና መቋሚያ አመታት ሥልጠና መስጠት",
          "የድምጽ ማስተካከልና የጋራ ዜማ ስልጠና መስጠት"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "choir-1", titleAm: "የሰንበት ቅዳሴና ንግሥ በዓላት የመዘምራን ሳምንታዊ ምደባ ማዘጋጀት", status: "completed", subUnitAm: "የአገልግሎት ማስተባበርያ", articleRef: "አንቀጽ 4.1" },
      { id: "choir-2", titleAm: "የበገናና ያሬዳዊ የዜማ መሣሪያዎች አዲስ ዙር ስልጠና መስጠት", status: "in_progress", subUnitAm: "የክህሎት ማጎልበቻ", articleRef: "አንቀጽ 4.2" },
      { id: "choir-3", titleAm: "የ2026/2027 ዓ.ም አዳዲስ መንፈሳዊ መዝሙራትን መድረስና በኮሚቴ ማስገምገም", status: "in_progress", subUnitAm: "የድርሰትና ዝግጅት ንዑስ ክፍል", articleRef: "አንቀጽ 4.3" },
      { id: "choir-4", titleAm: "ለመዘምራን መንፈሳዊ ሥነ-ምግባርና የአገልግሎት ዝግጁነት ጉባኤ ማዘጋጀት", status: "planned", subUnitAm: "የሥርዓተ ትምህርት ክትትል", articleRef: "አንቀጽ 4.4" }
    ]
  },
  {
    id: "charity",
    nameAm: "ሙያና በጎ አድራጎት ክፍል",
    nameEn: "Professional & Charitable Services",
    descAm: "የአባላትን ሙያ በማስተባበር የተቸገሩ ወገኖችን፣ አረጋውያንን እና ሕሙማንን በክርስቲያናዊ ፍቅር ይረዳል፤ የበጎ አድራጎት ፕሮጀክቶችን ይቀርጻል።",
    descEn: "Mobilizes professional skills to support vulnerable community members, orphans, and the elderly in Christian charity.",
    category: "service",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 5",
    objectiveAm: "የአባላትን የተለያዩ የሙያ መስኮች ለቤተክርስቲያን አገልግሎት ማስተባበር፤ ችግረኞችን፣ አረጋውያንንና ሕሙማንን በክርስቲያናዊ ፍቅር መደገፍና መርዳት።",
    objectiveEn: "To mobilize member professional skills and deliver charitable, medical, and socio-economic support to vulnerable believers.",
    subSectionsAm: ["የሙያ አገልግሎት ማስተባበሪያ", "የጥናትና ፕሮጀክት ቀረጻ", "የእርዳታና ድጋፍ ማስተባበሪያ", "የገቢ አሰባሳቢ"],
    subSectionsEn: ["Professional Services", "Research & Projects", "Relief Coordination", "Fundraising"],
    icon: "HeartHandshake",
    color: "from-red-600/30 to-red-900/30",
    tasksAm: [
      "የተቸገሩ ወላጅ አልባ ሕፃናትና አረጋውያንን በመለየት የትምህርት፣ የምግብና የሕክምና ድጋፍ ማስተባበር",
      "በሆስፒታሎችና በማረሚያ ቤቶች ያሉ ወገኖችን በመጎብኘት መንፈሳዊና ቁሳዊ ማጽናኛ መስጠት",
      "የአባላትን የሕክምና፣ የሕግ፣ የምህንድስናና ሌሎች ሙያዎች በማሰባሰብ ነፃ የማኅበረሰብ አገልግሎት መስጠት",
      "ለበጎ አድራጎት ሥራ የሚውሉ ዘላቂ የገቢ ምንጮችንና የድጋፍ አሰባሰብ መርሐግብራትን ማዘጋጀት",
      "የበጎ አድራጎት ፕሮጀክቶችን በማጥናትና በመቅረጽ ተግባራዊ ማድረግ"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የሙያ አገልግሎት ማስተባበሪያ",
        nameEn: "Professional Services Unit",
        dutiesAm: [
          "የባለሙያ አባላትን መረጃ ማደራጀትና በሙያቸው ማሰማራት",
          "ነፃ የሕክምና ምርመራና የማማከር ቀናትን ማዘጋጀት",
          "የሕግና የምህንድስና ድጋፍ ለቤተክርስቲያን ማቅረብ"
        ]
      },
      {
        nameAm: "የእርዳታና ድጋፍ ማስተባበሪያ",
        nameEn: "Relief & Aid Unit",
        dutiesAm: [
          "ድጋፍ የሚሹ አረጋውያንና ወላጅ አልባ ሕፃናትን መመዝገብ",
          "ወርሃዊ የምግብና የትምህርት ቁሳቁስ ድጋፍ ማከፋፈል",
          "የሆስፒታልና የሕሙማን መጠየቅ መርሃ ግብር ማዘጋጀት"
        ]
      },
      {
        nameAm: "የገቢ አሰባሳቢ ንዑስ ክፍል",
        nameEn: "Fundraising Unit",
        dutiesAm: [
          "የበጎ አድራጎት ፈንድ ማሰባሰቢያ ሁነቶችን ማዘጋጀት",
          "ከደጋፊዎችና በጎ አድራጊዎች ጋር ዘላቂ ትስስር መፍጠር",
          "የእርዳታ ገንዘብ አጠቃቀም ግልጽ ሪፖርት ማቅረብ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "charity-1", titleAm: "ለተማሪዎችና ወላጅ አልባ ሕፃናት የትምህርት ቁሳቁስ ማከፋፈል", status: "completed", subUnitAm: "የእርዳታና ድጋፍ ማስተባበሪያ", articleRef: "አንቀጽ 5.1" },
      { id: "charity-2", titleAm: "ወርሃዊ የሕሙማንና የአረጋውያን የቤት ለቤት ጉብኝት ማካሄድ", status: "in_progress", subUnitAm: "የእርዳታና ድጋፍ ማስተባበሪያ", articleRef: "አንቀጽ 5.2" },
      { id: "charity-3", titleAm: "ነፃ የአጥቢያ ሕክምና ምርመራ ቀን ከሐኪሞች ጋር ማዘጋጀት", status: "planned", subUnitAm: "የሙያ አገልግሎት ማስተባበሪያ", articleRef: "አንቀጽ 5.3" },
      { id: "charity-4", titleAm: "የክረምት የበጎ አድራጎት ፈንድ አሰባሳቢ ሁነት ማዘጋጀት", status: "planned", subUnitAm: "የገቢ አሰባሳቢ", articleRef: "አንቀጽ 5.4" }
    ]
  },
  {
    id: "finance",
    nameAm: "የንዋያት አስተዳደር ክፍል",
    nameEn: "Finance & Treasury Department",
    descAm: "የሰንበት ትምህርት ቤቱን ንብረት፣ ሂሳብ እና ንዋየ ቅድሳት በግልጽነትና በታማኝነት በአግባቡ የሚያስተዳድር ክፍል።",
    descEn: "Maintains financial integrity, proper accounting, inventory records, and transparent resource management.",
    category: "leadership",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 6",
    objectiveAm: "የሰንበት ት/ቤቱን ንብረቶችና ንዋየ ቅድሳት መጠበቅና ማስተዳደር፤ ገቢና ወጪን በዘመናዊና ግልጽ የሒሳብ መዝገብ መምራት፤ የንብረት ብክነትን መከላከልና ቁጥጥር ማድረግ።",
    objectiveEn: "To safeguard Sunday School treasuries, assets, and holy vessels with modern accounting and transparent fiscal oversight.",
    subSectionsAm: ["የሒሳብ መዝገብ ንዑስ ክፍል", "የገቢ አሰባሰብ ንዑስ ክፍል", "የንብረት ቁጥጥርና ጥገና", "የመዛግብት ንዑስ ክፍል"],
    subSectionsEn: ["Bookkeeping Unit", "Revenue Collection", "Property & Maintenance", "Records & Archive"],
    icon: "Coins",
    color: "from-yellow-600/30 to-yellow-900/30",
    tasksAm: [
      "የሰንበት ት/ቤቱን የዕለት ተዕለት የገቢና ወጪ ሂሳብ በሕጋዊ ደረሰኝ መመዝገብና ማስተዳደር",
      "የቋሚና አላቂ ዕቃዎችን ዝርዝር መዝገብ መያዝ፣ ኮድ መስጠትና ወቅታዊ ቆጠራ ማካሄድ",
      "ለክፍላት የሚያስፈልጉ የቢሮና የአገልግሎት ዕቃዎች ግዢን በደንቡ መሠረት መፈጸም",
      "ንዋያተ ቅድሳትና የአገልግሎት አልባሳት በአግባቡ ተጠብቀው እንዲቀመጡና እንዲጸዱ ማድረግ",
      "ወርሃዊና ዓመታዊ የፋይናንስና የንብረት ሪፖርት ለሥራ አመራር ክፍል ማቅረብ"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የሒሳብ መዝገብ ንዑስ ክፍል",
        nameEn: "Bookkeeping Unit",
        dutiesAm: [
          "የዕለት ተዕለት የገቢና ወጪ መዝገብ (Cash Book/Ledger) መያዝ",
          "የክፍያ ማዘዣዎችንና ደረሰኞችን ማጣራትና መፈረም",
          "የባንክ ሂሳብ ማስታረቂያ (Bank Reconciliation) ማዘጋጀት"
        ]
      },
      {
        nameAm: "የንብረት ቁጥጥርና ጥገና ንዑስ ክፍል",
        nameEn: "Property & Asset Control",
        dutiesAm: [
          "የቋሚ ንብረቶች ካርድ (Fixed Asset Register) ማዘጋጀትና ኮድ ማድረግ",
          "የቢሮ ዕቃዎችና የድምጽ መሣሪያዎች ጥገናን ማስተባበር",
          "የግምጃ ቤት ቁሳቁሶችን በአግባቡ መመዝገብና ማስረከብ"
        ]
      },
      {
        nameAm: "የገቢ አሰባሰብ ንዑስ ክፍል",
        nameEn: "Revenue Mobilization Unit",
        dutiesAm: [
          "የአባላት ወርሃዊ መዋጮ በደረሰኝ መሰብሰብና ማስገባት",
          "ልዩ የድጋፍና የስጦታ ገቢዎችን መመዝገብ",
          "የገቢ ማሳደጊያ ስልቶችን ከሥራ አመራሩ ጋር ማቀድ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "fin-1", titleAm: "የወርሃዊ ገቢና ወጪ ሒሳብ ማወራረድና የባንክ ማስታረቂያ ማዘጋጀት", status: "completed", subUnitAm: "የሒሳብ መዝገብ ንዑስ ክፍል", articleRef: "አንቀጽ 6.1" },
      { id: "fin-2", titleAm: "የቋሚና አላቂ ዕቃዎች ኮዲንግና የመዝገብ ማዘመን ሥራ ማጠናቀቅ", status: "in_progress", subUnitAm: "የንብረት ቁጥጥርና ጥገና", articleRef: "አንቀጽ 6.2" },
      { id: "fin-3", titleAm: "ለክፍላት የሚያስፈልጉ የቢሮና የትምህርት መገልገያዎች ግዢ መፈጸም", status: "in_progress", subUnitAm: "የንብረት ቁጥጥርና ጥገና", articleRef: "አንቀጽ 6.3" },
      { id: "fin-4", titleAm: "የበጀት ዓመቱ የፋይናንስ ሪፖርት ለሥራ አመራር ክፍል ማቅረብ", status: "planned", subUnitAm: "የሒሳብ መዝገብ ንዑስ ክፍል", articleRef: "አንቀጽ 6.5" }
    ]
  },
  {
    id: "media",
    nameAm: "መገናኛ ብዙኃን ክፍል",
    nameEn: "Media & Communications",
    descAm: "የሰንበት ትምህርት ቤቱን መንፈሳዊ ትምህርቶች፣ ዝግጅቶች፣ የፎቶና ቪዲዮ መረጃዎች በማኅበራዊ ሚዲያ እና በድረ-ገጽ ለምዕመናን ያሰራጫል።",
    descEn: "Broadcasts teachings, event coverages, audio-visual productions, and digital content across web and social platforms.",
    category: "creative",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 7",
    objectiveAm: "የሰንበት ት/ቤቱን መንፈሳዊ አገልግሎቶች፣ ትምህርቶችና ዜናዎች በዘመናዊ የመገናኛ ዘዴዎች ለምዕመናን ማድረስ፤ የቤተክርስቲያንን ክብር የሚመጥን የሚዲያ ይዘት ማዘጋጀትና ማሰራጨት።",
    objectiveEn: "To produce and broadcast high-quality spiritual media, run digital web channels, and safeguard archival recordings.",
    subSectionsAm: ["የቀረጻና ቅንብር ንዑስ ክፍል", "የመካነ ድርና ማኅበራዊ ሚዲያ", "የዝግጅትና ትንተና ንዑስ ክፍል", "የመዛግብት (ክምችት) ክፍል", "ኤዲቶሪያል ቦርድ"],
    subSectionsEn: ["Recording & Editing", "Web & Social Media", "Content Preparation", "Digital Archive", "Editorial Board"],
    icon: "Video",
    color: "from-purple-600/30 to-purple-900/30",
    tasksAm: [
      "ሳምንታዊና ዓመታዊ ጉባኤያትንና ዝግጅቶችን በድምጽና በምስል መቅረጽ፣ ማቀናበርና ማስተላለፍ",
      "የሰንበት ት/ቤቱን ይፋዊ ድረ-ገጽና የማኅበራዊ ትስስር ገጾች (YouTube, Telegram, Facebook) ማስተዳደር",
      "ኦርቶዶክሳዊ ትምህርታዊ ቪዲዮዎችን፣ ፖድካስቶችንና ዶክመንተሪዎችን ማዘጋጀት",
      "የሰንበት ት/ቤቱን መጽሔት፣ ጋዜጣና በራሪ ጽሑፎች በኤዲቶሪያል ቦርድ በኩል አዘጋጅቶ ማሳተም",
      "የታሪክና የአገልግሎት ቅርሶችን በዲጂታል ቤተ-መዛግብት (Archive) መዝግቦ መያዝ"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የቀረጻና ቅንብር ንዑስ ክፍል",
        nameEn: "Production & Video Editing",
        dutiesAm: [
          "የጉባኤያትና በዓላት የቀጥታ ስርጭትና የቪዲዮ ቀረጻ ማከናወን",
          "የድምጽና ምስል ጥራት ማስተካከልና ኤዲቲንግ መሥራት",
          "የቀረጻ መሣሪያዎችን ደህንነትና ጥገና መከታተል"
        ]
      },
      {
        nameAm: "የመካነ ድርና ማኅበራዊ ሚዲያ ንዑስ ክፍል",
        nameEn: "Web & Social Media Unit",
        dutiesAm: [
          "ይፋዊውን ድረ-ገጽ ወቅታዊ መረጃዎችን በመጫን ማስተዳደር",
          "የቴሌግራም፣ ዩቲዩብና ፌስቡክ ገጾችን ማስተባበር",
          "የምዕመናንን የመልእክት ጥያቄዎችና አስተያየቶች መቀበል"
        ]
      },
      {
        nameAm: "ኤዲቶሪያል ቦርድ",
        nameEn: "Editorial Board",
        dutiesAm: [
          "የሚለቀቁ ጽሑፎችንና ቪዲዮዎችን ከቤተክርስቲያን ዶግማ አንጻር መገምገም",
          "የሕትመት ውጤቶችን (መጽሔትና ጋዜጣ) ማረም",
          "የስርጭት ፈቃድ መስጠትና ጥራት ማረጋገጥ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "med-1", titleAm: "የሰንበት ጉባኤ የቀጥታ ስርጭትና የቪዲዮ ዝግጅት ማጠናቀቅ", status: "completed", subUnitAm: "የቀረጻና ቅንብር ንዑስ ክፍል", articleRef: "አንቀጽ 7.1" },
      { id: "med-2", titleAm: "ይፋዊ የሰንበት ት/ቤት ድረ-ገጽና የፖርታል መረጃዎችን ማዘመን", status: "in_progress", subUnitAm: "የመካነ ድርና ማኅበራዊ ሚዲያ", articleRef: "አንቀጽ 7.2" },
      { id: "med-3", titleAm: "የዓመታዊ መንፈሳዊ መጽሔት ጽሑፎች ጥንቅርና ኤዲቶሪያል ግምገማ", status: "in_progress", subUnitAm: "ኤዲቶሪያል ቦርድ", articleRef: "አንቀጽ 7.4" },
      { id: "med-4", titleAm: "የታሪካዊ ፎቶዎችና የቀረጻዎች ዲጂታል አርካይቭ ማደራጀት", status: "planned", subUnitAm: "የመዛግብት (ክምችት) ክፍል", articleRef: "አንቀጽ 7.5" }
    ]
  },
  {
    id: "counseling",
    nameAm: "መማክርት ክፍል",
    nameEn: "Spiritual Counseling & Advisory",
    descAm: "ለተማሪዎችና ለአባላት መንፈሳዊ፣ ሥነ-ልቦናዊና ማኅበራዊ ምክር በመስጠት የሕይወት ፈተናዎችን በጸሎትና በእምነት እንዲሻገሩ ያግዛል።",
    descEn: "Provides spiritual mentorship, psycho-social guidance, and family counsel guided by the Holy Fathers.",
    category: "service",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 8",
    objectiveAm: "ለሰንበት ት/ቤት ተማሪዎች፣ ወጣቶችና አባላት መንፈሳዊ፣ ሥነ-ልቦናዊና ማኅበራዊ ምክር መስጠት፤ በፈተናና በጭንቀት ውስጥ ያሉትን በጸሎትና በምክር ማጽናት፤ ጤናማ ክርስቲያናዊ ሕይወትን ማጎልበት።",
    objectiveEn: "To deliver confidential pastoral, psycho-social, and spiritual guidance to youth, couples, and distressed believers.",
    subSectionsAm: ["የመረጃ ማደራጃ ንዑስ ክፍል", "የባለሙያዎች ንዑስ ክፍል", "የክትትል ንዑስ ክፍል"],
    subSectionsEn: ["Information & Intake Unit", "Counseling Professionals", "Follow-up & Support Unit"],
    icon: "Sparkles",
    color: "from-teal-600/30 to-teal-900/30",
    tasksAm: [
      "ምስጢራዊነቱ የተጠበቀ የግልና የቡድን መንፈሳዊና ሥነ-ልቦናዊ የምክር አገልግሎት መስጠት",
      "የወጣቶችን የሕይወት ጎዳና፣ የትምህርትና የሥራ ውጣ ውረድ የተመለከቱ የማማከር መድረኮችን ማዘጋጀት",
      "የክርስትና ጋብቻና የቤተሰብ ሕይወት ስልጠናዎችንና ሴሚናሮችን ማዘጋጀት",
      "ከአእምሮ ጤናና ሱሰኝነት ጋር የተያያዙ ችግሮችን ከባለሙያዎች ጋር በመተባበር መደገፍ",
      "ከአባላቱ የንስሐ አባቶች ጋር በመቀናጀት መንፈሳዊ መፍትሔዎችን ማመቻቸት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የመረጃ ማደራጃ ንዑስ ክፍል",
        nameEn: "Intake & Intake Coordination",
        dutiesAm: [
          "የምክር ፈላጊዎችን መረጃ በሚስጥር መመዝገብ",
          "ከአማካሪዎችና ካህናት ጋር የቀጠሮ መርሃ ግብር ማውጣት",
          "የምክር ክፍሎችን ምቹና ሰላማዊ ማድረግ"
        ]
      },
      {
        nameAm: "የባለሙያዎች ንዑስ ክፍል",
        nameEn: "Specialist Advisors Unit",
        dutiesAm: [
          "መንፈሳዊ፣ ሥነ-ልቦናዊና ማኅበራዊ የምክር ክፍለ ጊዜዎችን መምራት",
          "የጋብቻና የቤተሰብ ሕይወት መማክርት መድረኮችን ማዘጋጀት",
          "የችግር አፈታት ክህሎት ስልጠናዎችን መስጠት"
        ]
      },
      {
        nameAm: "የክትትል ንዑስ ክፍል",
        nameEn: "Post-Counseling Follow-up",
        dutiesAm: [
          "የተመካሪዎችን መንፈሳዊ እድገትና ደህንነት መከታተል",
          "የንስሐ ሕይወታቸውን ማጠናከር",
          "ወቅታዊ የግምገማ ሪፖርቶችን ማዘጋጀት"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "counsel-1", titleAm: "ምስጢራዊ የግል መንፈሳዊ የምክር ክፍለ ጊዜዎችን ማስተናገድ", status: "completed", subUnitAm: "የባለሙያዎች ንዑስ ክፍል", articleRef: "አንቀጽ 8.1" },
      { id: "counsel-2", titleAm: "የወጣቶች የሕይወት ውሳኔና የሥነ-ልቦና ማማከር አውደ ጥናት ማዘጋጀት", status: "in_progress", subUnitAm: "የባለሙያዎች ንዑስ ክፍል", articleRef: "አንቀጽ 8.2" },
      { id: "counsel-3", titleAm: "የኦርቶዶክሳዊ ጋብቻና የቤተሰብ ሕይወት ሴሚናር ማዘጋጀት", status: "planned", subUnitAm: "የባለሙያዎች ንዑስ ክፍል", articleRef: "አንቀጽ 8.3" },
      { id: "counsel-4", titleAm: "የምክር ፈላጊዎች የክትትልና የንስሐ አባቶች ትስስር ማጠናከር", status: "planned", subUnitAm: "የክትትል ንዑስ ክፍል", articleRef: "አንቀጽ 8.5" }
    ]
  },
  {
    id: "members",
    nameAm: "የአባላትና ጉባኤያት ማስተባበርያ",
    nameEn: "Members & Assemblies Coordination",
    descAm: "የአባላትን ምዝገባ፣ መረጃ፣ ክትትልና ሳምንታዊ እንዲሁም ወርሃዊ ጉባኤያትን በሥርዓት የሚያስተባብር ክፍል።",
    descEn: "Maintains membership records, tracks member spiritual growth, and organizes weekly and monthly spiritual assemblies.",
    category: "service",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 9",
    objectiveAm: "የአባላትን ምዝገባ፣ መረጃና ክትትል በዘመናዊ አሠራር ማደራጀት፤ ሳምንታዊና ወርሃዊ ጉባኤያትን ማስተባበር፤ የአባላትን መንፈሳዊና ማኅበራዊ አንድነት ማጠናከር።",
    objectiveEn: "To register, archive, monitor attendance, and coordinate weekly parish assemblies and fellowship events.",
    subSectionsAm: ["የአባላት መረጃና መዛግብት", "የአባላት ክትትል ንዑስ ክፍል", "የጉባኤያት ማስተባበርያ", "የማኅበራዊ አገልግሎት"],
    subSectionsEn: ["Membership Registry", "Follow-up & Visitation", "Assemblies Coordination", "Social & Welfare Support"],
    icon: "Users",
    color: "from-indigo-600/30 to-indigo-900/30",
    tasksAm: [
      "የነባርና አዲስ አባላትን መረጃ በዲጂታል ዳታቤዝ መመዝገብ፣ መታወቂያ ካርድ ማዘጋጀትና ማደራጀት",
      "ሳምንታዊና ወርሃዊ የሰንበት ት/ቤት አባላት ጉባኤያትን ሥርዓት ባለው መንገድ ማስተባበር",
      "ከአገልግሎት የቀሩና የደከሙ አባላትን በስልክና በአካል በመጎብኘት ወደ አገልግሎት መመለስ",
      "በአባላት መካከል መረዳዳትና ማኅበራዊ ፍቅር እንዲጎለብት (በደስታና በኀዘን ጊዜ) ማስተባበር",
      "የአባላትን የዲሲፕሊንና የአገልግሎት ተነሳሽነት መከታተልና ማበረታታት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የአባላት መረጃና መዛግብት",
        nameEn: "Membership Records Unit",
        dutiesAm: [
          "የአባላት ዝርዝር መረጃዎችን በዲጂታል ዳታቤዝ መያዝ",
          "የአባልነት መታወቂያ ካርዶችን ማዘጋጀትና ማደስ",
          "የአባላት አድራሻና ሁኔታ ለውጦችን ማዘመን"
        ]
      },
      {
        nameAm: "የአባላት ክትትል ንዑስ ክፍል",
        nameEn: "Member Follow-up Unit",
        dutiesAm: [
          "በጉባኤያት ላይ የአባላትን መገኘት መከታተል",
          "ከአገልግሎት የራቁትን በስልክና በአካል መጠየቅ",
          "ወደ ማኅበሩ ለመመለስ የውይይት መድረክ ማመቻቸት"
        ]
      },
      {
        nameAm: "የጉባኤያት ማስተባበርያ",
        nameEn: "Assemblies Unit",
        dutiesAm: [
          "የስብሰባ አዳራሽና መቀመጫዎችን ለአባላት ማመቻቸት",
          "የጉባኤ ሥርዓትና ጸጥታን መጠበቅ",
          "የእንግዶችና አዳዲስ መጤዎች አቀባበል መምራት"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "mem-1", titleAm: "የአዲስ አባላት ምዝገባ ዳታቤዝ ማደራጀትና ዲጂታል መታወቂያ ማውጣት", status: "completed", subUnitAm: "የአባላት መረጃና መዛግብት", articleRef: "አንቀጽ 9.1" },
      { id: "mem-2", titleAm: "ሳምንታዊ የጠቅላላ አባላት ጉባኤ አዳራሽና ሥርዓት ማስተባበር", status: "in_progress", subUnitAm: "የጉባኤያት ማስተባበርያ", articleRef: "አንቀጽ 9.2" },
      { id: "mem-3", titleAm: "ከአገልግሎት ለራቁ አባላት የቤት ለቤት የመጠየቅና የማጽናት ጉብኝት ማካሄድ", status: "in_progress", subUnitAm: "የአባላት ክትትል ንዑስ ክፍል", articleRef: "አንቀጽ 9.3" },
      { id: "mem-4", titleAm: "የአባላት የጋራ የፍቅር ማዕድና የማኅበራዊ ግንኙነት ቀን ማዘጋጀት", status: "planned", subUnitAm: "የማኅበራዊ አገልግሎት", articleRef: "አንቀጽ 9.4" }
    ]
  },
  {
    id: "children",
    nameAm: "ሕጻናት ክፍል",
    nameEn: "Children's Sunday School",
    descAm: "ሕፃናትን ከጨቅላነት ጀምሮ በኦርቶዶክሳዊ እምነትና ምግባር፣ በመጽሐፍ ቅዱስ ታሪኮች፣ በመዝሙርና በሥርዓት የሚያንጽ ተወዳጅ ክፍል።",
    descEn: "Nurtures the young in Orthodox faith, scripture stories, hymnody, and Christian manners through age-appropriate curricula.",
    category: "education",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 10",
    objectiveAm: "ሕፃናትን ከጨቅላነታቸው ጀምሮ በኦርቶዶክሳዊ ተዋሕዶ እምነት፣ በጸሎት፣ በመጽሐፍ ቅዱስ ታሪኮች፣ በመዝሙርና በሥርዓት ኮትኩቶ ማሳደግ፤ ለቤተክርስቲያንና ለሀገር ብቁ ዜጋ ማድረግ።",
    objectiveEn: "To nurture children from infancy in Orthodox doctrine, biblical stories, liturgical praise, and holy virtues.",
    subSectionsAm: ["የማቴዎስ ምድብ (4-9 ዓመት)", "የማርቆስ ምድብ (10-13 ዓመት)", "የሉቃስ ምድብ (14-18 ዓመት)", "የመረጃና መዛግብት", "የሥነ ጥበባት ንዑስ ክፍል", "የወላጅ ኮሚቴ"],
    subSectionsEn: ["Matthew Division (Ages 4-9)", "Mark Division (Ages 10-13)", "Luke Division (Ages 14-18)", "Records Unit", "Fine Arts Unit", "Parents Committee"],
    icon: "Baby",
    color: "from-amber-500/30 to-rose-700/30",
    tasksAm: [
      "ሕፃናትን በዕድሜያቸው ከፋፍሎ (ማቴዎስ፣ ማርቆስ፣ ሉቃስ) ተስማሚ የትምህርትና የመዝሙር ሥርዓት መስጠት",
      "መንፈሳዊ ሥዕላትን፣ ተረቶችን፣ ጨዋታዎችንና ተግባራዊ ትምህርቶችን ማካሄድ",
      "ከወላጆች ጋር ወርሃዊ የግንኙነት መድረክ በመፍጠር የልጆችን መንፈሳዊ እድገት መከታተል",
      "የሕፃናት የበዓላት ዝግጅቶችን፣ የመዝሙርና የጥበብ ቀናትን ማዘጋጀት",
      "ለሕፃናት ምቹ፣ ሳቢና ንጹሕ የመማሪያ አካባቢና ቁሳቁሶችን ማሟላት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የማቴዎስ ምድብ (ከ4 - 9 ዓመት)",
        nameEn: "Matthew Division (Early Childhood)",
        dutiesAm: [
          "የፊደል፣ የጸሎትና የመሠረታዊ ክርስትና ታሪኮችን ማስተማር",
          "በስዕልና በቀለም ማስተማሪያዎች መንፈሳዊ ትምህርት መስጠት",
          "የሕፃናት መዝሙራትንና ማኅበራዊ ሥነ-ምግባርን ማለማመድ"
        ]
      },
      {
        nameAm: "የማርቆስ ምድብ (ከ10 - 13 ዓመት)",
        nameEn: "Mark Division (Junior Age)",
        dutiesAm: [
          "የመጽሐፍ ቅዱስ ጥናትና የቤተክርስቲያን ታሪክ ትምህርቶች መስጠት",
          "የቅዳሴና የጸሎት ሥርዓቶችን በተግባር ማስተማር",
          "የመዝሙርና የከበሮ አመታት ስልጠና መስጠት"
        ]
      },
      {
        nameAm: "የሉቃስ ምድብ (ከ14 - 18 ዓመት)",
        nameEn: "Luke Division (Teenagers & Adolescents)",
        dutiesAm: [
          "የዶግማ፣ የቀኖናና የሥነ-ምግባር ጥልቅ ትምህርት መስጠት",
          "የወጣትነት ፈተናዎችን በሃይማኖት የመወጣት ውይይቶች ማካሄድ",
          "ለሰንበት ት/ቤት አገልግሎት ዝግጁ ማድረግ"
        ]
      },
      {
        nameAm: "የወላጅ ኮሚቴ",
        nameEn: "Parents Liaison Committee",
        dutiesAm: [
          "ከወላጆች ጋር ወርሃዊ የትብብር ስብሰባ ማካሄድ",
          "የልጆችን የቤት ውስጥ ክትትል ማስተባበር",
          "የልጆች ፕሮግራሞችን በገንዘብና በቁሳቁስ መደገፍ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "child-1", titleAm: "የ2026/2027 ዓ.ም አዲስ ሕፃናት ተማሪዎች ምዝገባና ምደባ ማጠናቀቅ", status: "completed", subUnitAm: "የመረጃና መዛግብት", articleRef: "አንቀጽ 10.1" },
      { id: "child-2", titleAm: "ለማቴዎስ፣ ማርቆስና ሉቃስ ክፍሎች የመማሪያ መጻሕፍትና የቀለም ደብተሮች ማዘጋጀት", status: "in_progress", subUnitAm: "የማቴዎስ ምድብ (4-9 ዓመት)", articleRef: "አንቀጽ 10.2" },
      { id: "child-3", titleAm: "የሕፃናትና የወላጆች የጋራ የምስጋናና የመዝሙር ቀን ማካሄድ", status: "planned", subUnitAm: "የወላጅ ኮሚቴ", articleRef: "አንቀጽ 10.3" },
      { id: "child-4", titleAm: "የሕፃናት መንፈሳዊ ሥዕላትና ተውኔት ውድድር ማዘጋጀት", status: "planned", subUnitAm: "የሥነ ጥበባት ንዑስ ክፍል", articleRef: "አንቀጽ 10.4" }
    ]
  },
  {
    id: "abnet",
    nameAm: "የአብነት ትምህርት ክፍል",
    nameEn: "Traditional Abnet School",
    descAm: "ጥንታዊውን የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ የአብነት ትምህርት (ንባብ፣ ዜማ፣ ጾመ ድጓ፣ አቋቋም እና ቅኔ) ለቀጣዩ ትውልድ ጠብቆ የሚያስተላልፍ።",
    descEn: "Preserves the millennium-old traditional Ethiopian Orthodox schooling: Ge'ez reading, Zema, Digua chant, Aquaquam, and Qene poetry.",
    category: "education",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 11",
    objectiveAm: "ጥንታዊውንና ታላቁን የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን የአብነት ትምህርት (ንባብ፣ ዜማ፣ ጾመ ድጓ፣ አቋቋም፣ ቅኔ) ማስተማርና መጠበቅ፤ ተተኪ ዲያቆናትና መምህራንን ማፍራት።",
    objectiveEn: "To preserve traditional Ethiopian Orthodox clerical heritage: Ge'ez reading, Zema, Digua, Aquaquam choreography, and Qene poetry.",
    subSectionsAm: ["የሥርዓተ ትምህርት አተገባበር", "የመምህራንና አስቀጻዮች ምደባ", "የተማሪዎችና አባላት ክትትል", "የሕጻናት አብነት ክትትል"],
    subSectionsEn: ["Curriculum Execution", "Master Teachers Placement", "Student Follow-up & Roster", "Children Traditional Primers"],
    icon: "GraduationCap",
    color: "from-emerald-700/30 to-teal-900/30",
    tasksAm: [
      "የንባብና የዳዊት ትምህርት ለጀማሪዎችና ለሕፃናት ማስተማር",
      "የቅዱስ ያሬድን የዜማ መጻሕፍት (ጾመ ድጓ፣ ምዕራፍ፣ ዝማሬ፣ መዋሥዕት) ማስተማር",
      "የአቋቋም (የማኅሌት) ሥርዓትና የከበሮ አመታት ስልጠና መስጠት",
      "የግዕዝ ቋንቋና የቅኔ ትምህርትን ለደቀ መዛሙርት ማስተማር",
      "ብቁ የአብነት መምህራንን መቅጠር፣ ማስተዳደርና የአብነት ተማሪዎችን ማበረታታት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የሥርዓተ ትምህርት አተገባበር",
        nameEn: "Curriculum Implementation",
        dutiesAm: [
          "የንባብ፣ የዜማና የቅኔ ትምህርትን በባህላዊው ሥርዓት መምራት",
          "የደቀ መዛሙርትን የንባብና የዜማ አቁማዳ መገምገም",
          "ለዲቁናና ቅስና ማዕረግ የሚያበቁ ዝግጅቶችን ማስተባበር"
        ]
      },
      {
        nameAm: "የመምህራንና አስቀጻዮች ምደባ",
        nameEn: "Teachers & Tutors Assignment",
        dutiesAm: [
          "ብቁ የአብነት መምህራንን (የዜማ፣ የቅኔ፣ የዳዊት) ማስተዳደር",
          "የመምህራን ክፍያና የመኖሪያ ድጋፍን መከታተል",
          "ረዳት አስቀጻዮችን ለጀማሪ ተማሪዎች መመደብ"
        ]
      },
      {
        nameAm: "የሕጻናት አብነት ክትትል",
        nameEn: "Children Traditional Literacy",
        dutiesAm: [
          "ሕፃናትን የፊደል፣ የአቡጊዳና የንባብ ትምህርት ማስተማር",
          "የዳዊት ንባብ ልምምድን በየቀኑ ማካሄድ",
          "በበዓላት ላይ የሕፃናት የአብነት ንባብ ዝግጅት ማቅረብ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "abnet-1", titleAm: "የቀንና የማታ የዳዊት ንባብና የዜማ ክፍለ ጊዜዎችን ማስተባበር", status: "completed", subUnitAm: "የሥርዓተ ትምህርት አተገባበር", articleRef: "አንቀጽ 11.1" },
      { id: "abnet-2", titleAm: "የጾመ ድጓና የማኅሌት አቋቋም ሳምንታዊ ስልጠና መስጠት", status: "in_progress", subUnitAm: "የመምህራንና አስቀጻዮች ምደባ", articleRef: "አንቀጽ 11.2" },
      { id: "abnet-3", titleAm: "የግዕዝ ቋንቋና የሰዋስው ትምህርት ለተማሪዎች መስጠት", status: "in_progress", subUnitAm: "የሥርዓተ ትምህርት አተገባበር", articleRef: "አንቀጽ 11.4" },
      { id: "abnet-4", titleAm: "የአብነት ተማሪዎች ዓመታዊ የምረቃና የዲቁና ዝግጅት ማካሄድ", status: "planned", subUnitAm: "የተማሪዎችና አባላት ክትትል", articleRef: "አንቀጽ 11.5" }
    ]
  },
  {
    id: "arts",
    nameAm: "ሥነጥበባትና ቤተመጻሕፍት ክፍል",
    nameEn: "Arts, Drama & Library",
    descAm: "ኦርቶዶክሳዊ መንፈሳዊ ሥዕላትን፣ ተውኔቶችን፣ ግጥሞችን የሚያዘጋጅና ምዕመናን መንፈሳዊ መጻሕፍትን የሚያነቡበትን ቤተ-መጻሕፍት የሚያስተዳድር።",
    descEn: "Creates spiritual iconography, sacred drama, poetry, and oversees the parish library of theological and historical literature.",
    category: "creative",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 12",
    objectiveAm: "ኦርቶዶክሳዊ መንፈሳዊ ሥነ-ጥበባትን (ቴአትር፣ ግጥም፣ ሥነ-ስዕል) ለስብከተ ወንጌል መጠቀም፤ የሰንበት ት/ቤቱን ቤተ-መጻሕፍት በማደራጀት የንባብና የምርምር ባህልን ማሳደግ።",
    objectiveEn: "To utilize sacred drama, poetry, and iconography for evangelism, and cultivate scholarship through the parish library.",
    subSectionsAm: ["የኪነ ጥበብና ሥነ ጽሑፍ", "የሥዕል ትምህርት ንዑስ ክፍል", "የጥበበ እድና ቅርጻቅርጽ", "የቤተ መጻሕፍት ንዑስ ክፍል"],
    subSectionsEn: ["Drama & Literature", "Iconography & Painting", "Handicrafts & Sculpture", "Parish Library Unit"],
    icon: "Palette",
    color: "from-pink-600/30 to-pink-900/30",
    tasksAm: [
      "በበዓላትና በልዩ ጉባኤያት የሚቀርቡ ኦርቶዶክሳዊ መንፈሳዊ ተውኔቶችንና ግጥሞችን ማዘጋጀት",
      "የኦርቶዶክሳዊ ቅዱሳት ሥዕላት (Iconography) ትምህርትና ኤግዚቢሽኖችን ማዘጋጀት",
      "የሰንበት ት/ቤቱን ቤተ-መጻሕፍት በሃይማኖታዊ፣ ታሪካዊና ማጣቀሻ መጻሕፍት ማበልጸግ",
      "የቤተ-መጻሕፍት የንባብና የብድር አገልግሎትን በዲጂታል ካታሎግ ማዘመን",
      "የአባላትን የጥበበ ዕድ (እደ-ጥበብ) እና የፈጠራ ችሎታዎችን ማጎልበት"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የኪነ ጥበብና ሥነ ጽሑፍ ንዑስ ክፍል",
        nameEn: "Sacred Drama & Literature Unit",
        dutiesAm: [
          "መንፈሳዊ ተውኔቶችንና ቴአትሮችን መድረስና ማዘጋጀት",
          "የግጥምና መነባንብ ዝግጅቶችን ለበዓላት ማቅረብ",
          "የተዋንያን ሥነ-ምግባርና የአቀራረብ ክህሎት ማጎልበት"
        ]
      },
      {
        nameAm: "የሥዕል ትምህርት ንዑስ ክፍል",
        nameEn: "Iconography & Painting Unit",
        dutiesAm: [
          "የኦርቶዶክስ ተዋሕዶ የሥዕል ቀኖና ትምህርት መስጠት",
          "መንፈሳዊ ሥዕላትን መሳልና ኤግዚቢሽን ማዘጋጀት",
          "የክፍላት የጌጥና የማስተዋወቂያ ስራዎችን ማከናወን"
        ]
      },
      {
        nameAm: "የቤተ መጻሕፍት ንዑስ ክፍል",
        nameEn: "Parish Library Unit",
        dutiesAm: [
          "የመጻሕፍት ካታሎግና የዲጂታል ምዝገባ ማደራጀት",
          "የንባብ ክፍልን ለተማሪዎችና ተመራማሪዎች ክፍት ማድረግ",
          "የመጻሕፍት ብድርና ጥበቃ ሥርዓትን መቆጣጠር"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "art-1", titleAm: "ለሚቀጥለው የደብር ንግሥ በዓል መንፈሳዊ ተውኔትና ድራማ ማዘጋጀት", status: "completed", subUnitAm: "የኪነ ጥበብና ሥነ ጽሑፍ", articleRef: "አንቀጽ 12.1" },
      { id: "art-2", titleAm: "የቤተ መጻሕፍት መጻሕፍትን ዲጂታል ካታሎግ ማዘጋጀትና ማደራጀት", status: "in_progress", subUnitAm: "የቤተ መጻሕፍት ንዑስ ክፍል", articleRef: "አንቀጽ 12.3" },
      { id: "art-3", titleAm: "የኦርቶዶክሳዊ ቅዱሳት ሥዕላት (Iconography) ስልጠና መጀመር", status: "planned", subUnitAm: "የሥዕል ትምህርት ንዑስ ክፍል", articleRef: "አንቀጽ 12.2" },
      { id: "art-4", titleAm: "የሰንበት ት/ቤት ተማሪዎች የንባብና የጥናት ሳምንት ማካሄድ", status: "planned", subUnitAm: "የቤተ መጻሕፍት ንዑስ ክፍል", articleRef: "አንቀጽ 12.4" }
    ]
  },
  {
    id: "institutions",
    nameAm: "የተቋማት አስተዳደር ክፍል",
    nameEn: "Institutions Administration",
    descAm: "በሰንበት ትምህርት ቤቱ ሥር የሚገኙ ማዕከላት፣ አዳራሾችና ተቋማት አገልግሎታቸውን በተቀላጠፈ ሁኔታ እንዲሰጡ የሚያስተባብር ክፍል።",
    descEn: "Directs facilities, Sunday school halls, technical operations, and infrastructure safety.",
    category: "leadership",
    articleRef: "ምዕራፍ 6፣ አንቀጽ 13",
    objectiveAm: "በሰንበት ት/ቤቱ ሥር የሚገኙ ማዕከላትን፣ አዳራሾችን፣ የስብሰባ ክፍሎችንና ንብረቶችን ማስተዳደር፤ የጥናትና ምርምር ማዕከልን በማጠናከር የተቋማዊ አቅም ግንባታን ማረጋገጥ።",
    objectiveEn: "To administer facilities, Sunday School assembly halls, technical equipment, and steer the research center.",
    subSectionsAm: ["የአስተዳደርና ሒሳብ ንዑስ ክፍል", "የእቅድና ፕሮጀክት ንዑስ ክፍል", "የአቅም ማጎልበቻ ንዑስ ክፍል", "የጥናትና ምርምር ማዕከል"],
    subSectionsEn: ["Facilities Admin & Finance", "Planning & Projects", "Capacity Building", "Research Center"],
    icon: "Building2",
    color: "from-cyan-600/30 to-cyan-900/30",
    tasksAm: [
      "የሰንበት ት/ቤት አዳራሾችና የስብሰባ ክፍሎች ለአገልግሎት ዝግጁና ንጹሕ መሆናቸውን ማረጋገጥ",
      "የመብራት፣ የድምጽና የቴክኒክ መሣሪያዎች ደህንነትና ጥገናን መከታተል",
      "የተቋማት የሥራ ዕቅድና ፕሮጀክቶች በጊዜ ሰሌዳ መሠረት እንዲፈጸሙ ማስተባበር",
      "የጥናትና ምርምር ማዕከል በማቋቋም የሰንበት ት/ቤቱን የወደፊት እድገት ጥናቶች ማካሄድ",
      "ለአገልጋዮችና ለተማሪዎች ምቹ የአገልግሎት ከባቢን መፍጠር"
    ],
    subUnitsDetailed: [
      {
        nameAm: "የአስተዳደርና ሒሳብ ንዑስ ክፍል",
        nameEn: "Facilities & Facilities Administration",
        dutiesAm: [
          "የአዳራሾችና የመማሪያ ክፍሎች ጽዳትና ሥርዓት ቁጥጥር",
          "የተቋማት መገልገያ ቁሳቁሶችን በአግባቡ ማስተዳደር",
          "የአዳራሽ አገልግሎት ፈቃድና የፕሮግራም ሰሌዳ መያዝ"
        ]
      },
      {
        nameAm: "የእቅድና ፕሮጀክት ንዑስ ክፍል",
        nameEn: "Projects & Maintenance Unit",
        dutiesAm: [
          "የተቋማትን ጥገናና እድሳት ፕሮጀክቶች ማቀድ",
          "የድምጽ፣ የመብራትና የቴክኒክ እቃዎች ጥገና ማካሄድ",
          "የተቋማት ማስፋፊያ ዕቅዶችን መከታተል"
        ]
      },
      {
        nameAm: "የጥናትና ምርምር ማዕከል",
        nameEn: "Research & Documentation Center",
        dutiesAm: [
          "ስለ ሰንበት ት/ቤቱ ታሪክና የወደፊት አቅጣጫ ጥናቶችን ማካሄድ",
          "የተቋማት አሠራር ማሻሻያ ጥናታዊ ጽሑፎችን ማቅረብ",
          "ጠቃሚ የጥናት ሰነዶችንና ዳታዎችን ማሰባሰብ"
        ]
      }
    ],
    defaultActionTasks: [
      { id: "inst-1", titleAm: "የዋናው አዳራሽና የመማሪያ ክፍሎች የድምጽና የመብራት ስርዓት ጥገና ማካሄድ", status: "completed", subUnitAm: "የአስተዳደርና ሒሳብ ንዑስ ክፍል", articleRef: "አንቀጽ 13.2" },
      { id: "inst-2", titleAm: "የተቋማት ሳምንታዊ የጽዳትና የደህንነት ፍተሻ ማከናወን", status: "in_progress", subUnitAm: "የአስተዳደርና ሒሳብ ንዑስ ክፍል", articleRef: "አንቀጽ 13.1" },
      { id: "inst-3", titleAm: "የጥናትና ምርምር ማዕከል አመታዊ ጥናታዊ ጥናት መጀመር", status: "planned", subUnitAm: "የጥናትና ምርምር ማዕከል", articleRef: "አንቀጽ 13.4" },
      { id: "inst-4", titleAm: "የሰንበት ት/ቤት አዳራሾች የዲጂታል ፕሮግራም ማስያዣ ስርዓት ማመቻቸት", status: "planned", subUnitAm: "የእቅድና ፕሮጀክት ንዑስ ክፍል", articleRef: "አንቀጽ 13.3" }
    ]
  }
];
