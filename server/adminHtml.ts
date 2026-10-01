export function renderAdminHtml(): string {
  return `<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ፍኖተ ትጉሃን ሰንበት ት/ቤት - የ14ቱ ክፍላት የአስተዳደር ማዕከል (Admin Portal)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #061514;
      --card-bg: #09201e;
      --card-border: #134e4a;
      --gold: #f59e0b;
      --gold-hover: #d97706;
      --text: #e2f1ee;
      --text-muted: #99f6e4;
      --emerald: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Noto Sans Ethiopic', system-ui, sans-serif; }
    body { background-color: var(--bg); color: var(--text); min-height: 100vh; padding: 1.5rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--card-border); padding-bottom: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
    h1 { color: #ffffff; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
    h1 span.cross { color: var(--gold); }
    .subtitle { font-size: 0.85rem; color: #a7f3d0; margin-top: 0.25rem; }
    .badge { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    
    /* Navigation Tabs */
    .tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--card-border); padding-bottom: 0.5rem; overflow-x: auto; }
    .tab-btn { background: transparent; border: none; color: var(--text-muted); padding: 0.6rem 1.2rem; font-size: 0.85rem; font-weight: bold; border-radius: 0.75rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
    .tab-btn.active { background: var(--gold); color: #022c22; font-weight: 900; }
    .tab-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.05); color: #fff; }

    /* Department Selector Grid */
    .dept-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0.75rem; margin-bottom: 2rem; }
    .dept-pill { background: var(--card-bg); border: 1px solid var(--card-border); padding: 0.75rem 1rem; border-radius: 1rem; cursor: pointer; transition: all 0.2s; text-align: left; }
    .dept-pill:hover { border-color: var(--gold); transform: translateY(-2px); }
    .dept-pill.active { border-color: var(--gold); background: #0f3833; box-shadow: 0 0 15px rgba(245, 158, 11, 0.2); }
    .dept-pill .name { font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 0.2rem; }
    .dept-pill .code { font-size: 0.7rem; color: var(--gold); font-family: monospace; }

    /* Edit Form Card */
    .editor-card { background: var(--card-bg); border: 2px solid var(--card-border); border-radius: 1.5rem; padding: 2rem; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); }
    .editor-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--card-border); padding-bottom: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
    .editor-title { font-size: 1.25rem; font-weight: bold; color: #fff; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group.full { grid-column: 1 / -1; }
    label { font-size: 0.8rem; font-weight: 600; color: #fde68a; }
    input, textarea { background: #041211; border: 1px solid #134e4a; border-radius: 0.75rem; padding: 0.75rem 1rem; color: #fff; font-size: 0.85rem; outline: none; transition: border-color 0.2s; }
    input:focus, textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2); }
    textarea { min-height: 80px; resize: vertical; }

    .btn-save { background: linear-gradient(135deg, var(--gold), var(--gold-hover)); color: #022c22; font-weight: 900; border: none; border-radius: 0.75rem; padding: 0.75rem 2rem; cursor: pointer; font-size: 0.9rem; transition: transform 0.15s, box-shadow 0.15s; margin-top: 1.5rem; display: inline-flex; align-items: center; gap: 0.5rem; }
    .btn-save:hover { transform: scale(1.02); box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); }
    .btn-save:active { transform: scale(0.98); }

    /* Alert / Toast */
    #toast { position: fixed; bottom: 2rem; right: 2rem; background: #065f46; color: #fff; padding: 1rem 1.5rem; border-radius: 1rem; border: 1px solid #34d399; font-weight: bold; font-size: 0.85rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4); display: none; z-index: 1000; animation: slideUp 0.3s ease; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* Registrations Table */
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.8rem; }
    th { text-align: left; padding: 0.75rem; background: #041211; color: var(--gold); border-bottom: 1px solid var(--card-border); }
    td { padding: 0.75rem; border-bottom: 1px solid rgba(19, 78, 74, 0.5); }
    tr:hover { background: rgba(255, 255, 255, 0.02); }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1><span class="cross">✚</span> ፍኖተ ትጉሃን ሰንበት ት/ቤት - የአስተዳደር ማዕከል</h1>
        <div class="subtitle">የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን | 14ቱ ክፍላት ማስተዳደሪያ</div>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <span class="badge" id="dbStatus">● ሲስተሙ ዝግጁ ነው</span>
        <a href="http://localhost:5173" target="_blank" style="color: var(--gold); font-size: 0.8rem; text-decoration: none; font-weight: bold; border: 1px solid rgba(245, 158, 11, 0.4); padding: 0.35rem 0.8rem; border-radius: 9999px;">ወደ ድረ-ገጹ ሂድ ↗</a>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <div class="tabs">
      <button class="tab-btn active" onclick="switchMainTab('departments')">🏛️ የ14ቱ ክፍላት ማስተዳደሪያ (Departments)</button>
      <button class="tab-btn" onclick="switchMainTab('registrations')">📋 የተማሪዎች ምዝገባ (Registrations)</button>
      <button class="tab-btn" onclick="switchMainTab('announcement')">📢 አጠቃላይ ማስታወቂያ (Notice)</button>
    </div>

    <!-- TAB 1: 14 DEPARTMENTS MANAGER -->
    <div id="tab-departments">
      <div style="margin-bottom: 1rem; font-size: 0.85rem; color: #a7f3d0; font-weight: 600;">
        ለማስተካከል ከታች ካሉት 14 ክፍላት አንዱን ይምረጡ፦
      </div>
      <div class="dept-grid" id="deptPillsContainer">
        <!-- Rendered dynamically via JS -->
      </div>

      <div class="editor-card" id="editorCard">
        <div class="editor-header">
          <div>
            <div class="editor-title" id="selectedDeptTitle">ክፍል በመጫን ላይ...</div>
            <div style="font-size: 0.75rem; color: var(--gold);" id="selectedDeptSub">ምዕራፍ / አንቀጽ</div>
          </div>
          <div style="font-size: 0.75rem; color: #6ee7b7;" id="lastUpdated">የመጨረሻ ማሻሻያ፦ -</div>
        </div>

        <form id="deptForm" onsubmit="handleSaveDepartment(event)">
          <div class="form-grid">
            <div class="form-group full">
              <label>የክፍሉ መሪ ቃል / ጥቅስ (Motto & Bible Verse)</label>
              <input type="text" id="mottoAm" placeholder="ምሳሌ፦ «በመልካም ሥራ ሁሉ ፍሬ እያፈራችሁ» (ቆላ. 1:10)" />
            </div>

            <div class="form-group">
              <label>የመሰብሰቢያ ጊዜና ቀን (Meeting Time)</label>
              <input type="text" id="meetingTimeAm" placeholder="ምሳሌ፦ ቅዳሜ ከሰዓት 10:00 ሰዓት" />
            </div>

            <div class="form-group">
              <label>የመሰብሰቢያ ቦታ / አዳራሽ (Location)</label>
              <input type="text" id="meetingLocationAm" placeholder="ምሳሌ፦ የሰንበት ት/ቤት ዋና አዳራሽ" />
            </div>

            <div class="form-group">
              <label>የክፍሉ ተጠሪ / አስተባባሪ ስም (Coordinator Name)</label>
              <input type="text" id="contactPersonAm" placeholder="ምሳሌ፦ ዲ/ን ዮሐንስ (ዋና ጸሐፊ)" />
            </div>

            <div class="form-group">
              <label>ስልክ ቁጥር (Contact Phone)</label>
              <input type="text" id="contactPhone" placeholder="+251 91 123 4567" />
            </div>

            <div class="form-group full">
              <label>ወቅታዊ የክፍሉ ማስታወቂያ (Department Notice Board)</label>
              <textarea id="announcementAm" placeholder="ለክፍሉ አባላትና ለሰንበት ት/ቤት ተማሪዎች የሚተላለፍ ወቅታዊ መልዕክት..."></textarea>
            </div>
          </div>

          <button type="submit" class="btn-save">
            💾 ለውጦቹን አስቀምጥ (Save & Publish)
          </button>
        </form>
      </div>
    </div>

    <!-- TAB 2: REGISTRATIONS -->
    <div id="tab-registrations" style="display: none;">
      <div class="editor-card">
        <div class="editor-header">
          <div class="editor-title">የተማሪዎች ምዝገባ መዝገብ</div>
          <button class="btn-save" style="margin: 0; padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="loadRegistrations()">🔄 አድስ (Refresh)</button>
        </div>
        <div style="overflow-x: auto;">
          <table id="regTable">
            <thead>
              <tr>
                <th>መለያ ቁጥር</th>
                <th>ሙሉ ስም</th>
                <th>ክርስትና ስም</th>
                <th>ስልክ</th>
                <th>ምድብ</th>
                <th>ሁኔታ</th>
                <th>ድርጊት</th>
              </tr>
            </thead>
            <tbody id="regTableBody">
              <tr><td colspan="7" style="text-align:center; padding: 2rem;">መረጃዎችን በመጫን ላይ...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 3: GLOBAL ANNOUNCEMENT -->
    <div id="tab-announcement" style="display: none;">
      <div class="editor-card">
        <div class="editor-header">
          <div class="editor-title">አጠቃላይ የሰንበት ት/ቤት ማስታወቂያ (Top Parish Banner)</div>
        </div>
        <form id="annForm" onsubmit="handleSaveAnnouncement(event)">
          <div class="form-grid">
            <div class="form-group full">
              <label>የማስታወቂያው አርዕስት / ባጅ (Badge)</label>
              <input type="text" id="annBadgeAm" placeholder="አስቸኳይ ማስታወቂያ" />
            </div>
            <div class="form-group full">
              <label>የማስታወቂያው ዝርዝር ጽሑፍ (Announcement Text)</label>
              <textarea id="annTextAm" placeholder="የአዲስ ተማሪዎች ምዝገባ ተጀምሯል..."></textarea>
            </div>
          </div>
          <button type="submit" class="btn-save">💾 ማስታወቂያውን አትም (Publish Announcement)</button>
        </form>
      </div>
    </div>
  </div>

  <div id="toast">ለውጡ በተሳካ ሁኔታ ተቀምጧል!</div>

  <script>
    const departments = [
      { id: "leadership", nameAm: "ሥራ አመራር ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 3" },
      { id: "audit", nameAm: "ኦዲትና ኢንስፔክሽን ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 5" },
      { id: "development", nameAm: "ልማትና ገቢ ማሰባሰቢያ ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 6" },
      { id: "education", nameAm: "ትምህርትና ስልጠና ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 7" },
      { id: "apostolic", nameAm: "ሐዋርያዊ አገልግሎት ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 8" },
      { id: "choir", nameAm: "መዘምራን ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 9" },
      { id: "charity", nameAm: "በጎ አድራጎትና ማኅበራዊ ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 10" },
      { id: "finance", nameAm: "ሒሳብና በጀት ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 11" },
      { id: "media", nameAm: "ሚዲያና ግንኙነት ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 12" },
      { id: "counseling", nameAm: "ምክርና ክትትል ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 13" },
      { id: "members", nameAm: "የአባላት ጉዳይና አደረጃጀት", ref: "ምዕራፍ 3፣ አንቀጽ 14" },
      { id: "children", nameAm: "ሕጻናት ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 15" },
      { id: "abnet", nameAm: "አብነትና ዜማ ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 16" },
      { id: "arts", nameAm: "ሥነ-ጥበባት ክፍል", ref: "ምዕራፍ 3፣ አንቀጽ 17" },
      { id: "institutions", nameAm: "ተቋማትና ንብረት አስተዳደር", ref: "ምዕራፍ 3፣ አንቀጽ 18" }
    ];

    let currentDeptId = "leadership";
    let departmentsData = {};

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    function switchMainTab(tab) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('tab-departments').style.display = tab === 'departments' ? 'block' : 'none';
      document.getElementById('tab-registrations').style.display = tab === 'registrations' ? 'block' : 'none';
      document.getElementById('tab-announcement').style.display = tab === 'announcement' ? 'block' : 'none';

      if (tab === 'registrations') loadRegistrations();
      if (tab === 'announcement') loadAnnouncement();
    }

    function renderDeptPills() {
      const container = document.getElementById('deptPillsContainer');
      container.innerHTML = '';
      departments.forEach(dept => {
        const pill = document.createElement('div');
        pill.className = 'dept-pill ' + (dept.id === currentDeptId ? 'active' : '');
        pill.onclick = () => selectDepartment(dept.id);
        pill.innerHTML = '<div class="name">' + dept.nameAm + '</div><div class="code">' + dept.ref + '</div>';
        container.appendChild(pill);
      });
    }

    function selectDepartment(deptId) {
      currentDeptId = deptId;
      renderDeptPills();
      const meta = departments.find(d => d.id === deptId);
      document.getElementById('selectedDeptTitle').innerText = meta.nameAm;
      document.getElementById('selectedDeptSub').innerText = meta.ref;

      const data = departmentsData[deptId] || {};
      document.getElementById('mottoAm').value = data.mottoAm || '';
      document.getElementById('meetingTimeAm').value = data.meetingTimeAm || '';
      document.getElementById('meetingLocationAm').value = data.meetingLocationAm || '';
      document.getElementById('contactPersonAm').value = data.contactPersonAm || '';
      document.getElementById('contactPhone').value = data.contactPhone || '';
      document.getElementById('announcementAm').value = data.announcementAm || '';
      document.getElementById('lastUpdated').innerText = 'የመጨረሻ ማሻሻያ፦ ' + (data.updatedAt ? new Date(data.updatedAt).toLocaleString('am-ET') : 'አዲስ');
    }

    async function loadDepartments() {
      try {
        const res = await fetch('/api/departments');
        departmentsData = await res.json();
        selectDepartment(currentDeptId);
      } catch (err) {
        console.error(err);
      }
    }

    async function handleSaveDepartment(e) {
      e.preventDefault();
      const payload = {
        mottoAm: document.getElementById('mottoAm').value,
        meetingTimeAm: document.getElementById('meetingTimeAm').value,
        meetingLocationAm: document.getElementById('meetingLocationAm').value,
        contactPersonAm: document.getElementById('contactPersonAm').value,
        contactPhone: document.getElementById('contactPhone').value,
        announcementAm: document.getElementById('announcementAm').value
      };

      try {
        const res = await fetch('/api/departments/' + currentDeptId, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'x-user-role': 'admin'
          },
          body: JSON.stringify(payload)
        });
        const updated = await res.json();
        departmentsData[currentDeptId] = updated;
        showToast('የ' + departments.find(d => d.id === currentDeptId).nameAm + ' መረጃ በተሳካ ሁኔታ ተቀምጧል! ✓');
        selectDepartment(currentDeptId);
      } catch (err) {
        alert('ማስቀመጥ አልተቻለም፦ ' + err.message);
      }
    }

    async function loadRegistrations() {
      try {
        const res = await fetch('/api/registrations');
        const list = await res.json();
        const tbody = document.getElementById('regTableBody');
        tbody.innerHTML = '';
        if (list.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">ምንም የተመዘገበ ተማሪ የለም</td></tr>';
          return;
        }
        list.forEach(r => {
          const tr = document.createElement('tr');
          const id = r._id || r.id;
          tr.innerHTML = '<td><b>' + (r.regCode || id) + '</b></td>' +
            '<td>' + (r.fullName || '') + '</td>' +
            '<td>' + (r.christianName || '-') + '</td>' +
            '<td>' + (r.phone || '-') + '</td>' +
            '<td>' + (r.category || 'ሕጻናት') + '</td>' +
            '<td><span class="badge">' + r.status + '</span></td>' +
            '<td>' +
              (r.status === 'pending' 
                ? '<button onclick="updateRegStatus(\\'' + id + '\\', \\'approved\\')" style="background:#10b981;color:#000;border:none;padding:0.25rem 0.6rem;border-radius:0.4rem;font-weight:bold;cursor:pointer;">አጽድቅ</button>' 
                : '✓ ጸድቋል') +
            '</td>';
          tbody.appendChild(tr);
        });
      } catch (err) {
        console.error(err);
      }
    }

    async function updateRegStatus(id, status) {
      try {
        await fetch('/api/registrations/' + id + '/status', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-user-role': 'admin' },
          body: JSON.stringify({ status })
        });
        showToast('የተማሪው ምዝገባ ጸድቋል! ✓');
        loadRegistrations();
      } catch (err) {
        alert(err.message);
      }
    }

    async function loadAnnouncement() {
      try {
        const res = await fetch('/api/announcement');
        const ann = await res.json();
        if (ann) {
          document.getElementById('annBadgeAm').value = ann.badgeAm || '';
          document.getElementById('annTextAm').value = ann.textAm || '';
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function handleSaveAnnouncement(e) {
      e.preventDefault();
      try {
        await fetch('/api/announcement', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-user-role': 'admin' },
          body: JSON.stringify({
            badgeAm: document.getElementById('annBadgeAm').value,
            textAm: document.getElementById('annTextAm').value,
            enabled: true
          })
        });
        showToast('ማስታወቂያው በተሳካ ሁኔታ ታትሟል! ✓');
      } catch (err) {
        alert(err.message);
      }
    }

    // Initialize on page load
    renderDeptPills();
    loadDepartments();
  </script>
</body>
</html>`;
}
