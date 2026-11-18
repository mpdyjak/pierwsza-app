# VerdeMetan – Landing Page Dystrybucji Biometanu do Odbiorców Końcowych

Kompletny, nowoczesny, zoptymalizowany pod kątem konwersji landing page B2B dla firmy zajmującej się dystrybucją czystego biometanu do odbiorców końcowych (przemysł energochłonny, elektrociepłownie komunalne PEC, floty transportowe HDV, przetwórstwo spożywcze).

---

## 🚀 Jak uruchomić stronę lokalnie?

Strona nie wymaga żadnych zewnętrznych zależności typu Node.js/npm – jest w pełni gotowa do uruchomienia od razu po rozpakowaniu.

### Opcja 1: Bezpośrednie otwarcie w przeglądarce
Wystarczy dwukrotnie kliknąć w plik `index.html` lub otworzyć go w dowolnej przeglądarce internetowej (Chrome, Safari, Firefox, Edge).

### Opcja 2: Uruchomienie lokalnego serwera HTTP (zalecane)
Używając wbudowanego w system macOS/Linux interpretera Python:

```bash
# W folderze projektu:
python3 -m http.server 3000
```
Następnie otwórz w przeglądarce: [http://localhost:3000](http://localhost:3000)

---

## 🌟 Kluczowe Sekcje i Funkcjonalności

1. **Hero & Propozycja Wartości:**
   - Wyrazisty przekaz: **100% paliwo drop-in** (brak konieczności wymiany kotłów, palników czy turbin).
   - Zerowy wskaźnik emisyjny w rocznym bilansie EU ETS (Scope 1).
   - Zaufanie: Zgodność z RED II / RED III, KZR INiG, ISCC EU, Gwarancje Pochodzenia TGE, koncesja URE.

2. **Dla Kogo (Segmentacja Rynku):**
   - **Przemysł energochłonny & chemiczny:** Huty szkła, ceramika, papiernie, chemia procesowa (eliminacja kosztów uprawnień EUA, ochrona przed CBAM).
   - **Miejskie sieci ciepłownicze & PEC / Kogeneracja CHP:** Spełnienie wymogów dyrektywy EED ("efektywny system ciepłowniczy" >50% OZE).
   - **Floty ciężarowe & bazy transportowe:** Bio-LNG / Bio-CNG (redukcja emisji Scope 3 do 90%, obniżone opłaty drogowe w UE, cicha praca).
   - **Przetwórstwo spożywcze & agro:** Gospodarka o obiegu zamkniętym (GOZ).

3. **Modele Dystrybucji (Interaktywny Przełącznik):**
   - **Model 1: Wirtualny Gazociąg & Bilansowanie:** Wykorzystanie istniejącej sieci przesyłowej Gaz-System lub dystrybucyjnej PSG + umorzenie GDO na TGE.
   - **Model 2: Satelitarna Stacja Bio-LNG (Off-Grid Turnkey):** Budowa instalacji regazyfikacji u klienta w modelu BOO (Build, Own, Operate – 0 zł CAPEX).
   - **Model 3: Dedykowane Stacje Tankowania Bio-CNG / Bio-LNG dla baz transportowych:** Zasięg do 1 600 km na jednym tankowaniu.

4. **Interaktywny Kalkulator Redukcji Emisji CO₂ & Oszczędności ETS:**
   - Dynamiczny wybór sektora (Przemysł, PEC, Transport, Agro).
   - Przeliczanie jednostek (MWh, m³, litry, tony paliwa).
   - Płynny suwak wolumenu zapotrzebowania rocznego oraz udziału biometanu w miksie.
   - Integracja kosztów uprawnień emisyjnych EU ETS (EUR/t) i przelicznik na PLN.
   - Wyliczenie rocznej redukcji CO₂ w tonach oraz ekwiwalentów środowiskowych (drzewa, wycofane ciągniki siodłowe diesla).
   - Automatyczne przekazywanie wyliczonych parametrów do formularza kontaktowego.

5. **Tabela Porównawcza (Biometan vs Gaz Ziemny vs Zielony Wodór vs Węgiel/Olej):**
   - Zestawienie nakładów inwestycyjnych (CAPEX), kosztów ETS, zgodności drop-in i dostępności rynkowej na lata 2026+.

6. **Pobieranie Karty Jakości Biometanu (Specyfikacja Techniczna):**
   - Wbudowany w przeglądarkę mechanizm generowania oficjalnej karty parametrów fizykochemicznych gazu wysokometanowego (Grupa E zgodna z PN-EN 16723-1: min. 97.5% CH₄, ciepło spalania, wskaźnik Wobbego, normy czystości).

7. **Formularz Lead Capture B2B:**
   - Walidacja pól (NIP, branża, wolumen MWh, preferowany model dostaw).
   - Symulacja wysyłki z animowanym loaderem i modalnym oknem potwierdzenia.

8. **FAQ Akordeon:**
   - Rozwinięcie 5 kluczowych kwestii prawno-technicznych (mechanizm zwalniania z ETS w rozporządzeniu MRR, bilansowanie TGE, brak wymiany palników).

---

## 📁 Struktura Projektu

```
pierwsza-app/
├── index.html                   # Główny plik landing page
├── assets/
│   ├── css/
│   │   └── styles.css           # Dedykowane style, animacje, glassmorphism, suwaki
│   ├── js/
│   │   ├── main.js              # Nawigacja, taby, FAQ, formularz, generator karty technicznej
│   │   └── calculator.js        # Silnik kalkulatora CO2 i kosztów EU ETS
│   └── images/
│       ├── logo.svg             # Główne logo wektorowe VerdeMetan
│       ├── logo-dark.svg        # Wersja jasna logo dla ciemnego tła
│       ├── process-infographic.svg # Infografika łańcucha dostaw biometanu
│       ├── badge-red2.svg       # Certyfikat RED II / RED III
│       ├── badge-iscc.svg       # Certyfikat ISCC EU
│       ├── badge-kzr.svg        # Certyfikat KZR INiG
│       ├── badge-tge.svg        # Towarowa Giełda Energii (GDO)
│       └── badge-ure.svg        # Urząd Regulacji Energetyki
└── README.md                    # Dokumentacja projektu
```

---

## 🛠️ Technologie i Standardy

- **HTML5:** Semantyczny, w pełni dostępny kod (ARIA tags, meta tagi Open Graph, responsywność).
- **Tailwind CSS (CDN):** Nowoczesna paleta kolorystyczna Bio-Green & Emerald Slate.
- **Lucide Icons:** Czyste, lekkie ikony wektorowe SVG.
- **Vanilla JavaScript:** 0 zależności zewnętrznych, optymalna wydajność, płynne animacje 60 fps.
- **Wymogi Prawne & Branżowe:** Zgodność z polską i unijną terminologią rynku gazu (URE, Gaz-System, PSG, KOBiZE, dyrektywy RED II / RED III, EU ETS, dyrektywa EED).
