import { BaseComponent } from "./baseComponent.js";
import { CorazonComponent } from "./corazonComponent.js";
import { HeaderComponent } from "./headerComponent.js";
import { TypeWritterComponent } from "./typeWritter.js";

export class AppComponent extends BaseComponent{
    style(){
        return `
        
            *{
                font-family: system-ui;
            }

            .contenedor-tecleo{
                width: fit-content;
                margin: auto;
                display: flex;
            }

            h1{
                
            }

            .pato{
                color: red;
            }

            .app{
                position: fixed;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(45deg, rgb(255, 255, 255), rgb(237, 97, 234));
                height: 100vh;
                transition: 1s;
                overflow: hidden;
            }

            button{
                background-color: white;
                border: 0;
                padding: 6px;
                border-radius: 4px;
                filter: drop-shadow(0 0 20px rgba(255,20,20, 0.5));
            }

            .btn-iniciar{
                display: flex;
                margin: 25vh auto;

            }

            .contenedor-regalos {
                width: 100%;
                position: fixed;
                bottom: 10vh; /* Ajusta la posición vertical */
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                z-index: 20; /* Por encima de todo */
                opacity: 0;
                pointer-events: none; /* Invisible al principio */
            }
        
            /* Clase para activar la aparición */
            .contenedor-regalos.activado {
                opacity: 1;
                pointer-events: auto;
            }
        
            .btn-regalo {
                padding: 15px 30px;
                font-size: 1.2rem;
                background-color: #ff4081; /* Color llamativo */
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                
                /* Animación de caída */
                animation: caidaBounce 1s ease-out forwards;
                animation-delay: 0.5s; /* Pequeño retraso después del texto */
            }
        
            @keyframes caidaBounce {
                0% {
                    transform: translateY(-500px) scale(0.5);
                    opacity: 0;
                }
                60% {
                    transform: translateY(30px) scale(1.1);
                    opacity: 1;
                }
                80% {
                    transform: translateY(-10px) scale(0.95);
                }
                100% {
                    transform: translateY(0) scale(1);
                }
            }
        
            .contenedor-cupones {
                display: flex;
                gap: 15px;
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.5s ease-out;
            }
        
            .contenedor-regalos.activado .contenedor-cupones {
                opacity: 1;
                transform: scale(1);
                transition-delay: 1.2s; /* Aparecen después del botón */
            }

            .cupon {
                min-width: 140px; /* Tamaño mínimo */
                width: auto;      /* Que crezca según el texto */
                min-height: 100px;
                padding: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 12px;
                font-family: "Pixelify Sans", sans-serif;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                position: relative;
                text-align: center;
                overflow: hidden;
                border: 2px solid rgba(255,255,255,0.3);
            }
        
            .cupon::after {
                content: '🎟️'; /* Icono de ticket */
                position: absolute;
                font-size: 1.5rem;
                opacity: 0.2;
            }

            .cupon.primero {
                background: linear-gradient(135deg, #ffd700 0%, #ffae00 100%);
                border: 2px solid #fff;
                overflow: hidden; /* Necesario para el brillo */
                width: 150px; /* Un poco más grande para el mensaje */
                height: 80px;
                font-family: "Pixelify Sans", sans-serif;
                font-size: 0.9rem;
                text-align: center;
                padding: 5px;
            }
        
            /* El efecto de brillo (Shimmer) */
            .cupon.primero::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(45deg);
                animation: brilloPasajero 3s infinite;
            }
        
            @keyframes brilloPasajero {
                0% { transform: translateX(-150%) rotate(45deg); }
                50% { transform: translateX(150%) rotate(45deg); }
                100% { transform: translateX(150%) rotate(45deg); }
            }
            
            /* Estilos base para todos los cupones */
    .cupon {
        /* ... tus estilos base anteriores ... */
        transition: transform 0.2s ease; /* Para el efecto de hover */
    }

    .cupon:hover {
        transform: scale(1.05) rotate(2deg); /* Pequeña reacción al pasar el mouse */
    }

    /* Cupón 2: Plata (Masaje/Relax) */
    .cupon.segundo {
        background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
        border: 2px solid #fff;
        color: #333;
    }

    /* Cupón 3: Bronce (Cena/Comida) */
    .cupon.tercero {
        background: linear-gradient(135deg, #cd7f32 0%, #a0522d 100%);
        border: 2px solid #fff;
        color: #fff;
    }
    /* Responsividad para móviles */
    @media (max-width: 600px) {
        .contenedor-regalos {
            width: 90%;
            bottom: 2vh;
            padding: 15px;
        }

        .contenedor-cupones {
            flex-direction: column; /* Apilar cupones uno arriba de otro */
            gap: 10px;
            width: 100%;
            align-items: center;
        }

        .cupon {
            width: 90% !important; /* Que ocupen casi todo el ancho disponible */
            min-height: 80px;
            padding: 10px;
        }

        .btn-regalo {
            font-size: 1rem;
            padding: 10px 20px;
        }

        /* Ajustar el texto del TypeWritter para que no sea gigante en móvil */
        
    }
        `;
    }

    html(){
        return `
            <div class="app">
                <header-component></header-component>
                <button class="btn-iniciar"><h1>INICIAR</h1></button>
            </div>
        `;
    }

    afterRender(){
        setInterval(()=>{
            //for(let i = 0; i < Math.random()*15; i++)
            if(this.shadowRoot.querySelectorAll("corazon-component").length < 10)
                this.spawnCorazon();
        }, 50)
        //this.spawnCorazon();
        const boton = this.shadowRoot.querySelector(".btn-iniciar");
        const loop = () => {
            this.animarBoton(boton);
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);

        boton.addEventListener("click", ()=>{
            const header = this.shadowRoot.querySelector("header-component");
            if(header)
            header.remove();
            const app = this.shadowRoot.querySelector('.app');
            app.style.width = 0;
            setTimeout(()=>{
                app.style.width = `100%`;
                app.style.background = 'white';
                boton.remove();

                const typeWritter = document.createElement("typewritter-component");
                typeWritter.innerHTML = `
                    Feliz Cumpleaños DAYSI MI AMOOOOOOOOOOOOOOOR!!!!... 
                    Felices 19 AÑOS y espero que sigas cumpliendo mas, mi cumpleañera <3. 
                    He estado poniendo mucho esfuerzo en prepararte algo asi mi vida, se 
                    que no todo ha estado tan facil, se que has tenido tus luchas pero aun asi te
                    felicito por haber llegado hasta aqui, no puedo evitar recordar los primeros momentos 
                    y los primeros meses que pasamos juntos, Quiero decirte, que eres increible... 
                    Eres fuerte, y realmente te quiero muchisimo y te amo con toda mi alma, Feliz 14 
                    de Marzo mi amor <3. Pero no quiero que esto acabe hasta aqui.. por eso me dispuse a 
                    hacerte algo aun mas especial. Me siento muy feliz por ti y quiero celebrarlo contigo al 
                    maximo mi cumpleañera, TE AMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO.
                `;
                app.appendChild(typeWritter);
                app.insertAdjacentHTML('afterend', `
                <div class="contenedor-regalos" id="regalos">
                <button class="btn-regalo">🎁 ¡Tus Regalos! 🎁</button>
                
                <div class="contenedor-cupones">
    <div class="cupon primero">
        <span>VALE POR:</span>
        <br>
        <strong>UN DÍA DE DESCANSO TOTAL Y MUCHOS BESITOS</strong>
        <p style="font-size: 0.6rem; margin-top: 5px;"></p>
    </div>

    <div class="cupon segundo">
        <span>VALE POR:</span>
        <br>
        <strong>UN MASAJE RELAJANTE</strong>
        <p style="font-size: 0.6rem; margin-top: 5px;"></p>
    </div>

    <div class="cupon tercero">
        <span>VALE POR:</span>
        <br>
        <strong>TU CENA FAVORITA</strong>
        <p style="font-size: 0.6rem; margin-top: 5px;"></p>
    </div>

    
</div>
            </div>
                `);
                // En el afterRender, después de mostrar los regalos
const primerCupon = this.shadowRoot.querySelector('.cupon.primero');
primerCupon.addEventListener('click', (e) => {
    new Audio("moneda.mp3").play();
    // Aquí podrías llamar a una función que dispare corazones dorados
    this.spawnCorazonesDorados(e.clientX, e.clientY);
});
const segunCupon = this.shadowRoot.querySelector('.cupon.segundo');
segunCupon.addEventListener('click', (e) => {
    new Audio("moneda.mp3").play();
    // Aquí podrías llamar a una función que dispare corazones dorados
    this.spawnCorazonesDorados(e.clientX, e.clientY);
});
const tercerCupon = this.shadowRoot.querySelector('.cupon.tercero');
tercerCupon.addEventListener('click', (e) => {
    new Audio("moneda.mp3").play();
    // Aquí podrías llamar a una función que dispare corazones dorados
    this.spawnCorazonesDorados(e.clientX, e.clientY);
});
                typeWritter.addEventListener("typing-finished", ()=>{
                    const regalos = this.shadowRoot.getElementById('regalos');
                    regalos.classList.add('activado');
                });
            }, 1000);
        });
    }

    /*shake*/
    animarBoton(boton){
        //const boton = this.shadowRoot.querySelector(".btn-iniciar");
        const mag = 5;
        const magrot = 10;
        const x = Math.random() * mag - mag/2.0;
        const y = Math.random() * mag - mag/2.0;
        const rot = Math.random() * magrot - magrot/2;
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        const blur = Math.random() * 2;

        boton.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
        boton.style.filter = `drop-shadow(0 0 5px rgb(${r}, ${g}, ${b})) blur(${blur}px)`
    }

    spawnCorazon(){
        const corazon = document.createElement("corazon-component");
        /*img.src = "undertale-heart.png";
        img.style.width = `20px`;
        img.style.left = `${Math.random() * 100}%`;*/
        this.shadowRoot.querySelector(".app").appendChild(corazon);
        /* Crear Animacion: */
    }

    // En el AppComponent
    spawnCorazonesDorados(x, y) {
        const cantidad = 15;
        for (let i = 0; i < cantidad; i++) {
            const corazonDorado = document.createElement("corazon-component");
            
            // Pasamos las coordenadas antes de añadirlo al DOM
            // (Convertimos píxeles de pantalla a unidades de vista si es necesario, 
            // pero si tu componente usa px, esto sirve)
            corazonDorado.posX = (x / window.innerWidth) * 100;
            corazonDorado.posY = (y / window.innerHeight) * 100;
    
            setTimeout(() => {
                const img = corazonDorado.shadowRoot.querySelector("img");
                if (img) {
                    // CORRECCIÓN AQUÍ: Usamos 'img' que es la variable definida arriba
                    // El filtro sepia + hue-rotate es mejor para lograr el dorado en una imagen roja
                    img.style.filter = `sepia(1) saturate(20) hue-rotate(50deg) drop-shadow(0 0 8px gold)`;
                    img.style.zIndex = 1000;
                }
            }, 50); // Un pequeño delay para asegurar que el componente cargó
    
            this.shadowRoot.querySelector(".app").appendChild(corazonDorado);
        }
    }
}

customElements.define('app-component', AppComponent);