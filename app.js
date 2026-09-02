function showScreen(screenId) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document
        .getElementById(screenId)
        .classList
        .add("active");

}


function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    /*
        POR AHORA EL LOGIN ES VISUAL.

        Posteriormente aquí conectaremos:

        - Base de datos
        - Usuarios reales
        - Sistema de autenticación
    */


    if (!email || !password) {

        alert(
            "Ingresa tu correo y contraseña."
        );

        return;

    }


    showScreen("welcomeScreen");

}


function continueWithoutGoogle() {

    /*
        El botón tiene apariencia de Google,
        pero NO inicia sesión con Google.
    */

    showScreen("welcomeScreen");

}


function saveName() {

    const name =
        document
        .getElementById("username")
        .value
        .trim();


    if (!name) {

        document
            .getElementById("nameError")
            .innerText =
            "Tu nombre es obligatorio para continuar.";

        return;

    }


    localStorage.setItem(
        "krypton_username",
        name
    );


    document
        .getElementById("userDisplay")
        .innerText =
        name;


    document
        .getElementById("avatar")
        .innerText =
        name.charAt(0).toUpperCase();


    showScreen("appScreen");

}


function quickMessage(text) {

    document
        .getElementById("messageInput")
        .value =
        text + ": ";

}


async function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (!message) return;

    addUserMessage(message);
    input.value = "";

    try {
        const response = await fetch("https://krypton-ai.prds33735435.workers.dev/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mensaje: message})
        });
        const data = await response.json();
        addKryptonMessage(data.respuesta || "⚠️ Error al procesar la consulta.");
    } catch (error) {
        addKryptonMessage("⚠️ No puedo conectar con el motor de Krypton AI.");
    }
}

function addUserMessage(message) {

    const chat =
        document
        .getElementById("chatMessages");


    const element =
        document.createElement("div");


    element.className =
        "message user-message";


    element.innerHTML = `

        <div class="message-content">

            ${escapeHTML(message)}

        </div>

    `;


    chat.appendChild(element);


    chat.scrollTop =
        chat.scrollHeight;

}


function addKryptonMessage(message) {

    const chat =
        document
        .getElementById("chatMessages");


    const element =
        document.createElement("div");


    element.className =
        "message krypton-message";


    element.innerHTML = `

        <div class="message-avatar">

            K

        </div>

        <div class="message-content">

            ${escapeHTML(message)}

        </div>

    `;


    chat.appendChild(element);


    chat.scrollTop =
        chat.scrollHeight;

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


document
    .getElementById("messageInput")
    .addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                sendMessage();

            }

        }
    );


document
    .getElementById("imageInput")
    .addEventListener(
        "change",
        function(event) {

            const file =
                event.target.files[0];


            if (!file) return;


            addUserMessage(
                "📸 Imagen enviada: " +
                file.name
            );


            setTimeout(() => {

                addKryptonMessage(
                    "Imagen recibida. En la FASE 5 conectaremos el sistema de visión artificial para analizar equipos, componentes, conexiones y posibles daños visibles."
                );

            }, 500);

        }
    );
