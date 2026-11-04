/* HSW Hub — composer */
(function () {
  const HUB = window.HUB;
  const acc = HUB.getActiveAccount();
  const textarea = document.getElementById('composeText');
  const charCount = document.getElementById('charCount');
  const platGrid = document.getElementById('platGrid');
  const mediaToggle = document.getElementById('mediaToggle');
  const hasMediaEl = document.getElementById('hasMedia');
  const previewTabs = document.getElementById('previewTabs');
  const previewStage = document.getElementById('previewStage');
  const scheduleToggle = document.getElementById('scheduleToggle');
  const scheduleField = document.getElementById('scheduleField');

  let selected = new Set(acc.socials.filter(s=>s.connected).map(s=>s.platform));
  let hasMedia = false;

  function renderPlatGrid(){
    platGrid.innerHTML = acc.socials.map(s=>{
      const p = HUB.platform(s.platform);
      const on = selected.has(s.platform);
      return `<label class="plat-chip ${on?'is-on':''}" data-plat="${s.platform}">
        <input type="checkbox" ${on?'checked':''}>
        <span class="dot" style="background:${p.color}"></span>
        <span>${p.name}</span>
        <span class="handle">${s.handle}</span>
      </label>`;
    }).join('');
    platGrid.querySelectorAll('.plat-chip').forEach(chip=>{
      chip.addEventListener('click', e=>{
        e.preventDefault();
        const id = chip.dataset.plat;
        if(selected.has(id)) selected.delete(id); else selected.add(id);
        chip.classList.toggle('is-on', selected.has(id));
        chip.querySelector('input').checked = selected.has(id);
        renderPreviews();
      });
    });
  }

  function renderTabs(){
    const ids = [...selected];
    previewTabs.innerHTML = ids.map((id,i)=>`<button class="preview-tab ${i===0?'is-active':''}" data-tab="${id}">${HUB.platform(id).name}</button>`).join('') || '<span class="pv-empty">Select a platform to preview.</span>';
    previewTabs.querySelectorAll('.preview-tab').forEach(t=>{
      t.addEventListener('click', ()=>{ previewTabs.querySelectorAll('.preview-tab').forEach(x=>x.classList.remove('is-active')); t.classList.add('is-active'); showPreview(t.dataset.tab); });
    });
    if(ids.length) showPreview(ids[0]);
    else previewStage.innerHTML = '<div class="pv-empty">No platforms selected.</div>';
  }

  function showPreview(id){
    const text = textarea.value;
    previewStage.innerHTML = HUB.renderPreview(id, acc, text, hasMedia);
    // char warning
    const p = HUB.platform(id);
    const over = text.length > p.limit;
    const warn = document.getElementById('charWarn');
    if(warn){ warn.textContent = over ? `${text.length}/${p.limit} — over limit` : `${text.length}/${p.limit}`; warn.style.color = over ? '#e60023' : 'var(--muted-2)'; }
  }

  function renderPreviews(){ renderTabs(); updateCount(); }

  function updateCount(){
    charCount.textContent = textarea.value.length;
  }

  textarea.addEventListener('input', ()=>{ updateCount(); const active = previewTabs.querySelector('.preview-tab.is-active'); if(active) showPreview(active.dataset.tab); });
  if(mediaToggle){ mediaToggle.addEventListener('change', ()=>{ hasMedia = mediaToggle.checked; const active = previewTabs.querySelector('.preview-tab.is-active'); if(active) showPreview(active.dataset.tab); }); }
  if(hasMediaEl){ hasMediaEl.addEventListener('change', ()=>{ hasMedia = hasMediaEl.checked; const active = previewTabs.querySelector('.preview-tab.is-active'); if(active) showPreview(active.dataset.tab); }); }
  if(scheduleToggle && scheduleField){ scheduleToggle.addEventListener('change', ()=>{ scheduleField.hidden = !scheduleToggle.checked; }); }

  document.getElementById('postBtn')?.addEventListener('click', ()=>{
    const text = textarea.value.trim();
    if(!text){ alert('Write something first.'); return; }
    if(selected.size===0){ alert('Select at least one platform.'); return; }
    HUB.POSTS.unshift({ id:'p'+Date.now(), accountId:acc.id, text, platforms:[...selected], status: scheduleToggle?.checked ? 'scheduled' : 'published', createdAt:new Date().toISOString() });
    alert('Posted to '+selected.size+' platform(s). (mock)');
    textarea.value=''; selected.clear(); acc.socials.filter(s=>s.connected).forEach(s=>selected.add(s.platform));
    renderPlatGrid(); renderPreviews();
  });

  renderPlatGrid();
  renderPreviews();
})();
