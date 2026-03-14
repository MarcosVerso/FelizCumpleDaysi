import { BaseComponent } from "./baseComponent.js";

export class CorazonComponent extends BaseComponent{
    constructor(){
        super();
        this.posX = Math.random() * 100.0;
        this.posY = Math.random() * 100.0;
        this.rot = Math.random() * 360.0;
        this.velX = (Math.random() - 0.5) * 2.0;
        this.velY = (Math.random()) * -1.0;
        this.img = document.createElement("img");
        //this.img.src = "undertale-heart.png";
        this.animar = this.animar.bind(this);
        this.colorRandom = Math.random() * 10;
        this.vida = Math.random()*0.2 + 0.6;
        this.lastTime = 0;
    }
    html(){
        return ``;
    }

    afterRender(){
        
        //const img = this.shadowRoot.querySelector("img");
        this.img.style.position = `fixed`;
        this.img.style.top = 0;
        this.img.style.left = 0;
        this.img.style.width = `${Math.random()*20 + 20}px`;
        this.img.style.height = `${Math.random()*20 + 20}px`;
        this.img.style.backgroundColor = `hsl(${this.colorRandom}, 100%, 50%)`;
        this.img.style.pointerEvents = "none";
this.img.style.webkitMaskImage = "url('undertale-heart.png')";
this.img.style.webkitMaskRepeat = "no-repeat";
this.img.style.webkitMaskSize = "contain";
this.img.style.maskImage = "url('undertale-heart.png')";
this.img.style.maskRepeat = "no-repeat";
this.img.style.maskSize = "contain";
        this.img.style.transform = `
            translateX(${this.posX}vw)
            translateY(${this.posY}vh)
            rotate(${this.rot}deg)
        `;
        this.img.style.opacity = this.vida;
        this.shadowRoot.appendChild(this.img);
        requestAnimationFrame((time) => {
            this.lastTime = time;
            requestAnimationFrame(this.animar);
        });
    }

    animar(currentTime){
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.velY += 0.01 * deltaTime;
        this.posX += this.velX * deltaTime;
        this.posY += this.velY * deltaTime;
        this.img.style.top = 0;
        this.img.style.left = 0;
        this.img.style.transform = `
            translateX(${this.posX}vw)
            translateY(${this.posY}vh)
            rotate(${this.rot}deg)
        `;
        
        this.vida -= 0.005 * deltaTime;
        this.img.style.opacity = this.vida;
        this.time++;
        if(this.vida > 0.0 && (this.posX > 0.0 && this.posX < 100.0) && (this.posY > 0.0 && this.posY < 100.0))
            requestAnimationFrame(this.animar);
        else
            this.remove();
    }
};

customElements.define("corazon-component", CorazonComponent);