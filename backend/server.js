export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // CORS Header သတ်မှတ်ခြင်း (Frontend မှ လှမ်းခေါ်ခွင့်ပေးရန်)
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        // Helper function to query D1 Database
        async function getFeatureData(id) {
            try {
                const { results } = await env.DB.prepare(
                    "SELECT title, description FROM cards WHERE id = ?",
                )
                    .bind(id)
                    .all();

                if (!results || results.length === 0) return null;
                return results[0];
            } catch (e) {
                return null;
            }
        }

        // API Endpoints Mapping
        if (url.pathname === "/api/feature1") {
            console.log("[API] /api/feature1 called");
            try {
                const data = await getFeatureData(1);
                console.log("[API] getFeatureData(1) result:", data);
                if (!data)
                    return new Response(
                        JSON.stringify({ error: "Data not found" }),
                        { status: 404, headers: corsHeaders },
                    );
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            } catch (e) {
                console.error("[API] /api/feature1 error:", e.message);
                return new Response(
                    JSON.stringify({ error: "Internal server error", detail: e.message }),
                    { status: 500, headers: corsHeaders },
                );
            }
        }

        // if (url.pathname === "/api/feature2") {
        //     const data = await getFeatureData(2);
        //     if (!data)
        //         return new Response(
        //             JSON.stringify({ error: "Data not found" }),
        //             { status: 404, headers: corsHeaders },
        //         );
        //     return new Response(JSON.stringify(data), {
        //         headers: { ...corsHeaders, "Content-Type": "application/json" },
        //     });
        // }

        // if (url.pathname === "/api/feature3") {
        //     const data = await getFeatureData(3);
        //     if (!data)
        //         return new Response(
        //             JSON.stringify({ error: "Data not found" }),
        //             { status: 404, headers: corsHeaders },
        //         );
        //     return new Response(JSON.stringify(data), {
        //         headers: { ...corsHeaders, "Content-Type": "application/json" },
        //     });
        // }

        return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
};
