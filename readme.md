# Farbanalysetool

## Eingabe:

color1: \<HEX Wert\>
color2: \<HEX Wert\>

## Beispieleingabe:

color1: #ffffff
color2: #000000

## Beispielausgabe:

color1: HEX #ffffff
color2: HEX #000000

---

color1: RGB(255, 255, 255)
color2: RGB(0, 0, 0)

---

Mixed color: RGB(127, 127, 127)

---

Contrast ratio: 21

## Funktion:

-   Konvertiert die HEX Werte in RGB Werte und entsprechende Ausgabe
-   Berechnen der Mischung der beiden Farben und Ausgabe ebenfalls RGB konvertiert
-   Berechnen des Kontrastwertes der beiden Farben zueinander (hilfreich für Webdesign)

Der Ausgegebene Kontrastwert liegt zwischen 21 und 1. Bei sehr hohem Kontrast (bsp. Schwarz Weiß) liegt die Ausgabe bei 21
Gibt es keinen Kontrast (gleiche Farbe), liegt der Kontrast bei 1.
