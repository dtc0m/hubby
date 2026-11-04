/* HSW Hub — mock data layer (structured so real APIs can replace it) */
(function () {
  const PLATFORMS = [
    { id:'x', name:'X', handle:'@', limit:280, color:'#000000', media:['image','video','gif'], preview:'x' },
    { id:'instagram', name:'Instagram', handle:'@', limit:2200, color:'#E4405F', media:['image','video','carousel'], preview:'instagram' },
    { id:'facebook', name:'Facebook', handle:'', limit:63206, color:'#1877F2', media:['image','video','link'], preview:'facebook' },
    { id:'linkedin', name:'LinkedIn', handle:'', limit:3000, color:'#0A66C2', media:['image','video','document','link'], preview:'linkedin' },
    { id:'tiktok', name:'TikTok', handle:'@', limit:2200, color:'#000000', media:['video'], preview:'tiktok' },
    { id:'youtube', name:'YouTube', handle:'@', limit:5000, color:'#FF0000', media:['video'], preview:'youtube' },
    { id:'threads', name:'Threads', handle:'@', limit:500, color:'#000000', media:['image','video'], preview:'threads' },
    { id:'pinterest', name:'Pinterest', handle:'', limit:500, color:'#E60023', media:['image','video'], preview:'pinterest' },
    { id:'bluesky', name:'Bluesky', handle:'@', limit:300, color:'#0085FF', media:['image','video'], preview:'bluesky' },
    { id:'mastodon', name:'Mastodon', handle:'@', limit:500, color:'#6364FF', media:['image','video'], preview:'mastodon' },
    { id:'reddit', name:'Reddit', handle:'u/', limit:40000, color:'#FF4500', media:['image','video','link'], preview:'reddit' },
    { id:'snapchat', name:'Snapchat', handle:'', limit:250, color:'#FFFC00', media:['image','video'], preview:'snapchat' },
    { id:'tumblr', name:'Tumblr', handle:'', limit:4096, color:'#36465D', media:['image','video','text'], preview:'tumblr' },
    { id:'discord', name:'Discord', handle:'', limit:2000, color:'#5865F2', media:['image','video'], preview:'discord' },
    { id:'telegram', name:'Telegram', handle:'@', limit:4096, color:'#26A5E4', media:['image','video','file'], preview:'telegram' },
    { id:'whatsapp', name:'WhatsApp Business', handle:'', limit:1024, color:'#25D366', media:['image','video','file'], preview:'whatsapp' }
  ];

  const ACCOUNTS = [
    { id:'hsw', name:'Hill Sim Works', handle:'@hillsimworks', email:'hello@hillsimworks.com', color:'#0b2630',
      socials:[
        { platform:'x', handle:'@hillsimworks', connected:true, followers:4820 },
        { platform:'instagram', handle:'@hillsimworks', connected:true, followers:12400 },
        { platform:'facebook', handle:'HillSimWorks', connected:true, followers:3100 },
        { platform:'linkedin', handle:'hill-sim-works', connected:true, followers:1890 },
        { platform:'youtube', handle:'@HillSimWorks', connected:true, followers:2650 },
        { platform:'threads', handle:'@hillsimworks', connected:true, followers:980 },
        { platform:'bluesky', handle:'@hillsimworks.bsky.social', connected:false, followers:0 },
        { platform:'discord', handle:'HSW Community', connected:true, followers:740 }
      ],
      inbox:[
        { id:'e1', from:'PRYSM Motorsport', fromEmail:'team@prysmmotorsport.com', subject:'Livery approval for Spa', body:'Hi team,\n\nAttached is the final livery for the Spa 24hr. Please review and approve by EOD Thursday so we can send to the printer.\n\nBest,\nPRYSM', date:'2026-10-28T09:12:00', folder:'inbox', read:false },
        { id:'e2', from:'Stream Deck Support', fromEmail:'support@elgato.com', subject:'Your iDeck integration', body:'Thanks for reaching out. We reviewed the Stream Deck plugin submission and have a few notes...', date:'2026-10-27T14:30:00', folder:'inbox', read:true },
        { id:'e3', from:'ADXD Design', fromEmail:'studio@adxd.design', subject:'New brand kit drafts', body:'Three directions attached. Direction B is the one we think fits best.', date:'2026-10-26T11:00:00', folder:'inbox', read:true },
        { id:'e4', from:'hello@hillsimworks.com', to:'client@example.com', subject:'Quote: S1 button box', body:'Thanks for the enquiry. Pricing and lead time below...', date:'2026-10-25T16:20:00', folder:'sent', read:true }
      ]
    },
    { id:'prysm', name:'PRYSM Motorsport', handle:'@prysmmotorsport', email:'team@prysmmotorsport.com', color:'#071a22',
      socials:[
        { platform:'x', handle:'@PRYSMMotorsport', connected:true, followers:18200 },
        { platform:'instagram', handle:'@prysmmotorsport', connected:true, followers:24500 },
        { platform:'facebook', handle:'PRYSMMotorsport', connected:true, followers:9800 },
        { platform:'tiktok', handle:'@prysmmotorsport', connected:true, followers:41000 },
        { platform:'youtube', handle:'@PRYSMMotorsport', connected:true, followers:6200 },
        { platform:'threads', handle:'@prysmmotorsport', connected:true, followers:3200 }
      ],
      inbox:[
        { id:'p1', from:'VCO', fromEmail:'events@vco-esports.com', subject:'Daytona 24hr entry confirmation', body:'Your entry for the 2026 VCO Daytona 24hr has been confirmed. Driver lineup due by Nov 1.', date:'2026-10-29T08:00:00', folder:'inbox', read:false },
        { id:'p2', from:'iRacing', fromEmail:'noreply@iracing.com', subject:'League results posted', body:'Results for the PRYSM Endurance League round 4 are now available.', date:'2026-10-28T20:15:00', folder:'inbox', read:true }
      ]
    },
    { id:'adxd', name:'ADXD Design', handle:'@adxd.design', email:'studio@adxd.design', color:'#1268e8',
      socials:[
        { platform:'instagram', handle:'@adxd.design', connected:true, followers:8900 },
        { platform:'x', handle:'@adxd_design', connected:true, followers:2100 },
        { platform:'pinterest', handle:'adxd', connected:true, followers:5600 },
        { platform:'tumblr', handle:'adxd', connected:false, followers:0 }
      ],
      inbox:[
        { id:'a1', from:'Client: Prysm', fromEmail:'art@prysmmotorsport.com', subject:'Livery revisions', body:'Can we push the red accent 2px left on the rear wing?', date:'2026-10-29T10:30:00', folder:'inbox', read:false }
      ]
    },
    { id:'v1', name:'V1 Photo Co.', handle:'@v1photoco', email:'bookings@v1photoco.com', color:'#48646f',
      socials:[
        { platform:'instagram', handle:'@v1photoco', connected:true, followers:6200 },
        { platform:'x', handle:'@v1photoco', connected:false, followers:0 },
        { platform:'pinterest', handle:'v1photoco', connected:true, followers:1800 }
      ],
      inbox:[
        { id:'v1e1', from:'Trackside Client', fromEmail:'hello@trackside.com', subject:'Shoot booking request', body:'We need trackside coverage for the November race weekend. Availability?', date:'2026-10-28T12:00:00', folder:'inbox', read:false }
      ]
    },
    { id:'hrw', name:'HRW', handle:'@hrw', email:'info@hrw.com', color:'#a8781a',
      socials:[
        { platform:'x', handle:'@hrw', connected:true, followers:1500 },
        { platform:'instagram', handle:'@hrw', connected:false, followers:0 }
      ],
      inbox:[]
    }
  ];

  const POSTS = [
    { id:'post1', accountId:'hsw', text:'iDeck 1.4 is out. Per-key latency now 0.6ms and the icon library grew to 140.', platforms:['x','instagram','linkedin','threads'], status:'published', createdAt:'2026-10-27T10:00:00' },
    { id:'post2', accountId:'prysm', text:'Winners. Again. Spa 24hr Virtual — thank you to the whole team.', platforms:['x','instagram','tiktok','youtube'], status:'published', createdAt:'2026-10-26T22:30:00' }
  ];

  window.HUB = { PLATFORMS, ACCOUNTS, POSTS };
  // restore connected state
  try { const saved=JSON.parse(localStorage.getItem('hub.connected')||'{}'); Object.keys(saved).forEach(aid=>{ const acc=ACCOUNTS.find(a=>a.id===aid); if(!acc) return; Object.keys(saved[aid]).forEach(pid=>{ const s=acc.socials.find(x=>x.platform===pid); if(s) s.connected=saved[aid][pid]; }); }); } catch(e){}
  window.HUB.getActiveAccount = function () {
    const id = localStorage.getItem('hub.activeAccount') || ACCOUNTS[0].id;
    return ACCOUNTS.find(a=>a.id===id) || ACCOUNTS[0];
  };
  window.HUB.setActiveAccount = function (id) {
    localStorage.setItem('hub.activeAccount', id);
  };
  window.HUB.platform = function (id) { return PLATFORMS.find(p=>p.id===id); };
})();
