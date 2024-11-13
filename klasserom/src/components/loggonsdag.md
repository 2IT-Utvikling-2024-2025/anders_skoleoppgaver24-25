# **Logg onsdag** 


## Hva har jeg jobbet med?
    Jeg har jobbet med klassekartet.

## Endringer utført

- [x] Endret klasseinfo.jsx til .json 

- [x] Forandret nesten alt i klassekart.jsx

- [x] la til en funksjon som lar deg plassere hvem som skal sitte på hvilke plasser

- [x] Omskrevet koden

- [x] Flere små endringer, osv


## Spesifikt det jeg har gjort
I dag har jeg jobbet videre med klassekartet, dette innebærer at jeg jobber med jsx. Jeg har omskrevet egentlig hele koden i klassekart.jsx, og lagt til nyttige funksjoner som gjør det både lettere for meg og den som skal bruke nettsiden. Da snakker jeg i hoved settning om funskjonen som lar deg plassere eleven på en av plassene. Da trenger jeg ikke og se fram og tilbake på json filene og IDen til navnene hver gang jeg skal endre på en plass. Sparer både meg og bruker tid. 

Jeg bruker useEffect-hooken til å laste inn elevdata fra klasseinfo når komponenten først rendres. Den setter klassen "2ITB" fra klasseinfo til students, som dermed lagrer elevnavnene.

For plasseringen av pultene brukte jeg arrays, en 2d array med 2 plasser, og en til 2d array med 3 plasser. Hver kolonne gjorde jeg om til en knapp sånn at man skal kunne klikke på hver en av plassene. 

Venstresiden: I leftside-div-en går jeg gjennom tableAssignments.left, som er en liste over bord, og hver knapp representerer en plass ved et bord. Hvis en elev er tildelt plassen, vises elevens navn ved hjelp av Elev-komponenten. Hvis plassen er tom, vises "Velg elev".

Høyresiden: På samme måte, i rightside-div-en, rendres bord og seter fra tableAssignments.right.

    




