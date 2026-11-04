// Prototyp Dovolená za benefity – hash routing: #/ · #/hotel · #/rezervace · #/potvrzeni
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $('#app'), hdr = $('#hdr'), ftr = $('#ftr');
  const kc = n => Math.round(n).toLocaleString('cs-CZ').replace(/ /g, ' ') + ' Kč';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const ic = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    mic: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    guests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6"/></svg>',
    cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V8zM17 9h1.5a2.5 2.5 0 0 1 0 5H17M7 3v2M11 3v2M15 3v2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    person: '<svg viewBox="0 0 12 13" fill="currentColor"><circle cx="6" cy="3" r="3"/><path d="M0 13a6 6 0 0 1 12 0z"/></svg>',
    info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7.5v.5" stroke-linecap="round"/></svg>',
    down: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
    right: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
    ticket: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="m9 15 6-6M9.5 9.5h0M14.5 14.5h0" stroke-linecap="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m2 7 10 7 10-7"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  };

  // ---------- stav ----------
  const HOTEL = window.HOTEL;
  const load = () => { try { return JSON.parse(sessionStorage.getItem('dzb') || 'null'); } catch { return null; } };
  const S = Object.assign({
    checkIn: HOTEL.checkIn, checkOut: HOTEL.checkOut, adults: HOTEL.adults, kids: 0,
    sel: {}, filterBreakfast: false, filterFree: false,
    pay: 'edenred', split: false, pointsAmount: null, voucher: '',
    form: { first: '', last: '', email: '', cc: '+420', phone: '', country: 'Česko', note: '' },
    booking: null,
  }, load() || {});
  const save = () => { try { sessionStorage.setItem('dzb', JSON.stringify(S)); } catch {} };

  const d = iso => new Date(iso + 'T12:00:00');
  const nights = () => Math.max(1, Math.round((d(S.checkOut) - d(S.checkIn)) / 864e5));
  const fmtD = iso => { const x = d(iso); return `${x.getDate()}. ${x.getMonth() + 1}. ${x.getFullYear()}`; };
  const fmtRange = () => { const a = d(S.checkIn), b = d(S.checkOut); return `${a.getDate()}. ${a.getMonth() + 1}. - ${fmtD(S.checkOut)}`; };
  const guestsTxt = () => `${S.adults} ${S.adults === 1 ? 'dospělý' : S.adults < 5 ? 'dospělí' : 'dospělých'}` + (S.kids ? ` · ${S.kids} ${S.kids === 1 ? 'dítě' : S.kids < 5 ? 'děti' : 'dětí'}` : '');
  // Ceny ve Figmě jsou za pobyt 2 nocí → přepočet podle zvoleného počtu nocí.
  const ratePrice = r => Math.round(r.price / 2 * nights());

  function totals() {
    let acc = 0, items = [];
    for (const [key, q] of Object.entries(S.sel)) {
      if (!q) continue;
      const [rid, tid] = key.split(':');
      const room = HOTEL.rooms.find(r => r.id === rid), rate = HOTEL.rates.find(r => r.id === tid);
      if (!room || !rate) continue;
      acc += ratePrice(rate) * q;
      items.push({ room, rate, q });
    }
    const fee = Math.round(acc * window.PRICING.serviceFeePct);
    const cityTax = Math.round(HOTEL.cityTaxPerPersonNight * S.adults * nights());
    const now = acc + fee;
    return { acc, fee, cityTax, now, total: now + cityTax, items, rooms: items.reduce((a, i) => a + i.q, 0) };
  }

  // ---------- společné části ----------
  const logo = (onDark) => `<a class="logo" href="#/"><span class="sun"><img class="s1" src="assets/home/imgGroup2.svg" alt=""><img class="s2" src="assets/home/imgGroup3.svg" alt=""></span><span>Dovolená za <b>benefity</b></span></a>`;

  function header(variant) {
    hdr.className = 'hdr' + (variant === 'hero' ? ' on-hero' : '');
    const btn = variant === 'hero' ? 'btn-white' : variant === 'checkout' ? 'btn-secondary' : 'btn-primary';
    hdr.innerHTML = `<div class="wrap">${logo()}<div class="hdr-r"><button class="btn btn-sm ${btn}" data-toast="Přihlášení přes benefitní platformu – v prototypu neaktivní.">Přihlásit se</button><button class="burger" aria-label="Menu" data-toast="Menu – v prototypu neaktivní.">${ic.menu}</button></div></div>`;
  }

  function footer() {
    const A = 'assets/home/';
    const col = (t, items) => `<div><h5>${t}</h5><ul>${items.map(i => `<li><a href="#/" data-toast="Odkaz v prototypu nevede nikam.">${i}</a></li>`).join('')}</ul></div>`;
    ftr.innerHTML = `<div class="wrap">${logo()}
      <div class="ftr-cols">
        ${col('Podpora', [`<img src="${A}imgHelpCircle.svg" alt="">Centrum nápovědy`, `<img src="${A}imgMail.svg" alt="">podpora@dovolena-za-benefity.cz`])}
        ${col('Oblíbené destinace', ['Praha', 'Vídeň', 'Vratislav', 'Řím', 'Brno', 'Karlovy Vary', '<b>+ další destinace</b>'])}
        ${col('Dovolená za benefity', ['Jak to funguje', 'Blog', 'Časté dotazy', 'O nás', 'Kontakt'])}
        ${col('Benefitní platformy', ['Edenred Benefity', 'Benefit Plus', 'Up Benefity'])}
      </div>
      <div class="ftr-bottom"><div class="legal">© 2026 Dovolená za benefity<span>•</span><a href="#/">Obchodní podmínky</a><span>•</span><a href="#/">Ochrana osobních údajů</a><span>•</span><a href="#/">Cookies</a></div>
      <div class="socials">${['Linkedin', 'X', 'Instagram', 'Facebook', 'Youtube'].map(s => `<a href="#/" aria-label="${s}"><img src="${A}img${s}.svg" alt=""></a>`).join('')}</div></div>
    </div>`;
  }

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 2600);
  }

  // Popover pro termín a hosty (homepage i detail hotelu)
  function openPop(anchor, kind, onDone) {
    closePop();
    const p = document.createElement('div'); p.className = 'pop'; p.id = 'pop';
    if (kind === 'dates') {
      p.innerHTML = `<div class="row2"><label>Příjezd</label><input class="inp" type="date" id="pIn" value="${S.checkIn}" style="width:170px"></div>
        <div class="row2"><label>Odjezd</label><input class="inp" type="date" id="pOut" value="${S.checkOut}" style="width:170px"></div>
        <button class="btn btn-primary btn-sm" id="pOk" style="width:100%;margin-top:8px">Potvrdit</button>`;
    } else {
      const st = (k, l) => `<div class="row2"><span>${l}</span><span class="stp"><button data-k="${k}" data-d="-1">−</button><b id="v-${k}">${S[k]}</b><button data-k="${k}" data-d="1">+</button></span></div>`;
      p.innerHTML = st('adults', 'Dospělí') + st('kids', 'Děti') + `<button class="btn btn-primary btn-sm" id="pOk" style="width:100%;margin-top:8px">Potvrdit</button>`;
      p.addEventListener('click', e => {
        const b = e.target.closest('[data-k]'); if (!b) return;
        const k = b.dataset.k, min = k === 'adults' ? 1 : 0;
        S[k] = Math.min(8, Math.max(min, S[k] + +b.dataset.d)); $('#v-' + k).textContent = S[k];
      });
    }
    document.body.appendChild(p);
    const r = anchor.getBoundingClientRect();
    p.style.top = (r.bottom + scrollY + 8) + 'px';
    p.style.left = Math.max(8, Math.min(r.left + scrollX, innerWidth - p.offsetWidth - 8)) + 'px';
    $('#pOk', p).onclick = () => {
      if (kind === 'dates') {
        const a = $('#pIn').value, b = $('#pOut').value;
        if (!a || !b || b <= a) { toast('Odjezd musí být po příjezdu.'); return; }
        S.checkIn = a; S.checkOut = b;
      }
      save(); closePop(); onDone && onDone();
    };
    setTimeout(() => document.addEventListener('click', outside), 0);
  }
  function outside(e) { const p = $('#pop'); if (p && !p.contains(e.target)) closePop(); }
  function closePop() { $('#pop')?.remove(); document.removeEventListener('click', outside); }

  function lightbox(list, i = 0) {
    const lb = document.createElement('div'); lb.className = 'lb';
    const draw = () => lb.innerHTML = `<button class="x" aria-label="Zavřít">×</button><button class="nav prev" aria-label="Předchozí">‹</button><img src="${list[i]}" alt=""><button class="nav next" aria-label="Další">›</button>`;
    draw();
    lb.onclick = e => {
      if (e.target.closest('.next')) { i = (i + 1) % list.length; draw(); }
      else if (e.target.closest('.prev')) { i = (i - 1 + list.length) % list.length; draw(); }
      else if (e.target === lb || e.target.closest('.x')) lb.remove();
    };
    document.body.appendChild(lb);
  }

  // ---------- homepage ----------
  function viewHome() {
    header('hero');
    const M = window.HOME;
    const hotelCard = h => `<a class="card" href="#/hotel"><div class="ph tall"><img src="${h.img}" alt="" loading="lazy"></div><h4>${esc(h.name)}</h4><div class="meta">Začíná na ${h.price}</div></a>`;
    app.innerHTML = `
    <section class="hero">
      <div class="wrap">
        <h1>Nevíte, co s benefit body?</h1>
        <p class="lead">Naplánujte si u nás dovolenou.</p>
        <form class="search" id="search">
          <div class="search-box"><input id="q" placeholder="Popište jaký hotel, pobyt nebo auto hledáte nebo vložte URL nabídky" autocomplete="off"><button type="button" class="mic" aria-label="Hlasové vyhledávání" data-toast="Hlasové zadání – v prototypu neaktivní.">${ic.mic}</button></div>
          <div class="search-meta"><button type="button" id="hDates">${ic.cal}<span>Výběr termínu</span></button><button type="button" id="hGuests">${ic.guests}<span>${S.adults} dospělí • ${S.kids} dětí</span></button></div>
        </form>
      </div>
      <div class="carousel">${M.heroHotels.map(h => `<a class="c-card" href="#/hotel"><img src="${h.img}" alt=""><div class="n">${esc(h.name)}</div><div class="p">Začíná na ${h.price}</div></a>`).join('')}</div>
    </section>
    <div class="wrap">
      <div class="partners">
        <div class="line">${M.partners.map(p => `<img src="${p.img}" alt="${p.name}" style="height:${p.h}px">`).join('')}</div>
        <div class="line small">${M.platforms.map(p => `<img src="${p.img}" alt="${p.name}" style="height:${p.h}px">`).join('')}</div>
      </div>
      <section class="sec" id="jak"><h2>Jak to funguje</h2>
        <div class="row steps">${M.steps.map(([t, p], i) => `<div class="step"><div class="num">${i + 1}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></section>
      <section class="sec"><h2>Populární destinace</h2><p>Kam se s benefit body jezdí nejčastěji.</p>
        <div class="row grid4">${M.destinations.map(x => `<a class="card" href="#/" data-q="${x.name}"><div class="ph"><img src="${x.img}" alt="" loading="lazy"></div><h4>${x.name}</h4><div class="meta xs">${x.country}</div></a>`).join('')}</div></section>
      <section class="sec"><h2>Zajímavé lastminute zájezdy</h2>
        <div class="row grid4">${M.lastminute.map(x => `<a class="card" href="#/" data-toast="Detail zájezdu není v tomto prototypu – proklik jen na hotel."><div class="ph tall"><img src="${x.img}" alt="" loading="lazy"></div><h4>${esc(x.name)}</h4><div class="meta">6 nocí • 30.11. - 6.12.<br>${x.place}<br>Letenka v ceně • z Prahy<br>${x.board}</div><div class="price">Od ${x.price} Kč/ osobu</div></a>`).join('')}</div></section>
      <section class="sec"><h2>Populární hotely</h2><div class="row grid4">${M.hotels.map(hotelCard).join('')}</div></section>
      <section class="sec"><h2>Populární autopůjčovny</h2>
        <div class="row cars">${M.cars.map(c => `<a class="car" href="#/" data-toast="Autopůjčovny – v prototypu neaktivní."><div class="ph"><img src="${c.img}" alt=""></div>${c.name}</a>`).join('')}</div></section>
      <section class="sec"><h2>Jaký typ výletu hledáte?</h2>
        <div class="row types">${M.tripTypes.map(t => `<a class="type" href="#/" data-q="${t.name}"><div class="ph"><img src="${t.img}" alt="" loading="lazy"></div>${t.name}</a>`).join('')}</div></section>
    </div>`;
    $('#search').onsubmit = e => { e.preventDefault(); goSearch($('#q').value); };
    $('#hDates').onclick = e => openPop(e.currentTarget, 'dates', () => { S._datesTouched = true; save(); $('#hDates span').textContent = fmtRange(); });
    $('#hGuests').onclick = e => openPop(e.currentTarget, 'guests', () => { $('#hGuests span').textContent = `${S.adults} dospělí • ${S.kids} dětí`; });
    if (S._datesTouched) $('#hDates span').textContent = fmtRange();
    $$('[data-q]').forEach(a => a.onclick = e => { e.preventDefault(); goSearch(a.dataset.q); });
  }
  function goSearch(q) {
    toast(q ? `Prototyp: pro „${q}“ ukazujeme ukázkový hotel.` : 'Prototyp: ukazujeme ukázkový hotel.');
    location.hash = '#/hotel';
  }

  // ---------- detail hotelu ----------
  function viewHotel() {
    header('hotel');
    const G = HOTEL.gallery, all = [G.main, ...G.grid, ...HOTEL.rooms[0].photos];
    const t = totals();
    const rateRows = room => HOTEL.rates
      .filter(r => (!S.filterBreakfast || r.breakfast) && (!S.filterFree || r.freeCancel))
      .map((r, i, arr) => {
        const key = room.id + ':' + r.id, q = S.sel[key] || 0;
        const roomCell = i === 0 ? `<td class="room" rowspan="${arr.length}">
            <h4>${room.name}</h4>
            <div class="thumbs">${room.photos.map((p, j) => `<img src="${p}" alt="" data-lb="${room.id}" data-i="${j}">`).join('')}<button data-lb="${room.id}" data-i="0" aria-label="Další fotky">+</button></div>
            <div class="sm" style="font-weight:600">${room.beds}</div>
            <div class="feat">${room.features.map(f => `<span class="chip chip-sm">${f}</span>`).join('')}</div>
            <div class="more" hidden><div class="feat">${room.more.map(f => `<span class="chip chip-sm">${f}</span>`).join('')}</div></div>
            <button class="link" data-more>Zobrazit více</button></td>` : '';
        return `<tr class="rate${i === 0 ? ' first' : ''}">${roomCell}
          <td class="persons" title="${S.adults} osoby">${ic.person}${ic.person}</td>
          <td class="price-cell">${kc(ratePrice(r))}</td>
          <td><div class="opts">
            <div class="opt${r.breakfast ? ' ok' : ''}">${ic.cup}<span>${r.breakfast ? 'Snídaně v ceně' : `Snídaně ${HOTEL.breakfastPrice} Kč`}</span></div>
            ${r.freeCancel ? `<div class="opt ok">${ic.check}<span>Zrušení zdarma<span class="until">do ${HOTEL.freeCancelUntil}</span></span></div>` : `<div class="opt">${ic.x}<span>Nevratná rezervace</span></div>`}
          </div></td>
          <td><select class="qty" data-key="${key}" aria-label="Počet pokojů">${[0, 1, 2, 3].map(n => `<option${n === q ? ' selected' : ''}>${n}</option>`).join('')}</select></td>
        </tr>`;
      }).join('');

    app.innerHTML = `<div class="wrap" style="margin-top:8px">
      <div class="stars">${'★'.repeat(HOTEL.stars)}</div>
      <h1 class="h-title">${HOTEL.name}</h1>
      <div class="addr">${ic.pin}${HOTEL.address}</div>

      <div class="gallery">
        <button class="g g-main" data-g="0"><img src="${G.main}" alt="Hlavní fotka"></button>
        <button class="g" data-g="1"><img src="${G.grid[0]}" alt=""></button>
        <button class="g" data-g="2"><img src="${G.grid[1]}" alt=""></button>
        <div class="rev">
          <div class="score-row"><span class="score">${HOTEL.score}</span><div><b>${HOTEL.scoreLabel}</b><span class="xs muted">1 658 recenzí</span></div></div>
          <div class="quote">“Nádherné ubytování, skvělá restaurace a moc milý personál..<div class="who"><img class="flag" src="assets/hotel/imgFlagCz.svg" alt="">Adéla, Česká republika</div></div>
        </div>
        <button class="g" data-g="3"><img src="${G.grid[2]}" alt=""></button>
        <button class="g" data-g="4"><img src="${G.grid[3]}" alt=""><span class="g-count">${G.count} fotografií</span></button>
        <button class="g g-map" data-toast="Mapa – v prototypu neaktivní."><img src="${G.map}" alt="Mapa: Pec pod Sněžkou"></button>
      </div>

      <div class="two-col">
        <section class="desc"><h2>Popis ubytování</h2>
          <div class="clip" id="clip" style="margin-top:20px">${HOTEL.description.map(p => `<p>${p}</p>`).join('')}</div>
          <div class="center"><button class="link" id="descMore">Zobrazit více ${ic.down}</button></div>
        </section>
        <aside><h2>Vybavení</h2>
          <div class="amen" id="amen">${HOTEL.amenities.map(a => `<span class="chip">${a}</span>`).join('')}</div>
          <button class="link" id="amenMore">${ic.info} Zobrazit všechno vybavení</button>
        </aside>
      </div>

      <section style="margin-top:40px" id="rezervace"><h2>Rezervace</h2>
        <div class="res-filters">
          <button class="chip" id="fDates">${ic.cal}<span>${fmtRange()}</span></button>
          <button class="chip" id="fGuests">${ic.guests}<span>${guestsTxt()}</span></button>
          <button class="chip${S.filterBreakfast ? ' on' : ''}" id="fBreak">${ic.cup}${S.filterBreakfast ? 'Snídaně v ceně' : 'Všechny stravování'}</button>
          <button class="chip${S.filterFree ? ' on' : ''}" id="fFree">Zrušení rezervace zdarma</button>
        </div>
        <div class="res-grid">
          <div class="rooms"><table>
            <thead><tr><th>Typ pokoje</th><th>Počet osob</th><th>Cena za pobyt</th><th>Vaše možnosti</th><th>Vyberte si pokoj</th></tr></thead>
            <tbody>${HOTEL.rooms.map(rateRows).join('')}</tbody>
          </table></div>
          <aside class="summary" id="sum"></aside>
        </div>
      </section>

      <section style="margin-top:40px"><h2>Recenze</h2>
        <div class="reviews">
          <div class="top"><h3>Hodnocení hostů</h3><button class="link" style="text-decoration:none" data-toast="Všechny recenze – v prototypu neaktivní.">Přečíst všech ${HOTEL.reviewCount} hodnocení ${ic.right}</button></div>
          <div class="sum"><span class="score lg">${HOTEL.score}</span><div><b style="font-size:18px">${HOTEL.scoreLabel}</b><div class="sm muted" style="display:flex;gap:6px;align-items:center">${HOTEL.reviewCount} hodnocení · <img class="flag" src="assets/hotel/imgFlagCz.svg" alt=""> 81 % recenzí z Česka</div></div>
            <span class="sep"></span>${HOTEL.subscores.map(([k, v]) => `<span class="chip">${k}<b>${v}</b></span>`).join('')}</div>
          <div class="qs">${HOTEL.reviews.map(r => `<div class="quote"><div class="txt">„${esc(r.text)}“</div><div class="who"><img class="flag" src="assets/hotel/imgFlagCz.svg" alt="">${r.who}</div></div>`).join('')}</div>
        </div>
      </section>
    </div>`;

    drawSummary();
    $$('[data-g]').forEach(b => b.onclick = () => lightbox(all, +b.dataset.g));
    $$('[data-lb]').forEach(b => b.onclick = () => lightbox(HOTEL.rooms.find(r => r.id === b.dataset.lb).photos, +b.dataset.i));
    $$('[data-more]').forEach(b => b.onclick = () => { const m = b.previousElementSibling; m.hidden = !m.hidden; b.textContent = m.hidden ? 'Zobrazit více' : 'Zobrazit méně'; });
    $('#descMore').onclick = e => { const c = $('#clip'); c.classList.toggle('open'); e.currentTarget.innerHTML = (c.classList.contains('open') ? 'Zobrazit méně ' : 'Zobrazit více ') + ic.down; };
    $('#amenMore').onclick = e => { $('#amen').insertAdjacentHTML('beforeend', HOTEL.amenitiesMore.map(a => `<span class="chip">${a}</span>`).join('')); e.currentTarget.remove(); };
    $('#fDates').onclick = e => openPop(e.currentTarget, 'dates', () => { S._datesTouched = true; save(); viewHotel(); });
    $('#fGuests').onclick = e => openPop(e.currentTarget, 'guests', viewHotel);
    $('#fBreak').onclick = () => { S.filterBreakfast = !S.filterBreakfast; save(); viewHotel(); };
    $('#fFree').onclick = () => { S.filterFree = !S.filterFree; save(); viewHotel(); };
    $$('.qty').forEach(s => s.onchange = () => { S.sel[s.dataset.key] = +s.value; save(); drawSummary(); });
  }

  function drawSummary() {
    const t = totals(), el = $('#sum');
    el.innerHTML = `<h4>Vaše rezervace</h4>
      <div class="xs muted" style="margin-top:6px">${fmtRange()} · ${guestsTxt()}</div>
      ${t.rooms ? `<div class="lines">${t.items.map(i => `<div><span>${i.q}× ${i.room.name}</span><span>${kc(ratePrice(i.rate) * i.q)}</span></div>`).join('')}</div>`
        : `<p class="sm" style="margin:16px 0">Prosím nejprve zvolte ubytování</p>`}
      <div class="tot"><span>Celkem</span><b>${kc(t.acc)}</b></div>
      <button class="btn btn-primary" id="book"${t.rooms ? '' : ' disabled'}>Rezervovat</button>
      ${t.rooms ? `<p class="xs muted" style="margin:10px 0 0">Zaplatíte benefitními body, případný rozdíl kartou.</p>` : ''}`;
    $('#book').onclick = () => { location.hash = '#/rezervace'; };
  }

  // ---------- rezervace (údaje a platba) ----------
  const stepper = n => `<div class="stepper">${['Výběr ubytování', 'Údaje a platba', 'Potvrzení'].map((l, i) => {
    const cls = i + 1 < n ? 'done' : i + 1 === n ? 'cur' : '';
    return (i ? `<span class="bar${i < n ? ' done' : ''}"></span>` : '') + `<span class="s ${cls}"><span class="dot">${i + 1 < n ? `<span style="width:14px;height:14px;display:block">${ic.check}</span>` : i + 1}</span>${l}</span>`;
  }).join('')}</div>`;

  function viewCheckout() {
    const t = totals();
    if (!t.rooms) { location.hash = '#/hotel'; toast('Nejprve vyberte pokoj.'); return; }
    header('checkout');
    const F = S.form;
    const field = (k, label, attrs = '') => `<div class="f"><label for="f-${k}">${label}<span class="req">*</span></label><input class="inp" id="f-${k}" data-f="${k}" value="${esc(F[k])}" ${attrs}><div class="msg" hidden></div></div>`;
    app.innerHTML = `<div class="wrap">
      ${stepper(2)}
      <div class="co-grid">
        <form class="co" id="co" novalidate>
          <h1>Informace o vás</h1>
          <p class="intro">Uveďte informace o objednávajícím.</p>
          <p class="sm muted" style="margin:0">Pole označená <span class="req">*</span> jsou povinná</p>
          <div class="form">
            ${field('first', 'Jméno', 'autocomplete="given-name"')}
            ${field('last', 'Příjmení', 'autocomplete="family-name"')}
            ${field('email', 'Emailová adresa', 'type="email" autocomplete="email"')}
            <div class="f"><label for="f-phone">Telefonní číslo<span class="req">*</span></label>
              <div class="phone"><select class="inp" data-f="cc">${['+420', '+421', '+48', '+49', '+43'].map(c => `<option${c === F.cc ? ' selected' : ''}>${c}</option>`).join('')}</select>
              <input class="inp" id="f-phone" data-f="phone" type="tel" placeholder="123 456 789" value="${esc(F.phone)}" autocomplete="tel-national"></div><div class="msg" hidden></div></div>
            <div class="f"><label for="f-country">Země<span class="req">*</span></label><select class="inp" id="f-country" data-f="country">${['Česko', 'Slovensko', 'Polsko', 'Německo', 'Rakousko'].map(c => `<option${c === F.country ? ' selected' : ''}>${c}</option>`).join('')}</select></div>
          </div>
          <hr class="hr">
          <div class="f"><label for="f-note">Poznámka pro ubytování</label><textarea class="inp" id="f-note" data-f="note" placeholder="Vaše poznámka pro ubytování">${esc(F.note)}</textarea></div>
          <p class="note">Splnění zvláštních požadavků není možné zaručit, ale ubytování udělá vše pro to, aby bylo vašim potřebám vyhověno. Speciální požadavek můžete také odeslat kdykoliv po potvrzení Vaší rezervace.</p>

          <h2>Způsob platby</h2>
          <div class="pay" id="pay"></div>
          <div id="splitBox"></div>
          <div class="actions">
            <button type="button" class="link" id="addPay">${ic.plus} ${S.split ? 'Odebrat další platbu' : 'Přidat další platbu'}</button>
            <button type="button" class="link" id="vBtn">${ic.ticket} Vložit slevový/ dárkový poukaz</button>
            <div class="voucher" id="vBox"><input class="inp" id="vCode" placeholder="Kód poukazu"><button type="button" class="btn btn-secondary btn-sm" id="vApply">Uplatnit</button></div>
          </div>
          <label class="chk" data-c><input type="checkbox" id="c1"> <span>Souhlasím se <a href="#/rezervace" onclick="return false">storno podmínkami</a> <span class="req">*</span></span></label>
          <label class="chk" data-c><input type="checkbox" id="c2"> <span>Souhlasím se <a href="#/rezervace" onclick="return false">obchodními podmínkami</a> <span class="req">*</span></span></label>
          <hr class="hr" style="margin:12px 0">
          <label class="chk"><input type="checkbox" id="c3"> <span>Souhlasím se zpracováním <a href="#/rezervace" onclick="return false">osobních údajů</a> pro marketingové účely</span></label>
          <div class="paynow" id="payNow"></div>
          <button class="btn btn-primary btn-lg submit" type="submit">Rezervovat a zaplatit</button>
          <div class="trust"><span>${ic.lock}Zabezpečená platba</span><span>${ic.mail}Potvrzení rezervace e-mailem</span><span>${ic.clock}Podpora po–pá 9:00–16:00</span></div>
        </form>

        <aside>
          <div class="recap">
            <img src="assets/checkout/imgFotkaHotelu.jpg" alt="">
            <div class="in">
              <h3>Rekapitulace</h3>
              <div class="stars" style="margin-top:12px">${'★'.repeat(HOTEL.stars)}</div>
              <div class="hn">${HOTEL.name}</div>
              <div class="ad">${HOTEL.address}</div>
              <span class="tag tag-sunset">${HOTEL.promo}</span>
              <div class="div"></div>
              <dl><div><dt>Příjezd:</dt><dd>${fmtD(S.checkIn)}</dd></div><div><dt>Odjezd:</dt><dd>${fmtD(S.checkOut)}</dd></div><div><dt>Počet osob:</dt><dd>${guestsTxt()}</dd></div></dl>
              <div class="div"></div>
              <dl>${t.items.map(i => `<div><dt>${i.q}× ${i.room.name}</dt><dd></dd></div>`).join('')}<div><dt>Ubytování</dt><dd>${kc(t.acc)}</dd></div><div><dt>Servisní poplatek</dt><dd>${kc(t.fee)}</dd></div><div id="vLine" hidden><dt>Poukaz</dt><dd></dd></div></dl>
            </div>
            <div class="pay-box" id="payBox"></div>
          </div>
          <div class="help"><h3>Problémy s rezervací?</h3>
            <div class="c">${ic.mail}<span>info@dovolena-za-benefity.cz</span></div>
            <div class="c">${ic.phone}<span>+420 725 538 448<small>9:00 - 16:00 (pondělí - pátek)</small></span></div>
          </div>
          <div class="faq">Možná jsme to už vysvětlili.<br>Mrkněte na často kladené dotazy.<br><button class="btn btn-secondary" data-toast="FAQ – v prototypu neaktivní.">Časté dotazy</button></div>
        </aside>
      </div></div>`;

    drawPay();
    $$('[data-f]').forEach(i => i.oninput = i.onchange = () => { S.form[i.dataset.f] = i.value; save(); clearErr(i); });
    $('#addPay').onclick = () => { S.split = !S.split; save(); viewCheckout(); };
    $('#vBtn').onclick = () => $('#vBox').classList.toggle('on');
    $('#vApply').onclick = () => {
      const c = $('#vCode').value.trim().toUpperCase();
      if (c === 'DEMO500') { S.voucher = c; save(); drawPay(); toast('Poukaz uplatněn: −500 Kč'); }
      else toast('Neplatný kód (pro demo zkuste DEMO500).');
    };
    $$('.chk input').forEach(c => c.onchange = () => c.closest('.chk').classList.remove('err'));
    $('#co').onsubmit = e => { e.preventDefault(); submit(); };
  }

  function amounts() {
    const t = totals(), voucher = S.voucher ? 500 : 0;
    const now = Math.max(0, t.now - voucher);
    const m = window.PAYMENTS.find(p => p.id === S.pay);
    let points = m.points ? now : 0, card = m.points ? 0 : now;
    if (S.split && m.points) {
      points = Math.min(now, Math.max(0, S.pointsAmount == null ? Math.round(now * 0.6) : S.pointsAmount));
      card = now - points;
    }
    return { ...t, voucher, now, points, card, total: now + t.cityTax, method: m };
  }

  function drawPay() {
    const a = amounts();
    $('#pay').innerHTML = window.PAYMENTS.map(p => `<button type="button" class="pm${p.id === S.pay ? ' on' : ''}" data-pm="${p.id}"><span class="rd"></span><span><b>${p.name}</b><span class="s">${p.sub}</span></span></button>`).join('');
    $$('[data-pm]').forEach(b => b.onclick = () => { S.pay = b.dataset.pm; S.pointsAmount = null; save(); drawPay(); });
    $('#splitBox').innerHTML = S.split ? (a.method.points
      ? `<div class="paynow" style="margin:16px 0 0;background:var(--gray-100)"><div class="f"><label for="pts">Kolik zaplatit body (${a.method.name})</label>
          <input class="inp" id="pts" type="number" min="0" max="${a.now}" step="100" value="${a.points}" style="max-width:220px"></div>
          <p>Zbývajících <b>${kc(a.card)}</b> doplatíte platební kartou.</p></div>`
      : `<p class="note">Rozdělená platba: nejprve zvolte benefitní platformu, zbytek doplatíte kartou.</p>`) : '';
    const pts = $('#pts');
    if (pts) pts.onchange = () => { S.pointsAmount = +pts.value || 0; save(); drawPay(); };
    const vl = $('#vLine'); vl.hidden = !a.voucher; if (a.voucher) vl.lastElementChild.textContent = '−' + kc(a.voucher);
    $('#payNow').innerHTML = `<div class="t"><span>Zaplatíte teď</span><b>${kc(a.now)}</b></div>
      <p>${a.points && a.card ? `${kc(a.points)} body · ${kc(a.card)} kartou. ` : ''}Zbývajících ${kc(a.cityTax)} zaplatíte na místě v ubytování.</p>`;
    $('#payBox').innerHTML = `<dl><div><dt>Zaplatíte teď</dt><dd>${kc(a.now)}</dd></div>
      <div><dt style="display:flex;gap:6px;align-items:center" title="Městský poplatek – platí se v hotelu">Zaplatíte v ubytování ${ic.info}</dt><dd>${kc(a.cityTax)}</dd></div></dl>
      <div class="div"></div><div class="total"><span>Celková cena</span><span>${kc(a.total)}</span></div>
      <div class="xs">${ic.info} Cenu může ovlivnit způsob platby</div>`;
  }

  function setErr(el, msg) { el.classList.add('err'); const m = el.closest('.f').querySelector('.msg'); if (m) { m.textContent = msg; m.hidden = false; } }
  function clearErr(el) { el.classList.remove('err'); const m = el.closest('.f')?.querySelector('.msg'); if (m) m.hidden = true; }

  function submit() {
    const F = S.form; let bad = null;
    const need = (k, ok, msg) => { const el = $(`[data-f="${k}"]`); if (!ok) { setErr(el, msg); bad = bad || el; } };
    need('first', F.first.trim(), 'Vyplňte jméno.');
    need('last', F.last.trim(), 'Vyplňte příjmení.');
    need('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(F.email), 'Zadejte platný e-mail.');
    need('phone', F.phone.replace(/\D/g, '').length >= 9, 'Zadejte telefon (9 číslic).');
    ['c1', 'c2'].forEach(id => { const c = $('#' + id); if (!c.checked) { c.closest('.chk').classList.add('err'); bad = bad || c; } });
    if (bad) { bad.focus(); bad.scrollIntoView({ block: 'center', behavior: 'smooth' }); toast('Doplňte prosím povinné údaje.'); return; }
    const a = amounts();
    S.booking = { no: 'DZB-' + Math.floor(100000 + Math.random() * 900000), email: F.email, method: a.method.name, points: a.points, card: a.card, now: a.now, cityTax: a.cityTax, total: a.total, items: a.items.map(i => `${i.q}× ${i.room.name}`) };
    save(); location.hash = '#/potvrzeni';
  }

  // ---------- potvrzení ----------
  function viewDone() {
    const B = S.booking;
    if (!B) { location.hash = '#/'; return; }
    header('checkout');
    app.innerHTML = `<div class="wrap">${stepper(4)}
      <div class="done-box">
        <div class="ok">${ic.check}</div>
        <h1>Hotovo, rezervace je potvrzená</h1>
        <p>Potvrzení jsme poslali na <b>${esc(B.email)}</b>. Číslo rezervace <b>${B.no}</b>.</p>
        <div class="card-c">
          <div><span>${HOTEL.name}</span><span>${'★'.repeat(HOTEL.stars)}</span></div>
          <div><span class="muted">Termín</span><span>${fmtRange()}</span></div>
          <div><span class="muted">Pokoj</span><span>${B.items.join(', ')}</span></div>
          <div><span class="muted">Hosté</span><span>${guestsTxt()}</span></div>
          <hr class="hr" style="margin:8px 0">
          ${B.points ? `<div><span class="muted">Zaplaceno body (${esc(B.method)})</span><b>${kc(B.points)}</b></div>` : ''}
          ${B.card ? `<div><span class="muted">Zaplaceno kartou</span><b>${kc(B.card)}</b></div>` : ''}
          <div><span class="muted">Zaplatíte v ubytování</span><span>${kc(B.cityTax)}</span></div>
        </div>
        <a class="btn btn-primary" href="#/" id="again">Zpět na hlavní stránku</a>
      </div></div>`;
    $('#again').onclick = () => { S.sel = {}; S.booking = null; S.voucher = ''; S.split = false; save(); };
  }

  // ---------- router ----------
  function route() {
    closePop();
    const r = location.hash.replace(/^#\/?/, '');
    ({ hotel: viewHotel, rezervace: viewCheckout, potvrzeni: viewDone }[r] || viewHome)();
    footer();
    scrollTo(0, 0);
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-toast]');
    if (t) { e.preventDefault(); toast(t.dataset.toast); }
  });
  addEventListener('hashchange', route);
  route();
})();
