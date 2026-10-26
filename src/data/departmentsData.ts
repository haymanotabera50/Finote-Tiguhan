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
      {
        id: "dev-1",
        titleAm: "የልማት መደብሮችንና ሱቆችን ማደራጀትና ማስተካከል",
        metric: "በቁጥር",
        target: "2 ሱቆች",
        monthTiming: "መስከረም - ጥቅምት",
        budget: "20,000 ብር",
        subUnitAm: "ሱቅ አስተዳደር",
        status: "completed"
      },
      {
        id: "dev-2",
        titleAm: "የልማት እቃዎችን በጅምላ መግዛትና ማቅረብ",
        metric: "ዙር",
        target: "12 ዙር",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "500,000 ብር",
        subUnitAm: "የግዥ ክፍል",
        status: "in_progress"
      },
      {
        id: "dev-3",
        titleAm: "የልማት እቃዎች የዕለት ሽያጭ ማከናወንና የሽያጭ ሶፍትዌር መዘርጋት",
        metric: "ሽያጭ",
        target: "ዕለታዊ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ገቢ 1,200,000",
        subUnitAm: "የሽያጭ ሰራተኞች",
        status: "in_progress"
      },
      {
        id: "dev-4",
        titleAm: "የጋርመንት ማሽነሪዎችን መጠገንና ማሟላት",
        metric: "በቁጥር",
        target: "5 ማሽኖች",
        monthTiming: "መስከረም",
        budget: "15,000 ብር",
        subUnitAm: "ቴክኒክ ቡድን",
        status: "completed"
      },
      {
        id: "dev-5",
        titleAm: "የሰንበት ት/ቤት ዩኒፎርም፣ ካባና አልባሳት በጋርመንቱ መስፋት",
        metric: "በቁጥር",
        target: "600 አልባሳት",
        monthTiming: "መስከረም - ሰኔ",
        budget: "ወጪ 180,000",
        subUnitAm: "ጋርመንት",
        status: "in_progress"
      },
      {
        id: "dev-6",
        titleAm: "የጋርመንት ምርቶችን ለውጭ ደንበኞች መሸጥ",
        metric: "ሽያጭ",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ገቢ 450,000",
        subUnitAm: "ግብይት",
        status: "in_progress"
      },
      {
        id: "dev-7",
        titleAm: "የመንፈሳዊ ጉዞዎች የትኬት ሽያጭ ማከናወን",
        metric: "ጉዞ",
        target: "3 ጉዞዎች",
        monthTiming: "ህዳር፣ ጥር፣ መጋቢት",
        budget: "ገቢ 600,000",
        subUnitAm: "የጉዞ ንዑስ ክፍል",
        status: "in_progress"
      },
      {
        id: "dev-8",
        titleAm: "የወርሃዊና የሩብ ዓመት የፋይናንስ ሪፖርት ማቅረብ",
        metric: "ሪፖርት",
        target: "12 ሪፖርት",
        monthTiming: "ወርሃዊ",
        budget: "-",
        subUnitAm: "ሒሳብ ሹም",
        status: "in_progress"
      }
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
      {
        id: "edu-1",
        titleAm: "የተዘጋጀውን ስርዓተ ትምህርት ማስገምገም እና ማጸደቅ",
        metric: "በቁጥር",
        target: "1",
        monthTiming: "መስከረም - ጥቅምት",
        budget: "-",
        subUnitAm: "ስርዓተ ትምህርት",
        status: "completed"
      },
      {
        id: "edu-2",
        titleAm: "ለስርዓተ ትምህርት አስፈላጊ የሆኑ የማስተማሪያ ጥራዞች ማዘጋጀት እና ማሳተም",
        metric: "በቁጥር",
        target: "ጥራዞች",
        monthTiming: "ህዳር",
        budget: "በጥናት",
        subUnitAm: "የህትመት ቡድን",
        status: "planned"
      },
      {
        id: "edu-3",
        titleAm: "የስርዓተ ትምህርት ትግበራ እቅድ መሠረት ክፍል ድልድል ማድረግ",
        metric: "በቁጥር",
        target: "ክፍላት",
        monthTiming: "ህዳር",
        budget: "-",
        subUnitAm: "አስተዳደር",
        status: "completed"
      },
      {
        id: "edu-4",
        titleAm: "ከመምህራን ጋር በመማር ማስተማር ዙሪያ ውይይት ማድረግ",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ህዳር",
        budget: "-",
        subUnitAm: "መምህራን አስተባባሪ",
        status: "completed"
      },
      {
        id: "edu-5",
        titleAm: "የትምህርት መርሐ ግብር መከታተያ እና መገምገሚያ ቅጾችን ማዘጋጀት",
        metric: "በቁጥር",
        target: "ቅጾች",
        monthTiming: "ህዳር",
        budget: "-",
        subUnitAm: "ክትትልና ግምገማ",
        status: "completed"
      },
      {
        id: "edu-6",
        titleAm: "በየምድቦቹ ላይ ተጠሪ የሚሆኑ የክፍል አባላትን መመደብ",
        metric: "በቁጥር",
        target: "ተጠሪዎች",
        monthTiming: "ህዳር",
        budget: "-",
        subUnitAm: "የምድባት አመራር",
        status: "completed"
      },
      {
        id: "edu-7",
        titleAm: "በየምድቦቹ ላይ መምህራንን መድቦ ትምህርት መስጠት",
        metric: "በቁጥር",
        target: "ሳምንታዊ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "መምህራን",
        status: "in_progress"
      },
      {
        id: "edu-8",
        titleAm: "የየምድቦቹን የጋራ የጸሎት መርሐ ግብር ማዘጋጀት",
        metric: "በቁጥር",
        target: "ወርሃዊ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "መንፈሳዊ ዘርፍ",
        status: "in_progress"
      },
      {
        id: "edu-9",
        titleAm: "ከክፍል ወደ ክፍል ለሚሸጋገሩ ተማሪዎች የምረቃ መርሐ ግብር ማዘጋጀት",
        metric: "በቁጥር",
        target: "1 ዝግጅት",
        monthTiming: "ሰኔ",
        budget: "በጥናት",
        subUnitAm: "የምርቃት ኮሚቴ",
        status: "planned"
      },
      {
        id: "edu-10",
        titleAm: "ከክፍላት ጋር በመነጋገር የስልጠና ፍላጎት ዳሰሳ መስራት",
        metric: "በቁጥር",
        target: "6 ክፍላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "15,000 ብር",
        subUnitAm: "ስልጠና ክፍል",
        status: "in_progress"
      },
      {
        id: "edu-11",
        titleAm: "ለሰንበት ትምህርት ቤት አባላት ልዩ ልዩ ስልጠናዎችን መስጠት",
        metric: "በቁጥር",
        target: "4 ዙር",
        monthTiming: "ህዳር፣ የካቲት፣ ግንቦት",
        budget: "10,000 ብር",
        subUnitAm: "ስልጠና ቡድን",
        status: "planned"
      },
      {
        id: "edu-12",
        titleAm: "የመርሐ ግብር መሪ ስልጠና መስጠት",
        metric: "በቁጥር",
        target: "2 ዙር",
        monthTiming: "ታህሳስ፣ ግንቦት",
        budget: "-",
        subUnitAm: "ስልጠና ቡድን",
        status: "planned"
      },
      {
        id: "edu-13",
        titleAm: "ለሀዘን መርሐ ግብር መምህር መድቦ ማስተማር",
        metric: "በቁጥር",
        target: "20 መርሐ ግብር",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "30,000 ብር",
        subUnitAm: "ማህበራዊ ትምህርት",
        status: "in_progress"
      },
      {
        id: "edu-14",
        titleAm: "የሚቀጠሩ መምህራንን መለየትና በቋሚነት መቅጠር",
        metric: "በቁጥር",
        target: "2 መምህራን",
        monthTiming: "ታህሳስ",
        budget: "በጥናት",
        subUnitAm: "አመራር",
        status: "planned"
      },
      {
        id: "edu-15",
        titleAm: "የአርብ የጸሎት መርሐ ግብር ላይ መምህር መድቦ ማስተማር",
        metric: "በቁጥር",
        target: "208 ክፍለ ጊዜ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "78,000 ብር",
        subUnitAm: "የጸሎት ዘርፍ",
        status: "in_progress"
      },
      {
        id: "edu-16",
        titleAm: "የሕማማት ሳምንታዊ የጸሎት መርሐ ግብር ላይ መምህር መድቦ ማስተማር",
        metric: "በቁጥር",
        target: "4 መርሐ ግብር",
        monthTiming: "መጋቢት",
        budget: "3,000 ብር",
        subUnitAm: "የጸሎት ዘርፍ",
        status: "planned"
      },
      {
        id: "edu-17",
        titleAm: "ምክረ አበው መርሐ ግብር ማዘጋጀት እና መምህር መድቦ ማስተማር",
        metric: "በቁጥር",
        target: "2 ዝግጅቶች",
        monthTiming: "በዓመቱ ውስጥ",
        budget: "15,000 ብር",
        subUnitAm: "የትምህርት ክፍል",
        status: "planned"
      },
      {
        id: "edu-18",
        titleAm: "ለተተኪ መምህራን ስልጠናዎችን መስጠት",
        metric: "በቁጥር",
        target: "16 ክፍለ ጊዜ",
        monthTiming: "ህዳር - የካቲት",
        budget: "24,000 ብር",
        subUnitAm: "ተተኪ አሰልጣኝ",
        status: "planned"
      },
      {
        id: "edu-19",
        titleAm: "ለነባር መምህራን አቅም ማጎልበቻ ስልጠናዎች መስጠት",
        metric: "በቁጥር",
        target: "2 ዙር",
        monthTiming: "ታህሳስ፣ ሚያዝያ",
        budget: "5,000 ብር",
        subUnitAm: "የአቅም ግንባታ",
        status: "planned"
      },
      {
        id: "edu-20",
        titleAm: "የመምህራን ጉባኤ በማዘጋጀት እና ልምድ ልውውጥ እንዲያረጉ ማድረግ",
        metric: "በቁጥር",
        target: "2 ጉባኤ",
        monthTiming: "ህዳር፣ የካቲት",
        budget: "2,000 ብር",
        subUnitAm: "አመራር",
        status: "planned"
      }
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
      {
        id: "apo-1",
        titleAm: "የሠራተኞች ጉባኤ አባላትን መዝገብ ማደስ እና ክትትል ማድረግ",
        metric: "በቁጥር",
        target: "12 ወራት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የሰራተኞች ጉባኤ",
        status: "in_progress"
      },
      {
        id: "apo-2",
        titleAm: "በጉባኤው ላይ ህይወታዊ ትምህርቶችን የሚሰጡ መምህራንን መመደብ",
        metric: "በቁጥር",
        target: "36 መምህራን",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "36,000 ብር",
        subUnitAm: "የትምህርት ቡድን",
        status: "in_progress"
      },
      {
        id: "apo-3",
        titleAm: "ልዩ ጉባኤያትን ማድረግና ምክረ አበው ማዘጋጀት",
        metric: "በቁጥር",
        target: "2 ጉባኤያት",
        monthTiming: "ህዳር፣ ሚያዝያ",
        budget: "6,000 ብር",
        subUnitAm: "የጉባኤ አስተባባሪ",
        status: "planned"
      },
      {
        id: "apo-4",
        titleAm: "የዓውደ ምህረት ጉባኤ መርሐግብር ማዘጋጀት",
        metric: "በቁጥር",
        target: "1 ታላቅ ጉባኤ",
        monthTiming: "መጋቢት",
        budget: "50,000 ብር",
        subUnitAm: "አውደ ምህረት",
        status: "planned"
      },
      {
        id: "apo-5",
        titleAm: "የቅድመ ጋብቻ እና ድህረ ጋብቻ ስልጠና ማስታወቅ፣ መመዝገብና ማሰጠት",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ህዳር፣ ግንቦት",
        budget: "16,000 ብር",
        subUnitAm: "የጋብቻ ትምህርት",
        status: "planned"
      },
      {
        id: "apo-6",
        titleAm: "በደቡብ ኦሞ እና አሪ ዞን የወንጌል ማስፋፊያ ፕሮጀክት ውጤታማነት ጥናት ማካሔድ",
        metric: "በቁጥር",
        target: "1 አጠቃላይ ጥናት",
        monthTiming: "መስከረም - ሚያዝያ",
        budget: "149,300 ብር",
        subUnitAm: "የስብከተ ወንጌል ፕሮጀክት",
        status: "in_progress"
      },
      {
        id: "apo-7",
        titleAm: "የደቡብ ኦሞ እና አሪ ዞን ፕሮጀክት ቀጣይ አካሔድ እና ገቢ ማሰባሰቢያ ንድፈ ሐሳብ ማዘጋጀት",
        metric: "በቁጥር",
        target: "1 ንድፈ ሐሳብ",
        monthTiming: "መስከረም - ሚያዝያ",
        budget: "-",
        subUnitAm: "የፕሮጀክት ቡድን",
        status: "in_progress"
      },
      {
        id: "apo-8",
        titleAm: "በዚህ ፕሮጀክት የሰለጠኑ ሰልጣኞችን መረጃ ማሰባሰብ እና በስልክ መደወል",
        metric: "በዙር",
        target: "9 ዙር",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "1,000 ብር",
        subUnitAm: "ክትትል ቡድን",
        status: "in_progress"
      },
      {
        id: "apo-9",
        titleAm: "የፕሮጀክት ነባር ሰልጣኞች የጋራ መሰባሰቢያና አፈጻጸም ግምገማ በማዕከል ማካሔድ",
        metric: "በቁጥር",
        target: "1 ጉባኤ",
        monthTiming: "መጋቢት",
        budget: "ከማህበረ ቅዱሳን ጋር",
        subUnitAm: "አጋርነት",
        status: "planned"
      },
      {
        id: "apo-10",
        titleAm: "በራሳቸው ተነሳሽነት ለሚመጡ አዳዲስ ተጠማቅያን ከትምህርት እስከ ቤተ ክርስቲያን ልጅነት ማግኘት ያለውን ሲስተም መዘርጋት",
        metric: "በቁጥር",
        target: "1 ሲስተም",
        monthTiming: "መስከረም - ጥቅምት",
        budget: "-",
        subUnitAm: "አዳዲስ አማንያን",
        status: "completed"
      },
      {
        id: "apo-11",
        titleAm: "በዓመት ሁለት ጊዜ የግንዛቤ ማስጨበጫ እንቅስቃሴ (Campaign) በማህበራዊ ሚዲያ ማድረግ",
        metric: "በዙር",
        target: "2 ዙር",
        monthTiming: "ህዳር፣ ግንቦት",
        budget: "ከሚዲያ ጋር",
        subUnitAm: "ሚዲያና ቅስቀሳ",
        status: "planned"
      },
      {
        id: "apo-12",
        titleAm: "አዳዲስ አማንያንን ወደ ክርስቶስ ማህበር መቀላቀል",
        metric: "ቁጥር",
        target: "5 ተጠማቅያን",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አዳዲስ አማንያን",
        status: "in_progress"
      },
      {
        id: "apo-13",
        titleAm: "ከምዕመናን ከትምህርተ ሃይማኖት ጋር ለሚነሱ ጥያቄዎች መልስ መስጠትና መምህራንን ማገናኘት",
        metric: "በቁጥር",
        target: "12 ወራት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "እቅበተ እምነት",
        status: "in_progress"
      },
      {
        id: "apo-14",
        titleAm: "የእቅበተ እምነት የምክረ አበው እና የፓናል ውይይት መርሐግብር ማዘጋጀት",
        metric: "በቁጥር",
        target: "2 ዝግጅቶች",
        monthTiming: "ታህሳስ፣ ግንቦት",
        budget: "6,000 ብር",
        subUnitAm: "እቅበተ እምነት",
        status: "planned"
      },
      {
        id: "apo-15",
        titleAm: "የመጽሐፍት ዳሰሳ ማዘጋጀትና መጽሐፍትን ለተሳታፊዎች በስጦታ መስጠት",
        metric: "በቁጥር",
        target: "2 መርሐግብር",
        monthTiming: "ጥር፣ ሰኔ",
        budget: "10,000 ብር",
        subUnitAm: "እቅበተ እምነት",
        status: "planned"
      },
      {
        id: "apo-16",
        titleAm: "የእቅበተ እምነት አጫጭር ጽሑፎችንና በራሪ ወረቀቶችን ማዘጋጀትና ማሰራጨት",
        metric: "በቁጥር",
        target: "እንደአስፈላጊነቱ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ህትመት ቡድን",
        status: "in_progress"
      },
      {
        id: "apo-17",
        titleAm: "የአቅም ግንባታ ወርሃዊ ጸሎትና ውይይት ማካሄድ",
        metric: "በቁጥር",
        target: "12 ወራት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አቅም ግንባታ",
        status: "in_progress"
      }
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
      {
        id: "choir-1",
        titleAm: "ለየምድባቱ የትግበራ እቅድ ማዘጋጀት",
        metric: "በቁጥር",
        target: "ምድባት",
        monthTiming: "ጥቅምት",
        budget: "-",
        subUnitAm: "አመራር",
        status: "completed"
      },
      {
        id: "choir-2",
        titleAm: "በወጣንያን ምድብ የሚገኙ አባላትን ወደ ማእከላውያን 1 ማሸጋገር",
        metric: "ቁጥር",
        target: "40",
        monthTiming: "ሰኔ",
        budget: "-",
        subUnitAm: "የትምህርት ቡድን",
        status: "planned"
      },
      {
        id: "choir-3",
        titleAm: "የክፍሉን አገልግሎት የሚያግዝ ሲስተም መዘርጋት",
        metric: "ቁጥር",
        target: "2",
        monthTiming: "ህዳር - ታህሳስ",
        budget: "-",
        subUnitAm: "አይቲና መረጃ",
        status: "in_progress"
      },
      {
        id: "choir-4",
        titleAm: "በየምድቡ ለሚገኙ አባላት ትምህርት መስጠት እና መከታተል",
        metric: "ተከታታይ",
        target: "ምድባት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አስጠኚዎች",
        status: "in_progress"
      },
      {
        id: "choir-5",
        titleAm: "በመዝሙር ስርአተ ትምህርቱ መሰረት ግምገማ ማድረግ",
        metric: "ቁጥር",
        target: "3",
        monthTiming: "ታህሳስ፣ የካቲት፣ ግንቦት",
        budget: "-",
        subUnitAm: "ግምገማ ኮሚቴ",
        status: "planned"
      },
      {
        id: "choir-6",
        titleAm: "ለአባላት ስለስርአተ ትምህርቱ ግንዛቤ መስጠት",
        metric: "ቁጥር",
        target: "2",
        monthTiming: "ጥቅምት፣ የካቲት",
        budget: "-",
        subUnitAm: "አመራር",
        status: "planned"
      },
      {
        id: "choir-7",
        titleAm: "በየምድባቱ ከአባላት ጋር የውይይት መርሐ ግብር ማዘጋጀት",
        metric: "ቁጥር",
        target: "3",
        monthTiming: "ጥቅምት፣ ጥር፣ ግንቦት",
        budget: "-",
        subUnitAm: "አመራር",
        status: "planned"
      },
      {
        id: "choir-8",
        titleAm: "በየምድባቱ የሚጠፉ አባላትን ክትትል ማድረግ መደወል",
        metric: "ስልክ ጥሪ",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "1,000 ብር",
        subUnitAm: "ክትትል ቡድን",
        status: "in_progress"
      },
      {
        id: "choir-9",
        titleAm: "የዜማ መሳሪያ ስርዓተ ትምህርት ማዘጋጀት (በገና ፤ መሰንቆ)",
        metric: "ቁጥር",
        target: "2",
        monthTiming: "ጥቅምት",
        budget: "-",
        subUnitAm: "የዜማ መሳሪያ ተቋም",
        status: "planned"
      },
      {
        id: "choir-10",
        titleAm: "የተቋም መመሪያ ማዘጋጀት",
        metric: "ቁጥር",
        target: "1",
        monthTiming: "ግንቦት",
        budget: "-",
        subUnitAm: "አመራር",
        status: "planned"
      },
      {
        id: "choir-11",
        titleAm: "የዜማ መሳሪያ እድሳት ማከናወን (መሰንቆ ፤ በገና)",
        metric: "ጥገና",
        target: "መሰንቆ/በገና",
        monthTiming: "ጥቅምት",
        budget: "19,500 ብር",
        subUnitAm: "ንብረት ክፍል",
        status: "planned"
      },
      {
        id: "choir-12",
        titleAm: "በስርዓተ ትምህርቱ መሰረት የጀማርያን የበገና ትምህርት መስጠት",
        metric: "ቁጥር",
        target: "1 ዙር",
        monthTiming: "የካቲት",
        budget: "-",
        subUnitAm: "የበገና መምህር",
        status: "planned"
      },
      {
        id: "choir-13",
        titleAm: "በስርዓተ ትምህርቱ መሰረት የጀማርያን የመሰንቆ ትምህርት መስጠት",
        metric: "ቁጥር",
        target: "1 ዙር",
        monthTiming: "የካቲት",
        budget: "-",
        subUnitAm: "የመሰንቆ መምህር",
        status: "planned"
      },
      {
        id: "choir-14",
        titleAm: "አድቫንስድ የበገና መሳሪያ ትምህርት መስጠት",
        metric: "ቁጥር",
        target: "1 ዙር",
        monthTiming: "ህዳር",
        budget: "-",
        subUnitAm: "የበገና መምህር",
        status: "planned"
      },
      {
        id: "choir-15",
        titleAm: "አድቫንስድ የመሰንቆ መሳሪያ ትምህርት መስጠት",
        metric: "ቁጥር",
        target: "1 ዙር",
        monthTiming: "ታህሳስ",
        budget: "-",
        subUnitAm: "የመሰንቆ መምህር",
        status: "planned"
      },
      {
        id: "choir-16",
        titleAm: "የመጀመሪያ ደረጃ የአስጠኚዎች ሥልጠና መስጠት",
        metric: "ቁጥር",
        target: "2 ዙር",
        monthTiming: "መስከረም፣ የካቲት",
        budget: "33,000 ብር",
        subUnitAm: "ስልጠና ቡድን",
        status: "planned"
      },
      {
        id: "choir-17",
        titleAm: "ሁለተኛ ደረጃ የአስጠኚዎች ሥልጠና መስጠት",
        metric: "ቁጥር",
        target: "1 ዙር",
        monthTiming: "የካቲት",
        budget: "-",
        subUnitAm: "ስልጠና ቡድን",
        status: "planned"
      },
      {
        id: "choir-18",
        titleAm: "ብቁ አስጠኚዎችን ማፍራት",
        metric: "ቁጥር",
        target: "15",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አስጠኚዎች",
        status: "in_progress"
      },
      {
        id: "choir-19",
        titleAm: "የዝማሬ አገልግሎት መስጫ ንዋየ ቅድሳትን ማሟላት (መቋሚያ ግዢ)",
        metric: "ቁጥር",
        target: "60",
        monthTiming: "ጥቅምት",
        budget: "12,000 ብር",
        subUnitAm: "ንብረት ክፍል",
        status: "planned"
      },
      {
        id: "choir-20",
        titleAm: "አዳዲስ መዝሙራትን ማውጣትና ማስተዋወቅ",
        metric: "ቁጥር",
        target: "3 ዝማሬ",
        monthTiming: "ህዳር፣ የካቲት፣ ግንቦት",
        budget: "33,000 ብር",
        subUnitAm: "የዜማ ቡድን",
        status: "planned"
      },
      {
        id: "choir-21",
        titleAm: "ዓመታዊ የመዝሙር ጥናት ቀንና የታረመ የዝማሬ ጥራዝ ማዘጋጀት",
        metric: "ቁጥር",
        target: "2 ቀናት",
        monthTiming: "ህዳር፣ ሰኔ",
        budget: "2,000 ብር",
        subUnitAm: "አዘጋጅ ኮሚቴ",
        status: "planned"
      }
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
      {
        id: "charity-1",
        titleAm: "አዲስ ገቢ ማስገኛ ፕሮጀክት መንደፍና ፕሮፖዛል ማዘጋጀት",
        metric: "በቁጥር",
        target: "3",
        monthTiming: "መስከረም-ጥቅምት",
        budget: "በጥናት",
        subUnitAm: "የፕሮጀክት ቡድን",
        status: "planned"
      },
      {
        id: "charity-2",
        titleAm: "የተዘጋጀውን የገቢ ማስገኛ ንድፈ ሐሳብ ማጽደቅና ማስጀመር",
        metric: "በቁጥር",
        target: "1",
        monthTiming: "ታህሳስ",
        budget: "-",
        subUnitAm: "ልማት ንዑስ ክፍል",
        status: "planned"
      },
      {
        id: "charity-3",
        titleAm: "አባላትን በየሙያቸው መለየትና ማኅደራቸውን በዲጂታል ማደራጀት",
        metric: "በቁጥር",
        target: "50 ባለሙያ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የሰው ኃይል",
        status: "in_progress"
      },
      {
        id: "charity-4",
        titleAm: "የተቸገሩ ገዳማት፣ አድባራትና ሰ/ት/ቤቶች ጥያቄዎችን መርዳት",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "50,000 ብር",
        subUnitAm: "የበጎ አድራጎት ቡድን",
        status: "in_progress"
      },
      {
        id: "charity-5",
        titleAm: "እርዳታ ለሚያስፈልጋቸው አብያተ ክርስቲያናትና አብነት ት/ቤቶች ድጋፍ ማድረግ",
        metric: "በቁጥር",
        target: "2",
        monthTiming: "ህዳር፣ ግንቦት",
        budget: "ገቢ 20k / ወጪ 50k",
        subUnitAm: "የበጎ አድራጎት ቡድን",
        status: "planned"
      },
      {
        id: "charity-6",
        titleAm: "ተጨማሪ ረጂ አካላትን በጥናት መለየትና ከተረጂዎች ጋር ማገናኘት",
        metric: "በቁጥር",
        target: "5 ረጂዎች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አጋርነትና ትስስር",
        status: "in_progress"
      },
      {
        id: "charity-7",
        titleAm: "ለቅዱስ ዮሐንስ በዓል ማስፈሰኪያ ገንዘብ ማሰባሰብና የቤት ለቤት ድጋፍ",
        metric: "በቁጥር",
        target: "30 አባወራ",
        monthTiming: "መስከረም",
        budget: "ገቢ 97.5k / ወጪ 75k",
        subUnitAm: "የበዓላት ኮሚቴ",
        status: "completed"
      },
      {
        id: "charity-8",
        titleAm: "ለልደት በዓል ማስፈሰኪያ የአይነትና ገንዘብ ማሰባሰብና ምገባ ማከናወን",
        metric: "በገንዘብ",
        target: "56 አባወራ",
        monthTiming: "ታህሳስ",
        budget: "ገቢ 300k / ወጪ 290k",
        subUnitAm: "የምገባ ቡድን",
        status: "planned"
      },
      {
        id: "charity-9",
        titleAm: "ለፋሲካ በዓል ማስፈሰኪያ ድጋፍ ማሰባሰብ፣ ምገባና የቤት ለቤት ድጋፍ",
        metric: "በገንዘብ",
        target: "62 አባወራ",
        monthTiming: "መጋቢት - ሚያዝያ",
        budget: "ገቢ 550k / ወጪ 355k",
        subUnitAm: "የምገባ ቡድን",
        status: "planned"
      },
      {
        id: "charity-10",
        titleAm: "ለተረጂ አካላት ቀጣይነት ያለው የሥራ ዕድል ፈጠራ ስልጠና መስጠትና ስራ ማስጀመር",
        metric: "በቁጥር",
        target: "10 ተጠቃሚ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ገቢ 30k / ወጪ 100k",
        subUnitAm: "ስራ ፈጠራ",
        status: "planned"
      },
      {
        id: "charity-11",
        titleAm: "የመነኮሳትና አቅመ ደካሞች ልብስ ማጠብ አገልግሎት ማካሄድ",
        metric: "በቁጥር",
        target: "5 ዙር",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "3,000 ብር",
        subUnitAm: "የበጎ ፈቃድ ቡድን",
        status: "in_progress"
      },
      {
        id: "charity-12",
        titleAm: "በጸበል ቦታዎች ለሚገኙ ጸበልተኞች ድጋፍ መስጠት",
        metric: "በቁጥር",
        target: "3 ዙር",
        monthTiming: "ጥቅምት፣ ጥር፣ መጋቢት",
        budget: "ገቢ 10k / ወጪ 30k",
        subUnitAm: "የበጎ አድራጎት ቡድን",
        status: "planned"
      },
      {
        id: "charity-13",
        titleAm: "ድንገተኛና አስቸኳይ የህክምና/ችግር እርዳታ በጥናት ማድረግ",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "100,000 ብር",
        subUnitAm: "የድንገተኛ ኮሚቴ",
        status: "in_progress"
      },
      {
        id: "charity-14",
        titleAm: "ለጥምቀት አገልግሎት የመጀመሪያ የህክምና እርዳታ (First Aid) መስጠት",
        metric: "በቁጥር",
        target: "1 በዓል",
        monthTiming: "ጥር",
        budget: "10,000 ብር",
        subUnitAm: "የጤና ባለሙያዎች",
        status: "planned"
      },
      {
        id: "charity-15",
        titleAm: "ከቀይ መስቀል ጋር በመተባበር 3 ዙር የደም ልገሳ ማካሄድ",
        metric: "በቁጥር",
        target: "3 ዙር",
        monthTiming: "ህዳር፣ የካቲት፣ ሰኔ",
        budget: "15,000 ብር",
        subUnitAm: "የበጎ ፈቃድ አስተባባሪ",
        status: "planned"
      },
      {
        id: "charity-16",
        titleAm: "የአባላትን ኢኮኖሚ ማሳደግ (የሙያ ስልጠናና ቋሚ ስራ ማስጀመር)",
        metric: "በቁጥር",
        target: "5 አባላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "50,000 ብር",
        subUnitAm: "አቅም ማጎልበቻ",
        status: "planned"
      },
      {
        id: "charity-17",
        titleAm: "ሕጋዊ የበጎ አድራጎት ድርጅት (Charity NGO) ማቋቋም",
        metric: "ንድፈ ሐሳብ",
        target: "1 ድርጅት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "በጥናት",
        subUnitAm: "ቦርድ",
        status: "in_progress"
      },
      {
        id: "charity-18",
        titleAm: "የክፍሉን አገልግሎት በበራሪ ወረቀት፣ ባነርና ሚዲያ ማስተዋወቅ",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "25,000 ብር",
        subUnitAm: "ኮሙኒኬሽን",
        status: "in_progress"
      },
      {
        id: "charity-19",
        titleAm: "ታላቅ የበጎ አድራጎት ዓውደ ርዕይ ማዘጋጀትና ማካሄድ",
        metric: "በቁጥር",
        target: "1 ዓውደ ርዕይ",
        monthTiming: "ግንቦት",
        budget: "ገቢ 70k / ወጪ 20k",
        subUnitAm: "አዘጋጅ ኮሚቴ",
        status: "planned"
      }
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
      {
        id: "fin-1",
        titleAm: "የሰንበት ት/ቤቱን ቋሚና አላቂ ንብረቶች ቆጠራ ማካሄድ",
        metric: "በቁጥር",
        target: "1 ቆጠራ",
        monthTiming: "መስከረም",
        budget: "-",
        subUnitAm: "ንብረት ክፍል",
        status: "completed"
      },
      {
        id: "fin-2",
        titleAm: "የንብረት መለያ ቁጥር (QR Tagging) መስጠትና መመዝገብ",
        metric: "በቁጥር",
        target: "100%",
        monthTiming: "ጥቅምት",
        budget: "5,000 ብር",
        subUnitAm: "ንብረት ክፍል",
        status: "in_progress"
      },
      {
        id: "fin-3",
        titleAm: "የተበላሹ እቃዎችን መለየትና መጠገን",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ህዳር",
        budget: "15,000 ብር",
        subUnitAm: "ቴክኒክ ቡድን",
        status: "in_progress"
      },
      {
        id: "fin-4",
        titleAm: "የቢሮ ዴስክቶፕ ኮምፒውተሮችን መጠገንና ማሻሻል",
        metric: "በቁጥር",
        target: "3 ፒሲ",
        monthTiming: "ጥቅምት",
        budget: "6,000 ብር",
        subUnitAm: "አይቲ ቡድን",
        status: "completed"
      },
      {
        id: "fin-5",
        titleAm: "የአባላት ወርሃዊ መዋጮ መሰብሰብና በዲጂታል መመዝገብ",
        metric: "በቁጥር",
        target: "12 ወራት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ገቢ 300,000",
        subUnitAm: "ፋይናንስ",
        status: "in_progress"
      },
      {
        id: "fin-6",
        titleAm: "የገቢና ወጪ ሰነዶችን ኦዲት ማድረግ",
        metric: "በቁጥር",
        target: "4 ኦዲቶች",
        monthTiming: "ሩብ ዓመታዊ",
        budget: "-",
        subUnitAm: "ኦዲት ኮሚቴ",
        status: "planned"
      },
      {
        id: "fin-7",
        titleAm: "ለበዓላት የሚያስፈልጉ ንዋያተ ቅድሳትን ማዘጋጀትና መቆጣጠር",
        metric: "በቁጥር",
        target: "በዓላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ንዋያት አስተዳዳሪ",
        status: "in_progress"
      }
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
      {
        id: "media-1",
        titleAm: "ለሚዲያ ክፍል አባላት የክህሎት ስልጠና መስጠት (ግራፊክስ፣ ቪዲዮ፣ ቀረጻ፣ ሶሻል ሚዲያ)",
        metric: "በቁጥር",
        target: "4 ዘርፎች",
        monthTiming: "መስከረም - ህዳር",
        budget: "25,000 ብር",
        subUnitAm: "ስልጠና ቡድን",
        status: "planned"
      },
      {
        id: "media-2",
        titleAm: "በሰ/ት/ቤትና ውጪ ያሉ 20 የሚዲያ ቤተሰቦች (ፈቃደኞች) ማዋቀር",
        metric: "በቁጥር",
        target: "20 አባላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የሰው ኃይል",
        status: "in_progress"
      },
      {
        id: "media-3",
        titleAm: "ለቀረጻና ፕሮዳክሽን የሚያስፈልጉ ዘመናዊ ግብአቶችን ማሟላት (ካሜራ፣ ማይክ)",
        metric: "በጥናት",
        target: "የስቱዲዮ እቃዎች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "800,000 ብር",
        subUnitAm: "የግዥ ኮሚቴ",
        status: "in_progress"
      },
      {
        id: "media-4",
        titleAm: "ለሚዲያ ክፍሉ ታላቅ የገቢ ማሰባሰቢያ መርሃ ግብር ማዘጋጀት",
        metric: "በቁጥር",
        target: "1 ዝግጅት",
        monthTiming: "ታህሳስ",
        budget: "ገቢ 400,000 ብር",
        subUnitAm: "ገቢ አሰባሳቢ ቡድን",
        status: "planned"
      },
      {
        id: "media-5",
        titleAm: "ጊዜያዊ የድምጽና ቪዲዮ ስቱዲዮ ማዘጋጀትና ቁሶችን ማሟላት",
        metric: "በቁጥር",
        target: "3 ምዕራፍ",
        monthTiming: "ጥቅምት - ጥር",
        budget: "100,000 ብር",
        subUnitAm: "ቴክኒክ ቡድን",
        status: "planned"
      },
      {
        id: "media-6",
        titleAm: "መደበኛና ቋሚ የሚዲያ ባለሙያ መቅጠርና ማሰማራት",
        metric: "በቁጥር",
        target: "1 ባለሙያ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "70,000 ብር",
        subUnitAm: "አስተዳደር",
        status: "planned"
      },
      {
        id: "media-7",
        titleAm: "የሰንበት ትምህርት ቤት አገልግሎት የሚዲያ መመሪያ ማሻሻል",
        metric: "በቁጥር",
        target: "1 ሰነድ",
        monthTiming: "መስከረም",
        budget: "-",
        subUnitAm: "አመራር",
        status: "completed"
      },
      {
        id: "media-8",
        titleAm: "ለ14ቱ ክፍላት የግራፊክስ፣ የማስታወቂያና የቀረጻ ድጋፍ መስጠት",
        metric: "ተከታታይ",
        target: "14 ክፍላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የፈጠራ ቡድን",
        status: "in_progress"
      },
      {
        id: "media-9",
        titleAm: "ዓመታዊ የደብሩን 6 ንግስ ክብረ በዓላት በሚዲያ መሸፈን",
        metric: "በቁጥር",
        target: "6 በዓላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "10,000 ብር",
        subUnitAm: "የቀረጻ ቡድን",
        status: "in_progress"
      },
      {
        id: "media-10",
        titleAm: "የጥምቀት በዓል የቀጥታና የተቀዳ የሚዲያ ሽፋን መስጠት",
        metric: "በቁጥር",
        target: "1 በዓል",
        monthTiming: "ጥር",
        budget: "10,000 ብር",
        subUnitAm: "የቀረጻ ቡድን",
        status: "planned"
      },
      {
        id: "media-11",
        titleAm: "ለአባላትና ምዕመናን 48 መንፈሳዊ የሚዲያ ይዘቶችን ማሰራጨት",
        metric: "በቁጥር",
        target: "48 ይዘት (ሳምንታዊ)",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ኤዲቶሪያል",
        status: "in_progress"
      },
      {
        id: "media-12",
        titleAm: "በሰ/ት/ቤቱ የሚከፈቱ ማንኛውንም የሚዲያ አካውንቶች መቆጣጠር",
        metric: "በቁጥር",
        target: "100%",
        monthTiming: "ቋሚ",
        budget: "-",
        subUnitAm: "ቁጥጥር",
        status: "in_progress"
      },
      {
        id: "media-13",
        titleAm: "የቲክቶክ (12k)፣ ኢንስታግራም (5k)፣ ፌስቡክ (5k)፣ ዩቲዩብ (5k) ተከታዮችን ማሳደግ",
        metric: "ተከታዮች",
        target: "27,000 ተከታይ",
        monthTiming: "ሰኔ መጨረሻ",
        budget: "-",
        subUnitAm: "ሶሻል ሚዲያ",
        status: "in_progress"
      },
      {
        id: "media-14",
        titleAm: "ይፋዊ የ YouTube እና Facebook የቀጥታ ስርጭት አገልግሎት ማስጀመር",
        metric: "በቁጥር",
        target: "2 ቻናሎች",
        monthTiming: "ጥቅምት",
        budget: "-",
        subUnitAm: "ስርጭት",
        status: "completed"
      },
      {
        id: "media-15",
        titleAm: "የይዘት ማዘጋጀት (Content Pipeline)፦ 100 ጽሁፎችና 50 ቪዲዮዎች",
        metric: "በቁጥር",
        target: "150 ይዘቶች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የይዘት ቡድን",
        status: "in_progress"
      },
      {
        id: "media-16",
        titleAm: "አጫጭር ቪዲዮዎች (24 Reels)፣ ረጅም ቪዲዮዎች (6 ዶክመንተሪ) እና 48 ግራፊክስ",
        metric: "በቁጥር",
        target: "78 ይዘቶች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ፕሮዳክሽን",
        status: "in_progress"
      },
      {
        id: "media-17",
        titleAm: "የሰንበት ትምህርት ቤቱን የወረቀትና ታሪካዊ መረጃ ማደራጀት",
        metric: "በቁጥር",
        target: "ሙሉ ማህደር",
        monthTiming: "ጥቅምት - መጋቢት",
        budget: "-",
        subUnitAm: "አርካይቭ",
        status: "planned"
      },
      {
        id: "media-18",
        titleAm: "መረጃዎችን፣ ምስሎችንና ቪዲዮዎችን በዲጂታል መንገድ (Cloud DAM) ማደራጀት",
        metric: "ዲጂታል",
        target: "ደመና ማህደር",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አይቲና አርካይቭ",
        status: "in_progress"
      }
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
      {
        id: "counsel-1",
        titleAm: "አገልግሎቱን እንዲሰጡ ለተመረጡ ባለሙያዎች ስልጠና መስጠት",
        metric: "በቁጥር",
        target: "20",
        monthTiming: "መስከረም - ታህሳስ",
        budget: "8,000 ብር",
        subUnitAm: "የስልጠና ቡድን",
        status: "planned"
      },
      {
        id: "counsel-2",
        titleAm: "በሙያቸው አገልግሎት የሚሰጡ የቤተክርስቲያን ልጆችን/ባለሙያዎችን ማፈላለግ እና ማናገር",
        metric: "በቁጥር",
        target: "-",
        monthTiming: "ህዳር - የካቲት",
        budget: "4,000 ብር",
        subUnitAm: "የሰው ኃይል ቡድን",
        status: "planned"
      },
      {
        id: "counsel-3",
        titleAm: "አገልግሎት ተጠቃሚዎችን ከባለሙያዎች ጋር ማገናኘት",
        metric: "በቁጥር",
        target: "30",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የምክር አገልግሎት",
        status: "in_progress"
      },
      {
        id: "counsel-4",
        titleAm: "ከህፃናት ክፍል ጋር በመተባበር በአዳራሽ ለስምንተኛ እና አስራ ሁለተኛ ክፍል ተማሪዎች የስነልቦና ዝግጅት ማከናወን",
        metric: "በቁጥር",
        target: "4",
        monthTiming: "ታህሳስ፣ የካቲት፣ ሚያዝያ፣ ሰኔ",
        budget: "4,000 ብር",
        subUnitAm: "የተማሪዎች ስነ-ልቦና",
        status: "planned"
      },
      {
        id: "counsel-5",
        titleAm: "ለመደበኛ አባላት በተለያዩ ነጥቦች ዙርያ ስነልቦናዊ ስልጠና መስጠት",
        metric: "በቁጥር",
        target: "3",
        monthTiming: "ህዳር፣ የካቲት፣ ግንቦት",
        budget: "-",
        subUnitAm: "የአባላት ስልጠና",
        status: "planned"
      },
      {
        id: "counsel-6",
        titleAm: "የመማክርት አገልግሎት በተለያየ መንገድ ማስተዋወቅ",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ኮሙኒኬሽን",
        status: "in_progress"
      },
      {
        id: "counsel-7",
        titleAm: "ከክፍሉ አቅም በላይ የሆኑ ተጠቃሚዎችን በዘርፍ አገልግሎት ከሚሰጡ ተቋማት ጋር ማገናኘት",
        metric: "በቁጥር",
        target: "እንደአስፈላጊነቱ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "10,000 ብር",
        subUnitAm: "ሪፈራል ቡድን",
        status: "planned"
      },
      {
        id: "counsel-8",
        titleAm: "አገልግሎት የሚሰጥበትን ቦታ ማስተካከል እና ሚስጥራዊነትን ማረጋገጥ",
        metric: "በቁጥር",
        target: "1",
        monthTiming: "መስከረም - ጥር",
        budget: "-",
        subUnitAm: "አስተዳደር",
        status: "completed"
      },
      {
        id: "counsel-9",
        titleAm: "ለማማከር አገልግሎት አስፈላጊ ቁሳቁስ ማዘጋጀት",
        metric: "በቁጥር",
        target: "-",
        monthTiming: "መስከረም - ህዳር",
        budget: "9,000 ብር",
        subUnitAm: "ንብረት ክፍል",
        status: "planned"
      },
      {
        id: "counsel-10",
        titleAm: "በባለሙያ ክትትል ለሚደረግላቸው ተገልጋዮች ክትትል ማድረግ",
        metric: "በቁጥር",
        target: "-",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "1,000 ብር",
        subUnitAm: "ክትትልና ድጋፍ",
        status: "in_progress"
      },
      {
        id: "counsel-11",
        titleAm: "ባለሙያዎችን የተሰጣቸውን አገልግሎት በአግባቡ እየሰጡ መሆኑን ክትትል ማድረግ",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ጥራት ቁጥጥር",
        status: "in_progress"
      }
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
      {
        id: "child-1",
        titleAm: "የሕጻናት ስርዓተ ትምህርትን ማስቀጠልና አፈጻጸም መከታተል (1-12ኛ ክፍል)",
        metric: "ክፍላት",
        target: "12 ክፍሎች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ስርዓተ ትምህርት",
        status: "in_progress"
      },
      {
        id: "child-2",
        titleAm: "የ2018 ሀገር አቀፍ ፈተና ያለፉ ተማሪዎችን ምርቃት ማካሄድ",
        metric: "በቁጥር",
        target: "1 ምርቃት",
        monthTiming: "መስከረም",
        budget: "20,000 ብር",
        subUnitAm: "ምርቃት ኮሚቴ",
        status: "completed"
      },
      {
        id: "child-3",
        titleAm: "ለ4ኛ ክፍል የነገረ መጽሐፍ ቅዱስና ታሪክ Handout ማዘጋጀት",
        metric: "ወረቀት",
        target: "2 ደስታ",
        monthTiming: "ጥቅምት",
        budget: "በጥናት",
        subUnitAm: "የትምህርት ቡድን",
        status: "completed"
      },
      {
        id: "child-4",
        titleAm: "ለ3ኛ እና 4ኛ ክፍል ጥያቄና መልስ ማዘጋጀትና መሸለም",
        metric: "በቁጥር",
        target: "1 ውድድር",
        monthTiming: "ጥር",
        budget: "2,000 ብር",
        subUnitAm: "ፈተና ኮሚቴ",
        status: "planned"
      },
      {
        id: "child-5",
        titleAm: "የወላጆችና መምህራን መገናኛ ደብተር ተግባራዊ ማድረግ",
        metric: "ደብተር",
        target: "9 እሽግ",
        monthTiming: "ጥቅምት",
        budget: "5,000 ብር",
        subUnitAm: "ክፍል ተጠሪዎች",
        status: "completed"
      },
      {
        id: "child-6",
        titleAm: "ለማርቆስ ምድብ ተማሪዎች የከበሮ አመታት ግንዛቤና ስልጠና መስጠት",
        metric: "ስልጠና",
        target: "ሳምንታዊ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "የዜማ አስተማሪ",
        status: "in_progress"
      },
      {
        id: "child-7",
        titleAm: "የአንድነት ስርዓተ ትምህርት መማሪያ መጽሐፍት መግዛትና ማተም (1-11ኛ ክፍል)",
        metric: "መጽሐፍት",
        target: "1-11ኛ ክፍል",
        monthTiming: "ህዳር",
        budget: "በጥናት",
        subUnitAm: "የግዥ ኮሚቴ",
        status: "planned"
      },
      {
        id: "child-8",
        titleAm: "የተማሪዎች አጋማሽና ማጠቃለያ ፈተናዎችን ማዘጋጀትና መፈተን",
        metric: "ወረቀት",
        target: "40 ደስታ",
        monthTiming: "ጥር፣ ሰኔ",
        budget: "በጥናት",
        subUnitAm: "ፈተና አስተባባሪ",
        status: "planned"
      },
      {
        id: "child-9",
        titleAm: "ለማቴዎስ ምድብ (ቅድመ-መደበኛ) አመታዊ የትምህርት ሰሌዳ ማዘጋጀት",
        metric: "ሰነድ",
        target: "1 ሰነድ",
        monthTiming: "መስከረም",
        budget: "-",
        subUnitAm: "ማቴዎስ አመራር",
        status: "completed"
      },
      {
        id: "child-10",
        titleAm: "ለሀገር አቀፍ ተፈታኞች Worksheet፣ ሞዴል ፈተናና ሽልማት ማዘጋጀት",
        metric: "በቁጥር",
        target: "4 ስራ / 2 ሞዴል",
        monthTiming: "የካቲት - ግንቦት",
        budget: "6,000 ብር",
        subUnitAm: "ትምህርት ጥራት",
        status: "planned"
      },
      {
        id: "child-11",
        titleAm: "በየሳምንቱ ለሚቀሩ ተማሪዎች ወላጆች ስልክ ደውሎ ማጣራት",
        metric: "ጥሪ",
        target: "ሳምንታዊ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "9,000 ብር",
        subUnitAm: "ክትትል ቡድን",
        status: "in_progress"
      },
      {
        id: "child-12",
        titleAm: "የተማሪዎች መንፈሳዊ ጉዞ (ዮሐንስ 15k፣ ሉቃስ 20k፣ 4ኛ ክፍል 12.5k)",
        metric: "በቁጥር",
        target: "3 ጉዞዎች",
        monthTiming: "ታህሳስ - መጋቢት",
        budget: "47,500 ብር",
        subUnitAm: "ጉዞ ኮሚቴ",
        status: "planned"
      },
      {
        id: "child-13",
        titleAm: "የአብነት መምህራን ክፍያ (140k + 90k ጭማሪ) እና ማበረታቻ",
        metric: "ደመወዝ",
        target: "ዓመቱን ሙሉ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "235,500 ብር",
        subUnitAm: "አብነት አስተባባሪ",
        status: "in_progress"
      },
      {
        id: "child-14",
        titleAm: "ልሳነ ግዕዝ ትምህርት፣ 10 ተተኪ መምህራንና ለ500 ቆራቢዎች ባጅ",
        metric: "ባጅ",
        target: "500 ባጅ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "28,500 ብር",
        subUnitAm: "ልሳነ ግዕዝ",
        status: "planned"
      },
      {
        id: "child-15",
        titleAm: "የ12ኛ ክፍል 75 ተማሪዎች ምርቃትና የትራንስክሪፕት ዝግጅት",
        metric: "ተመራቂ",
        target: "75 ተማሪ",
        monthTiming: "ሰኔ",
        budget: "-",
        subUnitAm: "12ኛ ክፍል ቡድን",
        status: "planned"
      },
      {
        id: "child-16",
        titleAm: "የማቴዎስና ማርቆስ ምድብ የተማሪዎች መረጃ ቋት (Database) ማደራጀት",
        metric: "ዳታቤዝ",
        target: "100%",
        monthTiming: "መስከረም - ጥቅምት",
        budget: "-",
        subUnitAm: "አይቲና መረጃ",
        status: "completed"
      },
      {
        id: "child-17",
        titleAm: "የተማሪዎች መረጃና አቴንዳንስ በ SMS ማሳወቂያ ስርዓት መዘርጋት (SMS Gateway)",
        metric: "ሲስተም",
        target: "1 ሲስተም",
        monthTiming: "ጥቅምት - ህዳር",
        budget: "45,000 ብር",
        subUnitAm: "የቴክኖሎጂ መሪ",
        status: "in_progress"
      },
      {
        id: "child-18",
        titleAm: "ለሉቃስና ዮሐንስ ምድባት የተማሪዎች መታወቂያ በ QR Code ማዘጋጀት",
        metric: "መታወቂያ",
        target: "1,000 መታወቂያ",
        monthTiming: "ህዳር",
        budget: "20,000 ብር",
        subUnitAm: "የቴክኖሎጂ መሪ",
        status: "in_progress"
      },
      {
        id: "child-19",
        titleAm: "የአብነት መምህራን አቴንዳንስ በ QR Code መከታተያ ማዋቀር",
        metric: "ሰዓት ቁጥጥር",
        target: "መምህራን",
        monthTiming: "ህዳር",
        budget: "-",
        subUnitAm: "የቴክኖሎጂ መሪ",
        status: "in_progress"
      },
      {
        id: "child-20",
        titleAm: "የተማሪዎች የውጤት መግለጫ (Result Sheet & Report Card) ዲጂታል ማመንጫ",
        metric: "ሶፍትዌር",
        target: "1 ሞጁል",
        monthTiming: "ጥር፣ ሰኔ",
        budget: "-",
        subUnitAm: "የቴክኖሎጂ መሪ",
        status: "planned"
      },
      {
        id: "child-21",
        titleAm: "የግቢ ጉባኤ ተማሪዎች እቅበተ እምነት ስልጠና፣ ጸሎትና ጉዞ ማካሄድ",
        metric: "በቁጥር",
        target: "4 ስልጠና / ጉዞ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "17,600 ብር",
        subUnitAm: "ግቢ ጉባኤ ቡድን",
        status: "in_progress"
      },
      {
        id: "child-22",
        titleAm: "ከወላጆች ጋር 4 ዙር ጉባኤና ስልጠና ማዘጋጀት እንዲሁም የወላጆች ጉዞ",
        metric: "ጉባኤ",
        target: "4 ጉባኤ",
        monthTiming: "ሩብ ዓመታዊ",
        budget: "9,000 ብር",
        subUnitAm: "ወላጆች ኮሚቴ",
        status: "planned"
      },
      {
        id: "child-23",
        titleAm: "ወርሃዊ የሕጻናት ሬዲዮ (12 ዙር) እና 24 ግድግዳ መጽሔት ማሳተም",
        metric: "በቁጥር",
        target: "12 ሬዲዮ / 24 መጽሔት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ወረቀት",
        subUnitAm: "ስነ-ጽሁፍ ቡድን",
        status: "in_progress"
      },
      {
        id: "child-24",
        titleAm: "4 አዳዲስ በገናዎችን መግዛት (32k) እና የተጎዱትን ማደስ (8k)",
        metric: "በገና",
        target: "4 በገና",
        monthTiming: "ጥቅምት - ታህሳስ",
        budget: "40,000 ብር",
        subUnitAm: "በገና ክፍል",
        status: "planned"
      },
      {
        id: "child-25",
        titleAm: "የስነ ስዕል ትምህርት፣ ግብአቶች ግዢ (15k)፣ ጉብኝትና የስዕል ሽያጭ (5k)",
        metric: "ኤግዚቢሽን",
        target: "1 ዝግጅት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "22,000 ብር",
        subUnitAm: "ስነ ስዕል ቡድን",
        status: "planned"
      },
      {
        id: "child-26",
        titleAm: "ለመምህራንና ክፍል ኃላፊዎች የሕጻናት ሳይኮሎጂና አያያዝ ስልጠና መስጠት",
        metric: "ስልጠና",
        target: "2 ዙር",
        monthTiming: "ህዳር፣ የካቲት",
        budget: "10,000 ብር",
        subUnitAm: "ትምህርት አመራር",
        status: "planned"
      }
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
      {
        id: "abnet-1",
        titleAm: "የአብነት ስርዓተ ትምህርት ማጽደቅና የወንበር ትምህርቱን መስጠት",
        metric: "በቁጥር",
        target: "3 ወንበር",
        monthTiming: "መስከረም - ሰኔ",
        budget: "5,000 ብር",
        subUnitAm: "ስርዓተ ትምህርት",
        status: "in_progress"
      },
      {
        id: "abnet-2",
        titleAm: "የአብነት ትምህርቱን የሚማሩ ተማሪዎችን መለየትና ምዝገባ ማካሄድ",
        metric: "በቁጥር",
        target: "ተማሪዎች",
        monthTiming: "መስከረም - ሰኔ",
        budget: "-",
        subUnitAm: "ምዝገባ ቡድን",
        status: "completed"
      },
      {
        id: "abnet-3",
        titleAm: "ከመደበኛ የአብነት መምህራንና ተማሪዎች ጋር ወርሃዊ ውይይት",
        metric: "በቁጥር",
        target: "12 ስብሰባ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አመራር",
        status: "in_progress"
      },
      {
        id: "abnet-4",
        titleAm: "4ኛ ዙር እጩ ዲያቆናትን መለየት፣ ስልጠና ማካሄድና ማዕረግ ማስቀበል",
        metric: "በቁጥር",
        target: "15 ዲያቆናት",
        monthTiming: "መስከረም - የካቲት",
        budget: "9,000 ብር",
        subUnitAm: "እጩ ዲያቆናት",
        status: "in_progress"
      },
      {
        id: "abnet-5",
        titleAm: "የአብነት ቀን ማዘጋጀትና ማክበር",
        metric: "በቁጥር",
        target: "1 ዝግጅት",
        monthTiming: "ግንቦት",
        budget: "20,000 ብር",
        subUnitAm: "አዘጋጅ ኮሚቴ",
        status: "planned"
      },
      {
        id: "abnet-6",
        titleAm: "የአብነት ተማሪዎች መንፈሳዊ ጉዞ ማዘጋጀት",
        metric: "በቁጥር",
        target: "1 ጉዞ",
        monthTiming: "መጋቢት",
        budget: "15,000 ብር",
        subUnitAm: "ጉዞ ኮሚቴ",
        status: "planned"
      },
      {
        id: "abnet-7",
        titleAm: "የአብነት ማስተማሪያ መተግበሪያ (Abnet PWA / Mobile App) ማዘጋጀት",
        metric: "በቁጥር",
        target: "1 መተግበሪያ",
        monthTiming: "ጥቅምት - ታህሳስ",
        budget: "10,000 ብር",
        subUnitAm: "አይቲ ቡድን",
        status: "in_progress"
      },
      {
        id: "abnet-8",
        titleAm: "የአብነት ክፍል ዴስክቶፕ ኮምፒውተር መጠገንና ማደራጀት",
        metric: "በቁጥር",
        target: "1 PC",
        monthTiming: "መስከረም",
        budget: "1,500 ብር",
        subUnitAm: "አይቲ ቡድን",
        status: "completed"
      }
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
      {
        id: "art-1",
        titleAm: "የቤተመጽሐፍቱን መመሪያ ማሻሻልና ውስጣዊ ገጽታውን ማስተካከል",
        metric: "በጊዜ",
        target: "1 ማሻሻያ",
        monthTiming: "ህዳር",
        budget: "በጥናት",
        subUnitAm: "ቤተ-መጽሐፍት",
        status: "planned"
      },
      {
        id: "art-2",
        titleAm: "ዲጂታል የቤተ-መጽሐፍት ማውጫ (Digital OPAC Catalog) ማዘጋጀት",
        metric: "በጊዜ",
        target: "2 ዙር",
        monthTiming: "ህዳር፣ መጋቢት",
        budget: "-",
        subUnitAm: "አይቲና ቤተ-መጽሐፍት",
        status: "in_progress"
      },
      {
        id: "art-3",
        titleAm: "ቤተ መጻሕፍቱን በቋሚነት ለአንባቢዎች ክፍት ማድረግና ማስጠቀም",
        metric: "ዓመቱን ሙሉ",
        target: "ሳምንታዊ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "አስተናጋጅ",
        status: "in_progress"
      },
      {
        id: "art-4",
        titleAm: "የተለያዩ ማስታወቂያዎችን (ባነር፣ ብሮሸርና ፍላየር) ማዘጋጀትና በበዓላት መበተን",
        metric: "ዓመቱን ሙሉ",
        target: "በዓላት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "5,000 ብር",
        subUnitAm: "ኮሙኒኬሽን",
        status: "in_progress"
      },
      {
        id: "art-5",
        titleAm: "የመጽሐፍ ዕቁብ ማዘጋጀትና ለቤተ መጻህፍቱ መጻህፍትን ማሟላት",
        metric: "በቁጥር",
        target: "2 ዕቁብ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ገቢ 50k / ወጪ 50k",
        subUnitAm: "የመጽሐፍ ዕቁብ",
        status: "in_progress"
      },
      {
        id: "art-6",
        titleAm: "ከምእመናን እና ከፍቃደኛ አባላት መጻሕፍትን ማሰባሰብ",
        metric: "በቁጥር",
        target: "100 መጻሕፍት",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ማሰባሰብ ቡድን",
        status: "in_progress"
      },
      {
        id: "art-7",
        titleAm: "በልደት በዓል ክፍላት የመጽሐፍ ስጦታ እንዲሰጡ ማድረግ",
        metric: "በቁጥር",
        target: "50 መጻሕፍት",
        monthTiming: "ታህሳስ",
        budget: "-",
        subUnitAm: "ስጦታ አስተባባሪ",
        status: "planned"
      },
      {
        id: "art-8",
        titleAm: "ለኦዲዮ ቪዥዋል አገልግሎት የሚውሉ PC ማሟላት",
        metric: "በቁጥር",
        target: "1 PC",
        monthTiming: "ህዳር",
        budget: "30,000 ብር",
        subUnitAm: "አይቲና ንብረት",
        status: "planned"
      },
      {
        id: "art-9",
        titleAm: "ለስነ ስዕል የሚያስፈልጉ ግብአቶች ማሟላት",
        metric: "በቁጥር",
        target: "ግብአቶች",
        monthTiming: "ህዳር",
        budget: "15,000 ብር",
        subUnitAm: "ስነ ስዕል",
        status: "planned"
      },
      {
        id: "art-10",
        titleAm: "የቅርፃ ቅርፅ ስራና የሚያስፈልጉ ግብአቶች ማሟላት",
        metric: "በቁጥር",
        target: "ቁሳቁስ",
        monthTiming: "ህዳር",
        budget: "25,000 ብር",
        subUnitAm: "ቅርፃ ቅርፅ",
        status: "planned"
      },
      {
        id: "art-11",
        titleAm: "በትወና ዘርፍ አባላት ብቁ እንዲሆኑ የ3 ወር ስልጠና ማዘጋጀት",
        metric: "በቁጥር",
        target: "15 ሰልጣኝ",
        monthTiming: "ጥር - መጋቢት",
        budget: "15,000 ብር",
        subUnitAm: "ትወና ቡድን",
        status: "planned"
      },
      {
        id: "art-12",
        titleAm: "ጸሐፊያንን ለማፍራት የሚስችል የ3 ወር የአፃፃፍ ስልጠና ማዘጋጀት",
        metric: "በቁጥር",
        target: "10 ጸሐፊያን",
        monthTiming: "ጥቅምት - ታህሳስ",
        budget: "15,000 ብር",
        subUnitAm: "ስነ ጽሁፍ ቡድን",
        status: "planned"
      },
      {
        id: "art-13",
        titleAm: "የቅዱሳን ስዕላት ስልጠና ከህፃናት ክፍል ለተመረቁ የስነ ስዕል ሰልጣኞች መስጠት",
        metric: "በቁጥር",
        target: "ተመራቂዎች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ስነ ስዕል",
        status: "in_progress"
      },
      {
        id: "art-14",
        titleAm: "የቅርፃ ቅርፅ ማውጣትና የንዋየ ቅዱሳን አሰራር ስልጠና መስጠት",
        metric: "በቁጥር",
        target: "ሰልጣኞች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "8,000 ብር",
        subUnitAm: "ቅርፃ ቅርፅ",
        status: "planned"
      },
      {
        id: "art-15",
        titleAm: "የሥነ ጽሑፍ ምሽት ማዘጋጀት",
        metric: "በቁጥር",
        target: "2 ዝግጅት",
        monthTiming: "ጥቅምት፣ ሚያዝያ",
        budget: "ገቢ 15k / ወጪ 25k",
        subUnitAm: "ስነ ጽሁፍ ቡድን",
        status: "planned"
      },
      {
        id: "art-16",
        titleAm: "በአውደምህረት የስነ-ፅሁፍ ምሽት ማከናወን",
        metric: "በቁጥር",
        target: "1 ዝግጅት",
        monthTiming: "የካቲት",
        budget: "5,000 ብር",
        subUnitAm: "አውደ ምህረት",
        status: "planned"
      },
      {
        id: "art-17",
        titleAm: "የሥነ ጽሑፍና የኪነጥበብ ስራዎችን ከሚዲያ ክፍል ጋር በመተባበር መልቀቅ",
        metric: "በቁጥር",
        target: "ተከታታይ",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "-",
        subUnitAm: "ሚዲያ ትስስር",
        status: "in_progress"
      },
      {
        id: "art-18",
        titleAm: "የመጽሐፍ ዳሰሳ መርሐግብር ማከናወን",
        metric: "በጊዜ",
        target: "2 መርሐግብር",
        monthTiming: "ታህሳስ፣ ግንቦት",
        budget: "10,000 ብር",
        subUnitAm: "ቤተ-መጽሐፍት",
        status: "planned"
      },
      {
        id: "art-19",
        titleAm: "የተዋንያን የትወና ውድድር ማዘጋጀት እና ማከናወን",
        metric: "በቁጥር",
        target: "1 ውድድር",
        monthTiming: "ሰኔ",
        budget: "10,000 ብር",
        subUnitAm: "ትወና ቡድን",
        status: "planned"
      },
      {
        id: "art-20",
        titleAm: "በልማት ተቋሙ መሸጥ የሚችሉ የስነ-ጥበብ ስራዎችን ማዘጋጀት",
        metric: "በቁጥር",
        target: "ምርቶች",
        monthTiming: "ዓመቱን ሙሉ",
        budget: "ገቢ 40,000 ብር",
        subUnitAm: "ልማት ትስስር",
        status: "in_progress"
      }
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

