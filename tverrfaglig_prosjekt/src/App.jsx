import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {

  function test(){
    console.log("Nej")
  }



  return (
    <>
    <div className='header'>
     <h1>DOKUMENTASJON</h1>
     <a target='_blank' href="https://github.com/Eplestein"> <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" alt="" /> </a>
    
    </div>
    <div className='main'>
      <div className='Planlegging'>
        <h1>Planlegging</h1>
        <div>
        I dette prosjektet skal jeg installere Windows 10 på en lab datamaskin, koble sammen enheter via en svitsj, og danne kommunikasjon mellom enhetene på gruppen jeg jobber med. 
        Sånn ser rekkefølgen min på det jeg skal gjøre, Windows 10,  Ping, FTP
        Jeg skal først fikse en Minnepenn med et OS, på denne skal jeg installere Windows 10 fra Microsoft sin nettside, når dette er i boks skal jeg plugge inn minnepennen inn i enheten jeg skal installere valgt OS på, og kjøre enheten fra minnepennen. Når installasjonen er ferdig, skal jeg koble sammen enheten min med en eller flere av enhetene på gruppen min. Når jeg har fullført dette skal jeg skrive inn IP-adresse manuelt
        Deretter skal jeg lage en ny regel i brannmuren som tillater at andre kan kommunisere med enheten min. Når jeg har opprettet kommunikasjon på tvers av enhetene skal jeg laste ned FileZilla på enheten min, samt FileZilla server for at andre skal kunne overføre filer til serveren. 
        </div>
        <h1>Brukerveiledning</h1>
        <div className='Doku1'>
        <h2>Oppstart av PC</h2>
        <p>1</p>
        Du må først ha en minnepenn med enten en ISO-fil eller en flash fil av et operativt system, til denne oppgaven velger jeg å bruke Windows 10. Fra Microsoft sin nettside, må du laste ned et operativt system (Media tool), deretter kjører du dette programmet med minnepennen plugget inn i datamaskinen. Jeg velger å laste ned en flash minnepenn på minnepennen jeg har plugget inn. For meg tok det et kvarter før filene var lastet ned. Når nedlastningen er fulført kan du plugge ut minnepennen.
        <p>2</p>  
        Når minnepennen er klar med et OS kan du plugge den inn i PC-en, nå kan du slå på PC-en og trykke Enter helt til du kommer inn på BIOS Menyen, fra BIOS menyen vil du trykke F12. Nå vil du få opp noen valg, du skal velge Minnepennen du har plugget inn, så trykker du Enter for å velge denne. Det som skjer nå er at du kjører PC-en fra Minnepennen du har plugget inn, og den fysiske lagringsenheten din som er på PC-en, HDD/SSD. Nå følger du instruksjonene og velger språk etter din egen preferanse. Når du ankommer menyen der du kan velge installasjons metode, velger du det nederste valget. Der vil du se en eller flere partisjoner, dette er deler av lagringsenheten. 
        <div className='Red'>
          <p>OPS! Neste steg vil ikke være mulig å reversere.</p>
        </div>
        Du vil slette alt av partisjoner, til og med hoved lagringsenheten, partisjonene vil bli slettet og hoved lagringsenheten vil bli renset av all informasjon som allerede er lagret på den.  Nå kan du enten gå videre og fullføre installasjonen av Windows 10, eller så kan du patrisiere disken, nå kan du trykke «partision», jeg anbefaler å gjøre dette 3-4 ganger.
        <p>3</p>
        Når du har trykket «Next» vil den gå videre til installasjons prosessen, dette vil ta en kort stund. Når installasjonen er ferdig, er det vare å følge stegene og velge valgene man selv ønsker. 
        <div className='Doku2'>
        <h2>Kommunikasjon mellom enheter</h2>
        For å kommunisere med en annen enhet uten at noen av enheten er koblet til det offentlige nettet, må du ta i bruk av LAN (Local Area Network). 
        <p>1</p>
        Først må du begynne med det fysiske, du trenger minst 2 Ethernet kabler (1 til hver datamaskin) og 1 svitsj. Når du har skaffet deg det fysiske, kan du plugge inn Ethernet kabler i hver av enhetene. Deretter må du dirigere deg til Ethernet, IP Innstillinger, Rediger. IPv4 Adressen kan være alt fra 192.168.1.2 – 192.168.1.254, noter at de siste sifrene må være forskjellige for alle enhetene. IPv4 Subnet prefix length burde være antall enheter som skal kommunisere med hverandre. Jeg personlig valgte 2 fordi jeg skulle få 2 enheter til å kommunisere på tvers av hverandre. IPv4 gateway skal være gatewayen til swtichen, denne finner du i command prompt ved å skrive ipconfig /all. 
        <p>2</p>
        Hvis du allerede har pinget enhetene på tvers av hverandre, merket du sikkert at det ikke gikk. Dette er fordi Brannmuren til enheten blokkerer forespørselen som blir sent. For å fikse dette må du gå inn i brannmuren. Du må åpne «Windows firewall and advanced security», du skal åpne den som har en murvegg og en klode som logo, ikke den med skjold. Når du har åpnet denne skal du lage en ny regel. Klikk «New Rule», deretter trykk next helt til du får opp Customize, da skal du trykke på dette. Deretter trykker du ICMPv4, når du har gjort dette kan du trykke next. Navngi regelen din hva du vil, jeg anbefaler at du kaller den noe relevant som for eksempel «ICMPv4-In». Nå kan du pinge enhetene på tvers av hverandre ved å skrive «Ping (IP)»
        <div className='Doku3'>
        <h2>FTP - Filezilla</h2>
        <p>1</p>
        Nå skal du overføre filer på tvers av enhetene gjennom FTP (File transfer protocol). Jeg anbefaler på det sterkeste at du bruker FileZilla Client og FileZilla server for å gjøre dette. På en enhet med internett laster du ned begge varianter fra den offisielle nettsiden, husk å last det ned på en minnepenn sånn at du kan overføre det til enhetene. Når du har gjort dette kopierer du begge variantene på en 1 av enhetene, og bare FileZilla Client på den andre. Når nedlastningen er fulført starter du programmet. 
        <p>2</p>
        Det eneste som gjenstår av FileZilla eventyret ditt nå er oppsettet av FileZilla serveren. Steg 1 er å sette opp serveren, for å gjøre dette åpner du FileZilla Server, deretter lager du en ny server. Akkurat nå så har ingen enheter tilgang til denne serveren fordi brannmuren blokkerer tilgang. For å fikse dette må du gå inn i brannmuren som tidligere, deretter oppretter du en ny regel og trykker «Port», deretter protocol. Der vil du skrive 21, og de 2 grupperingene av sifre du fikk tildelt av serveren. Når du har gjort dette kan du skrive inn detaljene for å koble deg på serveren. 


        <div className='Dokumentasjon'>
        <h1>Dokumentasjon</h1>
        <h2>Utstyret jeg brukte</h2>

        Jeg starter først med å gjøre klar alt av utstyr jeg trenger, dette inkluderer ethernet kabel, en pc med Windows 10, og en minnepenn med Windows 10 sånn at jeg skal kunne installere det på datamaskinen.
        <h2>Hvordan jeg satt opp PCen</h2>
        Det første jeg gjorde var å laste ned et Windows 10 bilde, da går jeg til Microsoft sin offisielle nettside og laster ned «Media creation tool», når installasjonen var fullført gikk jeg videre til mappen jeg hadde lastet den ned i, og kjørte den derifra. Da vil du få 2 valg til å begynne med, det ene er å laste ned Windows på PC-en du kjører Media verktøyet fra, og den andre er å laste den til en Minnepenn. Jeg velger så klart å laste den ned på en minnepenn. 
        Når installasjonen er fullført, plugger jeg den inn i lab PC-en og slår den på, deretter trykker jeg Enter helt til jeg kommer inn i BIOS-en. Fra der åpner jeg Windows boot manager med F12, og kjører PC-en fra Minnepennen.
        Når jeg har gjort det får jeg opp installasjons valgene, altså hvilke språk jeg vil at Windows 10 skal være på, jeg velger engelsk. Når jeg har fullført det kommer jeg til installasjonsmetoder. Den ene er «Custom» og den andre «Standard». Jeg velger custom. 
        Når jeg velger custom kommer det opp en rekke forskjellige disker, både hoved-disken og partisjoner av hoved-disken. Jeg velger å slette absolutt alt av partisjoner, I tillegg til det sletter jeg informasjonen på disken. Jeg velger deretter å «Next». Da blir windows 10 Installert.

        <h2>Pinging av enheter</h2>
        Når PC-en er i stand til å mekke litt med, først så fikser jeg greiene i skapet ved en av ledningene fra svitsjen i skapet til 8A (Min pult), deretter kobler jeg enda en Ethernet-kabel fra porten på pulten til PC-en. Når alt dette er klart skriver jeg inn IP-Adresse manuelt. Jeg velger IPv4, deretter IP adresse 192.168.1.8, Subnet mask prefix 2 (Antall enheter) og gatewayen velger jeg skolen sin Gateway som er 10.20.64.1.
        Men, for å bli pinga, samt pinge andre må jeg lage en ny regel i brannmuren, åpner derfor brannmuren og lager en ny regel. Velger program, og deretter ICMPv4. Dette tillater den andre enheten til å pinge meg og det funker. «Ping 192.168.1.8» i CMD.

        <h2>FileZilla</h2>
        PC-en kommer dessverre ikke med FIleZilla client eller FileZilla server, og fordi PC-en ikke har nett må jeg laste ned begge programmene på en minnepenn. Når jeg har overført filene og lastet det ned på begge enheter. Må fikse FileZilla serveren. Da trykker jeg «New server» og kaller den navnet mitt. Før jeg går videre med server greiene må jeg fikse noe greier i brannmuren for at det skal funke. Jeg lager deretter en ny regel, velger port, skriver en tallene som serveren ga meg og velger FTP. Nå som dette er gjort er egentlig alt av oppsett ferdig. Det eneste som gjenstår nå er å logge inn på FileZilla.


        </div>
        </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}


