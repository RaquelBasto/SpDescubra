-- 🏙️ SP DESCUBRA - Configuração do Banco de Dados Supabase
-- Cole este script no "SQL Editor" do seu painel Supabase e clique em "Run"

-- 1. Criar a tabela para guardar as preferências e os roteiros gerados
CREATE TABLE IF NOT EXISTS public.roteiros_personalizados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    acompanhante TEXT NOT NULL,
    vibe TEXT[] NOT NULL,
    orcamento TEXT NOT NULL,
    periodos TEXT[] NOT NULL,
    dias INT NOT NULL,
    roteiro_gerado JSONB NOT NULL,
    user_agent TEXT
);

-- 2. Ativar o Row Level Security (RLS) para proteção da tabela
ALTER TABLE public.roteiros_personalizados ENABLE ROW LEVEL SECURITY;

-- 3. Criar política de segurança que permite inserção pública (anon ou service key)
-- Isso garante que a nossa API no Vercel consiga salvar novos roteiros
CREATE POLICY "Permitir inserções públicas" 
ON public.roteiros_personalizados 
FOR INSERT 
WITH CHECK (true);

-- 4. Criar política de segurança que permite leitura pública (opcional, para exibir estatísticas no futuro se desejar)
CREATE POLICY "Permitir leitura pública" 
ON public.roteiros_personalizados 
FOR SELECT 
USING (true);

-- 5. Habilitar publicação em tempo real (opcional, se quiser acompanhar novos cadastros em tempo real)
ALTER PUBLICATION supabase_realtime ADD TABLE public.roteiros_personalizados;
