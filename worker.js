export default {
  async fetch(request) {

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {

      try {

        const data = await request.json();

        const mensaje =
          (data.mensaje || "").toLowerCase();

        let respuesta;

        if (
          ["nevera", "refrigerador", "refrigeración", "frío"]
          .some(palabra => mensaje.includes(palabra))
        ) {

          respuesta =
            "❄️ Modo Refrigeración activado.\n\n" +
            "Cuéntame el modelo del equipo, qué síntomas presenta y si el compresor está funcionando.";

        } else if (
          ["lavadora", "microondas", "electrodoméstico"]
          .some(palabra => mensaje.includes(palabra))
        ) {

          respuesta =
            "🔌 Modo Electrodomésticos activado.\n\n" +
            "Dime qué aparato es, su marca/modelo y exactamente qué problema está presentando.";

        } else if (
          ["placa", "voltaje", "electrónica", "circuito"]
          .some(palabra => mensaje.includes(palabra))
        ) {

          respuesta =
            "⚡ Modo Electrónica activado.\n\n" +
            "Describe el circuito o dispositivo y dime qué mediciones has realizado.";

        } else {

          respuesta =
            "🛠️ Soy Krypton AI.\n\n" +
            "Puedo ayudarte a diagnosticar problemas de refrigeración, electrodomésticos y electrónica.\n\n" +
            "Describe detalladamente el problema.";

        }

        return new Response(
          JSON.stringify({ respuesta }),
          {
            status: 200,
            headers
          }
        );

      } catch (error) {

        return new Response(
          JSON.stringify({
            error: "Error procesando la consulta"
          }),
          {
            status: 500,
            headers
          }
        );

      }

    }

    return new Response(
      "⚡ Krypton AI Backend funcionando",
      {
        status: 200,
        headers
      }
    );

  }
};
