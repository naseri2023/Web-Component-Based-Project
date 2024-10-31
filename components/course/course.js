let template = document.createElement("template")
template.innerHTML = `
    <link rel="stylesheet" href="components/course/course.css">
    <div class="course-card">
        <div class="cover">
            <img src="">
        </div>

        <div class="details">
            <h2></h2>
            <div class="info">
                <p>Students: <slot name="student"></slot></p>
                <p>teacher: <slot name="teacher"></slot></p>
            </div>

            <div class="actions">
                <button id="register">Register</button>
                <button id="toggle">Sow Details</button>
            </div>
        </div>
    </div>
`
class Course extends HTMLElement {
    constructor() {
        super()

        this.toggleInfo = false;

        this.attachShadow({mode : "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    connectedCallback(){
        this.shadowRoot.querySelector(".details h2").innerHTML = this.getAttribute("title")
        this.shadowRoot.querySelector("img").setAttribute("src",this.getAttribute("cover"))
        this.shadowRoot.querySelector("#register").addEventListener("click",() =>{
            alert(`You registered in course ${this.getAttribute("title")}`)
        })
        this.shadowRoot.querySelector("#toggle").addEventListener("click",() =>{
            this.toggleInfo =! this.toggleInfo
            this.shadowRoot.querySelector(".info").style.display = this.toggleInfo ? "block" : "none"
            this.shadowRoot.querySelector('#toggle').innerHTML = this.toggleInfo ? "Hide Details" : "Show Details"
        })
    }

    static observedAttributes(){
        return ["title","cover"]
    }
}

export {Course}