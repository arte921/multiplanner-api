const haalReisOp = () => {
    const reisplan = document.getElementById("textarea").value;
    axios
        .post("http://arte921.duckdns.org/reisscript-json", reisplan)
        .then((resultaat) => {
            document.write(resultaatHTML(resultaat.data));
        });
};