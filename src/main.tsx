import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import getTrackingScriptForZone from "./tracking-scripts/index.ts";

loadCorrectInterceptScript();
attachGestureTracker();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/simple-react-ecommerce">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

keepQueryParamsInLinks();


function loadCorrectInterceptScript() {
  const urlParams = new URLSearchParams(window.location.search);
  const zoneId = urlParams.get("zoneId") ?? 'default';
  const snippet = getTrackingScriptForZone(zoneId);

  const container = document.createElement('div');
  container.innerHTML = snippet;

  const scriptContent = container.querySelector('script')!.textContent;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = scriptContent;
  document.body.appendChild(script);

  const divContent = container.querySelector('div')!.outerHTML;
  const divContainer = document.createElement('div');
  divContainer.innerHTML = divContent;
  document.body.appendChild(divContainer.firstChild!);
}

function keepQueryParamsInLinks() {
  [...document.querySelectorAll('a')].forEach(e=>{
    //add window url params to to the href's params
      const url = new URL(e.href)
      for (let [k,v] of new URLSearchParams(window.location.search).entries()){
        url.searchParams.set(k,v)
      }
      e.href = url.toString();
    })
}

function attachGestureTracker() {
  window.addEventListener('DOMContentLoaded', () => {
    const box = document.createElement('puppeteer-mouse-pointer');
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      puppeteer-mouse-pointer {
        pointer-events: none;
        position: absolute;
        top: 0;
        z-index: 10000;
        left: 0;
        width: 20px;
        height: 20px;
        background: rgba(0,0,0,.4);
        border: 1px solid white;
        border-radius: 10px;
        margin: -10px 0 0 -10px;
        padding: 0;
        transition: background .2s, border-radius .2s, border-color .2s;
      }
      puppeteer-mouse-pointer.button-1 {
        transition: none;
        background: rgba(0,0,0,0.9);
      }
      puppeteer-mouse-pointer.button-2 {
        transition: none;
        border-color: rgba(0,0,255,0.9);
      }
      puppeteer-mouse-pointer.button-3 {
        transition: none;
        border-radius: 4px;
      }
      puppeteer-mouse-pointer.button-4 {
        transition: none;
        border-color: rgba(255,0,0,0.9);
      }
      puppeteer-mouse-pointer.button-5 {
        transition: none;
        border-color: rgba(0,255,0,0.9);
      }
    `;
    document.head.appendChild(styleElement);
    document.body.appendChild(box);
    document.addEventListener('mousemove', event => {
      box.style.left = event.pageX + 'px';
      box.style.top = event.pageY + 'px';
      updateButtons(event.buttons);
    }, true);
    document.addEventListener('mousedown', event => {
      updateButtons(event.buttons);
      box.classList.add('button-' + event.which);
    }, true);
    document.addEventListener('mouseup', event => {
      updateButtons(event.buttons);
      box.classList.remove('button-' + event.which);
    }, true);
    function updateButtons(buttons: number) {
      for (let i = 0; i < 5; i++)
        box.classList.toggle('button-' + i, (buttons & (1 << i)) as unknown as boolean);
    }
  });
}
