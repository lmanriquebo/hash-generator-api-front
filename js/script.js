$(function(){
    //Adicion de eventos en input de bootstrap que no trae previamente desarrollado
    $('.custom-file-input').on('change',function(){
        //Captura el nombre del documento seleccionado
        var fileName = !$(this).val() ? "Seleccionar Archivo" : $(this).prop("files")[0].name;
        //Cambia el texto en el label por el nombre capturado
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    })
})


function mostrarFormulario(_id) {
    //muestra el formulario según la opción elegida por el usuario 

    
    if (_id == "cont-generar-hash") {
        //Generar hash
        document.getElementById(_id).style.display = "block";
        document.getElementById("cont-comparar-hash").style.display = "none";  
        document.getElementById("g-hash").classList.add('active');
        document.getElementById("c-hash").classList.remove('active');
    } else {
        // Comparar Hash
        document.getElementById("cont-generar-hash").style.display = "none";
        document.getElementById("cont-comparar-hash").style.display = "block";
        document.getElementById("g-hash").classList.remove ('active');
        document.getElementById("c-hash").classList.add('active');
    }
}

/**
 * @function alertHash
 * @desciption Genera la alerta con la información pertinente
 * @param {*} action 
 * @param {*} hash 
 * @return events
 */
function alertHash(action, hash = ""){
    //Crea el objeto con los datos necesarios para la alerta por defecto
    let data = {
        icon: "fa-circle-check",
        text: "Se ha generado exitosamente.",
        hash: "<strong>Hash:</strong> "+hash,
        alert: "alert-"+action
    };
    //Dependiendo de la accion enviada, cambiará algunos valores de los datos generados en la alerta
    switch (action) {
        case "success":
            data.icon = "fa-circle-check";
            data.text = "<strong>Genial!!</strong>, se ha generado exitosamente.";
            break;
        
        case "danger":
            data.icon = "fa-square-xmark";
            data.text = "<strong>Ups!!</strong>, no se pudo generar.";
            break;
        
        case "warning":
            data.icon = "fa-triangle-exclamation";
            data.text = "<strong>Uy!</strong>, presenta novedades en la generación del hash";
            break;
    }

    //Elimina las clases que muestran el icono en la alerta y añade el icono nuevo
    $("#alertHash > .icon > i").removeClass(function(index,currentclass){
        let dataClass = currentclass.split(" ");
        removeSpecificClass($(this),dataClass,"fa-");    
    }).addClass(data.icon);

    //Reescribe el mensaje en la alerta y el hash
    $("#alertHash > .icon > .text").html(data.text);
    $("#alertHash > .icon > .hash").html(data.hash);

    //Elimina las clases que muestran el tipo de alerta y añade el nuevo tipo y la muestra
    $("#alertHash").removeClass(function(index,currentclass){
        let dataClass = currentclass.split(" ");
        removeSpecificClass($(this),dataClass,"alert-");     
    }).addClass(data.alert+" show");
}

/**
 * @function removeSpecificClass
 * @desciption Remueve clases especificas basados en coincidencias de texto
 * @param {*} objet 
 * @param {*} dataClass 
 * @param {*} textSearch 
 */
function removeSpecificClass(objet,dataClass,textSearch){
    //Recorre las clases enviadas
    $.each(dataClass, function (indexInArray, valueOfElement) {
        //Valida si coinciden con el texto enviado
        if(valueOfElement.indexOf(textSearch) > -1){
            //Elimina del objeto la clase que coincide
            objet.removeClass(valueOfElement);
        }
    });
}