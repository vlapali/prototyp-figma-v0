# Prototyp z Figmy – v0 (první pokus, 4. 11. 2026 dopoledne)

Snapshot úplně první verze klikacího prototypu podle Figmy, kvůli porovnání s aktuální `prototyp-figma`.
Figma: homepage 163:4710, detail hotelu 164:1753, údaje a platba 166:2827, design systém 164:2251.

Spuštění: `python3 -m http.server 5181 --directory prototyp-figma-v0` a otevřít http://localhost:5181
(jiný port než aktuální verze, aby se nesdílel stav v sessionStorage).

Flow: homepage → (hledání / karta hotelu) → detail Aparthotel Svatý Vavřinec → výběr pokoje → Údaje a platba → Potvrzení.

Demo poznámky:
- Všechny karty hotelů vedou na jediný detail (Svatý Vavřinec) – jiné detaily ve Figmě nejsou.
- Ceny pokojů jsou z Figmy (za 2 noci) a přepočítávají se podle počtu nocí.
- Servisní poplatek 7,9 % (dle data-demo/README.md), Figma ukazuje ≈ 8,5 % → čísla v rekapitulaci se mírně liší od návrhu.
- Městský poplatek 34,25 Kč/os./noc = 137 Kč za 2 os. × 2 noci (platí se v ubytování, jako ve Figmě).
- Demo poukaz: DEMO500. Obrazovka Potvrzení ve Figmě není – je dovymyšlená ve stejném stylu.
- Fotky a loga jsou exportované z Figmy (assets/), galerie hotelu je vyřezaná z podkladu ve Figmě.
- Font Source Sans 3 se načítá z Google Fonts (bez internetu se použije systémový).
