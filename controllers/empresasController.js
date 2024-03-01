import dotenv from "dotenv";
import fetch from "node-fetch";
global.fetch = fetch;
dotenv.config();
import axios from "axios";

const openaiEndpoint = "https://api.openai.com/v1/chat/completions";
const headers = {
  Authorization: `Bearer ${process.env.API}`,
  "Content-Type": "application/json",
};

const iniciarConversacion = async (req, res) => {
  const messages = [
    {
      role: "system",
      content: `Necesito que actúes como si vos fueses un comprador y yo un vendedor. Iniciaré la conversación saludándote y consultándote por tus necesidades. Cuando yo te diga “FIN”, es porque terminó el dialogo “comprador-vendedor”. Paso siguiente quiero que evalúes la conversación (dando un puntaje entre 1 y 10 para cada uno de ella, donde 1 es pésimo y 10 en excelente) según los siguientes aspectos:
        1. Saludo y Empatía
        2. Descubrimiento de Necesidades
        3. Demostración del Producto
        4. ⁠⁠Manejo de Objeciones
       Necesito que me dejes iniciar la conversación a mi, por ahora respóndeme si entendiste`,
    },
  ];
  console.log(messages);
  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-4",
        messages: messages,
        temperature: 0.7,
        top_p: 1,
      },
      { headers: headers }
    );
    const messageContent = response.data.choices[0].message.content;
    console.log(messageContent); // This will print the message content

    res.json(messageContent);
  } catch (error) {
    console.log(error);
  }
};

// Función para interactuar con el usuario y analizar la respuesta
const interactuarConUsuario = async (req, res) => {
  const { casoGenerado, respuestaUsuario } = req.body;
  console.log(req.body);
  const messages = [
    {
      role: "system",
      content: `Eres un experto un entrenador de vendedores de retail, evalúa la respuesta del usuario según los siguientes aspectos: 1. Saludo y Empatía, 2. Descubrimiento de Necesidades, 3. Demostración del Producto, 4. Manejo de Objeciones, 5. Cierre de la Venta, 6. Servicio Postventa dando un puntaje entre 1 y 10 para cada uno de ellos, donde 1 es pésimo y 10 en excelente. Siendo la situación que se le dio al usuario esta: ${casoGenerado}.`,
    },
    {
      role: "user",
      content: respuestaUsuario,
    },
  ];

  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-4",
        messages: messages,
        temperature: 0.7,
        top_p: 1,
      },
      { headers: headers }
    );
    const messageContent = response.data.choices[0].message.content;
    console.log(messageContent); // This will print the message content

    res.json(messageContent);
  } catch (error) {
    console.log(error);
  }
};

export { iniciarConversacion, interactuarConUsuario };
