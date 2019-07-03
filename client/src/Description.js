import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Description() {

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Descripción
      </Typography>

      <Typography variant="h5" gutterBottom>
        Mensajería
      </Typography>
      <Typography variant="body1" gutterBottom>
        La idea es poder agregar cualquier
        tipo de información por más dinámica
        que sea. Luego se puede dicernir que
        hacer con la misma en la lógica de
        negocio. Para esto se provee un campo
        que permite ingresar JSONs de forma
        amigable que es enviado al server
        al clickear en "Submit". En el servidor
        se realiza una inserción de este JSON
        en Redis así como un Broadcast. Desde
        este último con una conexión por Websocket
        se obtiene el valor que se muestra debajo.
        Además se permite buscar todos los mensajes
        ingresados hasta el momento.
      </Typography>
      <Typography variant="body1" gutterBottom>
        De querer agregar ciertos campos de
        forma fija, como el device id, basta
        con agregar un campo de form fijo y
        modificar el servidor para hacer
        un merge de la data.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Cache
      </Typography>
      <Typography variant="body1" gutterBottom>
        El cache está hecho simplemente insertando
        el contenido deseado en Redis. Debido a que
        es un String, cualquier contenido serializable
        puede ser guardado aquí. Si se desea setear
        contenido de manera permanente se puede
        clickear en la opción que así lo indica.
      </Typography>
    </React.Fragment>
  )
}