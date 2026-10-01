import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCustomization } from '../../context/CustomizationContext';
import { FrontEndContent, CustomizationChangeRequest } from '../../types';
import { EthiopianCross } from '../common/EthiopianCross';
import { 
  Sparkles, CheckCircle2, Clock, AlertTriangle, Send, 
  Eye, Check, X, Shield, Megaphone, FileText, ArrowRight, 
  RotateCcw, Sliders, Globe, Layers, BookOpen, Newspaper,
  Palette, Edit3, Award, ExternalLink, RefreshCw
} from 'lucide-react';

interface MediaFrontEndCMSProps {
  onBackToDepartments?: () => void;
}

export const MediaFrontEndCMS: React.FC<MediaFrontEndCMSProps> = ({ onBackToDepartments }) => {
  const { currentUser } = useAuth();
  const { isAmharic } = useLanguage();
  const { 
    frontEndContent, 
    changeRequests, 
    pendingRequests, 
    submitChangeRequest, 
    approveChangeRequest, 
    rejectChangeRequest,
    directPublishFrontEndContent 
  } = useCustomization();

  const isLeadership = currentUser?.role === 'leadership';
  const isMediaAdmin = currentUser?.role === 'dept_admin' && currentUser?.departmentId === 'media';

  // Sub-tabs: 'editor' (Media draft form) | 'approvals' (Leadership queue) | 'history' (Log)
  const [activeTab, setActiveTab] = useState<'editor' | 'approvals' | 'history'>(
    isLeadership && pendingRequests.length > 0 ? 'approvals' : 'editor'
  );

  // Draft editing state
  const [draftContent, setDraftContent] = useState<FrontEndContent>({ ...frontEndContent });
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionNote, setSubmissionNote] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Leadership review remarks state
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Handle draft field updates
  const handleDraftChange = <K extends keyof FrontEndContent>(field: K, value: FrontEndContent[K]) => {
    setDraftContent(prev => ({ ...prev, [field]: value }));
  };

  // Submit proposal to Leadership
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle.trim()) return;

    submitChangeRequest(
      submissionTitle.trim(),
      submissionNote.trim(),
      draftContent,
      currentUser ? `${currentUser.name} (መገናኛ ብዙኃን ክፍል)` : "መገናኛ ብዙኃን ክፍል"
    );

    setShowSubmitModal(false);
    setSubmissionTitle('');
    setSubmissionNote('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
    setActiveTab('history');
  };

  // Leadership Approve & Publish Live
  const handleApprove = (reqId: string) => {
    approveChangeRequest(
      reqId,
      currentUser ? currentUser.name : "ሥራ አመራር ክፍል",
      reviewRemarks.trim() || "በሥራ አመራር ክፍል ጸድቆ በድረ-ገጹ ላይ በቀጥታ ታትሟል።"
    );
    setSelectedReviewId(null);
    setReviewRemarks('');
    setActionSuccessMessage(isAmharic ? "ማሻሻያው በሥራ አመራር ጸድቆ በዋናው ድረ-ገጽ ላይ በቀጥታ ታትሟል! ✅" : "Change approved and published live! ✅");
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  // Leadership Reject with Remarks
  const handleReject = (reqId: string) => {
    if (!reviewRemarks.trim()) {
      alert(isAmharic ? "እባክዎ የማስተካከያ አስተያየትዎን ይጻፉ።" : "Please provide feedback remarks.");
      return;
    }
    rejectChangeRequest(
      reqId,
      currentUser ? currentUser.name : "ሥራ አመራር ክፍል",
      reviewRemarks.trim()
    );
    setSelectedReviewId(null);
    setReviewRemarks('');
    setActionSuccessMessage(isAmharic ? "ማሻሻያው ማስተካከያ እንዲደረግበት ለመገናኛ ብዙኃን ክፍል ተመልሷል።" : "Revision requested from Media department.");
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  // Reset draft to current live content
  const handleResetDraft = () => {
    if (confirm(isAmharic ? "ረቂቁን ወደ ነበረበት ይፋዊ ይዘት መመለስ ይፈልጋሉ?" : "Reset draft to live content?")) {
      setDraftContent({ ...frontEndContent });
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Top Banner & Title */}
      <div className="p-6 rounded-3xl bg-[#09201e] border-2 border-emerald-900/80 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-800/30 border border-purple-500/40 text-purple-300 shrink-0 shadow-lg">
            <Sparkles size={32} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                📜 ምዕራፍ 6፣ አንቀጽ 7.2
              </span>
              <span className="text-xs text-emerald-300/80 font-medium">• መገናኛ ብዙኃን ክፍል & ሥራ አመራር ክፍል</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>{isAmharic ? "የፊት ገጽ ማበጃና ይዘት አስተዳደር (Front-End CMS)" : "Front-End Customization CMS"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/70 mt-1 max-w-3xl leading-relaxed">
              {isAmharic 
                ? "በመተዳደሪያ ደንቡ መሠረት መገናኛ ብዙኃን ክፍል የድረ-ገጹን ይዘትና ጥቅስ ያዘጋጃል፤ ሥራ አመራር ክፍል ሲያጸድቀው ወዲያውኑ በዋናው ድረ-ገጽ ላይ ይታተማል።" 
                : "The Media Department prepares front-end headlines and notices, and Executive Leadership approves them before live publishing."}
            </p>
          </div>
        </div>

        {/* Action Status Badge */}
        <div className="shrink-0 flex flex-wrap items-center gap-2">
          {pendingRequests.length > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold animate-pulse shadow">
              <Clock size={14} />
              <span>{isAmharic ? `${pendingRequests.length} ማጽደቅ የሚጠብቅ ጥያቄ` : `${pendingRequests.length} Pending Approval`}</span>
            </div>
          )}

          {isLeadership ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow">
              <Shield size={14} />
              <span>{isAmharic ? "የሥራ አመራር ማጽደቅ ሙሉ ሥልጣን" : "Executive Approval Authority"}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold shadow">
              <Edit3 size={14} />
              <span>{isAmharic ? "መገናኛ ብዙኃን (የይዘት አዘጋጅ)" : "Media Content Editor"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {submitSuccess && (
        <div className="p-4 rounded-2xl bg-amber-500/20 border-2 border-amber-500 text-amber-200 text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in duration-300">
          <Send size={20} className="text-amber-400 shrink-0" />
          <span>
            {isAmharic 
              ? "የፊት ገጽ ማሻሻያ ጥያቄዎ ለሥራ አመራር ክፍል በተሳካ ሁኔታ ቀርቧል! ሥራ አመራር ሲያጸድቀው ወዲያውኑ በድረ-ገጹ ላይ ይታተማል።" 
              : "Change request successfully submitted to Executive Leadership for approval!"}
          </span>
        </div>
      )}

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-emerald-900 bg-[#041211] rounded-2xl px-3 py-1 gap-2 overflow-x-auto text-xs font-semibold">
        {/* TAB 1: DRAFT EDITOR */}
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'editor'
              ? 'bg-amber-500 text-slate-950 font-black shadow'
              : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <Edit3 size={15} />
          <span>{isAmharic ? "✏️ የፊት ገጽ ማበጃ ረቂቅ" : "Front-End Draft Editor"}</span>
        </button>

        {/* TAB 2: LEADERSHIP APPROVALS QUEUE */}
        <button
          type="button"
          onClick={() => setActiveTab('approvals')}
          className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'approvals'
              ? 'bg-amber-500 text-slate-950 font-black shadow'
              : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <Shield size={15} />
          <span>{isAmharic ? "✅ የሥራ አመራር ይሁንታ ማጽደቂያ" : "Leadership Approval Queue"}</span>
          {pendingRequests.length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'approvals' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
            }`}>
              {pendingRequests.length}
            </span>
          )}
        </button>

        {/* TAB 3: HISTORY & LOGS */}
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'history'
              ? 'bg-amber-500 text-slate-950 font-black shadow'
              : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText size={15} />
          <span>{isAmharic ? "📜 የጥያቄዎችና የውሳኔዎች ታሪክ" : "Change History & Log"}</span>
          <span className="text-[10px] opacity-70">({changeRequests.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DRAFT EDITOR (መገናኛ ብዙኃን ክፍል የፊት ገጽ ይዘት ረቂቅ ማበጃ)            */}
      {/* ========================================================================= */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#09201e] border-2 border-emerald-900/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-400" />
                    <span>{isAmharic ? "የፊት ገጽ ይዘቶች ማስተካከያ" : "Live Front-End Content Settings"}</span>
                  </h3>
                  <p className="text-xs text-emerald-200/70">
                    {isAmharic ? "በመገናኛ ብዙኃን ክፍል ተዘጋጅቶ ለሥራ አመራር ማጽደቂያ የሚቀርብ" : "Customized by Media, submitted to Leadership"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetDraft}
                  className="px-3 py-1.5 rounded-xl bg-[#061514] border border-emerald-800 hover:border-amber-400 text-emerald-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  title={isAmharic ? "ረቂቁን ወደ ነበረበት መልስ" : "Reset Draft"}
                >
                  <RotateCcw size={13} />
                  <span>{isAmharic ? "ወደ ነበረበት መልስ" : "Reset"}</span>
                </button>
              </div>

              {/* 1. HERO SECTION & DAILY VERSE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <BookOpen size={15} />
                  <span>{isAmharic ? "1. የፊት ገጽ መሪ ቃልና ዕለታዊ ጥቅስ" : "1. Hero Banner & Daily Scripture"}</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "ዕለታዊ የመጽሐፍ ቅዱስ ጥቅስ (አማርኛ)" : "Daily Scripture Verse (Amharic)"}
                  </label>
                  <input
                    type="text"
                    value={draftContent.heroDailyVerseAm}
                    onChange={(e) => handleDraftChange('heroDailyVerseAm', e.target.value)}
                    placeholder="«እኔና ቤቴ ግን እግዚአብሔርን እናመልካለን።» (ኢያሱ 24:15)"
                    className="w-full px-3.5 py-2.5 bg-[#061514] border border-emerald-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "ዕለታዊ ጥቅስ (English)" : "Daily Scripture Verse (English)"}
                  </label>
                  <input
                    type="text"
                    value={draftContent.heroDailyVerseEn}
                    onChange={(e) => handleDraftChange('heroDailyVerseEn', e.target.value)}
                    placeholder="«As for me and my household, we will serve the Lord.» (Joshua 24:15)"
                    className="w-full px-3.5 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "የፊት ገጽ ንዑስ ርዕስ (Subheading)" : "Hero Subtitle"}
                  </label>
                  <input
                    type="text"
                    value={draftContent.heroSubtitleAm}
                    onChange={(e) => handleDraftChange('heroSubtitleAm', e.target.value)}
                    placeholder="መንፈሳዊ የትምህርትና አገልግሎት ማዕከል"
                    className="w-full px-3.5 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "የሰንበት ት/ቤቱ መግቢያ መግለጫ (Hero Description)" : "Parish Welcome Description"}
                  </label>
                  <textarea
                    rows={3}
                    value={draftContent.heroDescriptionAm}
                    onChange={(e) => handleDraftChange('heroDescriptionAm', e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                  />
                </div>
              </div>

              {/* 2. TOP ANNOUNCEMENT BANNER */}
              <div className="space-y-4 pt-4 border-t border-emerald-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <Megaphone size={15} />
                    <span>{isAmharic ? "2. የደብር አጠቃላይ ማስታወቂያ ሰሌዳ" : "2. Global Parish Notice Ticker"}</span>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-emerald-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftContent.announcementEnabled}
                      onChange={(e) => handleDraftChange('announcementEnabled', e.target.checked)}
                      className="w-4 h-4 accent-amber-500 cursor-pointer"
                    />
                    <span>{isAmharic ? "ማስታወቂያው ይብራ" : "Enable Notice Banner"}</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">
                      {isAmharic ? "የማስታወቂያው ባጅ (አማርኛ)" : "Badge Label (Amharic)"}
                    </label>
                    <input
                      type="text"
                      value={draftContent.announcementBadgeAm}
                      onChange={(e) => handleDraftChange('announcementBadgeAm', e.target.value)}
                      placeholder="አስቸኳይ ማስታወቂያ / የበዓል ጥሪ"
                      className="w-full px-3 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">
                      {isAmharic ? "የማስታወቂያው ባጅ (English)" : "Badge Label (English)"}
                    </label>
                    <input
                      type="text"
                      value={draftContent.announcementBadgeEn}
                      onChange={(e) => handleDraftChange('announcementBadgeEn', e.target.value)}
                      placeholder="PARISH NOTICE"
                      className="w-full px-3 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "የማስታወቂያው መልእክት (አማርኛ)" : "Announcement Message (Amharic)"}
                  </label>
                  <textarea
                    rows={2}
                    value={draftContent.announcementTextAm}
                    onChange={(e) => handleDraftChange('announcementTextAm', e.target.value)}
                    className="w-full px-3 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* 3. FEATURED HEADLINE & NEWS */}
              <div className="space-y-4 pt-4 border-t border-emerald-900">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Newspaper size={15} />
                  <span>{isAmharic ? "3. የዜናና መረጃ ድምቀት" : "3. Featured News & Headline Notice"}</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "ዓቢይ የዜና ርዕስ (አማርኛ)" : "Featured Headline (Amharic)"}
                  </label>
                  <input
                    type="text"
                    value={draftContent.newsHeadlineAm}
                    onChange={(e) => handleDraftChange('newsHeadlineAm', e.target.value)}
                    className="w-full px-3 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">
                    {isAmharic ? "ልዩ ማስታወቂያ (Featured Notice)" : "Featured Notice (Amharic)"}
                  </label>
                  <input
                    type="text"
                    value={draftContent.featuredNoticeAm}
                    onChange={(e) => handleDraftChange('featuredNoticeAm', e.target.value)}
                    className="w-full px-3 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* SUBMISSION / PUBLISHING BUTTONS */}
              <div className="pt-6 border-t border-emerald-900 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-emerald-300/70">
                  {isAmharic 
                    ? "📌 ለውጦቹ በሥራ አመራር ክፍል ሲፈቀዱ በቀጥታ ይታተማሉ" 
                    : "📌 Submissions must be approved by Leadership before publishing"}
                </div>

                <div className="flex items-center gap-3">
                  {/* Leadership Direct Publish Override */}
                  {isLeadership && (
                    <button
                      type="button"
                      onClick={() => {
                        directPublishFrontEndContent(draftContent, currentUser?.name || "ሥራ አመራር ክፍል");
                        setActionSuccessMessage(isAmharic ? "የሥራ አመራር ክፍል በቀጥታ በድረ-ገጹ ላይ አትሟል! ✅" : "Directly published live by Leadership! ✅");
                        setTimeout(() => setActionSuccessMessage(null), 4000);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <CheckCircle2 size={16} />
                      <span>{isAmharic ? "ቀጥታ አትም (የሥራ አመራር ሥልጣን)" : "Direct Publish Live"}</span>
                    </button>
                  )}

                  {/* Submit Proposal for Approval (Primary for Media Dept) */}
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Send size={16} />
                    <span>{isAmharic ? "ለሥራ አመራር ክፍል አቅርብ" : "Submit for Approval"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Live Draft Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#041211] border-2 border-amber-500/30 rounded-3xl p-5 shadow-2xl sticky top-20 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Eye size={16} />
                  <span>{isAmharic ? "የቀጥታ ረቂቅ ቅድመ-እይታ (Draft Preview)" : "Live Draft Preview"}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isAmharic ? "እውነተኛ ገጽታ" : "Simulated View"}
                </span>
              </div>

              {/* Preview 1: Announcement Ticker */}
              {draftContent.announcementEnabled ? (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs shadow">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[9px] uppercase font-extrabold">
                      {draftContent.announcementBadgeAm || "ማስታወቂያ"}
                    </span>
                    <span className="truncate">{draftContent.announcementTextAm || "የሰንበት ት/ቤት ማስታወቂያ"}</span>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-400 text-xs text-center border border-dashed border-slate-700">
                  {isAmharic ? "የአናት ማስታወቂያ ሰሌዳ ጠፍቷል" : "Notice banner is disabled"}
                </div>
              )}

              {/* Preview 2: Hero Banner Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0a2320] to-[#041211] border border-amber-500/40 text-center space-y-3 relative overflow-hidden shadow-inner">
                {/* Daily verse pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061514] border border-amber-500/40 text-amber-300 text-[11px] font-medium shadow">
                  <EthiopianCross size={12} variant="simple" className="text-amber-400" />
                  <span className="line-clamp-1">{draftContent.heroDailyVerseAm || "ዕለታዊ ጥቅስ"}</span>
                </div>

                <div>
                  <div className="text-[11px] text-amber-300 font-semibold tracking-wider uppercase">
                    የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን
                  </div>
                  <div className="text-lg font-black text-white leading-tight mt-1">
                    ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት
                  </div>
                  <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 mt-0.5">
                    {draftContent.heroSubtitleAm || "መንፈሳዊ የትምህርትና አገልግሎት ማዕከል"}
                  </div>
                </div>

                <p className="text-xs text-emerald-100/80 leading-relaxed line-clamp-3">
                  {draftContent.heroDescriptionAm || "የሰንበት ት/ቤታችን አጭር መግለጫ"}
                </p>

                <div className="pt-2 flex justify-center gap-2 text-xs">
                  <div className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    የተማሪዎች ምዝገባ
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#061514] border border-amber-500/30 text-amber-300 text-[10px]">
                    ትምህርቶች
                  </div>
                </div>
              </div>

              {/* Preview 3: Headline Notice */}
              <div className="p-3.5 rounded-2xl bg-[#061514] border border-emerald-900 space-y-1">
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  📰 ዓቢይ ዜናና መረጃ፦
                </div>
                <div className="text-xs font-bold text-white">
                  {draftContent.newsHeadlineAm || "አዲስ ዜና"}
                </div>
                <div className="text-[11px] text-emerald-300/80">
                  {draftContent.featuredNoticeAm || "ተጨማሪ ማስታወቂያ"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[11px] text-purple-300 flex items-start gap-2 leading-relaxed">
                <Sparkles size={14} className="shrink-0 mt-0.5 text-purple-400" />
                <span>
                  {isAmharic 
                    ? "እዚህ የሚያዩት ቅድመ-እይታ ሥራ አመራር ክፍል ሲያጸድቀው በድረ-ገጹ ላይ በትክክል የሚታየው ነው።" 
                    : "This preview simulates exactly what visitors will see once approved by Leadership."}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LEADERSHIP APPROVAL QUEUE (የሥራ አመራር ክፍል ይሁንታ ማጽደቂያ)           */}
      {/* ========================================================================= */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="bg-[#09201e] border-2 border-emerald-900/80 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="border-b border-emerald-900 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Shield size={20} className="text-amber-400" />
                  <span>{isAmharic ? "የሥራ አመራር ክፍል የይሁንታ ማጽደቂያ ሰሌዳ" : "Executive Leadership Approval Queue"}</span>
                </h3>
                <p className="text-xs text-emerald-200/70">
                  {isAmharic 
                    ? "ከመገናኛ ብዙኃን ክፍል የቀረቡ የፊት ገጽ ማሻሻያ ጥያቄዎችን መርምረው ያጽድቁ ወይም ማስተካከያ ያዝዙ" 
                    : "Review, approve, or request revisions for media front-end change requests"}
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                {isAmharic ? `ማጽደቅ የሚጠብቁ፦ ${pendingRequests.length}` : `Pending: ${pendingRequests.length}`}
              </div>
            </div>

            {/* List of Pending Requests */}
            {pendingRequests.length === 0 ? (
              <div className="py-12 text-center bg-[#061514] rounded-2xl border border-dashed border-emerald-900 space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-emerald-400/60" />
                <h4 className="text-sm font-bold text-white">
                  {isAmharic ? "በአሁኑ ሰዓት ማጽደቅ የሚጠብቅ የፊት ገጽ ማሻሻያ ጥያቄ የለም።" : "No pending change requests at this moment."}
                </h4>
                <p className="text-xs text-emerald-300/60">
                  {isAmharic 
                    ? "መገናኛ ብዙኃን ክፍል አዲስ ማሻሻያ ሲያቀርብ እዚህ ሰሌዳ ላይ ይቀርባል።" 
                    : "When the Media Department submits an update, it will appear here for your review."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingRequests.map((req) => (
                  <div 
                    key={req.id} 
                    className="p-5 rounded-2xl bg-[#041211] border-2 border-amber-500/50 shadow-xl space-y-5"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black uppercase">
                            ⏳ {isAmharic ? "ማጽደቅን የሚጠብቅ" : "Pending Review"}
                          </span>
                          <span className="text-xs font-mono text-emerald-400/80">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-white">{req.title}</h4>
                        <div className="text-xs text-emerald-300/80 mt-0.5">
                          <span>{isAmharic ? "ያቀረበው፦ " : "Submitted by: "}</span>
                          <span className="font-bold text-amber-300">{req.submittedBy}</span>
                        </div>
                      </div>

                      <div className="text-xs text-emerald-200/80 max-w-sm bg-[#061514] p-3 rounded-xl border border-emerald-800">
                        <div className="font-bold text-amber-400 text-[11px] mb-0.5">📝 የመገናኛ ብዙኃን ክፍል ማብራሪያ፦</div>
                        <div>{req.proposalNote || "ማብራሪያ አልተሰጠም።"}</div>
                      </div>
                    </div>

                    {/* Side-by-Side Comparison Diff */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers size={14} />
                        <span>{isAmharic ? "የይዘት ንጽጽር (የአሁኑ ይፋዊ ይዘት vs የቀረበው ረቂቅ)" : "Side-by-Side Content Comparison"}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Current Live Version */}
                        <div className="p-4 rounded-xl bg-[#081c19] border border-slate-700/80 space-y-2.5">
                          <div className="flex items-center justify-between font-bold text-slate-300 border-b border-slate-700 pb-1.5">
                            <span>🌐 {isAmharic ? "የአሁኑ ይፋዊ ይዘት (Live)" : "Current Live"}</span>
                            <span className="text-[10px] text-emerald-400">በቀጥታ ድረ-ገጹ ላይ ያለ</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">ዕለታዊ ጥቅስ፦</span>
                            <span className="text-slate-200 font-medium">{frontEndContent.heroDailyVerseAm}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">የፊት ገጽ ንዑስ ርዕስ፦</span>
                            <span className="text-slate-200">{frontEndContent.heroSubtitleAm}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">አጠቃላይ ማስታወቂያ፦</span>
                            <span className="text-slate-200">
                              [{frontEndContent.announcementBadgeAm}] {frontEndContent.announcementTextAm}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">ዓቢይ ዜና፦</span>
                            <span className="text-slate-200">{frontEndContent.newsHeadlineAm}</span>
                          </div>
                        </div>

                        {/* Proposed Draft by Media */}
                        <div className="p-4 rounded-xl bg-[#0b2925] border-2 border-amber-500/60 space-y-2.5 shadow-lg">
                          <div className="flex items-center justify-between font-bold text-amber-300 border-b border-amber-500/40 pb-1.5">
                            <span>✨ {isAmharic ? "መገናኛ ብዙኃን ያቀረበው ረቂቅ (Proposed)" : "Proposed by Media"}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                              አዲስ ማሻሻያ
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-amber-400/80 block">የቀረበው ዕለታዊ ጥቅስ፦</span>
                            <span className="text-white font-bold">{req.proposedContent.heroDailyVerseAm}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-amber-400/80 block">የቀረበው ንዑስ ርዕስ፦</span>
                            <span className="text-white">{req.proposedContent.heroSubtitleAm}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-amber-400/80 block">የቀረበው ማስታወቂያ፦</span>
                            <span className="text-white">
                              [{req.proposedContent.announcementBadgeAm}] {req.proposedContent.announcementTextAm}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-amber-400/80 block">የቀረበው ዓቢይ ዜና፦</span>
                            <span className="text-white">{req.proposedContent.newsHeadlineAm}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Feedback & Decision Controls */}
                    <div className="pt-3 border-t border-emerald-900/80 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? "የሥራ አመራር ክፍል ውሳኔ አስተያየት / ማስታወሻ (Feedback Remarks):" : "Leadership Decision Remarks:"}
                        </label>
                        <input
                          type="text"
                          value={selectedReviewId === req.id ? reviewRemarks : ''}
                          onChange={(e) => {
                            setSelectedReviewId(req.id);
                            setReviewRemarks(e.target.value);
                          }}
                          placeholder={isAmharic ? "ምሳሌ፦ ጸድቆ በድረ-ገጹ ላይ በቀጥታ ይለቀቅ ወይም ማስተካከያ ይደረግበት" : "Approval notes or revision guidance"}
                          className="w-full px-3.5 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                        {/* Reject / Request Revision Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReviewId(req.id);
                            handleReject(req.id);
                          }}
                          className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-500/50 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <X size={15} />
                          <span>{isAmharic ? "ማስተካከያ እንዲደረግበት መልስ" : "Request Revision"}</span>
                        </button>

                        {/* Approve and Publish Live Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReviewId(req.id);
                            handleApprove(req.id);
                          }}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all cursor-pointer"
                        >
                          <CheckCircle2 size={16} />
                          <span>{isAmharic ? "አጽድቅና በቀጥታ በድረ-ገጹ ላይ አትም" : "Approve & Publish Live"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HISTORY & LOGS (የጥያቄዎችና ውሳኔዎች ታሪክ)                                */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="bg-[#09201e] border-2 border-emerald-900/80 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-emerald-900 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-amber-400" />
                <span>{isAmharic ? "የፊት ገጽ ማሻሻያ ጥያቄዎችና የውሳኔዎች ታሪክ" : "Change Request Logs & History"}</span>
              </h3>
              <p className="text-xs text-emerald-200/70">
                {isAmharic ? "የቀረቡ፣ የጸደቁና ማስተካከያ የተጠየቀባቸው ጥያቄዎች ዝርዝር" : "Full record of submitted, approved, and revised requests"}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-300">
              {changeRequests.length} {isAmharic ? "ምዝገባዎች" : "records"}
            </span>
          </div>

          <div className="space-y-3">
            {changeRequests.map((req) => (
              <div 
                key={req.id}
                className="p-4 rounded-2xl bg-[#041211] border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      req.status === 'approved' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                        : req.status === 'rejected'
                        ? 'bg-rose-950 text-rose-300 border border-rose-700'
                        : 'bg-amber-950 text-amber-300 border border-amber-700'
                    }`}>
                      {req.status === 'approved' 
                        ? (isAmharic ? '✓ ጸድቆ የታተመ' : 'Approved & Live')
                        : req.status === 'rejected'
                        ? (isAmharic ? '✕ ማስተካከያ የተጠየቀበት' : 'Revision Requested')
                        : (isAmharic ? '⏳ ማጽደቅን የሚጠብቅ' : 'Pending Approval')}
                    </span>
                    <span className="font-bold text-white">{req.title}</span>
                  </div>

                  <div className="text-emerald-300/70 text-[11px]">
                    <span>ያቀረበው፦ {req.submittedBy} • </span>
                    <span>ቀን፦ {new Date(req.createdAt).toLocaleDateString()}</span>
                    {req.reviewedBy && (
                      <span> • የገመገመው፦ <strong className="text-amber-300">{req.reviewedBy}</strong></span>
                    )}
                  </div>

                  {req.reviewRemarks && (
                    <div className="text-[11px] text-amber-200/90 italic bg-[#061514] px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block">
                      💬 የሥራ አመራር አስተያየት፦ {req.reviewRemarks}
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400/60">
                    ID: {req.id.slice(0, 10)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMISSION MODAL (መገናኛ ብዙኃን ለሥራ አመራር ክፍል ሲያቀርብ)                       */}
      {/* ========================================================================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-[#09201e] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Send size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isAmharic ? "የፊት ገጽ ማሻሻያውን ለሥራ አመራር ክፍል ማቅረቢያ" : "Submit Proposal to Leadership"}
                  </h3>
                  <p className="text-xs text-emerald-200/70">
                    {isAmharic ? "የቀረበውን ረቂቅ ሥራ አመራር ክፍል መርምሮ ያጸድቀዋል" : "Leadership will inspect and approve before publishing"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-full text-emerald-300/60 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "የማሻሻያው ዓቢይ ርዕስ *" : "Proposal Title *"}
                </label>
                <input
                  type="text"
                  required
                  value={submissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  placeholder={isAmharic ? "ምሳሌ፦ የጥቅምት ወር የበዓላት መሪ ቃልና ጥቅስ ማሻሻያ" : "E.g., October Feast Scripture & Notice"}
                  className="w-full px-3.5 py-2.5 bg-[#061514] border border-emerald-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "የማብራሪያ ማስታወሻ (ለምን እንደተቀየረ)" : "Rationale / Explanation Note"}
                </label>
                <textarea
                  rows={3}
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  placeholder={isAmharic ? "ምሳሌ፦ ለመጪው የመስቀል በዓልና ለወጣቶች ዝማሬ ድምቀት እንዲሆን ተዘጋጅቷል" : "Reason for updates"}
                  className="w-full px-3.5 py-2 bg-[#061514] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-amber-400" />
                <span>
                  {isAmharic 
                    ? "ጥያቄው እንደተላከ ሥራ አመራር ክፍል በይሁንታ ሰሌዳው ላይ አይቶ ያጸድቀዋል፤ ከጸደቀ በኋላ በራስ-ሰር በዋናው ድረ-ገጽ ላይ ይታተማል።" 
                    : "Once submitted, Leadership will review and approve it to publish live."}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#061514] border border-emerald-800 text-emerald-300 text-xs font-semibold cursor-pointer"
                >
                  {isAmharic ? "ሰርዝ" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={14} />
                  <span>{isAmharic ? "አሁን አቅርብ" : "Submit Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
