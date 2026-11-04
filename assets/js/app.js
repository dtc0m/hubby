/* HSW Hub — app shell behavior */
(function () {
  const HUB = window.HUB;
  const accountBtn = document.getElementById('accountBtn');
  const accountMenu = document.getElementById('accountMenu');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const menuToggle = document.getElementById('menuToggle');
  const themeToggle = document.getElementById('themeToggle');

  function currentAccount(){ return HUB.getActiveAccount(); }

  function renderAccountSwitcher(){
    const acc = currentAccount();
    if(accountBtn){
      accountBtn.innerHTML = `
        <span class="acc-avatar" style="background:${acc.color}">${acc.name.charAt(0)}</span>
        <span class="acc-info"><b>${acc.name}</b><small>${acc.handle}</small></span>
        <svg class="acc-caret" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    }
    if(accountMenu){
      accountMenu.innerHTML = HUB.ACCOUNTS.map(a=>`
        <button class="acc-option ${a.id===acc.id?'is-active':''}" data-account-id="${a.id}">
          <span class="acc-avatar" style="background:${a.color}">${a.name.charAt(0)}</span>
          <span class="acc-info"><b>${a.name}</b><small>${a.handle} · ${a.socials.filter(s=>s.connected).length} socials</small></span>
        </button>`).join('');
      accountMenu.querySelectorAll('[data-account-id]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          HUB.setActiveAccount(btn.dataset.accountId);
          accountMenu.hidden = true;
          location.reload();
        });
      });
    }
    // update any account-scoped labels
    document.querySelectorAll('[data-account-name]').forEach(el=>el.textContent=acc.name);
    document.querySelectorAll('[data-account-handle]').forEach(el=>el.textContent=acc.handle);
    document.querySelectorAll('[data-account-email]').forEach(el=>el.textContent=acc.email);
  }

  if(accountBtn && accountMenu){
    accountBtn.addEventListener('click', e=>{ e.stopPropagation(); accountMenu.hidden = !accountMenu.hidden; });
    document.addEventListener('click', e=>{ if(!accountMenu.contains(e.target) && e.target!==accountBtn) accountMenu.hidden=true; });
  }

  // mobile hamburger
  if(menuToggle && sidebar){
    menuToggle.addEventListener('click', ()=>{
      const open = sidebar.classList.toggle('is-open');
      if(backdrop) backdrop.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }
  if(backdrop){
    backdrop.addEventListener('click', ()=>{
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      if(menuToggle) menuToggle.setAttribute('aria-expanded','false');
    });
  }

  // dark mode
  const storedTheme = localStorage.getItem('hub.theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur==='dark'?'light':'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('hub.theme', next);
      themeToggle.textContent = next==='dark' ? '☀' : '☾';
    });
    themeToggle.textContent = storedTheme==='dark' ? '☀' : '☾';
  }

  // unread badge
  const acc = currentAccount();
  const unread = acc.inbox.filter(e=>!e.read && e.folder==='inbox').length;
  const badge = document.getElementById('inboxBadge');
  if(badge){ badge.textContent = unread; badge.hidden = unread===0; }

  renderAccountSwitcher();

  // mark active nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href===path) a.setAttribute('aria-current','page');
  });
})();
