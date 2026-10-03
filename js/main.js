(function () {
  const canvas = document.getElementById("codeRain");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const colors = ["#65d7c8", "#8ea7ff", "#ffc56f", "#ff7f73", "#a8eddb"];
  const snippets = [
    'const team = "RPL B";', "function buildFuture() {", 'return "solid & creative";',
    "for (let i = 0; i < 38; i++)", 'console.log("STEMPERT 2025");', "if (semangat === true) {",
    'document.querySelector(".kelas")', "async function deploy() {", "await launchProject();",
    "export default class RPLB {", "npm run build --production", 'git commit -m "ready 🚀"',
    "SELECT * FROM taruna_rplb", 'import { useState } from "react"', '<div class="hero-section">',
    "border-radius: 8px;", "display: flex; gap: 12px;", "background: linear-gradient(",
    "@media (max-width: 768px)", "def train_model(data):", 'print("Hello, World!")',
    "for x in range(38):", "#include <iostream>",'create database RPLB', "int main() { return 0; }",'git init',
    'cout << "RPL B" << endl;', "res.status(200).json(data)", 'fetch("/api/taruna")',
    ".then(res => res.json())",'sudo apt update && sudo apt upgrade', 'localStorage.setItem("kelas")', "position: absolute; z-index:",
    "transform: translateY(-3px)", "const router = express.Router()", "app.listen(3000, () => {",
    "schema.validate(formData)", "try { await connectDB() }", "catch (err) { console.error }",'SABISA BISA PASTI BISA KUDU BISA LUAR BIASA MABOK CODING', "const [count, setCount] = useState(0)", "return <div>{count}</div>", "npm install --save react-router-dom",
    "01001000 01100101 01111001",'pkg install radit-jomok', "0xFF 0b1010 NaN Infinity", "docker build -t rplb-app .",
    'WHERE angkatan = "2025/2026"', "INSERT INTO kegiatan VALUES", 'JOIN taruna ON kelas = "RPL B"',
    "padding: 16px 24px;", "color: var(--accent);", "animation: fadeIn 0.8s ease;",
  ];
  let drops = [];

  const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

  function createDrop() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      speed: 0.45 + Math.random() * 0.9,
      text: randomItem(snippets),
      size: 10 + Math.floor(Math.random() * 5),
      color: randomItem(colors),
      opacity: 0.55 + Math.random() * 0.4,
      interval: 80 + Math.floor(Math.random() * 120),
      tick: 0,
    };
  }

  function resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(window.innerWidth * pixelRatio);
    canvas.height = Math.ceil(window.innerHeight * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    drops = Array.from({ length: Math.max(10, Math.floor(window.innerWidth / 90)) }, createDrop);
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drops.forEach((drop) => {
      ctx.save();
      ctx.globalAlpha = drop.opacity;
      ctx.fillStyle = drop.color;
      ctx.font = `${drop.size}px Consolas, 'Courier New', monospace`;
      ctx.fillText(drop.text, drop.x, drop.y);
      ctx.restore();

      drop.y += drop.speed;
      drop.tick += 1;
      if (drop.tick >= drop.interval) { drop.tick = 0; drop.text = randomItem(snippets); }
      if (drop.y > window.innerHeight + 30) Object.assign(drop, createDrop(), { y: -30 });
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
})();


      const $ = (id) => document.getElementById(id);

      // ============================================================
      // FOTO PROFIL TARUNA/I
      // Isi nama file foto di bawah ini sesuai urutan absen.
      // Semua gambar disimpan di folder assets/images.
      // Jika belum punya foto, biarkan "" (string kosong) → pakai inisial.
      // ============================================================
      const ASSET_PATHS = {
        images: "assets/images/",
        audio: "assets/audio/",
      };

      const memberPhotos = [
        "oby.jpeg",           // 01 - Adi hidayat
        "ahmad.jpg",            // 02 - Ahmad rifki
        "arum.jpeg",      // 03 - ajeng putri arumi
        "amanda.jpeg",     // 04 - amanda sifa widodo
        "",                // 05 - aris meylina putri
        "azzkia.jpeg",    // 06 - azzkia farhatunnisa
        "bilqis.jpeg",       // 07 - bilqis hanifatul halimah
        "cerdas.jpg",                // 08 - cerdas abdul jabar
        "Holik.jpg",                // 09 - dandy fahri
        "dehan.jpeg",          // 10 - dehan fadilah
        "Desta.jpg",         // 11 - desta ginanjar
        "dila.jpeg",          // 12 - dila fitriani
        "eva.jpeg",             // 13 - eva rahayu
        "Farhan.jpg",                // 14 - Farhan arya zaelani
        "entod.jpeg",     // 15 - febriyana maulidan solihin
        "Jaspy.jpg",    // 16 - jaspy gema ramadhan
        "",                // 17 - karina mulyasari
        "lala.jpeg",       // 18 - latifah ulumiyah
        "Dapa.jpg",         // 19 - muhammad daffa al muhtar
        "nadya.jpeg",        // 20 - nadya salsabila
        "Nopal.jpg",    // 21 - naufal aydin nashif
        "najwa o.jpeg",          // 22 - nazwa ocktara aryanti
        "",                // 23 - nazwa olivia
        "nesya.jpeg",      // 24 - neisya khotimatul zahra
        "",                // 25 - Nurhadi Abdul Mughni
        "Piely.jpg",                // 26 - pielly ghaffar arrauf rajab
        "Radit.jpg",     // 27 - raditya al-ghifari
        "Abah.jpg",                // 28 - Rahman Adli Permana
        "rahma.jpeg",             // 29 - Rahmayanti
        "Gangster 2.jpg",  // 30 - reyga dwie oktaviyana
        "sela.jpeg",                  // 31 - sella
        "",                // 32 - sesilia saroi marei
        "",                // 33 - tio permana
        "",                // 34 - widia ramadhani
        "Willy.jpg",                // 35 - wiliandri
        "windi.jpeg",               // 36 - windiani
        "photos/oya-grance.jpg",             // 37 - oya grance mambrisauw
        "zaskia.jpeg",            // 38 - zaskia aira uswatun hasanah
      ];
      // ============================================================

      const members = [
        ["Adi hidayat","2526411","Anggota","Programming","Kode adalah seni","#65d7c8","AH"],
        ["Ahmad rifki","2526412","Anggota","Badminton/futsal","Kerja keras tak pernah khianat","#8ea7ff","AR"],
        ["ajeng putri arumi","2526413","Anggota","Menulis","Catat setiap momen","#ffc56f","AP"],
        ["amanda sifa widodo","2526414","Anggota","Memasak","Hemat pangkal kaya","#ff7f73","AS"],
        ["aris meylina putri","2526415","Anggota","Desain Grafis","Kreativitas tanpa batas","#65d7c8","AM"],
        ["azzkia farhatunnisa","2526416","Anggota","Fotografi","Setiap frame ada cerita","#ffc56f","AF"],
        ["bilqis hanifatul halimah","2526417","Anggota","Music","Hidup itu seperti musik","#8ea7ff","BH"],
        ["cerdas abdul jabar","2526418","Ketua Kelas","Web Dev","HTML adalah seni","#ffc56f","CA"],
        ["dandy fahri","2526419","Anggota","Robotika","Inovasi tiada henti","#65d7c8","DF"],
        ["dehan fadilah","2526420","Anggota","UI/UX","Desain yang berbicara","#ff7f73","DF"],
        ["desta ginanjar","2526421","Anggota","Backend Dev","Server tak pernah tidur","#8ea7ff","DG"],
        ["dila fitriani","2526422","Anggota","Data Science","Data adalah emas","#65d7c8","DF"],
        ["eva rahayu","2526423","Anggota","Mobile Dev","Satu app untuk semua","#8ea7ff","ER"],
        ["Farhan arya zaelani","2526424","Anggota","Animasi","No JB No LIFE","#ffc56f","FA"],
        ["febriyana maulidan solihin","2526425","Anggota","Berenang","Aman itu nomor satu","#65d7c8","FM"],
        ["jaspy gema ramadhan","2526426","Anggota","Volly, Listen Music","Jangan takut gagal takutlah untuk tidak mencoba","#8ea7ff","JG"],
        ["karina mulyasari","2526427","Anggota","Game Dev","Dunia virtual tanpa batas","#ffc56f","KM"],
        ["latifah ulumiyah","2526428","Anggota","AI/ML","Masa depan adalah AI","#ff7f73","LU"],
        ["muhammad daffa al muhtar","2526429","Anggota","gaming","Tetaplah hidup untuk hidup","#8ea7ff","MD"],
        ["nadya salsabila","2526430","Sekertaris","Networking","Koneksi adalah kunci","#65d7c8","NS"],
        ["naufal aydin nashif","2526431","Anggota","Desain Logo","Logo adalah identitas","#8ea7ff","NA"],
        ["nazwa ocktara aryanti","2526432","Anggota","DevOps","Deploy setiap hari","#ffc56f","NO"],
        ["nazwa olivia","2526433","Anggota","Content Creator","Konten adalah raja","#65d7c8","NO"],
        ["neisya khotimatul zahra","2526434","Anggota","3D Modeling","Dimensi ketiga adalah duniaku","#8ea7ff","NK"],
        ["Nurhadi Abdul Mughni","2526435","Anggota","watch movies","I did it for me. I liked it. I was good at it.","#ffc56f","NAM"],
        ["pielly ghaffar arrauf rajab","2526436","Wakil Ketua","iot","Dimesi ketiga adalah duniaku","#ff7f73","PG"],
        ["raditya al-ghifari","2526437","Anggota","Design Digital art","Solve every problem","#8ea7ff","RA"],
        ["Rahman Adli Permana","2526438","Anggota","ceo pt kangkun sejahtera","No risk No perari","#65d7c8","RA"],
        ["Rahmayanti","2526439","Anggota","Cloud Computing","Langit bukan batas","#8ea7ff","RI"],
        ["reyga dwie oktaviyana","2526440","Bendahara","Blockchain","Desentralisasi masa depan","#ff7f73","RD"],
        ["sella","2526441","Anggota","E-commerce Dev","Jualan online makin mudah","#65d7c8","SA"],
        ["sesilia saroi marei","2526442","Anggota","Bug Hunter","Find every bug, fix it all","#8ea7ff","SS"],
        ["tio permana","2526443","Anggota","Podcast Tech","Bicara tentang teknologi","#ffc56f","TP"],
        ["widia ramadhani","2526444","Anggota","Linux Admin","Open source adalah bebas","#ff7f73","WR"],
        ["wiliandri","2526445","Anggota","Testing QA","Zero bug sebelum release","#8ea7ff","WI"],
        ["windiani","2526446","Anggota","API Dev","API menghubungkan dunia","#65d7c8","WI"],
        ["oya grance mambrisauw","2526447","Anggota","AR/VR Dev","Realita bergabung virtual","#8ea7ff","OG"],
        ["zaskia aira uswatun hasanah","2526448","Anggota","Startup Founder","Mimpi besar, action lebih besar","#ffc56f","ZA"],
      ].map((m, i) => ({
        no: i + 1,
        name: m[0],
        nit: m[1],
        role: m[2],
        hobby: m[3],
        motto: m[4],
        color: m[5],
        initial: m[6],
        photo: memberPhotos[i] ? `${ASSET_PATHS.images}${memberPhotos[i]}` : "",
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
        ["b.jpeg", "Poto LATDASTAR"],
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
      ].map((x) => ({ img: `${ASSET_PATHS.images}${x[0]}`, title: x[1] }));

      const activities = [
        ["15 Juli 2025","MPLS Masa Pengenalan Lingkungan Sekolah","Hari pertama penuh semangat untuk mengenal lingkungan sekolah, guru, dan teman baru.","01","#65d7c8"],
        ["21 Juli 2025","Latihan Dasar Ketarunaan (Latdastar)","Kegiatan pembentukan karakter, mental, dan jiwa kepemimpinan seluruh anggota kelas.","02","#ffc56f"],
        ["20 September 2025","KKRI/Alih Golongan","Kegiatan yang mengajarkan kesetiaan, solidaritas, dan bakti kepada bangsa dan negara.","03","#8ea7ff"],
        ["16 Oktober 2025","Pelantikan Latihan Dasar Ketarunaan","Hari usainya latihan dasar ketarunaan sekaligus peresmian menjadi taruna di SMKN 2 Subang.","04","#65d7c8"],
        ["23 Desember 2025","Pembagian Raport Semester Ganjil","Momen evaluasi awal perjalanan belajar yang luar biasa.","05","#ff7f73"],
      ].map((x) => ({ date: x[0], title: x[1], desc: x[2], icon: x[3], color: x[4] }));

      const playlist = [
        { file: "kita-kesana.mp3", title: "Kita Kesana", artist: "Hindia" },
        { file: "without-me.mp3", title: "Without Me", artist: "Eminem" },
        { file: "viva-lavida.mp3", title: "Viva La Vida", artist: "Coldplay" },
        { file: "television-sofarsogood.mp3", title: "Television Sofar so good", artist: "Rex Orange County" },
        { file: "kenbali-pulang.mp3", title: "Kembali Pulang", artist: "Kangen Band" },
        { file: "bunga-maaf.mp3", title: "Bunga Maaf", artist: "The Atlantis" },
        { file: "bunga-abadi.mp3", title: "Bunga Abadi", artist: "Rio clappy" },
        { file: "bunga-terakhir.mp3", title: "Bunga Terakhir", artist: "Iwan Fals X Isyana Saraswati" },
        { file: "myheart.mp3", title: "My Heart", artist: "Acha Septriasa ft. Irwansyah" },
        { file: "janji-palsu.mp3", title: "Janji Palsu", artist: "Hindia" },
        { file: "otuan.mp3", title: "O,Tuan", artist: "Feast" },
        { file: "monolog.mp3", title: "Monolog", artist: "pamungkas" },
        { file: "monokrom.mp3", title: "Monokrom", artist: "Tulus" },
        { file: "rumah-ke-rumah.mp3", title: "Rumah ke Rumah", artist: "Hindia" },
        { file: "best-friend.mp3", title: "Best Friend", artist: "Rex Orange County" },
        { file: "the-winner.mp3", title: "The Winner Takes It All", artist: "ABBA" },
        { file: "cant-help.mp3", title: "Can't Help Falling in Love", artist: "Elvis Presley" },
        { file: "count-on-me.mp3", title: "Count on Me", artist: "Bruno Mars" },
        { file: "jendela-kelas.mp3", title: "Jendela Kelas 1", artist: "Iwan Fals" },
        { file: "kita-usahakan-rumah-itu.mp3", title: "Kita Usahakan Rumah Itu", artist: "Sal Priadi" },
        { file: "kasih-putih.mp3", title: "Kasih Putih", artist: "Glenn Fredly" },
        { file: "home.mp3", title: "Take Me Home", artist: "John Denver" },
        { file: "mantan-terindah.mp3", title: "Mantan Terindah", artist: "kahitna" },
        { file: "sahabat-sejati.mp3", title: "Sahabat Sejati", artist: "Sheila On 7" },
        { file: "kita.mp3", title: "Kita", artist: "Sheila On 7" },
        { file: "33x.mp3", title: "33x", artist: "Perunggu" },
        { file: "debu.mp3", title: "Sampai Jadi Debu", artist: "Banda Neira" },
        { file: "got.mp3", title: "The One That Got Away", artist: "Katy Perry" },
        { file: "letdown.mp3", title: "Let Down", artist: "Radiohead" },
        { file: "L.mp3", title: "L", artist: "HAL" },
        { file: "atas-nama-cinta.mp3", title: "Atas Nama Cinta", artist: "Rossa" },
        { file: "sesi-potret.mp3", title: "Sesi potret", artist: "enau" },
        { file: "titik-titik.mp3", title: "Ada Titik Titik di Ujung Doa", artist: "Sal Priadi" },
        { file: "1.mp3", title: "Night Changes", artist: "One Direction" },
        { file: "2.mp3", title: "Mr. Loverman", artist: "Ricky Montgomery" },
        { file: "3.mp3", title: "Perpisahan Yang Termanis", artist: "Lovarian" },
        { file: "4.mp3", title: "Love Story", artist: "Indila" },
        { file: "sky.mp3", title: "Skyfall", artist: "Adele" },
        { file: "sofia.mp3", title: "Sofia", artist: "Clairo" },
        { file: "masa-kini.mp3", title: "Masa kini", artist: "Nuca" },
        { file: "jiwa-yang-bersedih.mp3", title: "Jiwa Yang bersedih", artist: "ghea indrawari" },
      ].map((track) => ({ ...track, file: `${ASSET_PATHS.audio}${track.file}` }));

      const EMAILJS_PUBLIC_KEY = "TFJRSpdswZBMvQ9Iv";
      const EMAILJS_SERVICE_ID = "service_ijr5hrj";
      const EMAILJS_TEMPLATE_ID = "template_5w6luyj";
      const mpAudio = new Audio();
      mpAudio.volume = 0.7;
      let mpCurrentTrack = 0;
      let mpIsPlaying = false;
      let mpIsLooping = false;
      let mpIsShuffling = false;
      let mpAutoplayListenerAdded = false;
      let currentFilter = "all";
      let currentSearch = "";
      let activeMember = 0;
      let activeGallery = 0;
      let filteredMembers = [...members];

      function badgeClass(role) {
        return ({ "Ketua Kelas": "badge-ketua", "Wakil Ketua": "badge-wakil", Sekertaris: "badge-sekretaris", Bendahara: "badge-bendahara", Anggota: "badge-anggota" }[role] || "badge-anggota");
      }

      function roleShort(role) {
        return ({ "Ketua Kelas": "KETUA", "Wakil Ketua": "WAKIL", Sekertaris: "SEKRE", Bendahara: "BDH", Anggota: "MBR" }[role] || "MBR");
      }

      function shortOffset(i, a, total) {
        let offset = i - a;
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

      function coverTransform(offset) {
        const x = offset * 172;
        const rotate = offset * -28;
        const scale = offset === 0 ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.13);
        const z = Math.abs(offset) * -130;
        const y = offset === 0 ? -4 : 10;
        return `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`;
      }

      function avatarHTML(m) {
        if (m.photo) {
          return `<div class="member-avatar" style="background:${m.color}1f;color:${m.color};overflow:hidden;padding:0">
            <img src="${m.photo}" alt="${m.name}"
              style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block"
              onerror="this.parentElement.style.padding='';this.remove();this.parentElement.textContent='${m.initial}'">
          </div>`;
        }
        return `<div class="member-avatar" style="background:${m.color}1f;color:${m.color}">${m.initial}</div>`;
      }

      function applyMemberCoverflow() {
        document.querySelectorAll("#membersGrid .coverflow-slide").forEach((slide, i) => {
          const offset = shortOffset(i, activeMember, filteredMembers.length);
          slide.className = `coverflow-slide ${coverClass(offset)}`;
          slide.style.transform = coverTransform(offset);
          slide.onclick = offset === 0 ? () => openModal(filteredMembers[i].no - 1) : () => setMemberSlide(i);
        });
        $("memberCount").textContent = filteredMembers.length ? `${activeMember + 1} / ${filteredMembers.length}` : "0 / 0";
      }

      function renderMembers() {
        const q = currentSearch.toLowerCase();
        filteredMembers = members.filter((m) => {
          return (currentFilter === "all" || m.role === currentFilter) && (m.name.toLowerCase().includes(q) || m.nit.includes(q));
        });
        if (activeMember >= filteredMembers.length) activeMember = 0;
        $("membersGrid").innerHTML = filteredMembers.map((m) => `
          <div class="coverflow-slide">
            <div class="member-card">
              <div class="member-no">#${String(m.no).padStart(2, "0")}</div>
              <div class="member-role-badge ${badgeClass(m.role)}">${roleShort(m.role)}</div>
              ${avatarHTML(m)}
              <div class="member-name">${m.name}</div>
              <div class="member-nis">NIT: ${m.nit}</div>
              <div class="member-hobby">${m.hobby}</div>
            </div>
          </div>
        `).join("");
        if (!filteredMembers.length) {
          $("membersGrid").innerHTML = `<div style="text-align:center;color:var(--text3);padding:120px 0">Tidak ada taruna/i yang ditemukan</div>`;
          $("memberCount").textContent = "0 / 0";
          return;
        }
        requestAnimationFrame(applyMemberCoverflow);
      }

      function setMemberSlide(i) { activeMember = i; applyMemberCoverflow(); }
      function nextMember() { if (!filteredMembers.length) return; activeMember = (activeMember + 1) % filteredMembers.length; applyMemberCoverflow(); }
      function prevMember() { if (!filteredMembers.length) return; activeMember = (activeMember - 1 + filteredMembers.length) % filteredMembers.length; applyMemberCoverflow(); }

      function filterMembers() { currentSearch = $("searchInput").value; activeMember = 0; renderMembers(); }

      function filterByRole(role, btn) {
        currentFilter = role;
        activeMember = 0;
        document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
        renderMembers();
      }

      function applyGalleryCoverflow() {
        document.querySelectorAll("#galleryGrid .coverflow-slide").forEach((slide, i) => {
          const offset = shortOffset(i, activeGallery, galleryItems.length);
          slide.className = `coverflow-slide ${coverClass(offset)}`;
          slide.style.transform = coverTransform(offset);
          slide.onclick = () => setGallerySlide(i);
        });
        $("galleryCount").textContent = `${activeGallery + 1} / ${galleryItems.length}`;
      }

      function renderGallery() {
        $("galleryGrid").innerHTML = galleryItems.map((item) => `
          <div class="coverflow-slide">
            <div class="gallery-card">
              <img src="${item.img}" alt="${item.title}" onerror="this.style.display='none'">
              <div class="gallery-overlay"><div class="gallery-label">// ${item.title}</div></div>
            </div>
          </div>
        `).join("");
        requestAnimationFrame(applyGalleryCoverflow);
      }

      function setGallerySlide(i) { activeGallery = i; applyGalleryCoverflow(); }
      function nextGallery() { activeGallery = (activeGallery + 1) % galleryItems.length; applyGalleryCoverflow(); }
      function prevGallery() { activeGallery = (activeGallery - 1 + galleryItems.length) % galleryItems.length; applyGalleryCoverflow(); }

      function renderTimeline() {
        $("timeline").innerHTML = activities.map((a) => `
          <div class="timeline-item">
            <div class="timeline-dot" style="border-color:${a.color};color:${a.color}">${a.icon}</div>
            <div class="timeline-content">
              <div class="timeline-date">${a.date}</div>
              <div class="timeline-title">${a.title}</div>
              <div class="timeline-desc">${a.desc}</div>
            </div>
          </div>
        `).join("");
      }

      function openModal(index) {
        const m = members[index];
        const av = $("modalAvatar");
        av.style.background = `${m.color}1f`;
        av.style.color = m.color;
        av.style.overflow = "hidden";
        av.style.padding = m.photo ? "0" : "";
        if (m.photo) {
          av.innerHTML = `<img src="${m.photo}" alt="${m.name}"
            style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block"
            onerror="this.parentElement.style.padding='';this.parentElement.textContent='${m.initial}'">`;
        } else {
          av.textContent = m.initial;
        }
        $("modalName").textContent = m.name;
        $("modalRole").innerHTML = `<span class="member-role-badge ${badgeClass(m.role)}" style="position:static;display:inline-block">${m.role}</span>`;
        $("modalInfo").innerHTML = `
          <div class="modal-info-item"><div class="modal-info-label">NIS</div><div>${m.nit}</div></div>
          <div class="modal-info-item"><div class="modal-info-label">No. Absen</div><div>#${String(m.no).padStart(2, "0")}</div></div>
          <div class="modal-info-item"><div class="modal-info-label">Hobi</div><div>${m.hobby}</div></div>
          <div class="modal-info-item"><div class="modal-info-label">Kelas</div><div>X RPL B</div></div>
          <div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Motto</div><div style="color:var(--accent);font-style:italic">"${m.motto}"</div></div>
        `;
        $("modalOverlay").classList.add("open");
      }

      function closeModal(event) {
        if (!event || event.target.id === "modalOverlay" || event.target.classList.contains("modal-close")) {
          $("modalOverlay").classList.remove("open");
        }
      }

      function animateCounter(el) {
        if (el.dataset.done) return;
        el.dataset.done = "1";
        const target = Number(el.dataset.target);
        let current = 0;
        const step = Math.max(1, target / 60);
        const timer = setInterval(() => {
          current = Math.min(target, current + step);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
      }

      function mpFmtTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        return Math.floor(seconds / 60) + ":" + String(Math.floor(seconds % 60)).padStart(2, "0");
      }

      function mpUpdateDots() {
        const show = Math.min(playlist.length, 15);
        $("mpDots").innerHTML = playlist.slice(0, show).map((_, i) =>
          `<button class="mp-dot${i === mpCurrentTrack ? " active" : ""}" type="button" onclick="mpLoadTrack(${i}, true)" title="${playlist[i].title || "Track"}"></button>`
        ).join("") + (playlist.length > show ? `<span style="color:var(--text3);font-size:.68rem">+${playlist.length - show}</span>` : "");
      }

      function mpUpdateUI() {
        const track = playlist[mpCurrentTrack] || { title: "Playlist", artist: "X RPL B" };
        $("mpTrackName").textContent = track.title;
        $("mpTrackArtist").textContent = track.artist;
        $("mpTrackNum").textContent = `${mpCurrentTrack + 1} / ${playlist.length}`;
        $("musicBtn").innerHTML = mpIsPlaying ? "&#9208;" : "&#127925;";
        $("mpPlayBtn").innerHTML = mpIsPlaying ? "&#9208;" : "&#9654;";
        $("mpViz").classList.toggle("paused", !mpIsPlaying);
        $("mpDot").style.animationPlayState = mpIsPlaying ? "running" : "paused";
        mpUpdateDots();
      }

      function mpLoadTrack(index, autoplay = false) {
        mpCurrentTrack = ((index % playlist.length) + playlist.length) % playlist.length;
        mpAudio.src = playlist[mpCurrentTrack].file;
        mpAudio.load();
        if (autoplay) {
          mpAudio.play().then(() => { mpIsPlaying = true; mpUpdateUI(); }).catch(() => showToast("File lagu tidak ditemukan. Cek nama file MP3."));
        } else { mpUpdateUI(); }
      }

      function mpTogglePlay() {
        if (mpAudio.paused) {
          mpAudio.play().then(() => { mpIsPlaying = true; mpUpdateUI(); showToast("▶ " + playlist[mpCurrentTrack].title); }).catch(() => showToast("File lagu tidak ditemukan. Cek nama file MP3."));
        } else { mpAudio.pause(); mpIsPlaying = false; mpUpdateUI(); showToast("⏸ Dijeda"); }
      }

      function mpNext() {
        const next = mpIsShuffling ? Math.floor(Math.random() * playlist.length) : mpCurrentTrack + 1;
        mpLoadTrack(next, mpIsPlaying);
        if (!mpIsPlaying) showToast(playlist[mpCurrentTrack].title);
      }

      function mpPrev() {
        if (mpAudio.currentTime > 3) { mpAudio.currentTime = 0; }
        else { mpLoadTrack(mpCurrentTrack - 1, mpIsPlaying); if (!mpIsPlaying) showToast(playlist[mpCurrentTrack].title); }
      }

      function mpToggleLoop() { mpIsLooping = !mpIsLooping; mpAudio.loop = mpIsLooping; $("mpLoopBtn").classList.toggle("active", mpIsLooping); showToast(mpIsLooping ? "Loop aktif" : "Loop nonaktif"); }
      function mpToggleShuffle() { mpIsShuffling = !mpIsShuffling; $("mpShuffleBtn").classList.toggle("active", mpIsShuffling); showToast(mpIsShuffling ? "Acak aktif" : "Urutan normal"); }
      function mpSetVolume(value) { mpAudio.volume = parseFloat(value); $("mpVolIcon").textContent = value > 0.5 ? "\u{1F50A}" : value > 0 ? "\u{1F509}" : "\u{1F507}"; }

      function mpSeek(event) {
        if (!mpAudio.duration) return;
        const rect = $("mpProgressBar").getBoundingClientRect();
        mpAudio.currentTime = ((event.clientX - rect.left) / rect.width) * mpAudio.duration;
      }

      function mpAddTracks(event) {
        Array.from(event.target.files).forEach((file) => {
          playlist.push({ file: URL.createObjectURL(file), title: file.name.replace(/\.[^.]+$/, ""), artist: "Upload" });
        });
        showToast(`+${event.target.files.length} lagu ditambahkan`);
        mpUpdateDots();
        if (!mpIsPlaying) mpLoadTrack(playlist.length - event.target.files.length, false);
      }

      mpAudio.addEventListener("timeupdate", () => {
        if (!mpAudio.duration) return;
        $("mpProgressFill").style.width = (mpAudio.currentTime / mpAudio.duration) * 100 + "%";
        $("mpCurrent").textContent = mpFmtTime(mpAudio.currentTime);
        $("mpDuration").textContent = mpFmtTime(mpAudio.duration);
      });

      mpAudio.addEventListener("ended", () => { if (!mpIsLooping) mpNext(); });

      function collapsePlayer() { $("music-player").classList.add("collapsed"); }
      function expandPlayer() { $("music-player").classList.remove("collapsed"); }

      function mpTryAutoplay() {
        mpAudio.play().then(() => { mpIsPlaying = true; mpUpdateUI(); }).catch(() => { mpUpdateUI(); });
      }

      function mpUnlockAutoplay() {
        if (!mpAutoplayListenerAdded) return;
        if (mpAudio.paused) {
          mpAudio.play().then(() => { mpIsPlaying = true; mpUpdateUI(); showToast("▶ " + playlist[mpCurrentTrack].title); }).catch(() => {});
        }
        document.removeEventListener("click", mpUnlockAutoplay);
        document.removeEventListener("touchstart", mpUnlockAutoplay);
        document.removeEventListener("keydown", mpUnlockAutoplay);
        mpAutoplayListenerAdded = false;
      }

      function toggleTheme() {
        const html = document.documentElement;
        const dark = html.dataset.theme === "dark";
        html.dataset.theme = dark ? "light" : "dark";
        $("themeBtn").innerHTML = dark ? "&#9790;" : "&#9728;";
        showToast(dark ? "Mode terang aktif" : "Mode gelap aktif");
      }

      function toggleMobileNav() { $("mobileNav").classList.toggle("open"); }

      function showToast(message) {
        $("toast").textContent = message;
        $("toast").classList.add("show");
        clearTimeout($("toast").timer);
        $("toast").timer = setTimeout(() => $("toast").classList.remove("show"), 2300);
      }

      function sendMsg() {
        const name = contactName.value.trim(), email = contactEmail.value.trim(), message = contactMessage.value.trim();
        if (!name || !email || !message) { showToast("Lengkapi nama, email, dan pesan dulu."); return; }
        if (!window.emailjs) { showToast("EmailJS belum kebuka. Cek koneksi internet."); return; }
        const btn = document.querySelector(".kontak-form .btn-primary");
        btn.disabled = true;
        btn.textContent = "Mengirim...";
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: name, from_email: email, message, reply_to: email }, { publicKey: EMAILJS_PUBLIC_KEY })
          .then(() => { showToast("Pesan berhasil dikirim ke email."); contactName.value = ""; contactEmail.value = ""; contactMessage.value = ""; })
          .catch((error) => { console.error("EmailJS error:", error); showToast("Gagal: " + (error?.text || error?.message || "Cek setting EmailJS.")); })
          .finally(() => { btn.disabled = false; btn.innerHTML = "&#10022; Kirim Pesan"; });
      }

      function updateActiveNav() {
        const ids = ["home", "tentang", "anggota", "gallery", "kegiatan", "kontak"];
        let current = "home";
        ids.forEach((id) => { const el = $(id); if (el && scrollY >= el.offsetTop - 120) current = id; });
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
      }

      addEventListener("scroll", () => {
        const max = document.body.offsetHeight - innerHeight;
        $("progressBar").style.width = (max ? (scrollY / max) * 100 : 0) + "%";
        $("backTop").classList.toggle("visible", scrollY > 300);
        updateActiveNav();
      });

      addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
        if (document.activeElement.id === "searchInput") return;
        if (event.key === "ArrowRight") { nextMember(); nextGallery(); }
        if (event.key === "ArrowLeft") { prevMember(); prevGallery(); }
      });

      addEventListener("load", () => {
        renderMembers();
        renderGallery();
        renderTimeline();
        mpLoadTrack(0, false);
        mpTryAutoplay();
        mpAutoplayListenerAdded = true;
        document.addEventListener("click", mpUnlockAutoplay);
        document.addEventListener("touchstart", mpUnlockAutoplay);
        document.addEventListener("keydown", mpUnlockAutoplay);
        document.querySelectorAll(".stat-num").forEach(animateCounter);
        $("backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        showToast("▶ Musik akan diputar otomatis");
      });
