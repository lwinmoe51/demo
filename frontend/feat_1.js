export const Feature1Component = async () => {
    let title = "Feature 1 card (Fallback)";
    let description = "Feature 1 description (Fallback)";

    try {
        console.log(
            "[Feature1] Fetching from https://demo-backend.lwinmoe969786.workers.dev/api/feature1",
        );
        const response = await fetch(
            "https://demo-backend.lwinmoe969786.workers.dev/api/feature1",
        );
        console.log(`[Feature1] Response status: ${response.status}`);
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errText}`);
        }
        const data = await response.json();
        console.log("[Feature1] Data received:", data);
        title = data.title;
        description = data.description;
    } catch (error) {
        console.error("[Feature1] Error:", error.message);
    }

    return `
        <div class="card" id="feat-1">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
};
