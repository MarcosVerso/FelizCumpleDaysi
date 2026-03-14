import { BaseComponent } from "./baseComponent.js";

export class TypeWritterComponent extends BaseComponent{
    style(){
        return `
        

        
        .container {
            display: inline-flex;
            align-items: center;
        }

        #text-target {
            /* Aseguramos que herede o tenga la fuente */
            font-family: 'Pixelify Sans';
            text-align: justify;
        }
        .cursor {
            display: inline-block;
            width: 3px;
            height: 1.2em;
            background-color: rgb(0,0,0);
            margin-left: 2px;
            animation: blink 0.7s step-end infinite;
        }
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
        `;
    }

    html(){
        return `
            <div class="container">
                <span id="text-target"></span>
                <span class="cursor"></span>
                <slot id="source" style="display:none;"></slot>
            </div>
        `;
    }
    afterRender(){
        const target = this.shadowRoot.getElementById('text-target');
        const slot = this.shadowRoot.getElementById('source');
        
        // Obtenemos el texto original del slot y lo limpiamos
        const text = this.textContent.replace(/\s+/g, ' ').trim();
        target.textContent = ""; // Vaciamos por si acaso

        const typeSound = new Audio("key-press.mp3");
        typeSound.volume = 0.4; // Un poco más suave para que no canse
        typeSound.preload = "auto";
        //typeSound.currentTime = 0.1; 
        let i = 0;
        const speed = 30; // Milisegundos entre letras
        const activeSounds = [];

        const stopAllSounds = () => {
            activeSounds.forEach(sound => {
                try {
                    // Verificamos si el sonido está reproduciéndose realmente
                    if (!sound.paused) {
                        // Capturamos la promesa del play si existiera, 
                        // pero la forma más limpia en una ráfaga es esta:
                        sound.pause();
                        sound.currentTime = 0;
                    }
                } catch (e) {
                    // Ignoramos silenciosamente el AbortError
                }
                sound.remove();
            });
            activeSounds.length = 0; // Vaciamos el array
        };

        const skipAnimation = true;

        const type = () => {
            window.addEventListener('keydown', (e)=>{
                if(e.key === 's' || e.key === 'S'){
                    target.textContent = '';
                    for(i = 0; i < text.length; i++){
                        const char = text.charAt(i);
                        target.textContent += char;
                    }
                }
            })
            if (i < text.length) {
                const char = text.charAt(i);
                target.textContent += char;
                i++;

                let currentSpeed = speed;
                if (char === "." || char === "!" || char === "?") currentSpeed = 600;
            else if (char === ",") currentSpeed = 300;

            if(char !== " "){
                const instance = typeSound.cloneNode();
                //typeSound.currentTime = 0; 
                instance.currentTime = 0.05; 
                const randomPitch = 0.85 + Math.random() * 1.3;
                instance.playbackRate = randomPitch;
                instance.volume = 0.0 + Math.random()*0.6;
                activeSounds.push(instance);
                instance.play().catch(error => {
                    // Si el error es porque pausamos el audio a propósito, no hacemos nada.
                    if (error.name !== 'AbortError') {
                        console.error("Error reproduciendo audio:", error);
                    }
                });
                instance.onended = () => {
                    const index = activeSounds.indexOf(instance);
                    if (index > -1) activeSounds.splice(index, 1);
                }
            }
                setTimeout(type, currentSpeed);
            } else {
                // Opcional: Ocultar el cursor al terminar
                // this.shadowRoot.querySelector('.cursor').style.display = 'none';
                //instance.remove();
                stopAllSounds();
                const event = new CustomEvent("typing-finished", {
                    bubbles: true,
                    composed: true,
                    detail: { message: "Finalizado con éxito" }
                });
                
                this.dispatchEvent(event);
            }
        };

        // Pequeño delay inicial para que Daysi vea empezar la magia
        setTimeout(type, 0);
    }

    reescribir(texto){
        //
        this.textContent = texto;
        this.afterRender();
    }
}

customElements.define("typewritter-component", TypeWritterComponent);