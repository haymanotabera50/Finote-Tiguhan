import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { FileText, Download, Image as ImageIcon, Newspaper, ExternalLink, Sparkles } from 'lucide-react';
import heroImg from '../../assets/hero_illustration_of_happy_children_in_a_garden.png';
import storyImg from '../../assets/illustration_of_story_time_in_a_classroom.png';
import churchPhoto from '../../assets/church-community.jpg';

export const MediaGallery: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [activeTab, setActiveTab] = useState<'gallery' | 'news' | 'files'>('gallery');

  const galleryItems = [
    {
      id: 1,
      image: churchPhoto,
      captionAm: "የፍኖተ ትጉሃን ሰንበት ትምህርት ቤት አባላትና ምዕመናን በአንድነት",
      captionEn: "Finote Teguhan Sunday School Members & Parishioners Fellowship",
      categoryAm: "አገልግሎት",
      categoryEn: "Ministry"
    },
    {
      id: 2,
      image: storyImg,
      captionAm: "የሕፃናትና ታዳጊዎች የመጽሐፍ ቅዱስ ትምህርት ክፍለ ጊዜ",
      captionEn: "Children Bible Story & Catechism Classroom Time",
      categoryAm: "ትምህርት",
      categoryEn: "Education"
    },
    {
      id: 3,
      image: heroImg,
      captionAm: "የሰንበት ትምህርት ቤት የሕፃናት ክፍላት የመዝናኛና የዝማሬ ቀን",
      captionEn: "Sunday School Kids Joyful Fellowship & Singing Day",
      categoryAm: "ሕፃናት",
      categoryEn: "Children"
    }
  ];

  const newsItems = [
    {
      id: 1,
      titleAm: "አዲስ መንፈሳዊ መዝሙር ለምዕመናን ተለቀቀ",
      titleEn: "New Spiritual Hymn Released to Parishioners",
      dateAm: "መስከረም 2026",
      dateEn: "September 2026",
      descAm: "የሰንበት ትምህርት ቤታችን መዘምራን ክፍል ያዘጋጀውን አዲስ የሊቀ መላእክት ቅዱስ ሚካኤል የበገና መዝሙር በይፋ ለምዕመናን አቅርቧል።",
      descEn: "Our choir has released a sacred new Begena hymn dedicated to the Archangel St. Michael.",
      badge: "ዜና"
    },
    {
      id: 2,
      titleAm: "የበጎ አድራጎት ክፍሉ የድጋፍ ማሰባሰቢያ መርሐ ግብር",
      titleEn: "Charity Ministry Completes Fundraising Campaign",
      dateAm: "ነሐሴ 2026",
      dateEn: "August 2026",
      descAm: "በጎ አድራጎት ክፍላችን ለአዲሱ የትምህርት ዘመን ለተቸገሩ ተማሪዎች የደብተርና የትምህርት ቁሳቁስ ድጋፍ ማሰባሰብ በስኬት አጠናቋል።",
      descEn: "Successful back-to-school educational supply drive for children in vulnerable families.",
      badge: "በጎ አድራጎት"
    },
    {
      id: 3,
      titleAm: "የአብነትና የመዝሙር ተማሪዎች ዓመታዊ የምረቃ በዓል",
      titleEn: "Annual Graduation of Abnet & Choir Students",
      dateAm: "ሐምሌ 2026",
      dateEn: "July 2026",
      descAm: "የሦስት ዓመታት የዶግማ፣ የዜማና የሥርዓተ ቤተክርስቲያን ትምህርታቸውን ያጠናቀቁ ከ100 በላይ ተማሪዎች ተመርቀዋል።",
      descEn: "Over 100 students celebrated graduation after completing extensive curricula in liturgy and chant.",
      badge: "ምረቃ"
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
    // Generate sample text file simulation for instant clean download
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
              ? "የሰንበት ትምህርት ቤቱን ወቅታዊ ዜናዎች፣ የምስል ማዕከል እና ጠቃሚ የትምህርት ሰነዶች እዚህ ያገኛሉ" 
              : "Explore recent parish news, photo moments, and downloadable ecclesiastical guides"}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
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
              <span>{isAmharic ? "የምስል ማዕከል" : "Photo Gallery"}</span>
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

        {/* Tab 1: Photo Gallery */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden border-2 border-amber-500/30 hover:border-amber-400 shadow-xl bg-[#09201e] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={isAmharic ? item.captionAm : item.captionEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061514] via-[#061514]/30 to-transparent" />
                  <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow">
                    {isAmharic ? item.categoryAm : item.categoryEn}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-sm font-semibold text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {isAmharic ? item.captionAm : item.captionEn}
                  </p>
                </div>
              </div>
            ))}
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
    </section>
  );
};
