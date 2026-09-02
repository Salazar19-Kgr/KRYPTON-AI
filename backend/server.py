from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os

class KryptonHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/api/chat":

            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)

            try:
                data = json.loads(body.decode("utf-8"))
                mensaje = data.get("mensaje", "").lower()

                respuesta = analizar_problema(mensaje)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()

                self.wfile.write(
                    json.dumps({
                        "respuesta": respuesta
                    }).encode("utf-8")
                )

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                self.wfile.write(
                    json.dumps({
                        "error": str(e)
                    }).encode("utf-8")
                )

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()


def analizar_problema(mensaje):

    if any(palabra in mensaje for palabra in ["nevera", "refrigerador", "refrigeración", "frío"]):
        return (
            "❄️ Modo Refrigeración activado.\n\n"
            "Cuéntame el modelo del equipo, qué síntomas presenta "
            "y si el compresor está funcionando."
        )

    elif any(palabra in mensaje for palabra in ["lavadora", "microondas", "electrodoméstico"]):
        return (
            "🔌 Modo Electrodomésticos activado.\n\n"
            "Dime qué aparato es, su marca/modelo y exactamente "
            "qué problema está presentando."
        )

    elif any(palabra in mensaje for palabra in ["placa", "voltaje", "electrónica", "circuito"]):
        return (
            "⚡ Modo Electrónica activado.\n\n"
            "Describe el circuito o dispositivo y dime qué mediciones "
            "has realizado."
        )

    else:
        return (
            "🛠️ Soy Krypton AI.\n\n"
            "Puedo ayudarte a diagnosticar problemas de refrigeración, "
            "electrodomésticos y electrónica.\n\n"
            "Describe detalladamente el problema."
        )


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 5000))
    server = HTTPServer(("0.0.0.0", PORT), KryptonHandler)

    print("⚡ Krypton AI Backend iniciado")
    print(f"📡 Servidor en puerto {PORT}")

    server.serve_forever()
