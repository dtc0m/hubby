/* HSW Hub — per-platform preview renderers */
(function () {
  function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function trunc(s,n){ s=String(s||''); return s.length>n ? s.slice(0,n-1)+'…' : s; }
  function avatar(name,color){ return `<span class="pv-avatar" style="background:${color}">${esc(name.charAt(0).toUpperCase())}</span>`; }
  function mediaBlock(media, ratio){
    if(!media) return '';
    return `<div class="pv-media" style="aspect-ratio:${ratio}"><span>Image</span></div>`;
  }
  const P = window.HUB.PLATFORMS;
  function meta(id){ return P.find(p=>p.id===id); }

  const renderers = {
    x: (acc,text,media) => `
      <div class="pv-card pv-x">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>${esc(acc.handle)} · now</span></div></div>
        <p class="pv-text">${esc(trunc(text,280))}</p>
        ${mediaBlock(media,'16/9')}
        <div class="pv-actions"><span>Reply</span><span>Repost</span><span>Like</span><span>Views</span></div>
      </div>`,
    instagram: (acc,text,media) => `
      <div class="pv-card pv-ig">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.handle)}</b><span>Sponsored</span></div></div>
        ${mediaBlock(media,'1/1')}
        <div class="pv-actions"><span>♥</span><span>💬</span><span>↗</span></div>
        <p class="pv-text"><b>${esc(acc.handle)}</b> ${esc(trunc(text,2200))}</p>
      </div>`,
    facebook: (acc,text,media) => `
      <div class="pv-card pv-fb">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>Just now · 🌍</span></div></div>
        <p class="pv-text">${esc(trunc(text,63206))}</p>
        ${mediaBlock(media,'16/9')}
        <div class="pv-actions"><span>Like</span><span>Comment</span><span>Share</span></div>
      </div>`,
    linkedin: (acc,text,media) => `
      <div class="pv-card pv-li">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>Company · 1st</span></div></div>
        <p class="pv-text">${esc(trunc(text,3000))}</p>
        ${mediaBlock(media,'1.91/1')}
        <div class="pv-actions"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div>
      </div>`,
    tiktok: (acc,text,media) => `
      <div class="pv-card pv-tt">
        <div class="pv-video">${mediaBlock(media,'9/16')}<div class="pv-tt-overlay"><b>${esc(acc.handle)}</b><p>${esc(trunc(text,150))}</p></div></div>
      </div>`,
    youtube: (acc,text,media) => `
      <div class="pv-card pv-yt">
        ${mediaBlock(media,'16/9')}
        <div class="pv-head" style="margin-top:8px">${avatar(acc.name,acc.color)}<div><b>${esc(trunc(text,100))}</b><span>${esc(acc.name)} · 0 views</span></div></div>
      </div>`,
    threads: (acc,text,media) => `
      <div class="pv-card pv-th">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>${esc(acc.handle)}</span></div></div>
        <p class="pv-text">${esc(trunc(text,500))}</p>
        ${mediaBlock(media,'4/3')}
        <div class="pv-actions"><span>Like</span><span>Reply</span><span>Repost</span><span>Share</span></div>
      </div>`,
    pinterest: (acc,text,media) => `
      <div class="pv-card pv-pin">
        ${mediaBlock(media,'2/3')}
        <p class="pv-text pv-pin-title">${esc(trunc(text,100))}</p>
        <span class="pv-sub">${esc(acc.name)}</span>
      </div>`,
    bluesky: (acc,text,media) => `
      <div class="pv-card pv-bs">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>${esc(acc.handle)}</span></div></div>
        <p class="pv-text">${esc(trunc(text,300))}</p>
        ${mediaBlock(media,'16/9')}
        <div class="pv-actions"><span>Reply</span><span>Repost</span><span>Like</span></div>
      </div>`,
    mastodon: (acc,text,media) => `
      <div class="pv-card pv-ma">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>${esc(acc.handle)}</span></div></div>
        <p class="pv-text">${esc(trunc(text,500))}</p>
        ${mediaBlock(media,'16/9')}
        <div class="pv-actions"><span>Reply</span><span>Boost</span><span>Favourite</span></div>
      </div>`,
    reddit: (acc,text,media) => `
      <div class="pv-card pv-rd">
        <span class="pv-sub">r/simracing · Posted by ${esc(acc.handle)}</span>
        <h4 class="pv-title">${esc(trunc(text,80))}</h4>
        <p class="pv-text">${esc(trunc(text,400))}</p>
        ${mediaBlock(media,'16/9')}
        <div class="pv-actions"><span>↑ Upvote</span><span>💬 Comments</span><span>↗ Share</span></div>
      </div>`,
    snapchat: (acc,text,media) => `
      <div class="pv-card pv-sc">
        <div class="pv-video">${mediaBlock(media,'9/16')}<div class="pv-sc-overlay"><b>${esc(acc.name)}</b><p>${esc(trunc(text,250))}</p></div></div>
      </div>`,
    tumblr: (acc,text,media) => `
      <div class="pv-card pv-tb">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b></div></div>
        <p class="pv-text">${esc(trunc(text,4096))}</p>
        ${mediaBlock(media,'4/3')}
        <div class="pv-actions"><span>Reblog</span><span>Like</span></div>
      </div>`,
    discord: (acc,text,media) => `
      <div class="pv-card pv-dc">
        <div class="pv-head">${avatar(acc.name,acc.color)}<div><b>${esc(acc.name)}</b><span>Today at 12:00</span></div></div>
        <p class="pv-text">${esc(trunc(text,2000))}</p>
        ${mediaBlock(media,'16/9')}
      </div>`,
    telegram: (acc,text,media) => `
      <div class="pv-card pv-tg">
        <div class="pv-head"><b>${esc(acc.name)}</b></div>
        <p class="pv-text">${esc(trunc(text,4096))}</p>
        ${mediaBlock(media,'16/9')}
        <span class="pv-sub">${new Date().toLocaleTimeString()}</span>
      </div>`,
    whatsapp: (acc,text,media) => `
      <div class="pv-card pv-wa">
        <div class="pv-bubble">${esc(trunc(text,1024))}${media?`<div class="pv-media" style="aspect-ratio:16/9;margin-top:6px"><span>Image</span></div>`:''}<span class="pv-sub" style="text-align:right;display:block">${new Date().toLocaleTimeString()}</span></div>
      </div>`
  };

  window.HUB.renderPreview = function (platformId, account, text, hasMedia) {
    const r = renderers[platformId];
    if(!r) return '<div class="pv-empty">No preview available.</div>';
    return r(account, text, hasMedia);
  };
})();
