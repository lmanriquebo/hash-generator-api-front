function mostrarFormulario(_id) {
    if (_id == "cont-generar-hash") {
        document.getElementById(_id).style.display = "block";
        document.getElementById("cont-comparar-hash").style.display = "none";  
        document.getElementById("g-hash").classList.add('active');
        document.getElementById("c-hash").classList.remove('active');
    } else {
        document.getElementById("cont-generar-hash").style.display = "none";
        document.getElementById("cont-comparar-hash").style.display = "block";
        document.getElementById("g-hash").classList.remove ('active');
        document.getElementById("c-hash").classList.add('active');
    }
}

