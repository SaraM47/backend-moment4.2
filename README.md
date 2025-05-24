# JWT Autentisering - frontend

Den här webbsidan är publicerad på Netlify. Den använder ett backend-API som hanterar registrering, inloggning samt autentisering av användare med hjälp av JWT (JSON Web Tokens). API:et ligger på Render och använder en NoSQL-databas (MongoDB Atlas) för att spara användarkonton. Webbsidan är byggd med Vite och TypeScript och använder Fetch API för kommunikation med backend.

## Publicerad webbplats

Uppgift 2 av frontend är publicerad via **Netlify** och Uppgift 1 av backend är publicerad via **Render**:

- [Netlify](https://backend-moment42.netlify.app/)
- [Backend-repo](https://github.com/SaraM47/backend-moment4.1)

## Beskrivning

Användaren kan skapa ett konto via ett registreringsformulär. Därefter går det att logga in med användarnamn och lösenord. Om uppgifterna är korrekta returnerar API:et en JWT-token, som sparas i webbläsarens `localStorage`. Denna token används vid alla anrop till skyddade resurser. När användaren besöker en skyddad sida kontrolleras om token finns och är giltig. Om så är fallet visas innehållet – annars omdirigeras användaren till inloggningssidan.

Sidan `dashboard.html` fungerar som en skyddad sida. Den hämtar ett meddelande från backend via en route som kräver token. Inloggning och registrering hanteras helt via Fetch API och alla felmeddelanden som returneras från servern visas tydligt för användaren.

Webbapplikationen innehåller grundläggande formulärvalidering. Vid registrering kontrolleras att både användarnamn och lösenord är ifyllda. Vid inloggning får användaren tydlig feedback om något är fel. Lyckas inloggningen omdirigeras användaren automatiskt till dashboard-sidan.

## Översikt av koden

Applikationen är skriven i TypeScript och strukturerad med hjälp av Vite. Den består av tre sidor:

- `register.html` – innehåller formulär för att skapa konto
- `login.html` – innehåller formulär för inloggning
- `dashboard.html` – skyddad sida som kräver JWT-token

Varje sida har sin motsvarande TypeScript-fil i `src/scripts` som hanterar formulärlogik, fetch-anrop, tokenlagring och navigering. Token sparas i `localStorage` och skickas med i headern `Authorization: Bearer <token>` vid anrop till skyddade endpoints.

Om användaren inte är inloggad och försöker nå `dashboard.html`, visas ett felmeddelande och användaren omdirigeras automatiskt till inloggningssidan. På dashboard-sidan finns också en "Logga ut"-knapp som rensar token och skickar tillbaka användaren till login.

## Teknisk översikt

| Sida               | Syfte                               | Skyddad? | Token används?             |
|--------------------|--------------------------------------|----------|-----------------------------|
| `register.html`    | Skapa konto via `POST`              | Nej       | Nej                        |
| `login.html`       | Logga in och få JWT-token           | Nej       | Nej                        |
| `dashboard.html`   | Visa skyddad resurs från backend    | Ja      | Ja (`Authorization: Bearer ...`) |


## Användarguide – Så använder du webbapplikationen

### 1. Registrera ett konto
Navigera till `/src/pages/register.html`. Fyll i ett användarnamn och ett lösenord i formuläret och klicka på **"Skapa konto"**. Om registreringen lyckas visas ett bekräftelsemeddelande:  
`Konto skapat! Du kan nu logga in.`

### 2. Logga in
Gå till `/src/pages/login.html`. Ange användarnamn och lösenord. Vid korrekt inloggning returnerar servern en JWT-token som sparas i `localStorage`. Användaren omdirigeras automatiskt till den skyddade sidan `dashboard.html`.

### 3. Gå till skyddad sida
Sidan `/src/pages/dashboard.html` kräver att en giltig token finns lagrad. Om så är fallet visas meddelandet:  
`Du är inloggad och har åtkomst till skyddad data.`  
Om token saknas eller är ogiltig visas ett fel och användaren skickas tillbaka till login.

### 4. Logga ut
På `dashboard.html` finns en **"Logga ut"**-knapp. Den rensar token från `localStorage` och skickar användaren tillbaka till login-sidan.

