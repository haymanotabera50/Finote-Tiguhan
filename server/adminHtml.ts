export function renderAdminHtml(): string {
  return `<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ፍኖተ ትጉሃን — የጀርባ አስተዳደርና ዳታቤዝ ማዕከል (Backend Admin Portal)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Noto Sans Ethiopic', Nyala, 'Abyssinica SIL', sans-serif;
      background-color: #081716;
      color: #e2f1ee;
    }
    .gold-gradient {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
    .sacred-border {
      border-color: rgba(245, 158, 11, 0.35);
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #061110;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #0f3835;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #f59e0b;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col custom-scrollbar">

  <!-- TOP BRANDING & NAVIGATION BAR -->
  <header class="bg-[#050f0e] border-b border-amber-500/30 sticky top-0 z-50 shadow-xl backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-full border-2 border-amber-400 bg-[#0a2724] flex items-center justify-center shadow-lg shadow-amber-500/10">
          <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16L6 20.5L8 13.5L2.5 9H9.5L12 2Z" fill-rule="evenodd" clip-rule="evenodd" />
            <path d="M11 6h2v12h-2z" fill="#081716" />
            <path d="M7 10h10v2H7z" fill="#081716" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-amber-400 tracking-wider">የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን</div>
          <h1 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            ፍኖተ ትጉሃን ሰንበት ት/ቤት — የጀርባ አስተዳደርና ዳታቤዝ ማዕከል
            <span class="hidden md:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">Backend v1.0</span>
          </h1>
        </div>
      </div>

      <!-- Quick Frontend Portal Link -->
      <div class="flex items-center gap-3">
        <a id="btnLaunchFrontend" href="http://localhost:5173" target="_blank"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>ወደ ዋናው ድረ-ገጽ ሂድ (Port 5173)</span>
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN WRAPPER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">

    <!-- SYSTEM MONITOR & STATUS STRIP -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-[#0a2321] p-4 rounded-xl border border-emerald-700/50 shadow-md flex items-center justify-between">
        <div>
          <div class="text-xs text-emerald-300/80 font-medium">የሰርቨር ሁኔታ (Server Status)</div>
          <div class="text-lg font-bold text-emerald-400 flex items-center gap-2 mt-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Online (Port 5000)
          </div>
          <div class="text-[11px] text-emerald-200/60 font-mono mt-0.5">Express 5.x REST API</div>
        </div>
        <div class="p-3 bg-emerald-950/60 rounded-lg text-emerald-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div class="bg-[#0a2321] p-4 rounded-xl border border-amber-600/40 shadow-md flex items-center justify-between">
        <div>
          <div class="text-xs text-amber-300/80 font-medium">የዳታቤዝ ሁኔታ (Database Engine)</div>
          <div id="statDbEngine" class="text-base font-bold text-amber-300 mt-1">Checking...</div>
          <div id="statDbDetail" class="text-[11px] text-amber-200/60 mt-0.5">Auto-persisted local store</div>
        </div>
        <div class="p-3 bg-amber-950/60 rounded-lg text-amber-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        </div>
      </div>

      <div class="bg-[#0a2321] p-4 rounded-xl border border-blue-600/40 shadow-md flex items-center justify-between">
        <div>
          <div class="text-xs text-blue-300/80 font-medium">የተመዘገቡ ተማሪዎች (Registrations)</div>
          <div id="statRegCount" class="text-2xl font-black text-white mt-1">-</div>
          <div class="text-[11px] text-blue-300/70 mt-0.5 flex gap-2">
            <span id="statRegPending" class="text-amber-300 font-semibold">- የሚጠብቁ</span>
            <span id="statRegApproved" class="text-emerald-300 font-semibold">- የጸደቁ</span>
          </div>
        </div>
        <div class="p-3 bg-blue-950/60 rounded-lg text-blue-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-[#0a2321] p-4 rounded-xl border border-purple-600/40 shadow-md flex items-center justify-between">
        <div>
          <div class="text-xs text-purple-300/80 font-medium">የሰበካ ማስታወቂያ ባነር</div>
          <div id="statAnnouncement" class="text-base font-bold text-purple-300 mt-1">ንቁ (Active)</div>
          <div class="text-[11px] text-purple-200/60 mt-0.5">በሥራ አመራር ክፍል ቁጥጥር ስር</div>
        </div>
        <div class="p-3 bg-purple-950/60 rounded-lg text-purple-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- SECTION: ROLE LOGIN & SESSION AUTHENTICATOR -->
    <div class="bg-[#091f1c] rounded-2xl border border-amber-500/30 p-5 sm:p-6 shadow-xl">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-emerald-800/60">
        <div>
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            የአስተዳዳሪና የተጠቃሚ መለያ መግቢያ (Admin Authentication & Quick Select)
          </h2>
          <p class="text-xs text-emerald-200/70 mt-0.5">
            የሚፈልጉትን ክፍል ይምረጡ ወይም ኢሜይልዎን ያስገቡ። ወደ ዋናው ፖርታል (Port 5173) በቀጥታ በዚህ መለያ ይገባሉ!
          </p>
        </div>
        <div id="activeUserBadge" class="px-4 py-2 rounded-xl bg-[#0e332f] border border-amber-400/50 flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-amber-400 font-bold">አሁን የገቡበት መለያ (Active Session)</div>
            <div id="activeUserName" class="text-xs font-bold text-white">ሥራ አመራር ክፍል (ዋና አስተዳደር)</div>
          </div>
        </div>
      </div>

      <!-- Quick Role Preset Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
        <!-- 1. Leadership -->
        <button onclick="selectRole('leadership')" 
          class="role-card text-left p-3.5 rounded-xl border border-amber-500/60 bg-gradient-to-b from-amber-950/40 to-[#081b18] hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer group">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-amber-300">ሥራ አመራር ክፍል</span>
            <span class="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">ዋና ኃላፊ</span>
          </div>
          <div class="text-[11px] text-slate-300 font-mono">leadership@finoteteguhan.org</div>
          <div class="text-[10px] text-emerald-300/80 mt-1.5">
            • ሁሉንም ክፍላት ይመለከታል<br>
            • የራሱን ክፍል ብቻ ያርማል
          </div>
        </button>

        <!-- 2. Education -->
        <button onclick="selectRole('education')" 
          class="role-card text-left p-3.5 rounded-xl border border-blue-500/40 bg-gradient-to-b from-blue-950/30 to-[#081b18] hover:border-blue-400 transition-all cursor-pointer group">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-blue-300">ትምህርትና ስልጠና</span>
            <span class="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">አስተባባሪ</span>
          </div>
          <div class="text-[11px] text-slate-300 font-mono">education@finoteteguhan.org</div>
          <div class="text-[10px] text-blue-200/70 mt-1.5">
            • የትምህርት ክፍልን ብቻ ይመለከታል/ያርማል
          </div>
        </button>

        <!-- 3. Children -->
        <button onclick="selectRole('children')" 
          class="role-card text-left p-3.5 rounded-xl border border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-[#081b18] hover:border-rose-400 transition-all cursor-pointer group">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-rose-300">ሕጻናት ክፍል</span>
            <span class="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">አስተባባሪ</span>
          </div>
          <div class="text-[11px] text-slate-300 font-mono">children@finoteteguhan.org</div>
          <div class="text-[10px] text-rose-200/70 mt-1.5">
            • የሕፃናት ምድቦችን ብቻ ያስተዳድራል
          </div>
        </button>

        <!-- 4. Choir -->
        <button onclick="selectRole('choir')" 
          class="role-card text-left p-3.5 rounded-xl border border-yellow-500/40 bg-gradient-to-b from-yellow-950/30 to-[#081b18] hover:border-yellow-400 transition-all cursor-pointer group">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-yellow-300">መዝሙር ክፍል</span>
            <span class="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded border border-yellow-500/30">መሪ</span>
          </div>
          <div class="text-[11px] text-slate-300 font-mono">choir@finoteteguhan.org</div>
          <div class="text-[10px] text-yellow-200/70 mt-1.5">
            • የመዝሙርና የበገና ስልጠናን ይመራል
          </div>
        </button>

        <!-- 5. Student -->
        <button onclick="selectRole('student')" 
          class="role-card text-left p-3.5 rounded-xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-[#081b18] hover:border-emerald-400 transition-all cursor-pointer group">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold text-emerald-300">ተማሪ / አባል</span>
            <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">ዮሐንስ</span>
          </div>
          <div class="text-[11px] text-slate-300 font-mono">student@finoteteguhan.org</div>
          <div class="text-[10px] text-emerald-200/70 mt-1.5">
            • የግል መታወቂያ ካርድና መርሃ ግብር
          </div>
        </button>
      </div>

      <!-- Custom Login Inputs -->
      <form onsubmit="handleCustomLogin(event)" class="mt-4 pt-4 border-t border-emerald-900/60 flex flex-wrap items-center gap-3">
        <div class="text-xs font-semibold text-amber-300">ወይም በኢሜይል ይግቡ:</div>
        <input id="inputEmail" type="email" placeholder="email@finoteteguhan.org" required
          class="bg-[#051110] border border-emerald-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 min-w-[240px]">
        <input id="inputPassword" type="password" placeholder="የይለፍ ቃል (Password)"
          class="bg-[#051110] border border-emerald-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 min-w-[180px]">
        <button type="submit"
          class="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer">
          ይግቡ (Sign In)
        </button>
        <span id="loginFeedback" class="text-xs text-emerald-400 font-semibold ml-2"></span>
      </form>
    </div>

    <!-- MAIN TABS FOR DATABASE MANAGEMENT -->
    <div class="bg-[#091f1c] rounded-2xl border border-emerald-800/80 shadow-xl overflow-hidden">
      <!-- Tab Headers -->
      <div class="flex flex-wrap border-b border-emerald-800/60 bg-[#061413] px-4 pt-3 gap-2">
        <button onclick="switchTab('registrations')" id="tabBtn-registrations" 
          class="tab-btn px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 border-amber-400 text-amber-300 bg-[#0a2321] transition-all">
          📋 የተማሪዎች ምዝገባ (Registrations)
        </button>
        <button onclick="switchTab('announcement')" id="tabBtn-announcement" 
          class="tab-btn px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white transition-all">
          📢 የሰበካ ማስታወቂያ (Announcement)
        </button>
        <button onclick="switchTab('departments')" id="tabBtn-departments" 
          class="tab-btn px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white transition-all">
          🏛️ የክፍላት መመሪያ (Department Settings)
        </button>
        <button onclick="switchTab('contact')" id="tabBtn-contact" 
          class="tab-btn px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white transition-all">
          ✉️ የተላኩ መልዕክቶች (Messages)
        </button>
        <button onclick="switchTab('api')" id="tabBtn-api" 
          class="tab-btn px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white transition-all">
          ⚡ የኤ.ፒ.አይ መሞከሪያ (API Explorer)
        </button>
      </div>

      <!-- TAB 1: REGISTRATIONS -->
      <div id="tabContent-registrations" class="tab-pane p-5">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              የተመዘገቡ ተማሪዎች ዳታቤዝ
              <span id="badgeRegCount" class="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">0</span>
            </h3>
            <p class="text-xs text-emerald-200/60">በኦንላይን የተመዘገቡ አዳዲስ ተማሪዎች ዝርዝርና የፍቃድ ሁኔታ</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="fetchRegistrations()" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs font-semibold rounded-lg text-emerald-300 hover:text-white transition-all flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              ዳታ አድስ (Refresh)
            </button>
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-emerald-800/80 bg-[#061413]">
          <table class="w-full text-left text-xs">
            <thead class="bg-[#040e0d] text-emerald-300 border-b border-emerald-800/80">
              <tr>
                <th class="py-3 px-4 font-semibold">የምዝገባ ኮድ</th>
                <th class="py-3 px-4 font-semibold">ሙሉ ስም</th>
                <th class="py-3 px-4 font-semibold">የክርስትና ስም</th>
                <th class="py-3 px-4 font-semibold">ዕድሜ/ጾታ</th>
                <th class="py-3 px-4 font-semibold">ስልክ</th>
                <th class="py-3 px-4 font-semibold">የተመረጠው ክፍል</th>
                <th class="py-3 px-4 font-semibold">ሁኔታ</th>
                <th class="py-3 px-4 font-semibold text-right">እርምጃ</th>
              </tr>
            </thead>
            <tbody id="tableRegistrationsBody" class="divide-y divide-emerald-900/40 text-slate-200">
              <tr>
                <td colspan="8" class="text-center py-8 text-slate-400">ተማሪዎች በመጫን ላይ ናቸው...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 2: ANNOUNCEMENT -->
      <div id="tabContent-announcement" class="tab-pane hidden p-5">
        <div class="max-w-3xl space-y-4">
          <div>
            <h3 class="text-base font-bold text-white">የሰበካ አጠቃላይ ማስታወቂያ (Global Announcement Banner)</h3>
            <p class="text-xs text-emerald-200/70">በድረ-ገጹ አናት ላይ የሚለጠፍ ባነር። በሥራ አመራር ክፍል ብቻ የሚሻሻል።</p>
          </div>

          <form onsubmit="handleSaveAnnouncement(event)" class="space-y-4 bg-[#061413] p-5 rounded-xl border border-emerald-800/80">
            <div class="flex items-center gap-3">
              <input id="annEnabled" type="checkbox" class="w-4 h-4 rounded text-amber-500 focus:ring-0">
              <label for="annEnabled" class="text-xs font-bold text-white cursor-pointer">ማስታወቂያውን በድረ-ገጹ አናት ላይ በይፋ አሳይ (Show Banner)</label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-amber-300 mb-1">ባጅ / አርእስት (አማርኛ)</label>
                <input id="annBadgeAm" type="text" class="w-full bg-[#091f1c] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Badge (English)</label>
                <input id="annBadgeEn" type="text" class="w-full bg-[#091f1c] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white">
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-amber-300 mb-1">የማስታወቂያው ዝርዝር ጽሑፍ (አማርኛ)</label>
              <textarea id="annTextAm" rows="3" class="w-full bg-[#091f1c] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white"></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Announcement Text (English)</label>
              <textarea id="annTextEn" rows="2" class="w-full bg-[#091f1c] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white"></textarea>
            </div>

            <div class="flex items-center justify-between pt-2">
              <button type="submit" class="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer">
                በዳታቤዝ አስቀምጥ (Save Announcement)
              </button>
              <span id="annSaveFeedback" class="text-xs text-emerald-400 font-semibold"></span>
            </div>
          </form>
        </div>
      </div>

      <!-- TAB 3: DEPARTMENT SETTINGS -->
      <div id="tabContent-departments" class="tab-pane hidden p-5">
        <div class="mb-4">
          <h3 class="text-base font-bold text-white">የክፍላት መመሪያና ቅንብሮች (14 Departments)</h3>
          <p class="text-xs text-emerald-200/70">
            ሥራ አመራር ክፍል ሁሉንም መመልከት ይችላል፤ ማስተካከል የሚፈቀደው ግን ለራሱ ክፍል ብቻ ነው። ሌሎች ክፍላት የራሳቸውን ብቻ ማስተካከል ይችላሉ።
          </p>
        </div>
        <div id="departmentsContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Dynamically populated -->
        </div>
      </div>

      <!-- TAB 4: CONTACT MESSAGES -->
      <div id="tabContent-contact" class="tab-pane hidden p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-bold text-white">በድረ-ገጹ በኩል የተላኩ መልዕክቶች (Contact Messages)</h3>
            <p class="text-xs text-emerald-200/70">ምእመናንና ተማሪዎች ከድረ-ገጹ ቅጽ የላኳቸው ጥያቄዎችና አስተያየቶች</p>
          </div>
          <button onclick="fetchContactMessages()" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 text-xs font-semibold rounded-lg text-emerald-300 hover:text-white">
            አድስ (Refresh)
          </button>
        </div>
        <div id="contactMessagesContainer" class="space-y-3">
          <!-- Dynamically populated -->
        </div>
      </div>

      <!-- TAB 5: REST API EXPLORER -->
      <div id="tabContent-api" class="tab-pane hidden p-5">
        <div class="mb-4">
          <h3 class="text-base font-bold text-white">የኤ.ፒ.አይ መሞከሪያ ኮንሶል (REST API Explorer)</h3>
          <p class="text-xs text-emerald-200/70">የጀርባ ሰርቨር የREST ኤንድፖይንቶችን በቀጥታ ይሞክሩና ዳታውን ይመልከቱ</p>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          <button onclick="testApi('/api/health')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/health
          </button>
          <button onclick="testApi('/api/stats')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/stats
          </button>
          <button onclick="testApi('/api/auth/users')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/auth/users
          </button>
          <button onclick="testApi('/api/registrations')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/registrations
          </button>
          <button onclick="testApi('/api/announcement')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/announcement
          </button>
          <button onclick="testApi('/api/departments')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/departments
          </button>
          <button onclick="testApi('/api/contact')" class="px-3 py-1.5 bg-[#0a2724] border border-emerald-700 hover:border-amber-400 text-xs rounded-lg text-emerald-200 hover:text-white font-mono">
            GET /api/contact
          </button>
        </div>

        <div class="relative bg-[#040e0d] border border-emerald-900 rounded-xl p-4">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-emerald-900/60">
            <span id="apiEndpointTitle" class="text-xs font-mono text-amber-400">Endpoint: /api/health</span>
            <span id="apiStatusBadge" class="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">Status: 200 OK</span>
          </div>
          <pre id="apiOutput" class="text-xs font-mono text-emerald-300 overflow-x-auto max-h-96 custom-scrollbar">{ "status": "click an endpoint above to execute" }</pre>
        </div>
      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="bg-[#050f0e] border-t border-emerald-950 py-4 text-center text-xs text-emerald-400/60">
    የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን ፍኖተ ትጉሃን ሰንበት ት/ቤት — የጀርባ አስተዳደርና ኤ.ፒ.አይ ማዕከል
  </footer>

  <!-- CLIENT-SIDE SCRIPT -->
  <script>
    let activeRole = 'leadership';
    let activeDeptId = 'leadership';
    let registrationsData = [];

    const presetAccounts = {
      leadership: { name: 'ሥራ አመራር ክፍል (ዋና አስተዳደር)', email: 'leadership@finoteteguhan.org', role: 'leadership', dept: 'leadership' },
      education: { name: 'ትምህርትና ስልጠና አስተባባሪ', email: 'education@finoteteguhan.org', role: 'dept_admin', dept: 'education' },
      children: { name: 'ሕጻናት ክፍል አስተባባሪ', email: 'children@finoteteguhan.org', role: 'dept_admin', dept: 'children' },
      choir: { name: 'መዝሙር ክፍል መሪ', email: 'choir@finoteteguhan.org', role: 'dept_admin', dept: 'choir' },
      student: { name: 'ዮሐንስ ተስፋዬ (ተማሪ)', email: 'student@finoteteguhan.org', role: 'student', dept: 'children' }
    };

    function selectRole(key) {
      const user = presetAccounts[key];
      if (!user) return;
      activeRole = user.role;
      activeDeptId = user.dept;
      document.getElementById('activeUserName').textContent = user.name + ' (' + user.email + ')';
      document.getElementById('inputEmail').value = user.email;
      
      // Update launch button to pass active role to frontend
      const launchBtn = document.getElementById('btnLaunchFrontend');
      launchBtn.href = 'http://localhost:5173/?login=' + encodeURIComponent(key);
      
      document.getElementById('loginFeedback').textContent = '✅ መለያ ተቀይሯል፡ ' + user.name;
      setTimeout(() => { document.getElementById('loginFeedback').textContent = ''; }, 3000);

      // Re-fetch with new role headers
      fetchRegistrations();
      fetchDepartments();
    }

    async function handleCustomLogin(e) {
      e.preventDefault();
      const email = document.getElementById('inputEmail').value.trim();
      if (!email) return;

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const user = await res.json();
        activeRole = user.role || 'student';
        activeDeptId = user.departmentId || '';
        document.getElementById('activeUserName').textContent = (user.name || email) + ' (' + user.role + ')';
        
        const launchBtn = document.getElementById('btnLaunchFrontend');
        launchBtn.href = 'http://localhost:5173/?login=' + encodeURIComponent(email);
        
        document.getElementById('loginFeedback').textContent = '✅ ገብተዋል፡ ' + (user.name || email);
        setTimeout(() => { document.getElementById('loginFeedback').textContent = ''; }, 3000);

        fetchRegistrations();
        fetchDepartments();
      } catch (err) {
        document.getElementById('loginFeedback').textContent = '❌ ስህተት ተከስቷል';
      }
    }

    function switchTab(tabId) {
      document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-amber-400', 'text-amber-300', 'bg-[#0a2321]');
        btn.classList.add('border-transparent', 'text-slate-400');
      });

      const pane = document.getElementById('tabContent-' + tabId);
      const btn = document.getElementById('tabBtn-' + tabId);
      if (pane) pane.classList.remove('hidden');
      if (btn) {
        btn.classList.add('border-amber-400', 'text-amber-300', 'bg-[#0a2321]');
        btn.classList.remove('border-transparent', 'text-slate-400');
      }

      if (tabId === 'announcement') fetchAnnouncement();
      if (tabId === 'departments') fetchDepartments();
      if (tabId === 'contact') fetchContactMessages();
    }

    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        document.getElementById('statDbEngine').textContent = data.database?.name || 'Local Document Store';
        document.getElementById('statDbDetail').textContent = data.database?.connected ? 'MongoDB Atlas Online' : 'server/data/store.json';
        document.getElementById('statRegCount').textContent = data.registrations?.total ?? 0;
        document.getElementById('statRegPending').textContent = (data.registrations?.pending ?? 0) + ' የሚጠብቁ';
        document.getElementById('statRegApproved').textContent = (data.registrations?.approved ?? 0) + ' የጸደቁ';
        document.getElementById('statAnnouncement').textContent = data.announcement?.enabled ? 'ንቁ (Active)' : 'የቦዘነ (Off)';
      } catch (err) {
        document.getElementById('statDbEngine').textContent = 'Local Document Store';
      }
    }

    async function fetchRegistrations() {
      const tbody = document.getElementById('tableRegistrationsBody');
      try {
        const res = await fetch('/api/registrations', {
          headers: {
            'x-user-role': activeRole,
            'x-user-dept': activeDeptId
          }
        });
        registrationsData = await res.json();
        document.getElementById('badgeRegCount').textContent = registrationsData.length;

        if (!Array.isArray(registrationsData) || registrationsData.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-slate-400">ምንም የተመዘገበ ተማሪ አልተገኘም</td></tr>';
          return;
        }

        tbody.innerHTML = registrationsData.map(reg => {
          const id = reg.id || reg._id;
          const statusBadge = reg.status === 'approved' 
            ? '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">የጸደቀ</span>'
            : reg.status === 'rejected'
            ? '<span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">ተቀባይነት ያላገኘ</span>'
            : '<span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">በመጠባበቅ ላይ</span>';

          return \`
            <tr class="hover:bg-emerald-950/30 transition-colors">
              <td class="py-3 px-4 font-mono font-bold text-amber-400">\${reg.regCode || '-'}</td>
              <td class="py-3 px-4 font-medium text-white">\${reg.fullName || '-'}</td>
              <td class="py-3 px-4 text-emerald-200">\${reg.christianName || '-'}</td>
              <td class="py-3 px-4 text-slate-300">\${reg.age || '-'} / \${reg.gender === 'female' ? 'ሴት' : 'ወንድ'}</td>
              <td class="py-3 px-4 font-mono text-slate-300">\${reg.phone || '-'}</td>
              <td class="py-3 px-4 text-slate-300">\${reg.departmentId || '-'}</td>
              <td class="py-3 px-4">\${statusBadge}</td>
              <td class="py-3 px-4 text-right space-x-1.5">
                \${reg.status !== 'approved' ? \`<button onclick="updateRegStatus('\${id}', 'approved')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold">አጽድቅ</button>\` : ''}
                \${reg.status !== 'rejected' ? \`<button onclick="updateRegStatus('\${id}', 'rejected')" class="px-2 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded text-[11px]">ውድቅ አድርግ</button>\` : ''}
                <button onclick="deleteRegistration('\${id}')" class="px-2 py-1 bg-rose-900/60 hover:bg-rose-700 text-rose-200 rounded text-[11px]">አስወግድ</button>
              </td>
            </tr>
          \`;
        }).join('');
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-rose-400">መጫን አልተቻለም</td></tr>';
      }
    }

    async function updateRegStatus(id, status) {
      try {
        const res = await fetch('/api/registrations/' + id + '/status', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-role': activeRole,
            'x-user-dept': activeDeptId
          },
          body: JSON.stringify({ status })
        });
        if (res.ok) {
          fetchRegistrations();
          fetchStats();
        } else {
          const data = await res.json();
          alert(data.error || 'ስህተት ተከስቷል');
        }
      } catch (err) {
        alert('ኔትወርክ ስህተት');
      }
    }

    async function deleteRegistration(id) {
      if (!confirm('ይህ የተማሪ ምዝገባ ከዳታቤዝ እንዲሰረዝ እርግጠኛ ነዎት?')) return;
      try {
        const res = await fetch('/api/registrations/' + id, {
          method: 'DELETE',
          headers: {
            'x-user-role': activeRole,
            'x-user-dept': activeDeptId
          }
        });
        if (res.ok) {
          fetchRegistrations();
          fetchStats();
        } else {
          const data = await res.json();
          alert(data.error || 'ስህተት');
        }
      } catch (err) {
        alert('ኔትወርክ ስህተት');
      }
    }

    async function fetchAnnouncement() {
      try {
        const res = await fetch('/api/announcement');
        const ann = await res.json();
        document.getElementById('annEnabled').checked = ann.enabled !== false;
        document.getElementById('annBadgeAm').value = ann.badgeAm || '';
        document.getElementById('annBadgeEn').value = ann.badgeEn || '';
        document.getElementById('annTextAm').value = ann.textAm || '';
        document.getElementById('annTextEn').value = ann.textEn || '';
      } catch (err) {}
    }

    async function handleSaveAnnouncement(e) {
      e.preventDefault();
      const payload = {
        enabled: document.getElementById('annEnabled').checked,
        badgeAm: document.getElementById('annBadgeAm').value,
        badgeEn: document.getElementById('annBadgeEn').value,
        textAm: document.getElementById('annTextAm').value,
        textEn: document.getElementById('annTextEn').value,
        updatedBy: activeRole === 'leadership' ? 'ሥራ አመራር ክፍል' : activeRole
      };

      try {
        const res = await fetch('/api/announcement', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-user-role': activeRole,
            'x-user-dept': activeDeptId
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          document.getElementById('annSaveFeedback').textContent = '✅ ማስታወቂያው በዳታቤዝ ተቀምጧል!';
          fetchStats();
        } else {
          const err = await res.json();
          document.getElementById('annSaveFeedback').textContent = '❌ ' + (err.error || 'ፈቃድ የለዎትም');
        }
        setTimeout(() => { document.getElementById('annSaveFeedback').textContent = ''; }, 3500);
      } catch (err) {
        document.getElementById('annSaveFeedback').textContent = '❌ ኔትወርክ ስህተት';
      }
    }

    async function fetchDepartments() {
      const container = document.getElementById('departmentsContainer');
      try {
        const res = await fetch('/api/departments');
        const depts = await res.json();

        const deptKeys = [
          { id: 'leadership', name: 'ሥራ አመራር ክፍል' },
          { id: 'education', name: 'ትምህርትና ስልጠና ክፍል' },
          { id: 'children', name: 'ሕጻናት ክፍል' },
          { id: 'choir', name: 'መዝሙር ክፍል' },
          { id: 'counseling', name: 'የሕይወትና ምክር ክፍል' },
          { id: 'deacons', name: 'ዲያቆናትና አገልጋዮች' },
          { id: 'development', name: 'ልማትና ገቢ ማስገኛ' },
          { id: 'youth', name: 'ወጣቶች ክፍል' }
        ];

        container.innerHTML = deptKeys.map(d => {
          const item = depts[d.id] || {};
          const canEdit = (activeRole === 'leadership' && d.id === 'leadership') || 
                          (activeRole === 'dept_admin' && activeDeptId === d.id);

          return \`
            <div class="bg-[#061413] border border-emerald-800/80 rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between pb-2 border-b border-emerald-900/60">
                <h4 class="text-sm font-bold text-amber-300">\${d.name}</h4>
                <span class="text-[10px] px-2 py-0.5 rounded font-mono \${canEdit ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}">
                  \${canEdit ? 'ማስተካከል ይቻላል' : 'ተነባቢ ብቻ'}
                </span>
              </div>
              <div>
                <label class="block text-[11px] text-slate-400 mb-1">መሪ ቃል (Motto)</label>
                <input id="dept-motto-\${d.id}" type="text" value="\${item.mottoAm || ''}" \${!canEdit ? 'disabled' : ''}
                  class="w-full bg-[#091f1c] border border-emerald-900 rounded px-2.5 py-1 text-xs text-white disabled:opacity-60">
              </div>
              <div>
                <label class="block text-[11px] text-slate-400 mb-1">የስብሰባ ጊዜ (Meeting Time)</label>
                <input id="dept-meeting-\${d.id}" type="text" value="\${item.meetingTimeAm || ''}" \${!canEdit ? 'disabled' : ''}
                  class="w-full bg-[#091f1c] border border-emerald-900 rounded px-2.5 py-1 text-xs text-white disabled:opacity-60">
              </div>
              \${canEdit ? \`
                <button onclick="saveDepartment('\${d.id}')" class="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors">
                  አስቀምጥ (Save)
                </button>
              \` : ''}
            </div>
          \`;
        }).join('');
      } catch (err) {}
    }

    async function saveDepartment(deptId) {
      const motto = document.getElementById('dept-motto-' + deptId)?.value;
      const meeting = document.getElementById('dept-meeting-' + deptId)?.value;

      try {
        const res = await fetch('/api/departments/' + deptId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-user-role': activeRole,
            'x-user-dept': activeDeptId
          },
          body: JSON.stringify({ mottoAm: motto, meetingTimeAm: meeting })
        });
        if (res.ok) {
          alert('የክፍሉ መረጃ ተዘምኗል');
        } else {
          const data = await res.json();
          alert(data.error || 'ማስተካከል አልተፈቀደም');
        }
      } catch (err) {
        alert('ኔትወርክ ስህተት');
      }
    }

    async function fetchContactMessages() {
      const container = document.getElementById('contactMessagesContainer');
      try {
        const res = await fetch('/api/contact');
        const msgs = await res.json();
        if (!Array.isArray(msgs) || msgs.length === 0) {
          container.innerHTML = '<div class="text-center py-6 text-slate-400 text-xs">ምንም የተላከ መልዕክት የለም</div>';
          return;
        }

        container.innerHTML = msgs.map(m => \`
          <div class="bg-[#061413] border border-emerald-800/80 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-amber-300">\${m.name} (\${m.contactInfo})</span>
              <span class="text-[10px] text-slate-400 font-mono">\${new Date(m.createdAt || Date.now()).toLocaleDateString('am-ET')}</span>
            </div>
            <div class="text-xs font-semibold text-white mb-1">\${m.subject}</div>
            <p class="text-xs text-slate-300 bg-[#091f1c] p-2.5 rounded-lg border border-emerald-900">\${m.message}</p>
          </div>
        \`).join('');
      } catch (err) {
        container.innerHTML = '<div class="text-center py-6 text-slate-400 text-xs">መልዕክቶችን መጫን አልተቻለም</div>';
      }
    }

    async function testApi(endpoint) {
      document.getElementById('apiEndpointTitle').textContent = 'Endpoint: ' + endpoint;
      document.getElementById('apiStatusBadge').textContent = 'Calling...';
      const start = performance.now();
      try {
        const res = await fetch(endpoint, {
          headers: {
            'x-user-role': activeRole,
            'x-user-dept': activeDeptId
          }
        });
        const duration = Math.round(performance.now() - start);
        const json = await res.json();
        document.getElementById('apiStatusBadge').textContent = 'Status: ' + res.status + ' (' + duration + 'ms)';
        document.getElementById('apiOutput').textContent = JSON.stringify(json, null, 2);
      } catch (err) {
        document.getElementById('apiStatusBadge').textContent = 'Error';
        document.getElementById('apiOutput').textContent = 'Network or parsing error: ' + err.message;
      }
    }

    // Initial Load
    fetchStats();
    fetchRegistrations();
  </script>
</body>
</html>`;
}
