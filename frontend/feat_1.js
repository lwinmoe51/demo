export const Feature1Component = async () => {
    let title = "Feature 1 card (Fallback)";
    let description = "Feature 1 description (Fallback)";

    try {
        // Component တစ်ခုချင်းစီက သူ့ API နဲ့သူ သီးသန့်ခေါ်ယူမည်
        const response = await fetch("http://localhost:5000/api/feature1");
        const data = await response.json();
        title = data.title;
        description = data.description;
    } catch (error) {
        console.warn("Feature 1 API သို့ ချိတ်ဆက်၍မရပါ။");
    }

    return `
        <div class="card" id="feat-1">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
};
