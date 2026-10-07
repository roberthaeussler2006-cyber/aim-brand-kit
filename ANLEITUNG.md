# AIM Brand Kit: Anleitung

Hier entstehen alle Designs von AIM: Instagram-Stories und Posts, LinkedIn-Bilder, Plakate,
Flyer, Slides, PDFs und Zertifikate. Du beschreibst in normaler Sprache, was du brauchst, und ein
KI-Agent (Claude Code oder Codex) baut das Design. Farben, Schriften, Logo und Bilder sind hier
fest hinterlegt, deshalb sieht am Ende alles nach AIM aus. Programmieren musst du nicht.

## Einmalig einrichten (ca. 15 Minuten)

1. **App installieren.** Eine davon reicht:
   - **Claude** Desktop-App (claude.com/download), dann im Tab **Code** arbeiten. Braucht ein Claude-Abo (Pro oder höher).
   - **Codex** App von OpenAI (chatgpt.com/codex). Braucht ein ChatGPT-Abo (Plus oder höher).
2. **Node.js installieren:** nodejs.org, Version "LTS", Installer durchklicken.
3. **Das Kit herunterladen.** Am einfachsten mit **GitHub Desktop** (desktop.github.com):
   bei GitHub anmelden, *File → Clone repository*, `aim-brand-kit` wählen, als Ort z.B. `Dokumente`.
   (Du brauchst dafür eine Einladung zum Repository, frag Robert.)
4. **Den Ordner in der App öffnen:**
   - Claude: Tab **Code** → Ordner `aim-brand-kit` auswählen.
   - Codex: *Open folder* → `aim-brand-kit`, und dem Ordner vertrauen ("Trust"), wenn gefragt.
5. **Erster Prompt:** `Richte das Brand Kit ein und zeig mir, welche Vorlagen es gibt.`
   Der Agent installiert den Renderer selbst. Wenn die App um Erlaubnis fragt, darfst du zustimmen,
   solange es um `npm` im Ordner `aim-brand-kit` geht.

## Jedes Mal

1. In GitHub Desktop auf **Fetch origin / Pull** klicken, damit du die neueste Version hast.
2. Ordner in Claude oder Codex öffnen, eine neue Unterhaltung starten.
3. Beschreiben, was du brauchst. Je mehr Fakten (Datum, Zeit, Ort, Speaker, Link), desto besser.
4. Der Agent zeigt dir ein Bild. Sag, was du ändern willst, bis es passt.
5. Die fertigen Dateien liegen in `output/<Datum>-<Name>/`:
   **PNG** für Instagram und LinkedIn, **PDF** für den Druck. Lade sie in den Team-Drive.

## Beispiel-Prompts

**Event bewerben**
> Mach eine Instagram-Story für unseren Workshop "Prompting für Pitch-Decks" am Donnerstag, 15. Oktober, 18.15 Uhr im Raum 01-012. Anmeldung über aim-club.ch/events.

**Feed-Post**
> Wir brauchen einen Instagram-Post, der ankündigt, dass die Anmeldung für die Learning Journey offen ist. Hell, mit den drei wichtigsten Punkten.

**Carousel / Recap**
> Mach ein Carousel mit 4 Slides als Recap vom Kickoff mit PwC. Die drei Takeaways: (1) ... (2) ... (3) ...

**LinkedIn**
> Ein LinkedIn-Bild im Querformat für denselben Event, auf Englisch.

**Plakat**
> Mach ein A3-Plakat für das Event, mit QR-Code zur Anmeldung. Und dann noch eine A5-Version für Flyer.

**Slides**
> Erstelle 6 Slides für die Vereinsvorstellung beim Erstsemester-Tag: wer wir sind, was wir machen, Learning Journey, Team, Mitgliedschaft, Kontakt.

**PDF**
> Ein A4-Factsheet über AIM für Firmen, die wir als Partner anfragen. Auf Englisch.

**Zertifikat**
> Zertifikate für die Learning Journey für diese 12 Namen: ...

**Etwas anpassen**
> Die Überschrift ist zu lang, mach sie kürzer. / Mach eine dunkle Variante. / Übersetz das auf Englisch.

**Prüfen lassen**
> Ich habe in Canva diesen Post gemacht (Bild anhängen). Passt der zu unserem Brand?

## Tipps

- **Fakten immer selbst angeben.** Der Agent erfindet keine Daten, Räume oder Namen. Fehlt etwas, fragt er nach.
- **Eine Sache pro Unterhaltung.** Für ein neues Design lieber eine neue Unterhaltung starten.
- **Feedback konkret machen:** "Datum grösser", "weniger Text", "Bild vom Matterhorn statt der Kuppel".
- **Vor dem Posten** Namen, Daten und Links nochmals selbst prüfen. QR-Codes mit dem Handy testen.
- Will der Agent etwas am Brand ändern (Farben, Logo, Vorlagen)? Nein sagen und Robert fragen.
  Diese Dateien gelten für alle.

## Was ist wo?

| Ordner | Inhalt |
|---|---|
| `output/` | Deine fertigen Designs (werden nicht auf GitHub hochgeladen) |
| `templates/` | Vorlagen, mit Vorschaubild `preview.png` |
| `gallery/` | Gute Beispiele von früheren Designs |
| `brand/` | Logo, Farben, Schriften, Fotos, Icons, QR-Codes. Nicht ändern. |
| `brand/logo/png/` | Logo als PNG, falls du es in Canva oder PowerPoint brauchst |
| `guide/` | Die Brand-Regeln, falls du nachlesen willst |

## Probleme?

- **"npm not found" / "node not found":** Node.js ist nicht installiert (Schritt 2), danach die App neu starten.
- **Der Agent fragt dauernd um Erlaubnis:** bei Claude kannst du oben im Eingabefeld den Modus auf "Auto" oder "Accept edits" stellen.
- **Das Bild sieht komisch aus:** sag es dem Agenten genau so. Er prüft das Bild selbst und korrigiert.
- Sonst: Robert fragen.
