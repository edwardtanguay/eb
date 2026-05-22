const QUESTIONS_DATA = [
  {
    "q": "Ab welchem Alter darf man in Berlin bei Kommunalwahlen (Wahl der Bezirksverordnetenversammlung) wählen?",
    "a": "16"
  },
  {
    "q": "Welchen Senator / welche Senatorin hat Berlin nicht?",
    "a": "Senator / Senatorin für Außenbeziehungen"
  },
  {
    "q": "Für wie viele Jahre wird das Landesparlament in Berlin gewählt?",
    "a": "5"
  },
  {
    "q": "Wer wählt in Deutschland die Abgeordneten zum Bundestag?",
    "a": "das wahlberechtigte Volk"
  },
  {
    "q": "Welches Grundrecht ist in Artikel 1 des Grundgesetzes der Bundesrepublik Deutschland garantiert?",
    "a": "die Unantastbarkeit der Menschenwürde"
  },
  {
    "q": "Deutschland ist ein",
    "a": "Bundesstaat"
  },
  {
    "q": "Welches Tier ist das Wappentier der Bundesrepublik Deutschland?",
    "a": "Adler"
  },
  {
    "q": "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
    "a": "16"
  },
  {
    "q": "Was versteht man unter dem Recht der „Freizügigkeit“ in Deutschland?",
    "a": "Man darf sich seinen Wohnort selbst aussuchen"
  },
  {
    "q": "Wer bestimmt in Deutschland die Schulpolitik?",
    "a": "die Bundesländer"
  },
  {
    "q": "Wer ernennt in Deutschland die Minister / die Ministerinnen der Bundesregierung?",
    "a": "der Bundespräsident / die Bundespräsidentin"
  },
  {
    "q": "Womit finanziert der deutsche Staat die Sozialversicherung?",
    "a": "Sozialabgaben"
  },
  {
    "q": "Wen kann man als Bürger / Bürgerin in Deutschland nicht direkt wählen?",
    "a": "den Bundespräsidenten / die Bundespräsidentin"
  },
  {
    "q": "Wie werden die Regierungschefs / Regierungschefinnen der meisten Bundesländer in Deutschland genannt?",
    "a": "Ministerpräsident / Ministerpräsidentin"
  },
  {
    "q": "Welches Amt gehört in Deutschland zur Gemeindeverwaltung?",
    "a": "Ordnungsamt"
  },
  {
    "q": "Was bedeutet „Volkssouveränität“? Alle Staatsgewalt geht vom",
    "a": "Volke aus"
  },
  {
    "q": "Welche Parteien wurden in Deutschland 2007 zur Partei „Die Linke“?",
    "a": "PDS und WASG"
  },
  {
    "q": "Die Wirtschaftsform in Deutschland nennt man",
    "a": "soziale Marktwirtschaft"
  },
  {
    "q": "Wer wählt den deutschen Bundeskanzler / die deutsche Bundeskanzlerin?",
    "a": "der Bundestag"
  },
  {
    "q": "Wie nennt man in Deutschland die Vereinigung von Abgeordneten einer Partei im Parlament?",
    "a": "Fraktion"
  },
  {
    "q": "Wer schrieb den Text zur deutschen Nationalhymne?",
    "a": "Heinrich Hoffmann von Fallersleben"
  },
  {
    "q": "Was gehört zu den Aufgaben des deutschen Bundespräsidenten / der deutschen Bundespräsidentin?",
    "a": "Er / Sie schlägt den Kanzler / die Kanzlerin zur Wahl vor"
  },
  {
    "q": "Wer wählt in Deutschland den Bundespräsidenten / die Bundespräsidentin?",
    "a": "die Bundesversammlung"
  },
  {
    "q": "Wer wählt den deutschen Bundeskanzler / die deutsche Bundeskanzlerin?",
    "a": "der Bundestag"
  },
  {
    "q": "Wie heißt Deutschlands heutiges Staatsoberhaupt?",
    "a": "Frank-Walter Steinmeier (Staatsoberhaupt = Bundespräsident)"
  },
  {
    "q": "Es gehört nicht zu den Aufgaben des Deutschen Bundestages",
    "a": "das Bundeskabinett zu bilden"
  },
  {
    "q": "Die Bundesrepublik Deutschland ist heute gegliedert in",
    "a": "Bund, Länder und Kommunen"
  },
  {
    "q": "Wer bildet den deutschen Bundesrat?",
    "a": "die Regierungsvertreter der Bundesländer"
  },
  {
    "q": "Wie nennt man in Deutschland die Vereinigung von Abgeordneten einer Partei im Parlament?",
    "a": "Fraktion"
  },
  {
    "q": "Es gehört nicht zu den Aufgaben des Deutschen Bundestages",
    "a": "das Bundeskabinett zu bilden"
  },
  {
    "q": "Die deutschen Bundesländer wirken an der Gesetzgebung des Bundes mit durch",
    "a": "Bundesrat"
  },
  {
    "q": "Die parlamentarische Opposition im Deutschen Bundestag",
    "a": "kontrolliert die Regierung"
  },
  {
    "q": "Wer leitet das deutsche Bundeskabinett?",
    "a": "der Bundeskanzler"
  },
  {
    "q": "Wer leitet das deutsche Bundeskabinett?",
    "a": "BundesKanzler"
  },
  {
    "q": "Wer wählt in Deutschland den Bundespräsidenten / die Bundespräsidentin?",
    "a": "die Bundesversammlung"
  },
  {
    "q": "In Deutschland kann ein Regierungswechsel in einem Bundesland Auswirkungen auf die Bundespolitik haben. Das Regieren wird",
    "a": "schwieriger, wenn dadurch die Mehrheit im Bundesrat verändert wird"
  },
  {
    "q": "Was bedeutet die Abkürzung CSU in Deutschland?",
    "a": "Christlich Soziale Union"
  },
  {
    "q": "Das Wahlsystem in Deutschland ist ein",
    "a": "Mehrheits- und Verhältniswahlrecht"
  },
  {
    "q": "Je mehr „Zweitstimmen“ eine Partei bei einer Bundestagswahl bekommt, desto",
    "a": "mehr Sitze erhält die Partei im Parlament"
  },
  {
    "q": "Ein Richter / eine Richterin gehört in Deutschland zur",
    "a": "rechtsprechenden Gewalt (nicht: gesetzgebenden Gewalt)"
  },
  {
    "q": "Was macht ein Schöffe / eine Schöffin in Deutschland? Er / Sie",
    "a": "entscheidet mit Richtern / Richterinnen über Schuld und Strafe"
  },
  {
    "q": "Wie viele Einwohner hat Deutschland?",
    "a": "83 Millionen"
  },
  {
    "q": "Der 27. Januar ist in Deutschland ein offizieller Gedenktag. Woran erinnert dieser Tag?",
    "a": "an die Opfer des Nationalsozialismus"
  },
  {
    "q": "Durch welche Verträge schloss sich die Bundesrepublik Deutschland mit anderen Staaten zur Europäischen Wirtschaftsgemeinschaft zusammen?",
    "a": "durch die „Römischen Verträge“"
  },
  {
    "q": "Wie viele Mitgliedstaaten hat die EU heute?",
    "a": "27"
  },
  {
    "q": "2007 wurde das 50-jährige Jubiläum der „Römischen Verträge“ gefeiert. Was war der Inhalt der Verträge?",
    "a": "Gründung der Europäischen Wirtschaftsgemeinschaft (EWG)"
  },
  {
    "q": "Zu welchem Fest tragen Menschen in Deutschland bunte Kostüme und Masken?",
    "a": "am Rosenmontag"
  },
  {
    "q": "Ab welchem Alter ist man in Deutschland volljährig?",
    "a": "18"
  },
  {
    "q": "Frau Seger bekommt ein Kind. Was muss sie tun, um Elterngeld zu erhalten?",
    "a": "Sie muss einen Antrag bei der Elterngeldstelle stellen"
  },
  {
    "q": "Das Berufsinformationszentrum BIZ bei der Bundesagentur für Arbeit in Deutschland hilft bei der",
    "a": "Lehrstellensuche"
  },
  {
    "q": "Frau Frost arbeitet als fest angestellte Mitarbeiterin in einem Büro. Was muss sie nicht von ihrem Gehalt bezahlen?",
    "a": "Umsatzsteuer"
  },
  {
    "q": "Aus welchem Land kamen die ersten Gastarbeiter / Gastarbeiterinnen in die Bundesrepublik Deutschland?",
    "a": "Italien"
  },
  {
    "q": "Welche Farben hat die Landesflagge von Berlin?",
    "a": "weiß-rot"
  },
  {
    "q": "Für wie viele Jahre wird das Landesparlament in Berlin gewählt?",
    "a": "5"
  }
];
