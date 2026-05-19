# SP Descubra · São Paulo para todos os momentos

> Guia visual e interativo para explorar o melhor de São Paulo — do centro histórico à vida noturna, da gastronomia à natureza urbana.

---

## ✦ Sobre o projeto

**SP Descubra** é um site de uma página (`index.html`) que funciona como um guia completo de São Paulo. Sem back-end, sem dependências externas — tudo em HTML, CSS e JavaScript puros. É só abrir no navegador e usar.

A proposta é simples: ajudar qualquer pessoa a descobrir o que fazer em SP de acordo com seu perfil, humor e momento.

---

## ✦ O que tem no site

| Seção | O que faz |
|---|---|
| **Hero** | Apresentação impactante com estatísticas da cidade |
| **Lugares com filtros** | Grade de 12 lugares filtráveis por perfil, horário, preço e vibe |
| **Roteiros** | 6 roteiros prontos (1 dia, casal, gastronômico, noturno, cultural, oculto) |
| **Mapa simbólico** | Pins dos principais bairros para orientação geográfica |
| **Guia por Regiões** | Abas com Centro, Zona Sul, Zona Oeste e Zona Norte |
| **Guia de Bairros** | Accordions com dicas detalhadas por bairro |
| **Eventos por Época** | Carnaval, Virada Cultural, SPFW e outros eventos da cidade |
| **Estações do Ano** | Como SP se comporta em cada época e o que fazer |
| **Dicas Práticas** | Transporte, segurança, orçamento, vocabulário paulistano |
| **Vocabulário Paulista** | Glossário com gírias e expressões locais |
- **Estilos Premium (CSS)**: Adicionamos um design glassmorphic escuro moderno para o modal. Ele possui gradiente suave, sombras brilhantes vermelhas, animações dinâmicas de slide-in para cada passo e adaptação total a dispositivos móveis (100% responsivo).
- **Estrutura HTML do Modal**: Criamos um modal com uma barra de progresso no topo, botões de Voltar/Continuar intuitivos, e um questionário multi-passo (5 etapas):
  1. *Acompanhante*: Solo, Casal, Amigos ou Família.
  2. *Vibes*: Parques/Ar Livre, Cultura/História, Gastronomia, Vida Noturna/Música. (Seleção múltipla)
  3. *Orçamento*: Econômico, Moderado ou Premium.
  4. *Períodos*: Dia, Noite ou Ambos. (Seleção múltipla)
  5. *Duração*: 1 Dia, 2 Dias ou 3 Dias.
- **Renderização Visual Premium (Imagens dos Lugares)**:
  - Mapeamos e integramos o novo diretório de fotos `image/` diretamente ao array global `places` no arquivo `index.html`.
  - Substituímos as cores sólidas antigas das capas dos cards por imagens reais de alta definição correspondentes a cada local (ex: MASP, Beco do Batman, Liberdade, Mercadão, etc.).
  - Adicionamos uma sobreposição de gradiente linear translúcido (`rgba(0,0,0,0.15)` a `rgba(0,0,0,0.55)`) para garantir excelente legibilidade dos textos e selos.
  - Implementamos um badge de ícone com efeito **glassmorphic** suspenso (fundo semi-transparente desfocado com bordas sutis brilhantes) para um visual moderno e sofisticado.
- **Lógica e Inteligência (JavaScript)**:
  - **Algoritmo de Match e Relevância**: O JavaScript calcula dinamicamente uma pontuação para cada local cadastrado no array global `places`. Ele pontua com base na compatibilidade com o tipo de acompanhante (+35 pts), orçamento (+30 pts, com penalidades severas para locais de luxo em orçamentos econômicos), períodos (+20 pts) e número de vibes compatíveis (+15 pts por match).
  - **Roteirização com Otimização Logística (Geográfica)**: Para poupar o usuário do trânsito caótico de São Paulo, o JavaScript analisa se as atrações do dia compartilham a mesma região (ex: Avenida Paulista, Centro, Pinheiros ou Vila Madalena). Se sim, ele as agrupa no mesmo dia e exibe um alerta de otimização geográfica: *"⚡ Logística Otimizada: Ambos os passeios deste dia ficam na mesma região! Você economizará tempo de trânsito!"*
  - **Itinerário Visual e Conexão Supabase**: Renderiza o itinerário estruturado por dia e turno, mostra a porcentagem média de "Match" do roteiro criado e envia automaticamente os dados em background para o Supabase via `/api/form`, exibindo um feedback visual de sucesso de salvamento na tela.

---

## ✦ Como rodar

Não precisa instalar nada.

```bash
# Clone ou baixe o repositório
git clone https://github.com/seu-usuario/sp-descubra.git

# Abra o arquivo no navegador
open index.html
```

Ou simplesmente **arraste o `index.html` para o navegador**.

---

## ✦ Como usar os filtros

Na seção **Lugares**, você pode combinar os filtros:

- **Quem vai?** — Família, casal, amigos ou sozinho
- **Quando?** — Dia ou noite
- **Preço** — Grátis, barato ($), médio ($$) ou premium ($$$)
- **Vibe** — Ativar "Modo Calmo" para lugares mais tranquilos

Os cards se atualizam em tempo real conforme você seleciona.

---

## ✦ Estrutura do arquivo

Todo o projeto vive em um único arquivo:

```
index.html
├── <style>         → Todo o CSS (variáveis, layout, componentes, responsivo)
├── <body>          → HTML de todas as seções
└── <script>        → Dados (lugares e roteiros) + lógica de filtros e interação
```

Os dados dos lugares e roteiros ficam nos arrays `places[]` e `roteiros[]` no JavaScript — fácil de editar para adicionar novos locais.

---

## ✦ Tecnologias usadas

- **HTML5 + CSS3 + JavaScript** — sem frameworks, sem build tools
- **Google Fonts** — Barlow Condensed (títulos) e Outfit (corpo)
- **CSS Grid & Flexbox** — layout responsivo
- **CSS Custom Properties** — sistema de cores com variáveis (`--red`, `--cream`, `--black`...)
- **Animações puras em CSS** — marquee, scroll cue, hover states

---

## ✦ Personalização

Para adicionar um lugar novo, basta incluir um objeto no array `places` no final do arquivo:

```javascript
{
  id: 13,
  title: 'Nome do Lugar',
  cat: 'Categoria',
  desc: 'Descrição curta e objetiva.',
  quem: ['amigos', 'casal'],       // familia | amigos | casal | sozinho
  hora: ['dia'],                    // dia | noite
  preco: 'barato',                  // gratis | barato | medio | premium
  vibe: 'calmo',                    // calmo | null
  badge: 'Novo',                    // texto do selo ou null
  tags: ['Tag1', 'Tag2'],
  color: '#0a1a2a',                 // cor de fundo do card
  icon: '🏛️'
}
```

---

## ✦ Responsividade

O site se adapta para telas menores de 900px: navegação simplificada, grid de cards em coluna única, seções empilhadas verticalmente.

---

## ✦ Licença

Projeto de uso livre. Sinta-se à vontade para adaptar para outras cidades. 🏙️
