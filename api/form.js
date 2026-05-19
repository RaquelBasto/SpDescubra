export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase não configurado.");
        return res.status(500).json({
            error: "Supabase não configurado"
        });
    }

    try {
        const { nps, q2, q3, q4, q5, q6, freeText, timestamp, pageUrl } = req.body || {};

        const npsNumber = Number(nps);

        if (!Number.isInteger(npsNumber) || npsNumber < 0 || npsNumber > 10) {
            return res.status(400).json({
                error: "NPS inválido"
            });
        }

        const row = {
            nps: npsNumber,
            experiencia_uso: q2 || null,
            credibilidade: q3 || null,
            design: q4 || null,
            motivo_compra: Array.isArray(q5) ? q5 : [],
            friccao: q6 || null,
            comentario: freeText || null,
            pagina: pageUrl || null,
            user_agent: req.headers["user-agent"] || null,
            raw_payload: {
                nps,
                q2,
                q3,
                q4,
                q5,
                q6,
                freeText,
                timestamp: timestamp || new Date().toISOString()
            }
        };

        const response = await fetch(`${supabaseUrl}/rest/v1/avaliacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": supabaseKey,
                "Authorization": `Bearer ${supabaseKey}`,
                "Prefer": "return=minimal"
            },
            body: JSON.stringify(row)
        });

        if (!response.ok) {
            const details = await response.text();
            console.error("Erro Supabase:", details);

            return res.status(500).json({
                error: "Erro ao salvar no Supabase",
                details
            });
        }

        return res.status(200).json({
            success: true,
            message: "Avaliação salva no Supabase"
        });
    } catch (error) {
        console.error("Erro no form:", error);

        return res.status(500).json({
            error: "Erro interno ao processar formulário"
        });
    }
}
