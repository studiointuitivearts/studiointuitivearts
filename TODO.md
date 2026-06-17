# Project Roadmap & TODO - Intuitive Soul Arts

Dit document dient als houvast voor de verdere ontwikkeling van de applicatie voor Anne Hopman.

## Prioriteit 1: Dynamische Content & Beheer
- [ ] **Firebase Setup**: Implementeren van Firestore voor dataopslag en Firebase Auth voor admin toegang.
- [ ] **Admin Dashboard (`/admin`)**: Een beveiligde pagina waar Anne kan inloggen.
- [ ] **Workshop Manager**: 
    - Nieuwe workshops toevoegen (titel, datum, prijs, afbeelding, beschrijving).
    - Bestaande workshops bewerken.
    - Archiveren van verlopen workshops (automatisch of handmatig).
- [ ] **Galerie Manager**: Mogelijkheid om nieuwe kunstwerken te uploaden naar de galerie.

## Prioriteit 2: Agenda & Planning
- [ ] **Agenda Module**: Een overzichtelijke kalender of lijstweergave van alle geplande activiteiten.
- [ ] **Datum-validatie**: Workshops moeten automatisch naar het 'archief' verplaatst worden zodra de datum is verstreken.
- [ ] **Aanmeldformulier**: Integratie van een formulier per workshop die direct een mail stuurt naar Anne.

## Prioriteit 3: Visueel & UX
- [ ] **Image Optimization**: Automatische compressie van geüploade afbeeldingen.
- [ ] **SEO Optimalisatie**: Specifieke meta-tags per pagina/workshop.
- [ ] **Social Media Feed**: Eventuele integratie van een Instagram cursor/feed.

## Plugins & Modules Ideeën
- **Agenda**: `react-calendar` of een custom-built lichtgewicht agenda module.
- **Forms**: `react-hook-form` voor soepele invoer in het beheerpaneel.
- **Storage**: Firebase Storage voor het hosten van de afbeeldingen die Anne uploadt.

---

*Laatst bijgewerkt: 16 juni 2026*
