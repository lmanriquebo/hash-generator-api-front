# hash-generator-api-front

El aplicativo web nos permitirá la realización el cifrado de un archivo o de un texto como también obtener su respectivo hash.

## Visualizacion del front

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/principal.png)

En esta página se podrá realizar el cifrado de un archivo o de un texto como también obtener su respectivo hash.
En la parte superior podremos seleccionar que deseamos hacer, cifrar un archivo o un texto:

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/archivoTexto.png)

En las dos opciones anteriores podremos indicar que tipo de hash queremos generar y comparar:
- MD5
- SHA-1
- SHA-256.

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/tipoHash.png)


## Generar un archivo
Al seleccionar la pestaña generar un archivo tendremos, la casilla para poder seleccionar un archivo que tengamos en nuestro computador y queramos generar su hash.

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/adjuntarArchivo.png)

Después de seleccionar el archivo se tendrá dos botones, cada uno con una funcionalidad diferente.

- **Generar Hash**

Este botón nos mostrara el hash que se genere del archivo que se selecciono.

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/generarHash.png)

- **Enviar a correo**

Este botón generara el hash y no lo enviara a una dirección de correo electrónico, mediante un cuadro de texto que preguntara la dirección del correo electrónico.

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/enviarCorreo.png)

## Texto
En la pestaña de texto aparece un cuadro de texto en donde el usuario podrá escribir o pegar el texto deseado para obtener el hash.

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/texto.png)

Debajo del cuadro del texto tendrá dos botones que serán los mismos botones de:
- Generar hash
- Enviar a correo

Que tendrán la misma funcionalidad que en la pestaña de adjuntar archivo.

## Comprobación de Hash
Tanto en la pestaña de adjuntar archivo como en la pestaña de texto, en la parte inferior del formulario, se encuentran dos casillas las cuales tiene la siguiente funcionalidad:

- Mostrará el hash generado mediante el archivo adjunto o el ingreso de texto
- Es un cuadro de texto en donde se puede escribir el hash que se esta esperando 

Después de tener estos dos cuadros de texto con la información correspondiente, el programa realizará una comparación de el hash generado, con el hash esperado.

Se mostrará un mensaje si los dos hashes son iguales

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/alertaBien.png)

Pero también se mostrar una alerta si los dos hash no coinciden.

![alt](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/imgReadme/alertaError.png)

## Docker Hub

En el siguiente [link](https://hub.docker.com/r/lmanriquebo/container-hash-api-front) se puede ver y descargar el proyecto en un container alojado en Docker Hub.

## Licencia

Consulte el archivo de [LICENCIA](https://github.com/lmanriquebo/hash-generator-api-front/blob/master/LICENSE.md) para conocer los derechos y limitaciones de la licencia (MIT).
