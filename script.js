const videos = [
 {title:"Cerita Seru dari Kota",views:63120,icon:"🌆",colors:["#184a61","#2b204b"],category:"Lifestyle"},
 {title:"Tips Kreatif untuk Pemula",views:18717,icon:"💡",colors:["#2c4560","#182239"],category:"Edukasi"},
 {title:"Momen Lucu yang Bikin Ketawa",views:14262,icon:"😂",colors:["#653e74","#273d63"],category:"Hiburan"},
 {title:"Kisah Unik di Sekitar Kita",views:11561,icon:"🎭",colors:["#514126","#17263b"],category:"Cerita"},
 {title:"Viral Hari Ini — Pilihan Editor",views:11494,icon:"✨",colors:["#173c4b","#41254c"],category:"Trending"},
 {title:"Inspirasi Gaya Sehari-hari",views:9901,icon:"🎨",colors:["#6a5260","#253d55"],category:"Lifestyle"},
 {title:"Eksperimen Seru Bareng Teman",views:9260,icon:"🧪",colors:["#684631","#26334d"],category:"Hiburan"},
 {title:"Reaksi Paling Menghibur",views:8406,icon:"😄",colors:["#31594e","#392b51"],category:"Komedi"},
 {title:"Belajar Hal Baru dalam 1 Menit",views:6838,icon:"📚",colors:["#755d4e","#293e61"],category:"Edukasi"},
 {title:"Ide Kreatif untuk Akhir Pekan",views:6860,icon:"🌈",colors:["#3e4679","#5a3d65"],category:"Inspirasi"},
 {title:"Review Tempat yang Lagi Hits",views:5230,icon:"📍",colors:["#285a62","#392d4e"],category:"Travel"},
 {title:"Musik dan Suasana Santai",views:4912,icon:"🎧",colors:["#493d75","#204756"],category:"Musik"},
 {title:"Behind the Scenes",views:4077,icon:"🎬",colors:["#5a3a46","#20344e"],category:"Kreator"},
 {title:"Fakta Menarik yang Jarang Tahu",views:3890,icon:"🔎",colors:["#2d5668","#46345e"],category:"Edukasi"},
 {title:"Rekomendasi Minggu Ini",views:2504,icon:"⭐",colors:["#61512d","#263b56"],category:"Pilihan"}
];
let shown=10, sortMode="views", selected=4;
const grid=document.getElementById("videoGrid");
function formatViews(n){return n.toLocaleString("id-ID")}
function render(){
 const query=document.getElementById("search").value.trim().toLowerCase();
 let items=videos.map((v,i)=>({...v,index:i})).filter(v=>v.title.toLowerCase().includes(query)||v.category.toLowerCase().includes(query));
 items.sort((a,b)=>sortMode==="views"?b.views-a.views:b.index-a.index);
 items=items.slice(0,shown);
 grid.innerHTML="";
 items.forEach((v,i)=>{
   // Native ad insertion: change the interval or replace this demo card with your ad network code.
   if(i===4 && !query) grid.appendChild(makeAdCard());
   const card=document.createElement("article");card.className="video-card";card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-label","Putar "+v.title);
   card.innerHTML=`<div class="thumb" style="--c1:${v.colors[0]};--c2:${v.colors[1]}"><span class="thumb-icon">${v.icon}</span><span class="mini-play">▶</span><span class="views">◉ ${formatViews(v.views)}</span></div><div class="card-title">${v.title}</div><div class="card-meta">${v.category}</div>`;
   card.addEventListener("click",()=>selectVideo(v.index));card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectVideo(v.index)}});
   grid.appendChild(card);
 });
 document.getElementById("loadMore").style.display=items.length<videos.filter(v=>v.title.toLowerCase().includes(query)||v.category.toLowerCase().includes(query)).length?"inline-block":"none";
 if(!items.length)grid.innerHTML='<p style="color:var(--muted)">Video tidak ditemukan. Coba kata kunci lain.</p>';
}
function makeAdCard(){
 const ad=document.createElement("article");ad.className="video-card ad-card";ad.innerHTML='<div class="thumb"><span class="thumb-icon">✦</span><span class="views">SPONSOR</span></div><div class="card-title">Konten Sponsor Anda</div><div class="card-meta">Iklan · Native placement</div>';
 ad.addEventListener("click",()=>showToast("Slot iklan native: ganti kartu ini dengan materi sponsor."));return ad;
}
function selectVideo(index){
 selected=index;const v=videos[index];document.getElementById("mainTitle").textContent=v.title;document.getElementById("mainViews").textContent=formatViews(v.views);document.getElementById("mainCategory").textContent=v.category;
 const art=document.querySelector(".player-art");art.style.background=`radial-gradient(ellipse at 50% 45%,${v.colors[0]} 0,transparent 38%),linear-gradient(130deg,${v.colors[1]},#05060a 70%)`;art.querySelector(".art-text").innerHTML=v.icon+" <span style='color:var(--cyan)'>"+v.category.toUpperCase()+"</span>";
 document.getElementById("playerStatus").textContent="▶ Pratinjau: "+v.title;document.getElementById("videoAd").classList.remove("show");window.scrollTo({top:0,behavior:"smooth"});
}
function toggleMainVideo(){const ad=document.getElementById("videoAd");ad.classList.toggle("show");document.getElementById("playerStatus").textContent=ad.classList.contains("show")?"Iklan demo ditampilkan":"▶ Pratinjau demo";if(ad.classList.contains("show"))setTimeout(()=>{},100)}
function closeVideoAd(){document.getElementById("videoAd").classList.remove("show");document.getElementById("playerStatus").textContent="▶ Pratinjau demo"}
let toastTimer;function showToast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
document.getElementById("search").addEventListener("input",()=>{shown=videos.length;render()});
document.querySelectorAll("[data-sort]").forEach(btn=>btn.addEventListener("click",()=>{sortMode=btn.dataset.sort;document.querySelectorAll("[data-sort]").forEach(b=>b.classList.toggle("active",b===btn));render()}));
document.getElementById("loadMore").addEventListener("click",()=>{shown+=5;render()});
render();
