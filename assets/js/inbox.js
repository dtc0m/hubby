/* HSW Hub — inbox */
(function () {
  const HUB = window.HUB;
  const acc = HUB.getActiveAccount();
  const foldersEl = document.getElementById('folders');
  const listEl = document.getElementById('emailList');
  const readerEl = document.getElementById('reader');
  const searchEl = document.getElementById('search');

  let folder = 'inbox';
  let activeId = null;
  let query = '';

  function filtered(){
    return acc.inbox.filter(e=>{
      if(e.folder!==folder) return false;
      if(!query) return true;
      const q = query.toLowerCase();
      return (e.subject+e.from+e.body).toLowerCase().includes(q);
    });
  }

  function renderFolders(){
    const counts = {};
    acc.inbox.forEach(e=>{ counts[e.folder]=(counts[e.folder]||0)+(e.read?0:1); });
    const items = [
      {id:'inbox',label:'Inbox'},
      {id:'sent',label:'Sent'},
      {id:'drafts',label:'Drafts'},
      {id:'archive',label:'Archive'}
    ];
    foldersEl.innerHTML = items.map(f=>`<div class="folder ${f.id===folder?'is-active':''}" data-folder="${f.id}">${f.label}${counts[f.id]?` <span style="color:var(--azure)">${counts[f.id]}</span>`:''}</div>`).join('');
    foldersEl.querySelectorAll('[data-folder]').forEach(el=>el.addEventListener('click',()=>{ folder=el.dataset.folder; activeId=null; render(); }));
  }

  function renderList(){
    const items = filtered();
    listEl.innerHTML = items.length ? items.map(e=>`
      <div class="email-item ${e.id===activeId?'is-active':''} ${e.read?'':'is-unread'}" data-id="${e.id}">
        <div class="subj">${e.read?'':'● '}<b>${e.subject}</b></div>
        <div class="prev">${e.body.replace(/\n/g,' ')}</div>
        <div class="meta"><span>${e.from}</span><span>${new Date(e.date).toLocaleDateString()}</span></div>
      </div>`).join('') : '<div class="pv-empty">No emails.</div>';
    listEl.querySelectorAll('[data-id]').forEach(el=>el.addEventListener('click',()=>{ activeId=el.dataset.id; const e=acc.inbox.find(x=>x.id===activeId); if(e) e.read=true; render(); }));
  }

  function renderReader(){
    const e = acc.inbox.find(x=>x.id===activeId);
    if(!e){ readerEl.innerHTML = '<div class="pv-empty">Select an email to read.</div>'; return; }
    readerEl.innerHTML = `
      <h2>${e.subject}</h2>
      <div class="meta">From ${e.from} &lt;${e.fromEmail||''}&gt; · ${new Date(e.date).toLocaleString()} · To ${e.to||acc.email}</div>
      <div class="body">${e.body}</div>
      <div class="email-actions">
        <button class="btn btn--ghost btn--sm" id="replyBtn">Reply</button>
        <button class="btn btn--ghost btn--sm" id="archiveBtn">Archive</button>
        <button class="btn btn--ghost btn--sm" id="deleteBtn">Delete</button>
      </div>`;
    document.getElementById('archiveBtn')?.addEventListener('click',()=>{ e.folder='archive'; activeId=null; render(); });
    document.getElementById('deleteBtn')?.addEventListener('click',()=>{ acc.inbox = acc.inbox.filter(x=>x.id!==e.id); activeId=null; render(); });
    document.getElementById('replyBtn')?.addEventListener('click',()=>{ alert('Reply composer (mock).'); });
  }

  function render(){ renderFolders(); renderList(); renderReader(); }
  if(searchEl) searchEl.addEventListener('input', e=>{ query=e.target.value; renderList(); });
  render();
})();
