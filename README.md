# Moment1.2 - Kurslistningsapplikation

Moment1.2 är en kurslistningsapplikation som gör det möjligt för användare att se och lägga till kurser i en lista. Applikationen använder `localStorage` för att spara användartilläggda kurser, så att informationen inte försvinner när sidan laddas om.

## Funktioner

- Visa en lista med exempelkurser (förifyllda).
- Lägg till egna kurser via ett formulär.
- Kurser som läggs till sparas i `localStorage` och bevaras även när sidan laddas om.
- Möjlighet att se länk till kursplanen för varje kurs.
- Kontrollera att kurskoden är unik innan en kurs läggs till.

## Teknologier

- **Vite** för utveckling och byggning av applikationen.
- **TypeScript** för att skriva typad JavaScript.
- **HTML & CSS** för frontend-design.
- **localStorage** för att lagra användartilläggda kurser.
- **DOM-manipulation** används för att visa och uppdatera kursinformationen dynamiskt på webbsidan utan att behöva ladda om sidan.

## Steg för installation
Klona detta repo:
```bash
git clone https://github.com/amer1301/moment1.2.git
cd moment1.2

Installera beroenden:
npm install

Starta utvecklingsserver:
npm run dev

Bygg för produktion:
npm run build

### Förutsättningar

- Node.js och npm bör vara installerade.
