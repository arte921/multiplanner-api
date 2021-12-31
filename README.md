# Multiplanner
Tool om polydestinale reizen te plannen over het Nederlandse spoornet. Gebruikt de officiele NS api.

# Setup
Zorg voor een NS api key, te verkrijgen op [https://apiportal.ns.nl/](https://apiportal.ns.nl/).
Draai voor het eerste gebruik het `update.js` script met als argument de api key. Bijvoorbeeld `node update.js API_KEY`.

# Gebruik
De website en api zijn gehost op poort 25000. Er zijn verschillende api's, de verschillen zijn het gebruik van json of de multiplanner syntax. De laatste werkt als volgt:
Bij elk station kunnen 3 dingen opgegeven worden: de aankomsttijd op het station, de vertrektijd en de wachttijd. De wachttijd geeft aan hoeveel minuten de reiziger minimaal wil doorbrengen op het station. Dit kan ook een `?` zijn, wordt de wachttijd ingevuld aan de hand van de rest van de reistijden.
De aankomsttijd staat voor de stationsnaam, de vertrektijd na de stationsnaam. De wachttijd mag zowel voor als na de stationsnaam staan.

De eerste regel mag een datum en tijd bevatten, waarop de reis zal beginnen. De tijden in de rest van de reis gaan uit van die datum.

## Voorbeeld
```
monday 09:00
susteren
nijmegen
rotterdam ?
17:00 breda
```
Deze reis begint de eerstvolgende maandag om 09:00 in Susteren. Dan vertrekt men met de eerste trein naar Rotterdam via Nijmegen, en wacht daar voor zolang als mogelijk is. Dan neemt men de laatste trein waarmee men voor 17:00 in Breda kan zijn.

Het reisplan in tekst (zoals uit de `reisscript` api) ziet er dan als volgt uit:
```
Prijs               €54.41             
Vertrekdatum        3 januari 2022     
Wachttijd           4 uur en 13 minuten
Rijtijd             3 uur en 19 minuten
Totale reistijd     7 uur en 32 minuten
Hemelsbrede afstand 96 kilometer       
Afgelegde afstand   281 kilometer      
Tijd  Na  Actie                                                           
09:13   0 Neem de Stoptrein richting Roermond op spoor 2.                 
09:26  13 Stap links uit in Roermond.                                     
09:33   7 Neem de Stoptrein richting Nijmegen op spoor 3b.                
10:52  79 Stap rechts uit in Nijmegen.                                    
11:09  17 Neem de Intercity richting Roosendaal op spoor 4b.              
12:10  61 Stap links uit in Breda.                                        
12:15   5 Neem de Intercity direct richting Amsterdam Centraal op spoor 6.
12:38  23 Stap links uit in Rotterdam Centraal.                           
16:22 224 Neem de Intercity direct richting Breda op spoor 4.             
16:45  23 Stap rechts uit in Breda.  
```
