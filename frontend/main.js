import { Feature1Component } from "./feat_1.js";
// import { Feature2Component } from "./feat_2.js";
// import { Feature3Component } from "./feat_3.js";

async function initApp() {
    const appRoute = document.getElementById("app");

    // React-style Root Template
    // ⚙️ UI Component များကို ဖြုတ်/တပ် ချင်ရင် အောက်က Line တွေကို Comment ပိတ်/ဖွင့် လုပ်ပါ
    const App = `
        <h1>Multi-Environment Dashboard</h1>
        <hr />
        <div class="features-container">
            ${await Feature1Component()}
        </div>
    `;

    appRoute.innerHTML = App;
}

initApp();
