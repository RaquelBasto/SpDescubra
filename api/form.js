export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase não configurado nos segredos do Vercel.");
        return res.status(500).json({
            error: "Supabase não configurado no servidor"
        });
    }

    try {
        const { acompanhante, vibe, orcamento, periodos, dias, roteiro_gerado } = req.body || {};

        // Validação básica dos dados essenciais
        if (!acompanhante || !orcamento || !dias || !roteiro_gerado) {
            return res.status(400).json({
                error: "Dados incompletos. Preencha o questionário completo."
            });
        }

        const row = {
            acompanhante: String(acompanhante),
            vibe: Array.isArray(vibe) ? vibe : [],
            orcamento: String(orcamento),
            periodos: Array.isArray(periodos) ? periodos : [],
            dias: Number(dias) || 1,
            roteiro_gerado: typeof roteiro_gerado === "object" ? roteiro_gerado : JSON.parse(roteiro_gerado),
            user_agent: req.headers["user-agent"] || null
        };

        const response = await fetch(`${supabaseUrl}/rest/v1/roteiros_personalizados`, {
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
            console.error("Erro ao inserir no Supabase:", details);

            return res.status(500).json({
                error: "Erro ao salvar no Supabase",
                details
            });
        }

        return res.status(200).json({
            success: true,
            message: "Roteiro personalizado salvo com sucesso!"
        });
    } catch (error) {
        console.error("Erro interno no formulário:", error);

        return res.status(500).json({
            error: "Erro interno ao processar e salvar o roteiro"
        });
    }
}

