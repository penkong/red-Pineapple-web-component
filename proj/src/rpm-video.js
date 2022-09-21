// usage of IIFE to make it faster
// usage of clouse pattern to prevent manipulation as much as possible .

(function () {
  const template = document.createElement("template");
  template.setAttribute("id", "rpm-video-template");

  template.innerHTML = `
    <style>
      .container {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
      }
      .controls {
        position: absolute;
        bottom: 5%;
        width: 100%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        opacity: 0.2;
        transition: opacity 0.4s;
      }
      .container:hover .controls {
        opacity: 0.8;
      }
      button {
        font-weight: bolder;
        border: none;
        background-color: transparent;
        width: 20%;
        margin: 0 auto;
        margin-bottom: 10%;
        cursor: pointer;
      }
      #timeline {
        border: none;
        height: 4%;
        width: 96%
        margin: 0 auto;
      }
      #inner{
        background: white;
        height: 100%;
        width: 100%;
        margin: 0 auto;
      }
      #bar {
        height: 4%;
        width: 100%;
        margin: 0 auto;
      }
      video {
        width: 100%;
        height: 100%;
        min-width: 100%;
        min-height: 100%;
      }
    </style>

    <div class="container">
      <video id="wc-video"></video>
      <div class="controls">
        <button id="rpm-btn">
          <i id="rpm-play">
          <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 90 90;" xml:space="preserve">
            <g>
              <path style="fill:#ffffff;" d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
              <path style="fill:#ffffff;" d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
            </g>
          </svg>
          </i>

          <i id="rpm-pause">
            <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 271.953 271.953" style="enable-background:new 0 0 90 90;" xml:space="preserve">
              <g>
                <path style="fill:#ffffff;" d="M135.977,271.953c75.097,0,135.977-60.879,135.977-135.977S211.074,0,135.977,0S0,60.879,0,135.977
                  S60.879,271.953,135.977,271.953z M135.977,21.756c62.979,0,114.22,51.241,114.22,114.22s-51.241,114.22-114.22,114.22
                  s-114.22-51.241-114.22-114.22S72.992,21.756,135.977,21.756z"/>
                <path style="fill:#ffffff;" d="M110.707,200.114c7.511,0,13.598-6.086,13.598-13.598V83.174c0-7.511-6.086-13.598-13.598-13.598
                  c-7.511,0-13.598,6.086-13.598,13.598v103.342C97.109,194.028,103.195,200.114,110.707,200.114z"/>
                <path style="fill:#ffffff;" d="M165.097,200.114c7.511,0,13.598-6.086,13.598-13.598V83.174c0-7.511-6.086-13.598-13.598-13.598
                  S151.5,75.663,151.5,83.174v103.342C151.5,194.028,157.586,200.114,165.097,200.114z"/>
              </g>
            </svg>    
          </i>
        </button>
        <div id="timeline">
          <div id="bar">
            <div id="inner"></div>
          </div>
        </div>
      </div>
    </div>
    <p id="para"></p>
  `;

  const _shadows = new WeakMap();

  class MyWebComponent extends HTMLElement {
    // observe props on connection
    static get observedAttributes() {
      return ["data-quartile-tracker", "data-src"];
    }

    // ctor -------------------------------------------------------
    constructor() {
      super();

      // ---

      _shadows.set(this, this.attachShadow({ mode: "closed" }));
      this.root = _shadows.get(this);

      // ---

      this.root.appendChild(template.content.cloneNode(true));

      this.counter = 0;
      this.styled = document.createElement("style");
      this.inner = this.root.getElementById("inner");
      this.video = this.root.getElementById("wc-video");
      this.rpmBtn = this.root.getElementById("rpm-btn");
      this.playBtn = this.root.getElementById("rpm-play");
      this.pauseBtn = this.root.getElementById("rpm-pause");
    }

    // methods -------------------------------------------------------

    videoHandler() {
      let curr = this.video.currentTime
        ? (this.video.currentTime / this.video.duration) * 100
        : 0;
      if (this.video.ended) {
        this.playBtn.style.display = "block";
        this.pauseBtn.style.display = "none";
      }
      this.inner.style.width = `${curr}%`;
      this.reporter(parseInt(curr));
    }

    reporter(n) {
      let reg = /\$\{quartile\}/i;
      if (n == 0) {
        this.counter == 1 && this.sender(this.tracker.replace(reg, n));
        this.counter++;
        return;
      } else if (n == 25 || n == 50 || n == 75 || n == 100) {
        this.sender(this.tracker.replace(reg, n));
        return;
      }
    }

    sender(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    // pause or play the video
    player(e) {
      if (this.video.paused) {
        this.playBtn.style.display = "none";
        this.pauseBtn.style.display = "block";
        this.pauseBtn.style.opacity = "0.1";
        this.video.play(e);
      } else {
        this.playBtn.style.display = "block";
        this.pauseBtn.style.display = "none";
        this.video.pause(e);
      }
    }

    // futuristic consideration for
    styleIt() {
      this.styled.textContent = ``;
      this.root.appendChild(styled);
    }

    // lifecycle -------------------------------------------------------

    // invoked each time the custom element is appended into a document-connected element
    connectedCallback() {
      if (this.root.isConnected) {
        // set the pause button to display:none by default
        this.pauseBtn.style.display = "none";
        // update the progress bar
        this.video.addEventListener("timeupdate", () => this.videoHandler());
        // play video listener
        this.rpmBtn.addEventListener("click", (e) => this.player(e));
      }
    }

    // on move to new docutment
    adoptedCallback() {
      console.log("adapted");
    }

    // access to props for manipulations
    attributeChangedCallback(n, _, newVal) {
      if (n === "data-src") this.video.setAttribute("src", newVal);
      if (n === "data-quartile-tracker") this.tracker = newVal;
    }

    // on disconnect from DOM
    disconnectedCallback() {
      video.removeListern("timeupdate", () => this.videoHandler());
      rpmBtn.addEventListener("click", (e) => this.player(e));
    }
  }

  window.customElements.define("rpm-video", MyWebComponent);
})();
