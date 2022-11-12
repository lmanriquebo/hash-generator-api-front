$(document).ajaxStart(function() {
  $("#loading").show();
}).ajaxStop(function() {
  $("#loading").hide('slow');
});

$(function () {
  //Adicion de eventos en input de bootstrap que no trae previamente desarrollado
  $(".custom-file-input").on("change", function () {
    //Captura el nombre del documento seleccionado
    var fileName = !$(this).val()
      ? "Seleccionar Archivo"
      : $(this).prop("files")[0].name;
    //Cambia el texto en el label por el nombre capturado
    $(this).next(".custom-file-label").addClass("selected").html(fileName);
  });

  //Espera de boton convertir archivos a hash
  $("#btn-generar-hash").on("click", async function () {
    const file = document.querySelector("#customFileLang").files[0];
    const hashChk = $("[name='tipo_encriptacion']:checked").val();

    //Valida los campos
    if (file != undefined && hashChk != undefined) {
      var filename = $("input[type=file]")
        .val()
        .replace(/.*(\/|\\)/, "");
      var fileToBase64 = await toBase64(file);
      var dataBase64 = getBase64(fileToBase64);

      //Creamos la informacion
      var $data = {
        nombre: filename,
        archivo: dataBase64,
      };

      //Configuracion de consumo
      var $urlApi = "https://u1qlsjy419.execute-api.us-east-1.amazonaws.com/test/api/v1/hash/";
      var $controller = "file";
      var $metodo = hashChk.toUpperCase();

      //Realiza la peticion
      ApiRest(
        $urlApi,
        $controller,
        $metodo,
        $data,
        "POST",
        "json",
        "application/json; charset=utf-8",
        true,
        false,
        false
      ).then((response) => {
        alertReturnPetition(response);
        $("#TipoHashByFile").text($metodo);
        $("#HashGenerateByFile").val(response.hash);

        let hashGenerateByFile = $("#HashGenerateByFile").val();
        let textesperadobyfile = $("#HashEsperadoByFile").val();

        if (textesperadobyfile.length > 0) {
          validarChekSumByFile(textesperadobyfile, hashGenerateByFile);
        }
      });
    } else {
      alertHash(
        "warning",
        "",
        "<strong>Validacion:</strong> Se deben seleccionar primero los campos: tipo de cifrado y archivo"
      );
    }
  });

  //Espera de boton convertir texto a hash
  $("#btn-comparar-hash").on("click", async function () {
    const Text = $("#TextToHash").val();
    const hashChk = $("[name='tipo_encriptacion']:checked").val();

    //Valida los campos
    if (Text.length > 0 && hashChk != undefined) {
      //Creamos la informacion
      var $data = {
        str: Text,
      };

      //Configuracion de consumo
      var $urlApi = "https://u1qlsjy419.execute-api.us-east-1.amazonaws.com/test/api/v1/hash/";
      var $controller = "string";
      var $metodo = hashChk.toLowerCase();

      //Realiza la peticion
      ApiRest(
        $urlApi,
        $controller,
        $metodo,
        $data,
        "POST",
        "json",
        "application/json; charset=utf-8",
        true,
        false,
        false
      ).then((response) => {
        alertReturnPetition(response);
        //Muestra la respuesta
        $("#TipoHashByText").text($metodo.toUpperCase());
        $("#HashGenerateByText").val(response.hash);

        let hashGenerateByText = $("#HashGenerateByText").val();
        let textesperadobytext = $("#HashEsperadoByText").val();

        if (textesperadobytext.length > 0) {
          validarChekSumByFile(textesperadobytext, hashGenerateByText);
        }
      });
    } else {
      alertHash(
        "warning",
        "<strong>Validacion:</strong> Se deben seleccionar primero los campos: tipo de cifrado y texto a cifrar"
      );
    }
  });

  // Boton de envio de correos electronicos archivo
  var btncorreo = document.getElementById("btn-correo"),
    overlay = document.getElementById("overlay"),
    popup = document.getElementById("popup"),
    btnCerrarPopup = document.getElementById("btn-cerrar-popup");

  btncorreo.addEventListener("click", function () {
    overlay.classList.add("active");
    popup.classList.add("active");
  });
  btnCerrarPopup.addEventListener("click", function () {
    overlay.classList.remove("active");
    popup.classList.remove("active");
  });

  // Boton de envio de correos electronicos solo texto
  var btncorreo2 = document.getElementById("btn-correo-2"),
    overlay2 = document.getElementById("overlay2"),
    popup2 = document.getElementById("popup2"),
    btnCerrarPopup2 = document.getElementById("btn-cerrar-popup2");

  btncorreo2.addEventListener("click", function () {
    overlay2.classList.add("active");
    popup2.classList.add("active");
  });
  btnCerrarPopup2.addEventListener("click", function () {
    overlay2.classList.remove("active");
    popup2.classList.remove("active");
  });

  // boton Enviar texto correo electronico
  $("#submit2").on("click", async function () {
    const Text = $("#TextToHash").val();
    const hashChk = $("[name='tipo_encriptacion']:checked").val();
    const emailEnvio2 = $("#emailEnvio2").val();

    //Valida los campos
    if (Text.length > 0 && hashChk != undefined) {
      //Creamos la informacion
      var $data = {
        str: Text,
      };

      //Configuracion de consumo
      var $urlApi = "https://u1qlsjy419.execute-api.us-east-1.amazonaws.com/test/api/v1/hash/";
      var $controller = "string";
      var $metodo = hashChk.toLowerCase();

      //Realiza la peticion
      ApiRest( $urlApi, $controller, $metodo, $data, "POST", "json", "application/json; charset=utf-8", true, false, false ).then((response) => {
        let textesperadobytext = $("#HashEsperadoByText").val();
        var data = {
          toAddress: emailEnvio2,
          subject: "Uniminuto Hash Generator - Respuesta",
          text: "A continuación se adjunta el resultado de la comparación y generación de los hash del texto proporcionado.",
          data: {
            originalText: Text,
            tipo: $metodo,
            generatedHash: response.hash,
            expectedHash: textesperadobytext,
            res:
              textesperadobytext == response.hash ? "El hash generado es igual al esperado." : "El hash generado no es igual al esperado.",
          },
        };

        enviarCorreo(data).then((res) => {
          let tipo = res.message == "Error al enviar el correo." ? "danger" : "success";
          $("#overlay2,#popup2").removeClass("active");
          alertHash( tipo, "<strong>Respuesta servidor:</strong>", res.message);
        });
      });
    } else {
      alertHash("warning", "<strong>Validacion:</strong> Se deben seleccionar primero los campos: tipo de cifrado y texto a cifrar"
      );
    }
  });

  // Boton de enviar archivo correo electronico
  $("#submit").on("click", async function () {
    const file = document.querySelector("#customFileLang").files[0];
    const hashChk = $("[name='tipo_encriptacion']:checked").val();
    const emailEnvio = $("#emailEnvio").val();

    //Valida los campos
    if (file != undefined && hashChk != undefined) {
      var filename = $("input[type=file]")
        .val()
        .replace(/.*(\/|\\)/, "");
      var fileToBase64 = await toBase64(file);
      var dataBase64 = getBase64(fileToBase64);

      //Creamos la informacion
      var $data = {
        nombre: filename,
        archivo: dataBase64,
      };

      //Configuracion de consumo
      var $urlApi = "https://u1qlsjy419.execute-api.us-east-1.amazonaws.com/test/api/v1/hash/";
      var $controller = "file";
      var $metodo = hashChk.toUpperCase();

      //Realiza la peticion
      ApiRest(
        $urlApi,
        $controller,
        $metodo,
        $data,
        "POST",
        "json",
        "application/json; charset=utf-8",
        true,
        false,
        false
      ).then((response) => {
        let textesperadobyfile = $("#HashEsperadoByFile").val();
        var data = {
          toAddress: emailEnvio,
          subject: "Uniminuto Hash Generator - Respuesta",
          text: "A continuación se adjunta el resultado de la comparación y generación de los hash del archivo de texto proporcionado.",
          data: {
            originalText: filename,
            tipo: $metodo,
            generatedHash: response.hash,
            expectedHash: textesperadobyfile,
            res:
              textesperadobyfile == response.hash
                ? "El hash generado es igual al esperado."
                : "El hash generado no es igual al esperado.",
          },
        };

        enviarCorreo(data).then((res) => {
          let tipo = res.message == "Error al enviar el correo." ? "danger" : "success";
          $("#overlay,#popup").removeClass("active");
          alertHash( tipo, "<strong>Respuesta servidor:</strong>", res.message);
        });
      });
    } else {
      alertHash(
        "warning",
        "",
        "<strong>Validacion:</strong> Se deben seleccionar primero los campos: tipo de cifrado y archivo"
      );
    }
  });

  async function enviarCorreo(data) {
    var config = {
      method: "post",
      url: " https://node-hash-email.herokuapp.com/sendEmail",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    const dataResponse = response.data;
    return dataResponse;
  }

  $("#HashEsperadoByFile").on("keyup", function () {
    let hashGenerateByFile = $("#HashGenerateByFile").val();
    if (hashGenerateByFile.length > 0) {
      let textesperadobyfile = $("#HashEsperadoByFile").val();
      validarChekSumByFile(textesperadobyfile, hashGenerateByFile);
    }
  });

  $("#HashEsperadoByText").on("keyup", function () {
    let hashGenerateByText = $("#HashGenerateByText").val();
    if (hashGenerateByText.length > 0) {
      let textesperadobytext = $("#HashEsperadoByText").val();
      validarChekSumByFile(textesperadobytext, hashGenerateByText);
    }
  });

  $("[name='tipo_encriptacion']").on("change", function () {
    $("#TipoHashByFile").text($(this).val());
    $("#TipoHashByText").text($(this).val());
    $("#HashGenerateByFile").val("");
    $("#HashGenerateByText").val("");
  });

  var validarChekSumByFile = function (textoesperado, hashGenerate) {
    if (textoesperado == hashGenerate) {
      alertHash(
        "success",
        "Validación Hash",
        "<strong>El hash generado es igual al esperado."
      );
    } else {
      alertHash(
        "danger",
        "Validación Hash",
        "<strong>El hash generado no es igual al esperado."
      );
    }
  };

  //Selecciona el primer modo de cifrado
  $("[name='tipo_encriptacion']").eq(0).prop("checked", true);
  $("[name='tipo_encriptacion']:checked").trigger("change");
});

function mostrarFormulario(_id) {
  //muestra el formulario según la opción elegida por el usuario
  $("#alertHash").removeClass("show");

  if (_id == "cont-generar-hash") {
    //Generar hash
    document.getElementById(_id).style.display = "block";
    document.getElementById("cont-comparar-hash").style.display = "none";
    document.getElementById("g-hash").classList.add("active");
    document.getElementById("c-hash").classList.remove("active");
  } else {
    // Comparar Hash
    document.getElementById("cont-generar-hash").style.display = "none";
    document.getElementById("cont-comparar-hash").style.display = "block";
    document.getElementById("g-hash").classList.remove("active");
    document.getElementById("c-hash").classList.add("active");
  }
}

/**
 * @function alertHash
 * @desciption Genera la alerta con la información pertinente
 * @param {*} action
 * @param {*} hash
 * @return events
 */
function alertHash(action, text = "", message = "") {
  //Crea el objeto con los datos necesarios para la alerta por defecto
  let data = {
    icon: "fa-circle-check",
    text: "Se ha generado exitosamente.",
    hash: message,
    alert: "alert-" + action,
  };

  //Dependiendo de la accion enviada, cambiará algunos valores de los datos generados en la alerta
  switch (action) {
    case "success":
      data.icon = "fa-circle-check";
      data.text =
        text != ""
          ? text
          : "<strong>Genial!!</strong>, se ha generado exitosamente.";
      break;

    case "danger":
      data.icon = "fa-square-xmark";
      data.text =
        text != "" ? text : "<strong>Ups!!</strong>, no se pudo generar.";
      break;

    case "warning":
      data.icon = "fa-triangle-exclamation";
      data.text =
        text != ""
          ? text
          : "<strong>Uy!</strong>, presenta novedades en la generación del hash";
      break;
  }

  //Elimina las clases que muestran el icono en la alerta y añade el icono nuevo
  $("#alertHash > .icon > i")
    .removeClass(function (index, currentclass) {
      let dataClass = currentclass.split(" ");
      removeSpecificClass($(this), dataClass, "fa-");
    })
    .addClass(data.icon);

  //Reescribe el mensaje en la alerta y el hash
  $("#alertHash > .icon > .text").html(data.text);
  $("#alertHash > .icon > .hash").html(data.hash);

  //Elimina las clases que muestran el tipo de alerta y añade el nuevo tipo y la muestra
  $("#alertHash")
    .removeClass(function (index, currentclass) {
      let dataClass = currentclass.split(" ");
      removeSpecificClass($(this), dataClass, "alert-");
    })
    .addClass(data.alert + " show");
}

/**
 * @function removeSpecificClass
 * @desciption Remueve clases especificas basados en coincidencias de texto
 * @param {*} objet
 * @param {*} dataClass
 * @param {*} textSearch
 */
function removeSpecificClass(objet, dataClass, textSearch) {
  //Recorre las clases enviadas
  $.each(dataClass, function (indexInArray, valueOfElement) {
    //Valida si coinciden con el texto enviado
    if (valueOfElement.indexOf(textSearch) > -1) {
      //Elimina del objeto la clase que coincide
      objet.removeClass(valueOfElement);
    }
  });
}

function toBase64(file) {
  //Retorna la promesa
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function getBase64(base64) {
  const base64String = base64.replace("data:", "").replace(/^.+,/, "");

  //Retorna el string
  return base64String;
}

function ApiRest(
  $url,
  $controller,
  $metodo,
  $data,
  $type = "POST",
  $dataType = "json",
  $contenType = "application/x-www-form-urlencoded; charset=UTF-8",
  $async = true,
  $cache = false,
  $processData = true
) {
  return $.ajax({
    url: $url + $controller + "/" + $metodo,
    type: $type,
    contentType: $contenType,
    dataType: $dataType,
    data: JSON.stringify($data),
    async: $async,
    cache: $cache,
    processData: $processData,
    error: function (jqXhr) { // error callback 
      alertReturnPetition(jqXhr);
    }
  });
}

function alertReturnPetition(response, text = ""){
  
  if(response){
    text = !text ? "Hash generado exitosamente" : text
    Swal.fire(
      'Buen trabajo!',
      text,
      'success'
    )
  }else{
    Swal.fire(
      'Ups!',
      response.responseJSON.descripcion,
      'error'
    )
  }
}
