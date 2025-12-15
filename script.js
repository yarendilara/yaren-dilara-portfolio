// Central client-side logic for projects, contact modal, and admin state
// Global error handlers to surface runtime issues during development
window.addEventListener('error', function (event) {
  console.error('Global error:', event.error || event.message);
});
window.addEventListener('unhandledrejection', function (event) {
  console.error('Unhandled Promise Rejection:', event.reason || event);
});
// Subtle cursor sparkle effect
(function(){
  const colors = ['#FFD54A', '#FFC107', '#FFE066', '#FFF2B2', '#FFF8D9'];
  const maxSparkles = 120;
  const live = new Set();
  function spawn(x,y){
    if(live.size > maxSparkles) return;
    const s = document.createElement('div');
    const size = 4 + Math.random()*6; // smaller sparkles
    s.className = 'sparkle';
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.background = colors[Math.floor(Math.random()*colors.length)];
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.opacity = '1';
    document.body.appendChild(s);
    live.add(s);
    const driftX = (Math.random()-0.5)*14; // slower, shorter drift
    const driftY = (Math.random()-0.5)*14;
    const scaleTo = 0.3 + Math.random()*0.3;
    const duration = 1100 + Math.random()*600; // longer life for slower feel
    const start = performance.now();
    function animate(now){
      const t = Math.min(1,(now-start)/duration);
      const ease = 1 - (1-t)*(1-t);
      s.style.transform = `translate(${driftX*ease}px, ${driftY*ease}px) scale(${1 - (1-scaleTo)*ease})`;
      s.style.opacity = `${1 * (1 - ease)}`;
      if(t < 1){ requestAnimationFrame(animate); }
      else { s.remove(); live.delete(s); }
    }
    requestAnimationFrame(animate);
  }
  let last = 0;
  window.addEventListener('pointermove', (e)=>{
    const now = performance.now();
    if(now - last < 12) return; // slightly faster spawn for more sparkles
    last = now;
    spawn(e.clientX, e.clientY);
  });
})();
const DEFAULT_PROJECTS = [
  {
    id: 'recommendation',
    title: 'Recommendation Model',
    desc: 'A lightweight collaborative filtering experiment using Python and Pandas to explore recommendation strategies.',
    stack: 'Python',
    date: '2024',
    url: 'projects/recommendation.html',
    thumb: 'assets/rec-model.svg',
    repo: 'https://github.com/your-username/recommendation-model'
  },
  {
    id: 'portfolio-cms',
    title: 'Portfolio CMS Mock',
    desc: 'Design-focused front-end for a personal content system showcasing editorial layouts and accessible forms.',
    stack: 'HTML, CSS',
    date: '2024',
    url: 'projects/portfolio-cms.html',
    thumb: 'assets/cms-mock.svg',
    repo: 'https://github.com/your-username/portfolio-cms-mock'
  },
  {
    id: 'db-visualization',
    title: 'Database Visualization',
    desc: 'An interactive visualization of database schema and relationships with a focus on usability and readability.',
    stack: 'D3, HTML, CSS',
    date: '2024',
    url: 'projects/db-visualization.html',
    thumb: 'assets/db-vis.svg',
    repo: 'https://github.com/your-username/db-visualization'
  }
];

// --- i18n (frontend-only) ---
const I18N = {
  en: {
    'nav.login': 'Log in',
    'nav.admin': 'Admin Panel',
    'hero.title': 'Yaren Dilara Çiftçi',
    'hero.subtitle': 'Studying IT (AI & Database) at VIZJA University — exploring software, AI, databases, and creative web development. This is where I share my projects and learning journey.',
    'buttons.explore': 'Explore Projects',
    'sections.projects': 'Projects',
    'contact.open': 'Contact',
    'contact.title': 'Contact',
    'contact.note': 'Have a question or want to collaborate? Send me a message — I will reply by email.',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'footer.copy': '© 2025 Yaren Dilara Çiftçi — Built with care'
  },
  tr: {
    'nav.login': 'Giriş yap',
    'nav.admin': 'Yönetim Paneli',
    'hero.title': 'Yaren Dilara Çiftçi',
    'hero.subtitle': 'VIZJA Üniversitesinde BT (Yapay Zekâ ve Veritabanı) öğrencisiyim — yazılım, yapay zekâ, veritabanları ve yaratıcı web geliştirme alanlarını keşfediyorum. Burada projelerimi ve öğrenme yolculuğumu paylaşıyorum.',
    'buttons.explore': 'Projeleri Keşfet',
    'sections.projects': 'Projeler',
    'contact.open': 'İletişim',
    'contact.title': 'İletişim',
    'contact.note': 'Bir sorunuz mu var ya da iş birliği yapmak ister misiniz? Bana bir mesaj gönderin — e‑posta ile yanıtlayacağım.',
    'contact.email': 'E‑posta',
    'contact.message': 'Mesaj',
    'contact.send': 'Mesaj Gönder',
    'footer.copy': '© 2025 Yaren Dilara Çiftçi — Sevgiyle hazırlandı'
  },
  pl: {
    'nav.login': 'Zaloguj się',
    'nav.admin': 'Panel Admina',
    'hero.title': 'Yaren Dilara Çiftçi',
    'hero.subtitle': 'Studiuję IT (AI & Bazy Danych) na Uniwersytecie VIZJA — odkrywam oprogramowanie, sztuczną inteligencję, bazy danych i kreatywny web. Tutaj dzielę się projektami i nauką.',
    'buttons.explore': 'Zobacz Projekty',
    'sections.projects': 'Projekty',
    'contact.open': 'Kontakt',
    'contact.title': 'Kontakt',
    'contact.note': 'Masz pytanie lub chcesz współpracować? Napisz do mnie — odpowiem e‑mailem.',
    'contact.email': 'E‑mail',
    'contact.message': 'Wiadomość',
    'contact.send': 'Wyślij Wiadomość',
    'footer.copy': '© 2025 Yaren Dilara Çiftçi — Zrobione z sercem'
  },
  ru: {
    'nav.login': 'Войти',
    'nav.admin': 'Панель Админа',
    'hero.title': 'Yaren Dilara Çiftçi',
    'hero.subtitle': 'Изучаю ИТ (ИИ и базы данных) в университете VIZJA — исследую софт, ИИ, базы данных и креативную веб‑разработку. Здесь я делюсь проектами и процессом обучения.',
    'buttons.explore': 'Смотреть проекты',
    'sections.projects': 'Проекты',
    'contact.open': 'Связаться',
    'contact.title': 'Связаться',
    'contact.note': 'Есть вопрос или хотите сотрудничать? Напишите мне — отвечу по электронной почте.',
    'contact.email': 'E‑mail',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить',
    'footer.copy': '© 2025 Yaren Dilara Çiftçi — Сделано с заботой'
  }
};

function getLang(){
  const saved = localStorage.getItem('lang');
  if(saved && I18N[saved]) return saved;
  const nav = (navigator.language || 'en').slice(0,2).toLowerCase();
  if(nav === 'tr') return 'tr';
  if(nav === 'pl') return 'pl';
  if(nav === 'ru') return 'ru';
  return 'en';
}
function setLang(l){
  if(!I18N[l]) return;
  localStorage.setItem('lang', l);
  applyI18N();
  renderNavBar();
}
function t(key){
  const l = getLang();
  return (I18N[l] && I18N[l][key]) || (I18N.en && I18N.en[key]) || '';
}
function applyI18N(){
  document.querySelectorAll('[data-i18n]').forEach(el =>{
    const key = el.getAttribute('data-i18n');
    if(!key) return;
    el.textContent = t(key);
  });
  // Update active state in language dropdown and toggle label
  const lang = getLang();
  document.querySelectorAll('.lang-switcher .lang-menu button').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  const toggle = document.getElementById('lang-toggle');
  if(toggle) toggle.textContent = lang.toUpperCase();
}

function getProjects(){
  const raw = localStorage.getItem('projects');
  if(!raw){
    localStorage.setItem('projects', JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
  try { return JSON.parse(raw); } catch(e){ return DEFAULT_PROJECTS; }
}

function saveProjects(projects){
  localStorage.setItem('projects', JSON.stringify(projects));
}

function renderProjects(){
  const root = document.getElementById('projects-grid');
  if(!root) return;
  const projects = getProjects();
  root.innerHTML = '';
  projects.forEach(p =>{
    const a = document.createElement('a');
    a.className = 'project-card';
    // Make links resolve correctly when rendered from admin pages
    const inAdmin = isAdminPath();
    a.href = inAdmin ? `../${p.url}` : p.url;
    a.innerHTML = `
      <img class="project-media" src="${p.thumb}" alt="${escapeHtml(p.title)}">
      <h3 class="project-title">${escapeHtml(p.title)}</h3>
      <p class="card-meta">${escapeHtml(p.stack)} • ${escapeHtml(p.date)}</p>
      <p class="project-desc">${escapeHtml(p.desc)}</p>
    `;
    root.appendChild(a);
  });
}

function escapeHtml(s){
  return String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

// Modal / Contact behavior
function initContactModal(){
  const openBtn = document.getElementById('contact-open');
  const closeBtn = document.getElementById('contact-close');
  const backdrop = document.getElementById('contact-modal');
  const form = document.getElementById('contact-modal-form');
  if(openBtn) openBtn.addEventListener('click', ()=> { if(backdrop) backdrop.classList.add('open'); });
  if(closeBtn) closeBtn.addEventListener('click', ()=> { if(backdrop) backdrop.classList.remove('open'); });
  if(backdrop) backdrop.addEventListener('click', e=>{
    if(e.target === backdrop) backdrop.classList.remove('open');
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && backdrop && backdrop.classList.contains('open')) backdrop.classList.remove('open');
  });
  if(form) form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = (document.getElementById('modal-email') || {}).value || '';
    const message = (document.getElementById('modal-message') || {}).value || '';
    if(!email || !message) return alert('Please fill in both fields');
    const now = new Date().toISOString();
    const messages = JSON.parse(localStorage.getItem('messages')||'[]');
    const msg = { id: Date.now().toString(36), email, message, date: now, archived: false };
    messages.unshift(msg);
    localStorage.setItem('messages', JSON.stringify(messages));
    // Optionally, open mail client if user prefers to send email as well. For now just show a simple confirmation.
    alert('Thanks — your message has been saved. I will reply by email.');
    backdrop.classList.remove('open');
    form.reset();
  });
}

// Login modal behavior - create and manage a reusable login popup
function initLoginModal(){
  // Avoid duplicating modal if it already exists or if the page already has a login form (e.g., login.html)
  if(document.getElementById('login-modal')) return;
  if(document.getElementById('login-form')) return;
  const backdrop = document.createElement('div');
  backdrop.id = 'login-modal';
  backdrop.className = 'modal-backdrop';
  backdrop.tabIndex = -1;
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button id="login-close" class="close" aria-label="Close">&times;</button>
      <h2>Admin Login</h2>
      <form id="login-form" class="login-form">
        <label class="form-field"><span>Username</span><input name="username" type="text" required></label>
        <label class="form-field"><span>Password</span><input name="password" type="password" required></label>
        <div class="form-actions"><button type="submit" class="button button-primary">Log in</button></div>
      </form>
    </div>
  `;
  document.body.appendChild(backdrop);
  // Close interactions
  const closeBtn = document.getElementById('login-close');
  const form = document.getElementById('login-form');
  backdrop.addEventListener('click', e=>{ if(e.target === backdrop) backdrop.classList.remove('open'); });
  if(closeBtn) closeBtn.addEventListener('click', ()=> backdrop.classList.remove('open'));
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape' && backdrop.classList.contains('open')) backdrop.classList.remove('open'); });
  // Expose open/close helpers for other code
  window.openLoginModal = function(){ backdrop.classList.add('open'); const input = backdrop.querySelector('input[name="username"]'); if(input) input.focus(); };
  window.closeLoginModal = function(){ backdrop.classList.remove('open'); };
}

function getMessages(){
  const raw = localStorage.getItem('messages') || '[]';
  let messages = [];
  try{ messages = JSON.parse(raw) } catch(e){ messages = []; }
  // Ensure normalization: ids and archived properties
  let mutated = false;
  messages = messages.map(m => {
    if(!m.id){ m.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6); mutated = true; }
    if(typeof m.archived === 'undefined'){ m.archived = false; mutated = true; }
    return m;
  });
  if(mutated) localStorage.setItem('messages', JSON.stringify(messages));
  return messages;
}

function saveMessages(messages){
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Explore button scroll
function initExploreBtn(){
  const btn = document.getElementById('explore-btn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const el = document.getElementById('projects');
    if(el) el.scrollIntoView({behavior:'smooth'});
  });
}

// Admin / Login
function isLoggedIn(){
  return sessionStorage.getItem('loggedIn') === 'true';
}

function isAdminPath(){
  const p = location.pathname || '';
  return p.includes('/admin/') || p.includes('\\admin\\') || p.endsWith('/admin') || p.endsWith('\\admin');
}

function renderNavBar(){
  const right = document.getElementById('nav-right');
  if(!right) return;
  right.innerHTML = '';
  // Language switcher: single button + dropdown
  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher';
  switcher.innerHTML = `
    <button id="lang-toggle" type="button" aria-haspopup="true" aria-expanded="false">${getLang().toUpperCase()}</button>
    <div class="lang-menu" role="menu">
      <button data-lang="tr" role="menuitem">TR</button>
      <button data-lang="en" role="menuitem">EN</button>
      <button data-lang="pl" role="menuitem">PL</button>
      <button data-lang="ru" role="menuitem">RU</button>
    </div>
  `;
  right.appendChild(switcher);
  const langToggle = switcher.querySelector('#lang-toggle');
  function openLang(){ switcher.classList.add('open'); langToggle.setAttribute('aria-expanded','true'); }
  function closeLang(){ switcher.classList.remove('open'); langToggle.setAttribute('aria-expanded','false'); }
  langToggle.addEventListener('click', (e)=>{ e.stopPropagation(); switcher.classList.toggle('open'); const expanded = switcher.classList.contains('open'); langToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false'); });
  // Click outside & ESC close
  document.addEventListener('click', (e)=>{ if(!switcher.contains(e.target)) closeLang(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLang(); });
  // Menu item clicks
  switcher.querySelectorAll('.lang-menu button').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); const code = btn.dataset.lang; setLang(code); closeLang(); });
  });
  if(isLoggedIn()){
    const drop = document.createElement('div');
    drop.className = 'admin-dropdown';
    const inAdmin = isAdminPath();
    const projectsHref = inAdmin ? 'projects.html' : 'admin/projects.html';
    const messagesHref = inAdmin ? 'messages.html' : 'admin/messages.html';
    drop.innerHTML = `
      <button id="admin-toggle">${t('nav.admin')}</button>
      <div class="admin-menu">
        <a href="${projectsHref}">Projects</a>
        <a href="${messagesHref}">Messages</a>
        <a href="${inAdmin ? 'profile.html' : 'admin/profile.html'}">Change Photo</a>
        <a href="#" id="logout">Logout</a>
      </div>
    `;
    right.appendChild(drop);
    const toggle = drop.querySelector('#admin-toggle');
    toggle.addEventListener('click', ()=> drop.classList.toggle('open'));
    drop.querySelector('#logout').addEventListener('click', e=>{ 
      e.preventDefault(); 
      sessionStorage.removeItem('loggedIn'); 
      // Always redirect to main page on logout
      if(location.pathname.includes('/admin/') || location.pathname.includes('\\admin\\') || !location.pathname.endsWith('index.html')){
        location.href = location.pathname.includes('/admin/') || location.pathname.includes('\\admin\\') ? '../index.html' : 'index.html';
      } else {
        renderNavBar(); 
        location.reload();
      }
    });
    // Quick-delete removed from admin dropdown to avoid accidental deletion; use the profile page instead.
  } else {
    const login = document.createElement('a');
    const loginHref = isAdminPath() ? '../login.html' : 'login.html';
    login.href = loginHref;
    login.textContent = t('nav.login');
    login.className = 'nav-login';
    // If JS modal exists, open it and prevent navigation; else, fallback to login page
    login.addEventListener('click', e=>{ e.preventDefault(); if(typeof window.openLoginModal === 'function'){ window.openLoginModal(); } else { location.href = loginHref; } });
    right.appendChild(login);
  }
}

// Profile photo helpers
function getProfilePhoto(){
  try{ return JSON.parse(localStorage.getItem('profilePhoto') || 'null'); } catch(e){ return null; }
}
function saveProfilePhoto(data){
  localStorage.setItem('profilePhoto', JSON.stringify(data));
}
function deleteProfilePhoto(){
  localStorage.removeItem('profilePhoto');
}

function renderProfilePhoto(){
  const data = getProfilePhoto();
  const heroImg = document.getElementById('hero-photo-img');
  const heroInitials = document.getElementById('hero-initials');
  if(heroImg && heroInitials){
    if(data && data.src){
      heroImg.src = data.src;
      heroImg.style.display = 'block';
      heroInitials.style.display = 'none';
    } else {
      heroImg.src = '';
      heroImg.style.display = 'none';
      heroInitials.style.display = 'block';
    }
  }
}

function initAdminProfilePage(){
  requireAdmin();
  const preview = document.getElementById('profile-photo-preview');
  const initials = document.getElementById('profile-initials');
  const fileInput = document.getElementById('profile-file');
  const saveBtn = document.getElementById('save-photo');
  const deleteBtn = document.getElementById('delete-photo');
  const form = document.getElementById('profile-form');
  function refreshPreview(){
    const data = getProfilePhoto();
    if(data && data.src){
      preview.src = data.src; preview.style.display = 'block'; initials.style.display = 'none';
    } else {
      preview.src = ''; preview.style.display = 'none'; initials.style.display = 'flex';
    }
  }
  refreshPreview();
  // Save handler
  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(!fileInput || !fileInput.files || !fileInput.files[0]){ return alert('Choose an image'); }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(){
      const src = reader.result;
      saveProfilePhoto({ src, name: file.name, date: new Date().toISOString() });
      refreshPreview();
      renderProfilePhoto();
      alert('Profile photo saved');
      fileInput.value = '';
    };
    reader.readAsDataURL(file);
  });
  // Delete handler
  deleteBtn.addEventListener('click', ()=>{
    if(!confirm('Delete profile photo?')) return;
    deleteProfilePhoto();
    refreshPreview();
    renderProfilePhoto();
  });
}

// Admin helpers for pages
function requireAdmin(){
  if(!isLoggedIn()){
    // If we have a login modal available, open it instead of redirecting.
    if(typeof window.openLoginModal === 'function'){
      window.openLoginModal();
      return;
    }
    // Fallback to the dedicated login page if modal is not available.
    const redirect = isAdminPath() ? '../login.html' : 'login.html';
    location.href = redirect;
  }
}

function initAdminProjectsPage(){
  requireAdmin();
  const list = document.getElementById('admin-project-list');
  const form = document.getElementById('admin-project-form');
  const photosInput = document.getElementById('admin-photos');
  const previews = document.getElementById('photo-previews');
  let currentPhotos = [];

  function renderPhotoPreviews(){
    if(!previews) return;
    if(!currentPhotos || !currentPhotos.length){
      previews.innerHTML = '<div class="muted">No photos selected</div>';
      return;
    }
    previews.innerHTML = currentPhotos.map(src => `<img class="photo-preview" src="${src}" alt="Selected photo">`).join('');
  }

  async function handlePhotosChange(e){
    const files = Array.from((e.target && e.target.files) || []);
    if(!files.length){ currentPhotos = []; renderPhotoPreviews(); return; }
    const readers = files.map(file => new Promise((resolve, reject)=>{
      const r = new FileReader();
      r.onload = ()=> resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    }));
    try {
      const results = await Promise.all(readers);
      currentPhotos = results;
      renderPhotoPreviews();
    } catch(err){ console.error('Photo read error', err); }
  }
  if(photosInput) photosInput.addEventListener('change', handlePhotosChange);
  function refresh(){
    const projects = getProjects();
    list.innerHTML = projects.map(p=>`
      <div class="admin-project-item" data-id="${p.id}">
        <strong>${p.title}</strong>
        <div>${p.stack} • ${p.date}</div>
        <div>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </div>`).join('');
    list.querySelectorAll('.edit').forEach((btn)=>{
      btn.addEventListener('click', e=>{
        const id = e.target.closest('.admin-project-item').dataset.id;
        const project = getProjects().find(p=>p.id===id);
        if(!project) return;
        // populate form
        form.querySelector('input[name="id"]').value = project.id;
        form.title.value = project.title;
        form.desc.value = project.desc;
        form.stack.value = project.stack;
        form.date.value = project.date;
        form.url.value = project.url;
        form.thumb.value = project.thumb;
        form.repo.value = project.repo;
        currentPhotos = Array.isArray(project.photos) ? project.photos.slice() : [];
        renderPhotoPreviews();
      });
    });
    list.querySelectorAll('.delete').forEach((btn)=>{
      btn.addEventListener('click', e=>{
        const id = e.target.closest('.admin-project-item').dataset.id;
        const projects = getProjects().filter(p=>p.id!==id);
        saveProjects(projects);
        refresh(); renderProjects();
      });
    });
  }
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const id = (form.querySelector('input[name="id"]').value) || Date.now().toString(36);
    const project = { id, title: form.title.value, desc: form.desc.value, stack: form.stack.value, date: form.date.value, url: form.url.value, thumb: form.thumb.value, repo: form.repo.value, photos: currentPhotos };
    const projects = getProjects();
    const existingIndex = projects.findIndex(p=>p.id===id);
    if(existingIndex >= 0) projects[existingIndex] = project; else projects.unshift(project);
    saveProjects(projects);
    form.reset();
    if(photosInput) photosInput.value = '';
    currentPhotos = [];
    renderPhotoPreviews();
    refresh(); renderProjects();
  });
  refresh();
  renderPhotoPreviews();
}

function initAdminMessagesPage(){
  requireAdmin();
  const list = document.getElementById('admin-message-list');
  const tabs = Array.from(document.querySelectorAll('.admin-tabs .tab'));
  let currentView = 'inbox';
  function setActiveTab(tabName){
    currentView = tabName;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    renderMessagesView();
  }
  tabs.forEach(t => t.addEventListener('click', ()=> setActiveTab(t.dataset.tab)));

  function renderMessagesView(){
    const messages = getMessages();
    const filtered = messages.filter(m => currentView === 'inbox' ? !m.archived : m.archived);
    if(!filtered.length){
      list.innerHTML = `<div class="admin-message-list empty">No ${currentView === 'inbox' ? 'new' : 'archived'} messages.</div>`;
      return;
    }
    list.innerHTML = filtered.map(m=>`
      <div class="admin-message-item ${m.archived ? 'admin-message-archived' : ''}" data-id="${m.id}">
        <div class="admin-message-meta">
          <div class="email">${escapeHtml(m.email)}</div>
          <div class="date muted">${new Date(m.date).toLocaleString()}</div>
        </div>
        <div class="admin-message-body">${escapeHtml(m.message)}</div>
        <div class="admin-message-actions">
          <label><input type="checkbox" class="archive-checkbox" ${m.archived ? 'checked' : ''}> Replied / Archive</label>
        </div>
      </div>`).join('');
    // Attach handlers
    list.querySelectorAll('.archive-checkbox').forEach(cb => cb.addEventListener('change', e=>{
      const id = e.target.closest('.admin-message-item').dataset.id;
      const messagesAll = getMessages();
      const idx = messagesAll.findIndex(x => x.id === id);
      if(idx === -1) return;
      messagesAll[idx].archived = e.target.checked;
      saveMessages(messagesAll);
      // Re-render both views when toggled
      renderMessagesView();
    }));
  }
  setActiveTab('inbox');
}

// Celebration sparkle rain effect for successful login
function sparkleRain(){
  const colors = ['#FFD54A', '#FFC107', '#FFE066', '#FFF2B2', '#FFF8D9', '#D81B60', '#F2A1B3'];
  const sparkleCount = 150;
  const duration = 3000;
  
  for(let i = 0; i < sparkleCount; i++){
    setTimeout(()=>{
      const s = document.createElement('div');
      const size = 6 + Math.random()*12;
      s.className = 'sparkle';
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.background = colors[Math.floor(Math.random()*colors.length)];
      s.style.left = `${Math.random()*100}%`;
      s.style.top = `-20px`;
      s.style.opacity = '1';
      document.body.appendChild(s);
      
      const fallDistance = window.innerHeight + 50;
      const fallDuration = 2000 + Math.random()*1500;
      const driftX = (Math.random()-0.5)*100;
      const rotation = Math.random()*720 - 360;
      const start = performance.now();
      
      function animate(now){
        const t = Math.min(1,(now-start)/fallDuration);
        const ease = t; // linear fall
        s.style.transform = `translate(${driftX*t}px, ${fallDistance*ease}px) rotate(${rotation*t}deg) scale(${1 - t*0.3})`;
        s.style.opacity = `${1 - t*0.5}`;
        if(t < 1){ requestAnimationFrame(animate); }
        else { s.remove(); }
      }
      requestAnimationFrame(animate);
    }, i * (duration / sparkleCount));
  }
}

// Login handler on login.html
function initLogin(){
  const form = document.getElementById('login-form');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    if(username === 'ydilara' && password === 'Di8551541'){
      sessionStorage.setItem('loggedIn','true');
      // If form is inside our login modal, just close the modal and re-render the nav
      const isModalForm = form.closest && form.closest('.modal-backdrop');
      if(isModalForm){ 
        if(typeof window.closeLoginModal === 'function') window.closeLoginModal(); 
        renderNavBar(); 
        sparkleRain();
        setTimeout(()=>alert('Hoş geldiniz! 🎉'), 300);
      }
      else { location.href = 'index.html'; }
    } else {
      alert('Incorrect credentials');
    }
  });
}

// Project gallery / image modal behavior across project pages
function initProjectGalleryModal(){
  const thumbs = Array.from(document.querySelectorAll('.project-thumb'));
  const mainImg = document.querySelector('.project-main-img');
  const backdrop = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const closeBtn = document.getElementById('image-modal-close');
  if(!backdrop || !modalImg) return; // nothing to do on non-project pages

  function open(src, alt){
    modalImg.src = src || '';
    modalImg.alt = alt || '';
    backdrop.classList.add('open');
    // put focus on close button if exists
    if(closeBtn) closeBtn.focus();
  }
  function close(){
    backdrop.classList.remove('open');
    modalImg.src = '';
    modalImg.alt = '';
  }

  // Thumbnails
  thumbs.forEach(img => img.addEventListener('click', e => {
    const target = e.currentTarget;
    const full = target.dataset.full || target.src;
    open(full, target.alt || '');
  }));

  // Main image (click to open full-size)
  if(mainImg) mainImg.addEventListener('click', ()=>{
    open(mainImg.src, mainImg.alt || '');
  });

  // Close interactions
  if(closeBtn) closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', e=>{ if(e.target === backdrop) close(); });
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape' && backdrop.classList.contains('open')) close(); });
}

// Continuous sparkle aura around profile photo on the main page
function initProfileSparkleAura(){
  const el = document.getElementById('hero-photo');
  if(!el) return; // only on index
  if(window.__profileAuraRunning) return;
  window.__profileAuraRunning = true;
  // track live sparkles to keep performance healthy
  window.__profileAuraCount = window.__profileAuraCount || 0;
  const MAX_AURA_SPARKLES = 220;

  const colors = ['#FFD54A', '#FFC107', '#FFE066', '#FFF2B2', '#FFF8D9', '#D81B60', '#F2A1B3'];

  function spawnAt(x, y){
    if(window.__profileAuraCount >= MAX_AURA_SPARKLES) return;
    const s = document.createElement('div');
    const size = 5 + Math.random()*8;
    s.className = 'sparkle';
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.background = colors[Math.floor(Math.random()*colors.length)];
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.opacity = '1';
    document.body.appendChild(s);
    window.__profileAuraCount++;
    const driftX = (Math.random()-0.5)*16;
    const driftY = (Math.random()-0.5)*16;
    const scaleTo = 0.55 + Math.random()*0.25;
    const duration = 850 + Math.random()*750;
    const start = performance.now();
    function animate(now){
      const t = Math.min(1,(now-start)/duration);
      const ease = 1 - (1-t)*(1-t);
      s.style.transform = `translate(${driftX*ease}px, ${driftY*ease}px) scale(${1 - (1-scaleTo)*ease})`;
      s.style.opacity = `${1 - ease}`;
      if(t < 1){ requestAnimationFrame(animate); }
      else { s.remove(); window.__profileAuraCount--; }
    }
    requestAnimationFrame(animate);
  }

  let angle = 0;
  const spawnPerTick = 7; // denser sparkle flow
  const tickMs = 70; // faster ticks

  function tick(){
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const r = Math.min(rect.width, rect.height)/2 + 12; // just outside circle
    for(let i=0;i<spawnPerTick;i++){
      const a = angle + (i*(Math.PI*2/spawnPerTick)) + (Math.random()*0.25);
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      spawnAt(x,y);
    }
    angle += 0.35;
  }

  const id = setInterval(()=>{
    if(document.hidden) return; // pause when tab is hidden
    tick();
  }, tickMs);
  window.addEventListener('beforeunload', ()=> clearInterval(id));
}

// Init on page load
document.addEventListener('DOMContentLoaded', ()=>{
  try {
  // Ensure the login modal is available before rendering the nav so login triggers a modal instead of a navigation.
  initLoginModal();
  renderNavBar();
  renderProjects();
  initContactModal();
  initExploreBtn();
  initLogin();
  applyI18N();
  // Project page modal
  initProjectGalleryModal();
  // Profile sparkle aura
  initProfileSparkleAura();
  // Admin pages hooks
  if(document.getElementById('admin-project-list')) initAdminProjectsPage();
  if(document.getElementById('admin-message-list')) initAdminMessagesPage();
  if(document.getElementById('profile-form')) initAdminProfilePage();
  if(document.getElementById('hero-photo-img')) renderProfilePhoto();
  } catch(err){
    console.error('Initialization error:', err);
    alert('Unexpected error during page initialization: ' + (err && err.message ? err.message : String(err)));
  }
  console.log('App initialization completed');
});

// Debug helper to log current app state quickly from the console
window.dumpState = function(){
  try{ console.log({ projects: getProjects(), messages: getMessages(), profilePhoto: getProfilePhoto(), loggedIn: isLoggedIn() }); } catch(e){ console.error('dumpState error', e); }
};

