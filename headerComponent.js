import { BaseComponent } from "./baseComponent.js";

export class HeaderComponent extends BaseComponent{
    style(){
        return `
            header{
                background: linear-gradient(45deg, rgb(251, 183, 183), rgb(237, 97, 234));
                padding: 10px 10%;
                filter: drop-shadow(0px 0px 10px black);
            }

            header h1{
                filter: drop-shadow(0px 0px 1px black);
                color: rgb(255, 255, 255);
                opacity: 0.8;
            }

            h1{
                
            }

        `;
    }

    html(){
        return `
            <header>
                <h1>Feliz Cumpleaños Daysi <3 </h1>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);