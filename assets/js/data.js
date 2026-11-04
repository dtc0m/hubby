/* Hubby — data layer (clean slate: no example socials/emails/posts) */
(function () {
  const PLATFORMS = [
    { id:'x', name:'X', handle:'@', limit:280, color:'#000000', media:['image','video','gif'] },
    { id:'instagram', name:'Instagram', handle:'@', limit:2200, color:'#E4405F', media:['image','video','carousel'] },
    { id:'facebook', name:'Facebook', handle:'', limit:63206, color:'#1877F2', media:['image','video','link'] },
    { id:'linkedin', name:'LinkedIn', handle:'', limit:3000, color:'#0A66C2', media:['image','video','document','link'] },
    { id:'tiktok', name:'TikTok', handle:'@', limit:2200, color:'#000000', media:['video'] },
    { id:'youtube', name:'YouTube', handle:'@', limit:5000, color:'#FF0000', media:['video'] },
    { id:'threads', name:'Threads', handle:'@', limit:500, color:'#000000', media:['image','video'] },
    { id:'pinterest', name:'Pinterest', handle:'', limit:500, color:'#E60023', media:['image','video'] },
    { id:'bluesky', name:'Bluesky', handle:'@', limit:300, color:'#0085FF', media:['image','video'] },
    { id:'mastodon', name:'Mastodon', handle:'@', limit:500, color:'#6364FF', media:['image','video'] },
    { id:'reddit', name:'Reddit', handle:'u/', limit:40000, color:'#FF4500', media:['image','video','link'] },
    { id:'snapchat', name:'Snapchat', handle:'', limit:250, color:'#FFFC00', media:['image','video'] },
    { id:'tumblr', name:'Tumblr', handle:'', limit:4096, color:'#36465D', media:['image','video','text'] },
    { id:'discord', name:'Discord', handle:'', limit:2000, color:'#5865F2', media:['image','video'] },
    { id:'telegram', name:'Telegram', handle:'@', limit:4096, color:'#26A5E4', media:['image','video','file'] },
    { id:'whatsapp', name:'WhatsApp Business', handle:'', limit:1024, color:'#25D366', media:['image','video','file'] }
  ];

  const ACCOUNTS = [
    { id:'hsw', name:'Hill Sim Works', handle:'@hillsimworks', email:'hello@hillsimworks.com', color:'#0b2630', socials:[], inbox:[] },
    { id:'prysm', name:'PRYSM Motorsport', handle:'@prysmmotorsport', email:'team@prysmmotorsport.com', color:'#071a22', socials:[], inbox:[] },
    { id:'adxd', name:'ADXD Design', handle:'@adxd.design', email:'studio@adxd.design', color:'#1268e8', socials:[], inbox:[] },
    { id:'v1', name:'V1 Photo Co.', handle:'@v1photoco', email:'bookings@v1photoco.com', color:'#48646f', socials:[], inbox:[] },
    { id:'hrw', name:'HRW', handle:'@hrw', email:'info@hrw.com', color:'#a8781a', socials:[], inbox:[] }
  ];

  const POSTS = [];

  window.HUB = { PLATFORMS, ACCOUNTS, POSTS };
  window.HUB.getActiveAccount = function () {
    const id = localStorage.getItem('hub.activeAccount') || ACCOUNTS[0].id;
    return ACCOUNTS.find(a=>a.id===id) || ACCOUNTS[0];
  };
  window.HUB.setActiveAccount = function (id) { localStorage.setItem('hub.activeAccount', id); };
  window.HUB.platform = function (id) { return PLATFORMS.find(p=>p.id===id); };
})();
