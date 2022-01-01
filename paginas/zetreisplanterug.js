if (document.cookie) document.getElementById("textarea").value = decodeURIComponent(document.cookie);

axios
    .get("http://arte921.duckdns.org/tekst?filter=%5E(Proverbs%7CEcclesiastes)%20%5B0-9%5D%2B%20%5B0-9%2B%5D", reisplan)
    .then((resultaat) => document.getElementById("bijbeltekst").value = resultaat);
