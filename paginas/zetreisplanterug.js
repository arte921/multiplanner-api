if (document.cookie) document.getElementById("textarea").value = decodeURIComponent(document.cookie);

axios
    .get("tekst?filter=%5E(Proverbs%7CEcclesiastes)%20%5B0-9%5D%2B%20%5B0-9%2B%5D")
    .then((resultaat) => document.getElementById("bijbeltekst").innerHTML = resultaat.data.match(/(?<=^[0-9A-Za-z ]+ )[^0-9]+$/)[0]);
