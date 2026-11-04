// Obsah převzatý z Figmy (Dovolená za benefity, uzly 163:4710, 164:1753, 166:2827).
// Ceny pokojů a texty jsou z návrhu; poplatky jsou demo (servisní poplatek 7,9 % dle data-demo/README.md).
const H = 'assets/home/', D = 'assets/hotel/';

window.HOME = {
  heroHotels: [
    { name: 'Harvey Spa Hotel', price: '2 500 Kč/noc', img: H + 'imgRectangle27.jpg' },
    { name: 'NĒRO Boutique Hotel', price: '9 105 Kč/noc', img: H + 'imgRectangle28.jpg' },
    { name: 'Romantic Hotel Mlýn Karlštejn', price: '4 793 Kč/noc', img: H + 'imgRectangle29.jpg' },
    { name: 'Termy Karkonosze Resort & Spa', price: '2 946 Kč/noc', img: H + 'imgRectangle30.jpg' },
    { name: 'Natürlich HELL. Camping & Aparthotel', price: '976 Kč/noc', img: H + 'imgRectangle31.jpg' },
    { name: 'Hotel Křížový vrch', price: '7 012 Kč/noc', img: H + 'imgRectangle32.jpg' },
    { name: 'Seecamping Mentl', price: '1 042 Kč/noc', img: H + 'imgRectangle33.jpg' },
  ],
  partners: [
    { name: 'Booking.com', img: H + 'imgImage13.png', h: 34 },
    { name: 'Rentalcars.com', img: H + 'imgImage4.png', h: 82 },
    { name: 'lastminute.com', img: H + 'imgImage36.png', h: 104 },
  ],
  platforms: [
    { name: 'Edenred', img: H + 'imgImage5.png', h: 58 },
    { name: 'Benefit Plus', img: H + 'imgImage3.png', h: 56 },
    { name: 'Pluxee', img: H + 'imgImage6.png', h: 32 },
    { name: 'Up Benefity', img: H + 'imgUpBenefitsLogo1.svg', h: 30 },
    { name: 'Benefit Systems', img: H + 'imgImage18.png', h: 44 },
    { name: 'Fpoho', img: H + 'imgImage17.png', h: 44 },
  ],
  steps: [
    ['Popište, co hledáte', 'Vyhledávání rozumí běžné větě i tomu, kolik bodů máte. Můžete také vložit URL hotelu na Booking.com.'],
    ['Vyberte si pobyt', 'Ukážeme pobyty od našich partnerů a cenu přepočtenou na body, takže hned víte, jestli vám stačí.'],
    ['Zaplaťte benefit body', 'Přihlaste se u své benefitní platformy a rezervaci potvrďte. Případný rozdíl doplatíte kartou.'],
  ],
  destinations: [
    { name: 'Vídeň', country: 'Rakousko', img: H + 'imgImage21.jpg' },
    { name: 'Praha', country: 'Česko', img: H + 'imgImage19.jpg' },
    { name: 'Vratislav', country: 'Polsko', img: H + 'imgImage20.jpg' },
    { name: 'Řím', country: 'Itálie', img: H + 'imgImage22.jpg' },
  ],
  lastminute: [
    { name: 'Central Sopot Monte Casino', place: 'Sopoty, Polsko', board: 'All inclusive', price: '3 680', img: H + 'imgFotoPlaceholderHarveySpaHotel.jpg' },
    { name: 'Bliss Palace Hotel & Spa', place: 'Durrës, Albánie', board: 'Polopenze', price: '8 490', img: H + 'imgFotoPlaceholderNeroBoutiqueHotel.jpg' },
    { name: 'Bellavista apartment', place: 'Lago di Garda, Itálie', board: 'Bez stravy', price: '6 790', img: H + 'imgFotoPlaceholderRomanticHotelMlynKarlstejn.jpg' },
    { name: 'Paradisus by Meliá Fuerteventura - All Inclusive', place: 'Fuerteventura, Španělsko', board: 'All inclusive', price: '18 990', img: H + 'imgFotoPlaceholderRomanticHotelMlynKarlstejn1.jpg' },
  ],
  hotels: [
    { name: 'Harvey Spa Hotel', price: '2 500 Kč/noc', img: H + 'imgImage32.jpg' },
    { name: 'NĒRO Boutique Hotel', price: '9 105 Kč/noc', img: H + 'imgImage33.jpg' },
    { name: 'Romantic Hotel Mlýn Karlštejn', price: '4 793 Kč/noc', img: H + 'imgImage34.jpg' },
    { name: 'Termy Karkonosze Resort & Spa', price: '2 946 Kč/noc', img: H + 'imgImage35.jpg' },
  ],
  cars: [
    { name: 'Rent plus', img: H + 'imgImage37.png' },
    { name: 'Avis', img: H + 'imgImage38.png' },
    { name: 'Alamo', img: H + 'imgImage39.png' },
    { name: 'Sixt', img: H + 'imgImage40.png' },
    { name: 'Enterprise', img: H + 'imgImage41.png' },
    { name: 'Carwiz', img: H + 'imgImage42.png' },
    { name: 'Europcar', img: H + 'imgImage43.png' },
  ],
  tripTypes: [
    { name: 'Wellness a spa', img: H + 'imgImage26.jpg' },
    { name: 'Moře', img: H + 'imgImage31.jpg' },
    { name: 'Města', img: H + 'imgImage27.jpg' },
    { name: 'Hory', img: H + 'imgImage28.jpg' },
    { name: 'S dětmi', img: H + 'imgImage29.jpg' },
    { name: 'Romantika', img: H + 'imgImage30.jpg' },
  ],
};

window.HOTEL = {
  name: 'Aparthotel Svatý Vavřinec',
  stars: 4,
  address: 'Pec pod Sněžkou 355, Pec pod Sněžkou, Česko',
  promo: 'Sleva 30 % na lanovku na Sněžku',
  score: '9,2', scoreLabel: 'Fantastické', reviewCount: '1 656',
  gallery: { main: D + 'gal-main.jpg', grid: [D + 'gal-sauna.jpg', D + 'gal-snidane.jpg', D + 'gal-budova.jpg', D + 'gal-detsky.jpg'], map: D + 'gal-mapa.jpg', count: 33 },
  description: [
    'Aparthotel Svatý Vavřinec se nachází v destinaci Pec pod Sněžkou a poskytuje ubytování s zahradou, soukromým parkovištěm, sdíleným loungem a terasou. Westernové městečko je 36 km daleko. Na místě je k dispozici restaurace, dětský klub, pokojová služba a bezplatné Wi-Fi ve všech prostorách. Na místě můžete využívat dětské hřiště a venkovní gril a z pokojů budete mít hezký výhled na město a výhled na hory.',
    'Všechny pokoje v ubytování Aparthotel Svatý Vavřinec mají posezení, TV s plochou obrazovkou se satelitními programy a vlastní koupelnu s bezplatnými toaletními potřebami a sprchou. Zařízení všech pokojů zahrnuje varnou konvici a některé pokoje nabízejí také kuchyň s lednicí, myčkou nádobí a mikrovlnnou troubou. Všechny pokoje v ubytování Aparthotel Svatý Vavřinec mají v ceně ložní prádlo a ručníky.',
    'V ubytování se podává snídaně. V nabídce je snídaně formou bufetu, kontinentální snídaně nebo anglická/irská snídaně.',
  ],
  amenities: ['Výtah', 'Topení', 'Restaurace', 'Bar', 'Wi-Fi', 'Parkoviště', 'Nekuřácké pokoje', 'Rodinné pokoje'],
  amenitiesMore: ['Wellness a sauna', 'Dětský klub', 'Dětské hřiště', 'Terasa', 'Zahrada', 'Pokojová služba', 'Venkovní gril'],
  checkIn: '2026-12-18', checkOut: '2026-12-20', adults: 2,
  breakfastPrice: 402,
  cityTaxPerPersonNight: 34.25,
  freeCancelUntil: '12. 12. 2026 23:59',
  rooms: [
    { id: 'a1', name: 'Apartmán s 1 ložnicí', beds: '1 manželská postel a 1 rozkládací pohovka',
      photos: [D + 'imgFotka1.jpg', D + 'imgFotka2.jpg', D + 'imgFotka3.jpg'],
      features: ['Topení', 'Sprcha', 'Toaleta', 'Soukromá koupelna', 'Ručníky', 'TV', 'Lednička', 'Ložní prádlo'],
      more: ['Fén', 'Toaletní potřeby zdarma', 'Satelitní programy', 'Přístroj na přípravu čaje/kávy', 'Rychlovarná konvice', 'Výhled', 'Kuchyňský kout'] },
    { id: 'a2', name: 'Apartmán s 2 ložnicemi', beds: '2 manželské postele a 1 rozkládací pohovka',
      photos: [D + 'imgFotka2.jpg', D + 'imgFotka3.jpg', D + 'imgFotka1.jpg'],
      features: ['Topení', 'Sprcha', 'Toaleta', 'Soukromá koupelna', 'Ručníky', 'TV', 'Lednička', 'Ložní prádlo'],
      more: ['Fén', 'Toaletní potřeby zdarma', 'Satelitní programy', 'Myčka nádobí', 'Mikrovlnná trouba', 'Výhled na hory', 'Kuchyně'] },
  ],
  // Sazby z Figmy – stejné pro oba typy apartmánu.
  rates: [
    { id: 'nr', price: 8951, breakfast: false, freeCancel: false },
    { id: 'fx', price: 9925, breakfast: false, freeCancel: true },
    { id: 'fb', price: 10315, breakfast: true, freeCancel: true },
  ],
  reviews: [
    { text: 'Moc jsme si pobyt užili. Nádherné ubytování, skvělá restaurace a moc milý personál.. Snídaně byly vynikající i večeře v restauraci. Přijeli jsme s domácím mazlíčkem, který byl všude vítán :-)', who: 'Adéla, Česká republika' },
    { text: 'Moc krásné ubytování, pokoj velice útulný a dobře vybavený, personál milý. Snídaňový bufet byl skvěle zásobený a restaurace naprosto vynikající. Wellness menší, ale velice příjemné. Lokalita v Peci pod Sněžkou je skvělá a parkování v garáži také...', who: 'Pavel, Česká republika' },
    { text: 'Ubytování skvělé, hotel na super místě. Vynikající snídaně.', who: 'Nikola, Česká republika' },
  ],
  subscores: [['Lokalita', '9,6'], ['Pohodlí', '9,5'], ['Personál', '9,4']],
};

window.PRICING = { serviceFeePct: 0.079 };

window.PAYMENTS = [
  { id: 'edenred', name: 'Benefitní karta Edenred', sub: 'Zaplatíte body z benefitního účtu', points: true },
  { id: 'benefitplus', name: 'Benefit Plus', sub: 'Zaplatíte body z benefitního účtu', points: true },
  { id: 'up', name: 'Up Benefity', sub: 'Zaplatíte body z benefitního účtu', points: true },
  { id: 'card', name: 'Platební karta', sub: 'Debetní nebo kreditní karta', points: false },
];
