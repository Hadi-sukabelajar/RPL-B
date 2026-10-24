// ============================================================
// RPL B — SMKN 2 Subang / STEMPERT
// Runtime UI: coverflow, galeri, pemutar musik, form, aksesibilitas
// ============================================================

/* ------------------------------------------------------------
   CODE RAIN — canvas hemat daya (DPR aware, berhenti saat tab hidden)
   ------------------------------------------------------------ */
(function initCodeRain() {
  const canvas = document.getElementById("codeRain");
  if (!canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    canvas.hidden = true;
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const colors = ["#65d7c8", "#8ea7ff", "#ffc56f", "#ff7f73", "#a8eddb"];
  const snippets = [
    'const team = "RPL B";', "function buildFuture() {", 'return "solid & creative";',
    "for (let i = 0; i < 38; i++)", 'console.log("STEMPERT 2025");', "if (semangat === true) {",
    'document.querySelector(".kelas")', "async function deploy() {", "await launchProject();",
    "export default class RPLB {", "npm run build --production", 'git commit -m "ready 🚀"',
    "SELECT * FROM taruna_rplb", "import { useState } from 'react'", '<div class="hero-section">',
    "border-radius: 8px;", "display: flex; gap: 12px;", "background: linear-gradient(",
    "@media (max-width: 768px)", "def train_model(data):", 'print("Hello, World!")',
    "for x in range(38):", "#include <iostream>", "create database RPLB", "int main() { return 0; }",
    "git init", 'cout << "RPL B" << endl;', "res.status(200).json(data)", 'fetch("/api/taruna")',
    ".then(res => res.json())","I love Aris", 'localStorage.setItem("kelas")', "position: absolute; z-index:",
    "transform: translateY(-3px)", "const router = express.Router()", "app.listen(3000, () => {",
    "schema.validate(formData)", "try { await connectDB() }", "catch (err) { console.error }",
    "const [count, setCount] = useState(0)", "return <div>{count}</div>",
    "npm install --save react-router-dom", "01001000 01100101 01111001",
    "0xFF 0b1010 NaN Infinity", "docker build -t rplb-app .",
    'WHERE angkatan = "2025/2026"', "INSERT INTO kegiatan VALUES", 'JOIN taruna ON kelas = "RPL B"',
    "padding: 16px 24px;", "color: var(--accent);", "animation: fadeIn 0.8s ease;",
  ];

  const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
  let drops = [];
  let rafId = null;
  let lastFrame = 0;
  let running = false;
  const frameGap = 1000 / 30;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function createDrop() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      speed: 0.45 + Math.random() * 0.9,
      text: randomItem(snippets),
      size: 11 + Math.floor(Math.random() * 4),
      color: randomItem(colors),
      opacity: 0.55 + Math.random() * 0.4,
      interval: 80 + Math.floor(Math.random() * 120),
      tick: 0,
    };
  }

  function resize() {
    canvas.width = Math.ceil(window.innerWidth * dpr);
    canvas.height = Math.ceil(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(20, Math.max(7, Math.floor(window.innerWidth / 120)));
    drops = Array.from({ length: count }, createDrop);
  }

  function draw(time) {
    if (!running) return;
    rafId = requestAnimationFrame(draw);
    if (time - lastFrame < frameGap) return;
    lastFrame = time - ((time - lastFrame) % frameGap);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < drops.length; i += 1) {
      const drop = drops[i];
      ctx.globalAlpha = drop.opacity;
      ctx.fillStyle = drop.color;
      ctx.font = `${drop.size}px Consolas, "Courier New", monospace`;
      ctx.fillText(drop.text, drop.x, drop.y);
      drop.y += drop.speed;
      drop.tick += 1;
      if (drop.tick >= drop.interval) {
        drop.tick = 0;
        drop.text = randomItem(snippets);
      }
      if (drop.y > window.innerHeight + 30) Object.assign(drop, createDrop(), { y: -30 });
    }
    ctx.globalAlpha = 1;
  }

  function start() {
    if (running || document.hidden) return;
    running = true;
    lastFrame = performance.now();
    rafId = requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  resize();
  start();
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 160);
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
})();

/* ------------------------------------------------------------
   UTILITAS
   ------------------------------------------------------------ */
const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* localStorage bisa diblokir */
    }
  },
};

const ASSET_PATHS = { images: "assets/images/", audio: "assets/audio/" };

/* ------------------------------------------------------------
   PROTEKSI FOTO
   ------------------------------------------------------------ */
(function protectPhotos() {
  const style = document.createElement("style");
  style.textContent = `
    img { -webkit-user-drag: none; user-select: none; -webkit-user-select: none; }
    .member-avatar img, #modalAvatar img { pointer-events: none; -webkit-touch-callout: none; }
  `;
  document.head.appendChild(style);

  document.addEventListener("dragstart", (event) => {
    if (event.target && event.target.tagName === "IMG") event.preventDefault();
  });
  document.addEventListener("contextmenu", (event) => {
    if (event.target && event.target.closest && event.target.closest(".member-avatar, #modalAvatar")) {
      event.preventDefault();
    }
  });
})();

/* ------------------------------------------------------------
   DATA — 38 taruna/i, wali kelas, galeri, kegiatan, playlist
   ------------------------------------------------------------ */
const memberPhotos = [
  "obyy.jpeg", "ahmad.jpg", "arum.jpeg", "amanda.jpeg", "aris.jpeg", "azzkia.jpeg",
  "bilqis.jpeg", "cerdas.jpg", "Holik.jpg", "dehan.jpeg", "desta.jpeg", "dila.jpeg",
  "eva.jpeg", "farhan.jpg", "entod.jpeg", "Jaspy.jpg", "karina.jpg", "lala.jpeg",
  "dapa.jpg", "nadya.jpeg", "nopal.jpeg", "nazwa oktara.jpg", "najwa olivia.jpg",
  "nesya.jpeg", "", "pili.jpeg", "Radit.jpg", "Abah.jpeg", "rahma.jpeg",
  "Gangster 2.jpg", "sela.jpeg", "sesilia.jpg", "tio.jpg", "", "wili.jpeg",
  "windi.jpeg", "", "zaskia.jpeg",
];

const waliKelas = {
  name: "Iwan Permana, S.Kom",
  nip: "",
  subject: "Rekayasa Perangkat Lunak",
  motto: "Mendidik dengan hati, membimbing dengan ilmu.",
  photo: "",
  initial: "IP",
  color: "#65d7c8",
};

const members = [
  ["Adi hidayat", "2526411", "Anggota", "toring", "Kode adalah seni", "#65d7c8", "AH"],
  ["Ahmad rifki", "2526412", "Anggota", "futsal", "Kerja keras tak pernah khianat", "#8ea7ff", "AR"],
  ["ajeng putri arumi", "2526413", "Anggota", "Menulis", "Catat setiap momen", "#ffc56f", "AP"],
  ["amanda sifa widodo", "2526414", "Anggota", "Memasak", "Hemat pangkal kaya", "#ff7f73", "AS"],
  ["aris meylina putri", "2526415", "Anggota", "nonton drakor/dracin", "Kreativitas tanpa batas", "#65d7c8", "AM"],
  ["azzkia farhatunnisa", "2526416", "Anggota", "Fotografi", "Setiap frame ada cerita", "#ffc56f", "AF"],
  ["bilqis hanifatul halimah", "2526417", "Anggota", "Music", "Hidup itu seperti musik", "#8ea7ff", "BH"],
  ["cerdas abdul jabar", "2526418", "Ketua Kelas", "Web Dev", "HTML adalah seni", "#ffc56f", "CA"],
  ["dandy fahri", "2526419", "Anggota", "Robotika", "Inovasi tiada henti", "#65d7c8", "DF"],
  ["dehan fadilah", "2526420", "Anggota", "UI/UX", "Desain yang berbicara", "#ff7f73", "DF"],
  ["desta ginanjar", "2526421", "Anggota", "futsal", "Server tak pernah tidur", "#8ea7ff", "DG"],
  ["dila fitriani", "2526422", "Anggota", "Data Science", "Data adalah emas", "#65d7c8", "DF"],
  ["eva rahayu", "2526423", "Anggota", "Mobile Dev", "Satu app untuk semua", "#8ea7ff", "ER"],
  ["Farhan arya zaelani", "2526424", "Anggota", "Animasi", "No JB No LIFE", "#ffc56f", "FA"],
  ["febriyana maulidan solihin", "2526425", "Anggota", "Berenang", "Aman itu nomor satu", "#65d7c8", "FM"],
  ["jaspy gema ramadhan", "2526426", "Anggota", "Volly, Listen Music", "Jangan takut gagal takutlah untuk tidak mencoba", "#8ea7ff", "JG"],
  ["karina mulyasari", "2526427", "Anggota", "Game Dev", "Dunia virtual tanpa batas", "#ffc56f", "KM"],
  ["latifah ulumiyah", "2526428", "Anggota", "AI/ML", "Masa depan adalah AI", "#ff7f73", "LU"],
  ["muhammad daffa al muhtar", "2526429", "Anggota", "gaming", "Tetaplah hidup untuk hidup", "#8ea7ff", "MD"],
  ["nadya salsabila", "2526430", "Sekretaris", "Networking", "Koneksi adalah kunci", "#65d7c8", "NS"],
  ["naufal aydin nashif", "2526431", "Anggota", "Tukang inul computer", "Logo adalah identitas", "#8ea7ff", "NA"],
  ["nazwa ocktara aryanti", "2526432", "Anggota", "DevOps", "Deploy setiap hari", "#ffc56f", "NO"],
  ["nazwa olivia", "2526433", "Anggota", "Content Creator", "Konten adalah raja", "#65d7c8", "NO"],
  ["neisya khotimatul zahra", "2526434", "Anggota", "3D Modeling", "Dimensi ketiga adalah duniaku", "#8ea7ff", "NK"],
  ["Nurhadi Abdul Mughni", "2526435", "Anggota", "Abang programer web", "I did it for me. I liked it. I was good at it.", "#ffc56f", "NAM"],
  ["pielly ghaffar arrauf rajab", "2526436", "Anggota", "iot", "Dimensi ketiga adalah duniaku", "#ff7f73", "PG"],
  ["raditya al-ghifari", "2526437", "Anggota", "Design Digital art", "Solve every problem", "#8ea7ff", "RA"],
  ["Rahman Adli Permana", "2526438", "Anggota", "ceo pt kangkun sejahtera", "No risk No perari", "#65d7c8", "RA"],
  ["Rahmayanti", "2526439", "Anggota", "Cloud Computing", "Langit bukan batas", "#8ea7ff", "RI"],
  ["reyga dwie oktaviyana", "2526440", "Bendahara", "Blockchain", "Desentralisasi masa depan", "#ff7f73", "RD"],
  ["sella", "2526441", "Anggota", "E-commerce Dev", "Jualan online makin mudah", "#65d7c8", "SA"],
  ["sesilia saroi marei", "2526442", "Anggota", "Bug Hunter", "Find every bug, fix it all", "#8ea7ff", "SS"],
  ["tio permana", "2526443", "Anggota", "Podcast Tech", "Bicara tentang teknologi", "#ffc56f", "TP"],
  ["widia ramadhani", "2526444", "Anggota", "Linux Admin", "Open source adalah bebas", "#ff7f73", "WR"],
  ["wiliandri", "2526445", "Anggota", "Testing QA", "Zero bug sebelum release", "#8ea7ff", "WI"],
  ["windiani", "2526446", "Anggota", "API Dev", "API menghubungkan dunia", "#65d7c8", "WI"],
  ["oya grance mambrisauw", "2526447", "Anggota", "AR/VR Dev", "Realita bergabung virtual", "#8ea7ff", "OG"],
  ["zaskia aira uswatun hasanah", "2526448", "Anggota", "Startup Founder", "Mimpi besar, action lebih besar", "#ffc56f", "ZA"],
].map((item, index) => ({
  no: index + 1,
  name: item[0],
  nit: item[1],
  role: item[2],
  hobby: item[3],
  motto: item[4],
  color: item[5],
  initial: item[6],
  photo: memberPhotos[index] ? `${ASSET_PATHS.images}${memberPhotos[index]}` : "",
}));

const galleryItems = [
  ["Gerbang.jpg", "Gerbang Sekolah"],
  ["KELAS.jpg", "MPLS DAY 1"],
  ["l.jpeg", "Poto MPLS"],
  ["rp.jpeg", "Poto LATDASTAR"],
  ["long (1).jpg", "Poto LATDASTAR"],
  ["long (2).jpg", "Poto LATDASTAR"],
  ["long (4).jpg", "Poto LATDASTAR"],
  ["long (5).jpg", "Poto LATDASTAR"],
  ["long (7).jpg", "Poto LATDASTAR"],
  ["long (8).jpg", "Poto LATDASTAR"],
  ["long (9).jpg", "Poto LATDASTAR"],
  ["long (10).jpg", "Poto LATDASTAR"],
  ["latdastar (1).jpg", "Poto LATDASTAR"],
  ["latdastar (2).jpg", "Poto LATDASTAR"],
  ["latdastar (3).jpg", "Poto LATDASTAR"],
  ["latdastar (4).jpg", "Poto LATDASTAR"],
  ["latdastar (5).jpg", "Poto LATDASTAR"],
  ["latdastar (6).jpg", "Poto LATDASTAR"],
  ["latdastar (7).jpg", "Poto LATDASTAR"],
  ["latdastar (8).jpg", "Poto LATDASTAR"],
  ["latdastar (10).jpg", "Poto LATDASTAR"],
  ["latdastar (11).jpeg", "Poto LATDASTAR"],
  ["latdastar.jpeg", "Kompi Tanggo"],
  ["pin.jpeg", "Pemberian penghargaan Pin"],
  ["pelantikan.jpeg", "Pelantikan"],
  ["Gedung RPL.jpeg", "Gedung RPL"],
  ["3.jpeg", "Pembagian Raport S1"],
  ["p.jpeg", "Poto bersama Keluarga RPL Tahun 2026"],
  ["rpl.jpeg", "Poto Hari guru"],
  ["1.jpeg", "Poto Taruna"],
  ["2.jpeg", "TARUNA"],
  ["r.jpeg", "Futsal di Carera"],
  ["futsal jeng t1.jpeg", "futsal sama t1"],
  ["futsal carera rpl 1.jpeg", "futsal RPL"],
  ["futsal carera rpl 2.jpeg", "futsal RPL"],
  ["futsal carera rpl 3.jpeg", "futsal RPL"],
  ["17AN.jpg", "17 Agustus 2026"],
  ["17AUGUST.jpg", "17 Agustus 2026"],
  ["BATIKDAY1.jpg", "Batik Day"],
  ["BATIKDAY2.jpg", "Batik Day"],
  ["BATIKDAY3.jpg", "Batik Day"],
  ["BATIKDAY4.jpg", "Batik Day"],
  ["BATIKDAY5.jpg", "Batik Day"],
  ["BATIKDAY6.jpg", "Batik Day"],
  ["BATIKDAY7.jpg", "Batik Day"],
  ["BBOYS.jpg", "Boys Day"],
  ["CIHEULEUT1.jpg", "Poto di Ciheuleut"],
  ["CIHEULEUT2.jpg", "Poto di Ciheuleut"],
  ["JAKI1.jpg", "Poto di Jaki"],
  ["JAKI2.jpg", "Poto di Jaki"],
  ["JENGUKAHMAD.jpg", "Jenguk Ahmad"],
  ["KKRI1.jpg", "KKRI"],
  ["KKRI2.jpg", "KKRI"],
  ["pembuatan tugu kkri(1).jpeg", "poto pas pembuatan tugu kkri"],
  ["MAKBER.jpg", "MAKAN BERSAMA"],
  ["MBG.jpg", "MBG TIME"],
  ["NESAS1.jpg", "Poto di Nesas"],
  ["NESAS2.jpg", "Poto di Nesas"],
  ["NESAS3.jpg", "Poto di Nesas"],
  ["NESAS4.jpg", "Poto di Nesas"],
  ["NESAS5.jpg", "Poto di Nesas"],
  ["NESAS6.jpg", "Poto di Nesas"],
  ["RPLBOYS.jpg", "RPL BOYS"],
  ["SLEEP1.jpg", "SLEEPING TIME"],
  ["TANGGA1.jpg", "Poto di Tangga"],
  ["TANGGA2.jpg", "Poto di Tangga"],
  ["poto pas studio rpl 1.jpeg", "Poto pas pelantikan di studio rpl"],
  ["poto pas studio rpl 2.jpeg", "Poto pas pelantikan di studio rpl"],
  ["poto studio rpl 3.jpeg", "Poto pas pelantikan di studio rpl"],
  ["poto pas studio rpl 4.jpeg", "Poto pas pelantikan di studio rpl"],
].map((item) => ({ img: `${ASSET_PATHS.images}${item[0]}`, title: item[1] }));

const activities = [
  ["15 Juli 2025", "MPLS Masa Pengenalan Lingkungan Sekolah", "Hari pertama penuh semangat untuk mengenal lingkungan sekolah, guru, dan teman baru.", "01", "#65d7c8"],
  ["21 Juli 2025", "Latihan Dasar Ketarunaan (Latdastar)", "Kegiatan pembentukan karakter, mental, dan jiwa kepemimpinan seluruh anggota kelas.", "02", "#ffc56f"],
  ["20 September 2025", "KKRI/Alih Golongan", "Kegiatan yang mengajarkan kesetiaan, solidaritas, dan bakti kepada bangsa dan negara.", "03", "#8ea7ff"],
  ["16 Oktober 2025", "Pelantikan Latihan Dasar Ketarunaan", "Hari usainya latihan dasar ketarunaan sekaligus peresmian menjadi taruna di SMKN 2 Subang.", "04", "#65d7c8"],
  ["23 Desember 2025", "Pembagian Raport Semester Ganjil", "Momen evaluasi awal perjalanan belajar yang luar biasa.", "05", "#ff7f73"],
  ["16 Juli 2026", "Naik ke Tingkat 2", "Momen yang menandai perjalanan baru di tingkat 2 dengan tantangan dan pengalaman baru.", "06", "#ffc56f"],
].map((item) => ({ date: item[0], title: item[1], desc: item[2], icon: item[3], color: item[4] }));

const playlist = [
  { file: "kita-kesana.mp3", title: "Kita Kesana", artist: "Hindia" },
  { file: "kaulahkamuku.mp3", title: "Kaulah Kamuku", artist: "" },
  { file: "laskar-pelangi.mp3", title: "Laskar Pelangi", artist: "Nidji" },
  { file: "melompat-lebih-tinggi.mp3", title: "Melompat Lebih Tinggi", artist: "Sheila On 7" },
  { file: "rumah-kita.mp3", title: "Rumah Kita", artist: "God Bless" },
  { file: "sahabat-kecil.mp3", title: "Sahabat Kecil", artist: "Ipang" },
  { file: "sebuah-kisah-klasik.mp3", title: "Sebuah Kisah Klasik", artist: "Sheila On 7" },
  { file: "see-you-again.mp3", title: "See You Again", artist: "Wiz Khalifa" },
  { file: "toy-story.mp3", title: "You've Got a Friend in Me", artist: "Randy Newman" },
  { file: "zona-nyaman.mp3", title: "Zona Nyaman", artist: "Pamungkas" },
  { file: "good-riddance.mp3", title: "Good Riddance (Time of Your Life)", artist: "Green Day" },
  { file: "viva-lavida.mp3", title: "Viva La Vida", artist: "Coldplay" },
  { file: "television-sofarsogood.mp3", title: "Television Sofar so good", artist: "Rex Orange County" },
  { file: "kenbali-pulang.mp3", title: "Kembali Pulang", artist: "Kangen Band" },
  { file: "best-friend.mp3", title: "Best Friend", artist: "Rex Orange County" },
  { file: "kita.mp3", title: "Kita", artist: "Sheila On 7" },
  { file: "hari-bersamanya.mp3", title: "Hari Bersamanya", artist: "Sheila On 7" },
  { file: "ingatlah-hari-ini.mp3", title: "Ingatlah Hari Ini", artist: "Sheila On 7" },
  { file: "kemesraan.mp3", title: "Kemesraan", artist: "Iwan Fals" },
  { file: "kenangan-terindah.mp3", title: "Kenangan Terindah", artist: "Samsons" },
  { file: "kita-slamanya.mp3", title: "Kita Selamanya", artist: "Sheila On 7" },
  { file: "sampai-jumpa.mp3", title: "Sampai Jumpa", artist: "Endank Soekamti" },
  { file: "teman-sejati.mp3", title: "Teman Sejati", artist: "Sheila On 7" },
  { file: "count-on-me.mp3", title: "Count on Me", artist: "Bruno Mars" },
  { file: "jendela-kelas.mp3", title: "Jendela Kelas 1", artist: "Iwan Fals" },
  { file: "home.mp3", title: "Take Me Home", artist: "John Denver" },
  { file: "sahabat-sejati.mp3", title: "Sahabat Sejati", artist: "Sheila On 7" },
  { file: "33x.mp3", title: "33x", artist: "Perunggu" },
  { file: "sesi-potret.mp3", title: "Sesi potret", artist: "enau" },
  { file: "titik-titik.mp3", title: "Ada Titik Titik di Ujung Doa", artist: "Sal Priadi" },
  { file: "masa-kini.mp3", title: "Masa kini", artist: "Nuca" },
].map((track) => ({ ...track, file: `${ASSET_PATHS.audio}${track.file}` }));

const EMAILJS_PUBLIC_KEY = "TFJRSpdswZBMvQ9Iv";
const EMAILJS_SERVICE_ID = "service_ijr5hrj";
const EMAILJS_TEMPLATE_ID = "template_5w6luyj";
const SCHOOL_EMAIL = "info@smkn-2sbg.sch.id";

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */
let currentFilter = "all";
let currentSearch = "";
let activeMember = 0;
let activeGallery = 0;
let filteredMembers = members.slice();
let toastTimer = null;
let memberTouch = null;
let lightboxEl = null;
let lightboxOpen = false;
let modalOpen = false;
let mobileNavOpen = false;
let lastFocusBeforeModal = null;
let lastFocusBeforeLightbox = null;

/* ------------------------------------------------------------
   ANGGOTA — COVERFLOW
   ------------------------------------------------------------ */
function badgeClass(role) {
  return ({
    "Ketua Kelas": "badge-ketua",
    "Wakil Ketua": "badge-wakil",
    Sekretaris: "badge-sekretaris",
    Bendahara: "badge-bendahara",
    Anggota: "badge-anggota",
  }[role] || "badge-anggota");
}

function roleShort(role) {
  return ({
    "Ketua Kelas": "KETUA",
    "Wakil Ketua": "WAKIL",
    Sekretaris: "SEKRE",
    Bendahara: "BDH",
    Anggota: "MBR",
  }[role] || "MBR");
}

function shortOffset(index, active, total) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function coverClass(offset) {
  if (offset === 0) return "active";
  if (Math.abs(offset) === 1) return "near";
  if (Math.abs(offset) === 2) return "far";
  return "hidden";
}

function coverTransform(offset, cardWidth) {
  const step = Math.max(132, Math.min(194, cardWidth * 0.56));
  const x = offset * step;
  const rotate = offset * -24;
  const scale = offset === 0 ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.12);
  const z = Math.abs(offset) * -110;
  const y = offset === 0 ? -4 : 12;
  return `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`;
}

function avatarHTML(member) {
  const fallback = `<span class="avatar-fallback" aria-hidden="true">${esc(member.initial)}</span>`;
  if (!member.photo) {
    return `<div class="member-avatar" style="background:${member.color}1f;color:${member.color}">${fallback}</div>`;
  }
  return `<div class="member-avatar has-photo" style="background:${member.color}1f;color:${member.color}">
    ${fallback}
    <img data-src="${esc(member.photo)}" alt="" width="90" height="90" loading="lazy" decoding="async" draggable="false">
  </div>`;
}

function lazyLoadImage(img) {
  if (!img || !img.dataset.src) return;
  const src = img.dataset.src;
  img.removeAttribute("data-src");
  img.addEventListener("load", () => {
    img.classList.add("loaded");
    const card = img.closest(".gallery-card");
    if (card) card.classList.remove("error");
  }, { once: true });
  img.addEventListener("error", () => {
    img.remove();
    const card = img.closest(".gallery-card");
    if (card) {
      card.classList.add("error");
      card.setAttribute("aria-disabled", "true");
      const label = card.getAttribute("aria-label") || "";
      card.setAttribute("aria-label", label.replace("Perbesar foto:", "Foto tidak tersedia:"));
    }
  }, { once: true });
  img.src = src;
}

function memberCardHTML(member, index) {
  return `<div class="coverflow-slide" data-index="${index}" role="group" aria-roledescription="slide">
    <button class="member-card" type="button" aria-label="Lihat profil ${esc(member.name)}, NIT ${esc(member.nit)}, ${esc(member.role)}">
      <span class="member-no">#${String(member.no).padStart(2, "0")}</span>
      <span class="member-role-badge ${badgeClass(member.role)}">${roleShort(member.role)}</span>
      ${avatarHTML(member)}
      <span class="member-name">${esc(member.name)}</span>
      <span class="member-nis">NIT: ${esc(member.nit)}</span>
      <span class="member-hobby">${esc(member.hobby)}</span>
      <span class="member-cue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Lihat profil
      </span>
    </button>
  </div>`;
}

function applyMemberCoverflow() {
  const grid = $("membersGrid");
  if (!grid) return;
  const slides = grid.querySelectorAll(".coverflow-slide");
  if (!slides.length) return;

  const cardWidth = slides[0].offsetWidth || 320;
  slides.forEach((slide, index) => {
    const offset = shortOffset(index, activeMember, filteredMembers.length);
    const hidden = Math.abs(offset) > 2;
    slide.classList.remove("active", "near", "far", "hidden");
    slide.classList.add(coverClass(offset));
    slide.style.transform = coverTransform(offset, cardWidth);
    slide.setAttribute("aria-hidden", hidden ? "true" : "false");
    if (hidden) slide.setAttribute("inert", "");
    else slide.removeAttribute("inert");

    const button = slide.querySelector(".member-card");
    if (button) {
      if (offset === 0) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    }
    if (Math.abs(offset) <= 2) lazyLoadImage(slide.querySelector("img[data-src]"));
  });

  const count = $("memberCount");
  if (count) count.textContent = filteredMembers.length ? `${activeMember + 1} / ${filteredMembers.length}` : "0 / 0";
}

function updateMemberStatus() {
  const status = $("memberStatus");
  if (!status) return;
  if (!filteredMembers.length) {
    status.textContent = "Tidak ada taruna/i yang cocok dengan pencarian.";
    return;
  }
  const isFiltered = currentFilter !== "all" || currentSearch.trim() !== "";
  status.textContent = isFiltered
    ? `Menampilkan ${filteredMembers.length} dari ${members.length} taruna/i`
    : `Menampilkan ${members.length} taruna/i`;
}

function renderMembers() {
  const grid = $("membersGrid");
  if (!grid) return;
  const wrap = grid.closest(".coverflow-wrap");
  const query = currentSearch.trim().toLowerCase();
  filteredMembers = members.filter((member) => {
    const matchesRole = currentFilter === "all" || member.role === currentFilter;
    const haystack = `${member.name} ${member.nit}`.toLowerCase();
    return matchesRole && (!query || haystack.includes(query));
  });

  if (activeMember >= filteredMembers.length) activeMember = 0;
  if (wrap) wrap.classList.toggle("is-empty", filteredMembers.length === 0);

  if (!filteredMembers.length) {
    grid.innerHTML = `<div class="empty-state">
      <strong>Tidak ada taruna/i</strong>
      <span>Coba kata kunci lain atau tampilkan semua anggota kelas.</span>
      <button type="button" onclick="resetMemberSearch()">Tampilkan semua</button>
    </div>`;
    const count = $("memberCount");
    if (count) count.textContent = "0 / 0";
    updateMemberStatus();
    return;
  }

  grid.innerHTML = filteredMembers.map((member, index) => memberCardHTML(member, index)).join("");
  updateMemberStatus();
  requestAnimationFrame(applyMemberCoverflow);
  requestAnimationFrame(() => lazyLoadImage(grid.querySelector(".coverflow-slide.active img[data-src]")));
}

function setMemberSlide(index) {
  if (!filteredMembers.length) return;
  activeMember = ((index % filteredMembers.length) + filteredMembers.length) % filteredMembers.length;
  applyMemberCoverflow();
}

function nextMember() {
  if (!filteredMembers.length) return;
  setMemberSlide(activeMember + 1);
}

function prevMember() {
  if (!filteredMembers.length) return;
  setMemberSlide(activeMember - 1);
}

function syncSearchClear() {
  const input = $("searchInput");
  const clear = $("memberSearchClear");
  if (input && clear) clear.hidden = input.value.length === 0;
}

function filterMembers() {
  const input = $("searchInput");
  currentSearch = input ? input.value : "";
  activeMember = 0;
  syncSearchClear();
  renderMembers();
}

function resetMemberSearch() {
  const input = $("searchInput");
  if (input) input.value = "";
  currentSearch = "";
  currentFilter = "all";
  activeMember = 0;
  document.querySelectorAll(".filter-btn").forEach((button) => {
    const isAll = button.dataset.role === "all";
    button.classList.toggle("active", isAll);
    button.setAttribute("aria-pressed", isAll ? "true" : "false");
  });
  syncSearchClear();
  renderMembers();
  if (input) input.focus({ preventScroll: true });
}

function filterByRole(role, button) {
  currentFilter = role || "all";
  activeMember = 0;
  document.querySelectorAll(".filter-btn").forEach((item) => {
    const active = item === button || item.dataset.role === currentFilter;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", active ? "true" : "false");
  });
  renderMembers();
}

/* ------------------------------------------------------------
   GALERI — COVERFLOW + LIGHTBOX
   ------------------------------------------------------------ */
function galleryCardHTML(item, index) {
  return `<div class="coverflow-slide" data-index="${index}" role="group" aria-roledescription="slide">
    <button class="gallery-card" type="button" aria-label="Perbesar foto: ${esc(item.title)}">
      <img data-src="${esc(item.img)}" alt="${esc(item.title)}" width="640" height="480" loading="lazy" decoding="async" draggable="false">
      <span class="gallery-loading" aria-hidden="true">Memuat…</span>
      <span class="gallery-fallback" aria-hidden="true">Foto belum tersedia</span>
      <span class="gallery-overlay"><span class="gallery-label">// ${esc(item.title)}</span></span>
      <span class="gallery-zoom" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4M11 8v6M8 11h6" stroke-linecap="round" />
        </svg>
      </span>
    </button>
  </div>`;
}

function applyGalleryCoverflow() {
  const grid = $("galleryGrid");
  if (!grid) return;
  const slides = grid.querySelectorAll(".coverflow-slide");
  if (!slides.length) return;

  const cardWidth = slides[0].offsetWidth || 320;
  slides.forEach((slide, index) => {
    const offset = shortOffset(index, activeGallery, galleryItems.length);
    const hidden = Math.abs(offset) > 2;
    slide.classList.remove("active", "near", "far", "hidden");
    slide.classList.add(coverClass(offset));
    slide.style.transform = coverTransform(offset, cardWidth);
    slide.setAttribute("aria-hidden", hidden ? "true" : "false");
    if (hidden) slide.setAttribute("inert", "");
    else slide.removeAttribute("inert");

    const button = slide.querySelector(".gallery-card");
    if (button) {
      if (offset === 0) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    }
    if (Math.abs(offset) <= 2) lazyLoadImage(slide.querySelector("img[data-src]"));
  });

  const count = $("galleryCount");
  if (count) count.textContent = galleryItems.length ? `${activeGallery + 1} / ${galleryItems.length}` : "0 / 0";
}

function renderGallery() {
  const grid = $("galleryGrid");
  if (!grid) return;
  if (!galleryItems.length) {
    grid.innerHTML = `<div class="empty-state"><strong>Galeri belum tersedia</strong><span>Momen kelas akan tampil di sini.</span></div>`;
    const status = $("galleryStatus");
    if (status) status.textContent = "Belum ada momen";
    return;
  }
  grid.innerHTML = galleryItems.map(galleryCardHTML).join("");
  const status = $("galleryStatus");
  if (status) status.textContent = `${galleryItems.length} momen terabadikan`;
  requestAnimationFrame(applyGalleryCoverflow);
}

function setGallerySlide(index) {
  if (!galleryItems.length) return;
  activeGallery = ((index % galleryItems.length) + galleryItems.length) % galleryItems.length;
  applyGalleryCoverflow();
}

function nextGallery() {
  setGallerySlide(activeGallery + 1);
}

function prevGallery() {
  setGallerySlide(activeGallery - 1);
}

function buildLightbox() {
  lightboxEl = document.createElement("div");
  lightboxEl.className = "lightbox";
  lightboxEl.setAttribute("role", "dialog");
  lightboxEl.setAttribute("aria-modal", "true");
  lightboxEl.setAttribute("aria-label", "Galeri foto RPL B");
  lightboxEl.setAttribute("aria-hidden", "true");
  lightboxEl.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Tutup galeri">×</button>
    <button class="lightbox-nav prev" type="button" aria-label="Foto sebelumnya">‹</button>
    <figure class="lightbox-figure">
      <img class="lightbox-img" alt="" draggable="false">
      <p class="lightbox-fallback" hidden>Foto tidak dapat dimuat.</p>
      <figcaption class="lightbox-caption">
        <span class="lightbox-title"></span>
        <span class="lightbox-count"></span>
      </figcaption>
    </figure>
    <button class="lightbox-nav next" type="button" aria-label="Foto berikutnya">›</button>
  `;
  document.body.appendChild(lightboxEl);
  lightboxEl.inert = true;

  lightboxEl.addEventListener("click", (event) => {
    if (event.target === lightboxEl) closeLightbox();
  });
  lightboxEl.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightboxEl.querySelector(".prev").addEventListener("click", () => lightboxStep(-1));
  lightboxEl.querySelector(".next").addEventListener("click", () => lightboxStep(1));

  lightboxEl.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    lightboxTouch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  lightboxEl.addEventListener("touchend", (event) => {
    if (!lightboxTouch) return;
    const dx = event.changedTouches[0].clientX - lightboxTouch.x;
    const dy = event.changedTouches[0].clientY - lightboxTouch.y;
    lightboxTouch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lightboxStep(dx < 0 ? 1 : -1);
  }, { passive: true });
}
let lightboxTouch = null;

function updateLightbox() {
  if (!lightboxEl || !galleryItems.length) return;
  const item = galleryItems[activeGallery];
  const image = lightboxEl.querySelector(".lightbox-img");
  const fallback = lightboxEl.querySelector(".lightbox-fallback");
  if (!item || !image) return;

  image.hidden = false;
  image.classList.remove("loaded");
  if (fallback) fallback.hidden = true;
  image.onload = () => image.classList.add("loaded");
  image.onerror = () => {
    image.hidden = true;
    if (fallback) fallback.hidden = false;
  };
  image.src = item.img;
  image.alt = item.title;
  lightboxEl.querySelector(".lightbox-title").textContent = item.title;
  lightboxEl.querySelector(".lightbox-count").textContent = `${activeGallery + 1} / ${galleryItems.length}`;

  const single = galleryItems.length < 2;
  lightboxEl.querySelectorAll(".lightbox-nav").forEach((button) => {
    button.hidden = single;
  });
}

function openLightbox(index) {
  if (!galleryItems.length) return;
  if (!lightboxEl) buildLightbox();
  activeGallery = ((index % galleryItems.length) + galleryItems.length) % galleryItems.length;
  lastFocusBeforeLightbox = document.activeElement;
  updateLightbox();
  applyGalleryCoverflow();
  lightboxOpen = true;
  lightboxEl.inert = false;
  lightboxEl.setAttribute("aria-hidden", "false");
  lightboxEl.classList.add("open");
  syncBodyLock();
  const closeBtn = lightboxEl.querySelector(".lightbox-close");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}

function closeLightbox() {
  if (!lightboxEl || !lightboxOpen) return;
  lightboxOpen = false;
  lightboxEl.classList.remove("open");
  lightboxEl.setAttribute("aria-hidden", "true");
  lightboxEl.inert = true;
  syncBodyLock();
  if (lastFocusBeforeLightbox && document.contains(lastFocusBeforeLightbox)) {
    lastFocusBeforeLightbox.focus({ preventScroll: true });
  }
  lastFocusBeforeLightbox = null;
}

function isLightboxOpen() {
  return !!(lightboxEl && lightboxOpen);
}

function lightboxStep(direction) {
  if (!galleryItems.length) return;
  setGallerySlide(activeGallery + (direction > 0 ? 1 : -1));
  updateLightbox();
}

/* ------------------------------------------------------------
   MODAL DETAIL TARUNA/I
   ------------------------------------------------------------ */
function openModal(index) {
  const member = members[index];
  if (!member) return;
  const overlay = $("modalOverlay");
  const avatar = $("modalAvatar");
  if (!overlay || !avatar) return;

  const fallback = `<span class="avatar-fallback" aria-hidden="true">${esc(member.initial)}</span>`;
  avatar.className = member.photo ? "modal-avatar has-photo" : "modal-avatar";
  avatar.style.background = `${member.color}1f`;
  avatar.style.color = member.color;
  avatar.innerHTML = member.photo
    ? `${fallback}<img src="${esc(member.photo)}" alt="${esc(member.name)}" draggable="false" decoding="async">`
    : fallback;

  const modalImage = avatar.querySelector("img");
  if (modalImage) {
    modalImage.addEventListener("load", () => modalImage.classList.add("loaded"), { once: true });
    modalImage.addEventListener("error", () => modalImage.remove(), { once: true });
  }

  $("modalName").textContent = member.name;
  $("modalRole").innerHTML = `<span class="member-role-badge ${badgeClass(member.role)}" style="position:static;display:inline-block">${esc(member.role)}</span>`;
  $("modalInfo").innerHTML = `
    <div class="modal-info-item"><div class="modal-info-label">NIT</div><div>${esc(member.nit)}</div></div>
    <div class="modal-info-item"><div class="modal-info-label">No. Absen</div><div>#${String(member.no).padStart(2, "0")}</div></div>
    <div class="modal-info-item"><div class="modal-info-label">Hobi</div><div>${esc(member.hobby)}</div></div>
    <div class="modal-info-item"><div class="modal-info-label">Kelas</div><div>RPL B</div></div>
    <div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Motto</div><div style="color:var(--accent);font-style:italic">“${esc(member.motto)}”</div></div>
  `;

  lastFocusBeforeModal = document.activeElement;
  modalOpen = true;
  overlay.inert = false;
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
  syncBodyLock();
  const closeBtn = $("modalCloseBtn");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.closest(".modal-close")) return;
  const overlay = $("modalOverlay");
  if (!overlay || !modalOpen) return;
  modalOpen = false;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  overlay.inert = true;
  syncBodyLock();
  if (lastFocusBeforeModal && document.contains(lastFocusBeforeModal)) {
    lastFocusBeforeModal.focus({ preventScroll: true });
  }
  lastFocusBeforeModal = null;
}

/* ------------------------------------------------------------
   WALI KELAS & TIMELINE
   ------------------------------------------------------------ */
function renderWaliKelas() {
  const target = $("waliKelasCard");
  if (!target) return;
  const teacher = waliKelas;
  const fallback = `<span class="avatar-fallback" aria-hidden="true">${esc(teacher.initial)}</span>`;
  const avatar = teacher.photo
    ? `<div class="wk-avatar has-photo">${fallback}<img src="${esc(ASSET_PATHS.images + teacher.photo)}" alt="${esc(teacher.name)}" draggable="false" loading="lazy" decoding="async"></div>`
    : `<div class="wk-avatar" style="background:${teacher.color}1f;color:${teacher.color}">${fallback}</div>`;

  target.innerHTML = `<div class="wk-card">
    <div class="wk-glow"></div>
    <div class="wk-badge">📚 WALI KELAS</div>
    ${avatar}
    <div class="wk-name">${esc(teacher.name)}</div>
    ${teacher.nip ? `<div class="wk-nip">NIP: ${esc(teacher.nip)}</div>` : ""}
    <div class="wk-subject">${esc(teacher.subject)}</div>
    <div class="wk-motto">“${esc(teacher.motto)}”</div>
  </div>`;

  const image = target.querySelector(".wk-avatar img");
  if (image) {
    image.addEventListener("load", () => image.classList.add("loaded"), { once: true });
    image.addEventListener("error", () => image.remove(), { once: true });
  }
}

function renderTimeline() {
  const timeline = $("timeline");
  if (!timeline) return;
  timeline.innerHTML = activities.map((activity) => `
    <div class="timeline-item">
      <div class="timeline-dot" style="border-color:${activity.color};color:${activity.color}">${esc(activity.icon)}</div>
      <div class="timeline-content">
        <div class="timeline-date">${esc(activity.date)}</div>
        <div class="timeline-title">${esc(activity.title)}</div>
        <div class="timeline-desc">${esc(activity.desc)}</div>
      </div>
    </div>
  `).join("");
}

/* ------------------------------------------------------------
   STATISTIK DINAMIS
   Semua angka diambil dari sumber data yang sama dengan daftar
   anggota, galeri, kegiatan, dan playlist. Nilai 0 tetap valid;
   data yang tidak tersedia ditandai dengan tanda pisah.
   ------------------------------------------------------------ */
const CLASS_COUNT = 1; // Situs ini mewakili satu kelas: RPL B.

const statSources = {
  members: () => (Array.isArray(members) ? members.length : null),
  classes: () => CLASS_COUNT,
  activities: () => (Array.isArray(activities) ? activities.length : null),
  gallery: () => (Array.isArray(galleryItems) ? galleryItems.length : null),
  playlist: () => (Array.isArray(playlist) ? playlist.length : null),
};

function resolveStat(name) {
  const source = statSources[name];
  if (typeof source !== "function") return null;
  const value = source();
  return Number.isInteger(value) && value >= 0 ? value : null;
}

function syncDataCounts() {
  let hasError = false;
  let hasEmpty = false;

  document.querySelectorAll("[data-count]").forEach((element) => {
    const value = resolveStat(element.dataset.count);
    element.classList.remove("is-loading");
    if (value === null) {
      hasError = true;
      element.dataset.state = "error";
      element.textContent = "—";
      element.setAttribute("aria-label", "Data belum tersedia");
      return;
    }
    element.removeAttribute("aria-label");
    element.dataset.state = value === 0 ? "empty" : "ready";
    if (value === 0) hasEmpty = true;
    element.textContent = String(value);
  });

  const statsWrap = $("heroStats");
  if (statsWrap) statsWrap.setAttribute("aria-busy", "false");

  const statsStatus = $("statsStatus");
  if (statsStatus) {
    statsStatus.textContent = hasError
      ? "Sebagian statistik belum tersedia."
      : hasEmpty
        ? "Statistik kelas dimuat. Beberapa data masih kosong."
        : "Statistik kelas berhasil dimuat.";
  }

  const memberStatus = $("memberStatus");
  if (memberStatus) memberStatus.textContent = `Menampilkan ${members.length} taruna/i`;
  const galleryStatus = $("galleryStatus");
  if (galleryStatus) galleryStatus.textContent = `${galleryItems.length} momen terabadikan`;
  const mpTrackNum = $("mpTrackNum");
  if (mpTrackNum) mpTrackNum.textContent = `1 / ${playlist.length}`;
  const mpListCount = $("mpListCount");
  if (mpListCount) mpListCount.textContent = String(playlist.length);
}

/* ------------------------------------------------------------
   PEMUTAR MUSIK
   ------------------------------------------------------------ */
const storedVolume = parseFloat(storage.get("rplb-volume", "0.7"));
const initialVolume = Number.isFinite(storedVolume) ? Math.min(1, Math.max(0, storedVolume)) : 0.7;
const mpAudio = new Audio();
mpAudio.preload = "auto";
mpAudio.volume = initialVolume;
let mpPrevVolume = initialVolume > 0 ? initialVolume : 0.7;
let mpCurrentTrack = 0;
let mpIsPlaying = false;
let mpIsLooping = false;
let mpIsShuffling = false;
let mpFailStreak = 0;
let mpAutoplayArmed = false;

const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM14 5h4v14h-4z" /></svg>';
const ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round" /></svg>';
const ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const ICON_VOL_HIGH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const ICON_VOL_LOW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const ICON_VOL_MUTE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM16 9l5 6M21 9l-5 6" stroke-linecap="round" stroke-linejoin="round" /></svg>';

function mpTrack() {
  return playlist[mpCurrentTrack] || { title: "Playlist RPL B", artist: "RPL B", file: "" };
}

function mpSetStatus(message, kind) {
  const status = $("mpStatus");
  if (!status) return;
  status.textContent = message || "";
  status.classList.toggle("info", kind === "info");
  status.classList.toggle("error", kind === "error");
}

/* Browser modern memblokir audio bersuara sebelum ada interaksi.
   Autoplay dicoba saat halaman dibuka; bila ditolak, pemutaran
   dimulai pada interaksi pertama pengguna. */
function mpDisarmAutoplay() {
  if (!mpAutoplayArmed) return;
  mpAutoplayArmed = false;
  document.removeEventListener("pointerdown", mpAutoplayGesture, true);
  document.removeEventListener("keydown", mpAutoplayGesture, true);
}

function mpArmAutoplay() {
  if (mpAutoplayArmed) return;
  mpAutoplayArmed = true;
  document.addEventListener("pointerdown", mpAutoplayGesture, true);
  document.addEventListener("keydown", mpAutoplayGesture, true);
}

function mpAutoplayGesture(event) {
  if (!mpAutoplayArmed) return;
  if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
  const target = event.target;
  if (target && target.closest && target.closest(".mp-controls, #music-player, #musicBtn")) {
    mpDisarmAutoplay();
    return;
  }
  mpDisarmAutoplay();
  if (!mpAudio.paused) return;
  mpPlay("gesture");
}

function mpPlay(source) {
  if (!playlist.length) {
    mpSetStatus("Playlist belum tersedia.", "error");
    return;
  }
  if (!mpAudio.src) mpLoadTrack(mpCurrentTrack, false);
  if (source !== "track") mpSetStatus("Memuat lagu…", "info");
  const promise = mpAudio.play();
  if (!promise || typeof promise.then !== "function") return;
  promise.then(() => {
    mpSetStatus("");
  }).catch((error) => {
    mpIsPlaying = false;
    updatePlayerUI();
    if (error && error.name === "NotAllowedError") {
      mpSetStatus("Klik di mana saja untuk memulai musik.", "info");
      mpArmAutoplay();
      if (source === "autoplay") {
        showToast("Musik siap — klik di mana saja untuk mulai");
      }
    } else {
      mpSetStatus("Lagu ini belum bisa diputar. Coba lagu berikutnya.", "error");
    }
  });
}

function mpFmtTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function mpSetPlayIcon(button, playing, label) {
  if (!button) return;
  button.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
  button.setAttribute("aria-label", label || (playing ? "Jeda musik" : "Putar musik"));
}

function updatePlayerUI() {
  const track = mpTrack();
  const artist = track.artist || "RPL B";
  if ($("mpTrackName")) $("mpTrackName").textContent = track.title;
  if ($("mpTrackArtist")) $("mpTrackArtist").textContent = artist;
  if ($("mpMiniTitle")) $("mpMiniTitle").textContent = track.title;
  if ($("mpMiniArtist")) $("mpMiniArtist").textContent = artist;
  if ($("mpTrackNum")) $("mpTrackNum").textContent = `${mpCurrentTrack + 1} / ${playlist.length}`;
  if ($("mpListCount")) $("mpListCount").textContent = String(playlist.length);

  mpSetPlayIcon($("mpPlayBtn"), mpIsPlaying, mpIsPlaying ? "Jeda musik" : "Putar musik");
  mpSetPlayIcon($("mpMiniPlayBtn"), mpIsPlaying, mpIsPlaying ? "Jeda musik" : "Putar musik");
  mpSetPlayIcon($("musicBtn"), mpIsPlaying, mpIsPlaying ? "Jeda musik RPL B" : "Putar musik RPL B");

  const player = $("music-player");
  if (player) player.classList.toggle("is-playing", mpIsPlaying);
  if ($("musicBtn")) $("musicBtn").setAttribute("aria-pressed", mpIsPlaying ? "true" : "false");
  if ($("mpWave")) $("mpWave").classList.toggle("paused", !mpIsPlaying);

  document.querySelectorAll("#mpTrackList button[data-track]").forEach((button) => {
    const active = Number(button.dataset.track) === mpCurrentTrack;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });

  updateMediaSession(track, artist);
}

function updateMediaSession(track, artist) {
  if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist,
      album: "Playlist RPL B",
      artwork: [{ src: "assets/images/family-rplb.jpg", sizes: "1200x900", type: "image/jpeg" }],
    });
  } catch (error) {
    /* Media Session opsional */
  }
}

function mpUpdateProgress() {
  const seek = $("mpSeek");
  const current = $("mpCurrent");
  const duration = $("mpDuration");
  if (!seek) return;
  const total = Number.isFinite(mpAudio.duration) ? mpAudio.duration : 0;
  const position = Number.isFinite(mpAudio.currentTime) ? mpAudio.currentTime : 0;
  const percent = total > 0 ? Math.min(100, (position / total) * 100) : 0;
  seek.max = total > 0 ? String(total) : "100";
  seek.value = String(total > 0 ? position : 0);
  seek.style.setProperty("--seek", `${percent}%`);
  seek.setAttribute("aria-valuetext", `${mpFmtTime(position)} dari ${mpFmtTime(total)}`);
  if (current) current.textContent = mpFmtTime(position);
  if (duration) duration.textContent = mpFmtTime(total);
}

function mpLoadTrack(index, autoplay) {
  if (!playlist.length) {
    mpSetStatus("Playlist belum tersedia.", "error");
    return;
  }
  mpCurrentTrack = ((index % playlist.length) + playlist.length) % playlist.length;
  const track = mpTrack();
  if (!track.file) {
    updatePlayerUI();
    mpIsPlaying = false;
    mpSetStatus("Sumber audio untuk lagu ini tidak tersedia.", "error");
    return;
  }
  if (autoplay) mpSetStatus("Memuat lagu…", "info");
  else mpSetStatus("");
  mpAudio.src = track.file;
  mpAudio.loop = mpIsLooping;
  if ($("mpSeek")) {
    $("mpSeek").value = "0";
    $("mpSeek").style.setProperty("--seek", "0%");
  }
  if ($("mpCurrent")) $("mpCurrent").textContent = "0:00";
  if ($("mpDuration")) $("mpDuration").textContent = "0:00";
  updatePlayerUI();
  if (autoplay) mpPlay("track");
}

function mpTogglePlay() {
  if (!playlist.length) {
    mpSetStatus("Playlist belum tersedia.", "error");
    return;
  }
  if (mpAudio.paused || mpAudio.ended) {
    mpPlay("user");
  } else {
    mpAudio.pause();
  }
}

function mpNextIndex() {
  if (playlist.length < 2) return 0;
  let next = mpCurrentTrack + 1;
  if (mpIsShuffling) {
    do {
      next = Math.floor(Math.random() * playlist.length);
    } while (next === mpCurrentTrack);
  }
  return ((next % playlist.length) + playlist.length) % playlist.length;
}

function mpNext() {
  if (!playlist.length) return;
  mpLoadTrack(mpNextIndex(), !mpAudio.paused);
}

function mpPrev() {
  if (!playlist.length) return;
  if (mpAudio.currentTime > 3) {
    mpAudio.currentTime = 0;
    return;
  }
  mpLoadTrack(mpCurrentTrack - 1, !mpAudio.paused);
}

function mpToggleShuffle() {
  mpIsShuffling = !mpIsShuffling;
  const button = $("mpShuffleBtn");
  if (button) {
    button.classList.toggle("active", mpIsShuffling);
    button.setAttribute("aria-pressed", mpIsShuffling ? "true" : "false");
  }
  showToast(mpIsShuffling ? "Acak aktif" : "Urutan normal");
}

function mpToggleLoop() {
  mpIsLooping = !mpIsLooping;
  mpAudio.loop = mpIsLooping;
  const button = $("mpLoopBtn");
  if (button) {
    button.classList.toggle("active", mpIsLooping);
    button.setAttribute("aria-pressed", mpIsLooping ? "true" : "false");
  }
  showToast(mpIsLooping ? "Ulangi lagu aktif" : "Ulangi nonaktif");
}

function mpSetVolume(value) {
  const volume = Math.min(1, Math.max(0, parseFloat(value) || 0));
  mpAudio.volume = volume;
  if (volume > 0) mpPrevVolume = volume;
  const slider = $("mpVolSlider");
  if (slider) {
    slider.value = String(volume);
    slider.style.setProperty("--vol", `${volume * 100}%`);
  }
  const icon = $("mpVolIcon");
  if (icon) {
    icon.innerHTML = volume > 0.5 ? ICON_VOL_HIGH : volume > 0 ? ICON_VOL_LOW : ICON_VOL_MUTE;
    icon.setAttribute("aria-label", volume > 0 ? "Bisukan musik" : "Nyalakan suara");
  }
  storage.set("rplb-volume", String(volume));
}

function mpToggleMute() {
  if (mpAudio.volume > 0) {
    mpPrevVolume = mpAudio.volume;
    mpSetVolume(0);
  } else {
    mpSetVolume(mpPrevVolume || 0.7);
  }
}

function mpSeekTo(value) {
  const total = Number.isFinite(mpAudio.duration) ? mpAudio.duration : 0;
  if (!total) return;
  const position = Math.min(total, Math.max(0, Number(value) || 0));
  mpAudio.currentTime = position;
  mpUpdateProgress();
}

function mpToggleList() {
  const list = $("mpList");
  const button = $("mpListBtn");
  if (!list || !button) return;
  const shouldOpen = list.hidden;
  list.hidden = !shouldOpen;
  button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  if (shouldOpen) {
    const active = list.querySelector("button.active");
    if (active) active.scrollIntoView({ block: "nearest" });
  }
}

function renderPlaylist() {
  const list = $("mpTrackList");
  if (!list) return;
  list.innerHTML = playlist.map((track, index) => `
    <li>
      <button type="button" data-track="${index}" aria-label="Putar ${esc(track.title)} oleh ${esc(track.artist || "RPL B")}">
        <span class="mp-idx">${String(index + 1).padStart(2, "0")}</span>
        <span class="mp-name">${esc(track.title)}</span>
        <span class="mp-artist">${esc(track.artist || "RPL B")}</span>
      </button>
    </li>
  `).join("");
  if ($("mpListCount")) $("mpListCount").textContent = String(playlist.length);
  if ($("mpTrackNum")) $("mpTrackNum").textContent = `1 / ${playlist.length}`;
}

function collapsePlayer() {
  const player = $("music-player");
  if (!player) return;
  player.classList.add("collapsed");
  const expand = $("mpExpandBtn");
  if (expand) expand.setAttribute("aria-expanded", "false");
}

function expandPlayer() {
  const player = $("music-player");
  if (!player) return;
  player.classList.remove("collapsed");
  const expand = $("mpExpandBtn");
  if (expand) expand.setAttribute("aria-expanded", "true");
}

function initPlayer() {
  if ($("mpTrackList")) {
    $("mpTrackList").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-track]");
      if (!button) return;
      mpLoadTrack(Number(button.dataset.track), true);
      showToast(`▶ ${mpTrack().title}`);
    });
  }
  if ($("mpSeek")) {
    $("mpSeek").addEventListener("input", (event) => mpSeekTo(event.target.value));
  }
  mpSetVolume(initialVolume);
  mpLoadTrack(0, false);

  mpAudio.addEventListener("timeupdate", mpUpdateProgress);
  mpAudio.addEventListener("loadedmetadata", mpUpdateProgress);
  mpAudio.addEventListener("durationchange", mpUpdateProgress);
  mpAudio.addEventListener("play", () => {
    mpIsPlaying = true;
    mpDisarmAutoplay();
    mpSetStatus("");
    updatePlayerUI();
  });
  mpAudio.addEventListener("playing", () => {
    mpIsPlaying = true;
    mpFailStreak = 0;
    mpDisarmAutoplay();
    mpSetStatus("");
    updatePlayerUI();
  });
  mpAudio.addEventListener("pause", () => {
    mpIsPlaying = false;
    updatePlayerUI();
  });
  mpAudio.addEventListener("ended", () => {
    if (!mpIsLooping) mpLoadTrack(mpNextIndex(), true);
  });
  mpAudio.addEventListener("waiting", () => {
    if (mpIsPlaying) mpSetStatus("Memuat lagu…", "info");
  });
  mpAudio.addEventListener("canplay", () => {
    const status = $("mpStatus");
    if (status && status.textContent === "Memuat lagu…") mpSetStatus("");
  });
  mpAudio.addEventListener("error", () => {
    const wasPlaying = mpIsPlaying;
    const failedIndex = mpCurrentTrack;
    mpIsPlaying = false;
    mpFailStreak += 1;
    updatePlayerUI();
    mpSetStatus(`“${mpTrack().title}” tidak bisa diputar.`, "error");
    if (wasPlaying && mpFailStreak <= 2 && playlist.length > 1) {
      setTimeout(() => {
        if (mpCurrentTrack === failedIndex && !mpIsPlaying) {
          mpLoadTrack(failedIndex + 1, true);
        }
      }, 1400);
    }
  });

  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setActionHandler("play", mpTogglePlay);
      navigator.mediaSession.setActionHandler("pause", () => mpAudio.pause());
      navigator.mediaSession.setActionHandler("previoustrack", mpPrev);
      navigator.mediaSession.setActionHandler("nexttrack", mpNext);
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (Number.isFinite(details.seekTime)) mpSeekTo(details.seekTime);
      });
    } catch (error) {
      /* Media Session tidak didukung penuh */
    }
  }

  /* Langsung coba putar lagu pertama; jika browser memblokir,
     pemutaran dimulai pada interaksi pertama pengguna. */
  mpPlay("autoplay");
}

/* ------------------------------------------------------------
   TEMA, TOAST & KUNCI SCROLL
   ------------------------------------------------------------ */
function applyTheme(theme, notify) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#070b0d" : "#f4f8f6");

  const button = $("themeBtn");
  if (button) {
    button.innerHTML = next === "dark" ? ICON_SUN : ICON_MOON;
    button.title = next === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap";
    button.setAttribute("aria-label", next === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap");
  }
  if (notify) showToast(next === "dark" ? "Mode gelap aktif" : "Mode terang aktif");
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next, true);
  storage.set("rplb-theme", next);
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function syncBodyLock() {
  const locked = mobileNavOpen || modalOpen || lightboxOpen;
  document.body.classList.toggle("nav-open", mobileNavOpen);
  document.body.style.overflow = locked ? "hidden" : "";
}

function getFocusable(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => element.offsetParent !== null || element === document.activeElement);
}

function trapFocus(event, container) {
  if (event.key !== "Tab") return false;
  const focusable = getFocusable(container);
  if (!focusable.length) {
    event.preventDefault();
    return true;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
  return true;
}

/* ------------------------------------------------------------
   NAVIGASI MOBILE
   ------------------------------------------------------------ */
function setInert(element, value) {
  if (!element) return;
  if (value) element.setAttribute("inert", "");
  else element.removeAttribute("inert");
  try { element.inert = value; } catch (error) { /* fallback atribut */ }
}

function toggleMobileNav(force) {
  const nav = $("mobileNav");
  const hamburger = $("hamburgerBtn");
  if (!nav) return;
  const shouldOpen = typeof force === "boolean" ? force : !mobileNavOpen;
  mobileNavOpen = shouldOpen;
  nav.classList.toggle("open", shouldOpen);
  nav.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
  setInert(nav, !shouldOpen);
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    hamburger.setAttribute("aria-label", shouldOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  }
  syncBodyLock();
  if (shouldOpen) {
    setTimeout(() => {
      const first = nav.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }, 300);
  }
}

function closeMobileNav(restoreFocus) {
  if (!mobileNavOpen) return;
  const hamburger = $("hamburgerBtn");
  toggleMobileNav(false);
  if (restoreFocus && hamburger) hamburger.focus({ preventScroll: true });
}

/* ------------------------------------------------------------
   FORMULIR KONTAK
   ------------------------------------------------------------ */
const contactFields = ["contactName", "contactEmail", "contactMessage"];

function fieldErrorElement(input) {
  return document.getElementById(`${input.id}Error`);
}

function setFieldError(input, message) {
  if (!input) return;
  const group = input.closest(".form-group");
  const error = fieldErrorElement(input);
  if (group) group.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message || "";
}

function validateField(input) {
  if (!input) return true;
  const value = input.value.trim();
  let message = "";
  if (input.id === "contactName") {
    if (!value) message = "Nama wajib diisi.";
    else if (value.length < 2) message = "Nama minimal 2 karakter.";
  } else if (input.id === "contactEmail") {
    if (!value) message = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) message = "Format email belum benar.";
  } else if (input.id === "contactMessage") {
    if (!value) message = "Pesan wajib diisi.";
    else if (value.length < 10) message = "Tulis pesan minimal 10 karakter.";
  }
  setFieldError(input, message);
  return !message;
}

function validateContactForm(focusFirst) {
  let valid = true;
  let firstInvalid = null;
  contactFields.forEach((id) => {
    const input = $(id);
    if (!input) return;
    if (!validateField(input)) {
      valid = false;
      if (!firstInvalid) firstInvalid = input;
    }
  });
  if (!valid && focusFirst && firstInvalid) firstInvalid.focus({ preventScroll: false });
  return valid;
}

function updateMessageCount() {
  const message = $("contactMessage");
  const count = $("messageCount");
  if (message && count) count.textContent = `${message.value.length} / ${message.maxLength || 2000}`;
}

function buildMailto(name, email, message) {
  const subject = encodeURIComponent(`Pesan website RPL B dari ${name || "pengunjung"}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  return `mailto:${SCHOOL_EMAIL}?subject=${subject}&body=${body}`;
}

function setFormStatus(message, type, link) {
  const status = $("formStatus");
  if (!status) return;
  status.textContent = message || "";
  status.className = `form-status${type ? ` ${type}` : ""}`;
  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    status.append(" ", anchor);
  }
}

function initContactForm() {
  const form = $("contactForm");
  if (!form) return;
  const submit = $("contactSubmit");
  const originalLabel = submit ? submit.innerHTML : "";

  contactFields.forEach((id) => {
    const input = $(id);
    if (!input) return;
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      updateMessageCount();
      if (input.getAttribute("aria-invalid") === "true") validateField(input);
    });
  });
  updateMessageCount();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setFormStatus("");
    if (!validateContactForm(true)) {
      setFormStatus("Periksa kembali kolom yang ditandai, lalu kirim lagi.", "error");
      return;
    }

    const name = $("contactName") ? $("contactName").value.trim() : "";
    const email = $("contactEmail") ? $("contactEmail").value.trim() : "";
    const message = $("contactMessage") ? $("contactMessage").value.trim() : "";
    const mailto = buildMailto(name, email, message);

    if (!window.emailjs || typeof window.emailjs.send !== "function") {
      setFormStatus("Layanan email belum siap. Kamu tetap bisa mengirim pesan lewat email.", "error", {
        href: mailto,
        label: "Buka aplikasi email",
      });
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.innerHTML = '<span class="btn-label">Mengirim…</span>';
    }
    form.setAttribute("aria-busy", "true");
    setFormStatus("Sedang mengirim pesan…", "");

    window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { from_name: name, from_email: email, message, reply_to: email },
      { publicKey: EMAILJS_PUBLIC_KEY }
    ).then(() => {
      setFormStatus("Pesan berhasil dikirim. Terima kasih sudah menghubungi RPL B!", "success");
      form.reset();
      contactFields.forEach((id) => setFieldError($(id), ""));
      updateMessageCount();
      showToast("Pesan terkirim ✓");
    }).catch((error) => {
      console.error("EmailJS error:", error);
      setFormStatus("Pesan belum terkirim. Coba lagi atau kirim lewat email langsung.", "error", {
        href: mailto,
        label: "Kirim lewat email",
      });
    }).finally(() => {
      form.setAttribute("aria-busy", "false");
      if (submit) {
        submit.disabled = false;
        submit.innerHTML = originalLabel;
      }
    });
  });
}

/* Sembunyikan pemutar musik mengambang saat pengguna mengisi formulir
   di layar kecil agar kolom tidak tertutup. */
function initPlayerSuppression() {
  const player = $("music-player");
  const form = $("contactForm");
  if (!player || !form) return;

  const mobile = window.matchMedia("(max-width: 900px)");
  let fieldFocused = false;
  let formVisible = false;

  const update = () => {
    player.classList.toggle("is-suppressed", mobile.matches && (fieldFocused || formVisible));
  };

  form.addEventListener("focusin", () => {
    fieldFocused = true;
    update();
  });

  form.addEventListener("focusout", (event) => {
    if (!form.contains(event.relatedTarget)) {
      fieldFocused = false;
      update();
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      formVisible = entries.some((entry) => entry.isIntersecting);
      update();
    }, { threshold: 0 });
    observer.observe(form);
  }

  if (typeof mobile.addEventListener === "function") {
    mobile.addEventListener("change", update);
  } else if (typeof mobile.addListener === "function") {
    mobile.addListener(update);
  }

  update();
}

/* ------------------------------------------------------------
   SCROLL, NAV AKTIF, REVEAL & KEYBOARD
   ------------------------------------------------------------ */
const sectionIds = ["home", "tentang", "walikelas", "anggota", "gallery", "kegiatan", "kontak"];

function updateActiveNav() {
  let current = "home";
  sectionIds.forEach((id) => {
    const section = $(id);
    if (section && section.getBoundingClientRect().top <= 140) current = id;
  });
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

let scrollTicking = false;

function handleScroll() {
  const top = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = $("progressBar");
  if (progress) progress.style.width = `${height > 0 ? Math.min(100, (top / height) * 100) : 0}%`;

  const backTop = $("backTop");
  if (backTop) backTop.classList.toggle("visible", top > 320);

  const nav = document.querySelector(".site-header nav");
  if (nav) nav.classList.toggle("scrolled", top > 10);

  updateActiveNav();
}

function initScroll() {
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      handleScroll();
      scrollTicking = false;
    });
  }, { passive: true });

  const backTop = $("backTop");
  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeMobileNav(false);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applyMemberCoverflow();
      applyGalleryCoverflow();
    }, 160);
  }, { passive: true });

  handleScroll();
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("in"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
  elements.forEach((element) => observer.observe(element));
}

function focusedCarousel() {
  const active = document.activeElement;
  if (!active || !active.closest) return null;
  if (active.closest("#gallery")) return "gallery";
  if (active.closest("#anggota")) return "member";
  return null;
}

function centeredCarousel() {
  const middle = window.innerHeight / 2;
  const gallery = $("gallery");
  const membersSection = $("anggota");
  if (gallery) {
    const rect = gallery.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom >= middle) return "gallery";
  }
  if (membersSection) {
    const rect = membersSection.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom >= middle) return "member";
  }
  return null;
}

function initKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (lightboxOpen) closeLightbox();
      else if (modalOpen) closeModal();
      else if (mobileNavOpen) closeMobileNav(true);
      return;
    }

    if (lightboxOpen) {
      if (event.key === "Tab") {
        trapFocus(event, lightboxEl);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        lightboxStep(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        lightboxStep(-1);
      }
      return;
    }

    if (modalOpen) {
      if (event.key === "Tab") trapFocus(event, $("modalOverlay"));
      return;
    }

    if (mobileNavOpen) {
      if (event.key === "Tab") trapFocus(event, $("mobileNav"));
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || document.activeElement.isContentEditable) return;

    const carousel = focusedCarousel() || centeredCarousel();
    if (!carousel) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (carousel === "gallery") nextGallery();
      else nextMember();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (carousel === "gallery") prevGallery();
      else prevMember();
    }
  });
}

function bindSwipe(stage, onNext, onPrev) {
  if (!stage) return;
  let start = null;
  let swiped = false;
  let resetTimer = null;

  stage.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });

  stage.addEventListener("touchend", (event) => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    start = null;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    swiped = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { swiped = false; }, 380);
    if (dx < 0) onNext();
    else onPrev();
  }, { passive: true });

  stage.addEventListener("click", (event) => {
    if (!swiped) return;
    event.preventDefault();
    event.stopPropagation();
    swiped = false;
  }, true);
}

function initGridInteractions() {
  const memberGrid = $("membersGrid");
  const galleryGrid = $("galleryGrid");

  if (memberGrid) {
    memberGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".member-card");
      if (!card) return;
      const slide = card.closest(".coverflow-slide");
      const slides = Array.from(memberGrid.querySelectorAll(".coverflow-slide"));
      const index = slides.indexOf(slide);
      if (index < 0) return;
      if (index === activeMember) {
        const member = filteredMembers[index];
        if (member) openModal(member.no - 1);
      } else {
        setMemberSlide(index);
      }
    });
  }

  if (galleryGrid) {
    galleryGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".gallery-card");
      if (!card || card.classList.contains("error")) return;
      const slide = card.closest(".coverflow-slide");
      const slides = Array.from(galleryGrid.querySelectorAll(".coverflow-slide"));
      const index = slides.indexOf(slide);
      if (index < 0) return;
      if (index === activeGallery) openLightbox(index);
      else setGallerySlide(index);
    });
  }

  const memberStage = $("memberStage");
  const galleryStage = $("galleryStage");
  bindSwipe(memberStage, nextMember, prevMember);
  bindSwipe(galleryStage, nextGallery, prevGallery);
}

function initPageNavigation() {
  const mobileNav = $("mobileNav");
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");
        if (!hash || !hash.startsWith("#")) return;
        const target = document.getElementById(hash.slice(1));
        if (!target) return;
        event.preventDefault();
        closeMobileNav(false);
        setTimeout(() => {
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          if (window.history && window.history.pushState) window.history.pushState(null, "", hash);
        }, 20);
      });
    });
  }

  document.addEventListener("click", (event) => {
    if (!mobileNavOpen) return;
    if (event.target.closest(".site-header") || event.target.closest("#music-player")) return;
    closeMobileNav(false);
  });
}

function init() {
  applyTheme(document.documentElement.dataset.theme || "dark", false);
  syncDataCounts();
  renderWaliKelas();
  renderMembers();
  renderGallery();
  renderTimeline();
  renderPlaylist();
  initPlayer();
  initContactForm();
  initPlayerSuppression();
  initReveal();
  initPageNavigation();
  initScroll();
  initKeyboard();
  initGridInteractions();
  syncSearchClear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
