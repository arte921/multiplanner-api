const haalReisOp = () => {
    const reisplan = document.getElementById("textarea").value;
    document.cookie = encodeURIComponent(reisplan);
    console.log(document.cookie);
    axios
        .post("http://arte921.duckdns.org/reisscript-json", reisplan)
        .then((resultaat) => {
            document.write(resultaatHTML(resultaat.data));
        });
};