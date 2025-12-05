# 🏗️ ChefIApp™ — Arquitetura Oficial

**Especificação Definitiva e Obrigatória**

Esta documentação define a arquitetura oficial do ChefIApp™ e deve ser seguida por qualquer automação, assistente técnico, pipeline ou ferramenta de desenvolvimento.

**Versão**: 1.0.0  
**Última Atualização**: 04 de dezembro de 2025  
**From Ibiza with Love** — by goldmonkey.studio

---

## 📋 Índice

1. [Estrutura do GitHub](#estrutura-do-github)
2. [Deploy da Landing Page](#deploy-da-landing-page)
3. [Supabase — Regras Oficiais](#supabase--regras-oficiais)
4. [Estrutura da Landing Page](#estrutura-da-landing-page)
5. [Animações e UI](#animações-e-ui)
6. [Objetivo](#objetivo)

---

## 1. Estrutura do GitHub

### Repositórios Oficiais

O ChefIApp™ possui **DOIS repositórios separados e independentes**:

#### 1.1. chefiapp-app

**URL**: https://github.com/goldmonkey777/chefiapp-app

**Descrição**: Código do aplicativo ChefIApp™

**Stack Tecnológica**:
- React 19.2.0
- Vite 6.2.0
- Capacitor 7.4.4 (iOS + Android)
- Supabase 2.86.0
- Zustand 5.0.8
- TailwindCSS 4.1.17
- TypeScript 5.8.2

**Propósito**:
- Aplicativo usado por funcionários, gerentes e donos de estabelecimentos
- Contém autenticação, dashboards, gamificação, tarefas, check-in/checkout
- Deploy: iOS App Store + Google Play Store

**Este repositório é EXCLUSIVO do app móvel.**

---

#### 1.2. chefiapp-site

**URL**: https://github.com/goldmonkey777/chefiapp-site

**Descrição**: Código da página web oficial do ChefIApp™

**Stack Tecnológica**:
- React + Vite
- TailwindCSS v4
- Supabase client (apenas para leads)
- Framer Motion

**Propósito**:
- Landing page institucional para chefiapp.com
- Marketing, captação de leads e SEO
- Deploy: Vercel

**Este repositório NÃO deve conter código do app.**

---

### ⚠️ Regra Crítica

**NUNCA misturar código entre os repositórios.**

Cada repositório tem um propósito específico e deve permanecer independente.

---

## 2. Deploy da Landing Page

### Plataforma: Vercel

O repositório `chefiapp-site` será deployado na **Vercel**.

### Configuração Obrigatória

**Domínio Principal**:
- https://chefiapp.com

**Branch Principal**:
- `main`

**Build Settings**:
```bash
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Variáveis de Ambiente na Vercel**:
```bash
VITE_SUPABASE_URL=<URL do Supabase do ChefIApp>
VITE_SUPABASE_ANON_KEY=<Anon Key do mesmo Supabase>
```

**Requisitos**:
- A landing deve funcionar 100% independente do app
- Usar o mesmo Supabase do app apenas para gravar leads

---

## 3. Supabase — Regras Oficiais

### ⚠️ IMPORTANTE: Um Único Projeto Supabase

**O ChefIApp usa APENAS UM projeto Supabase** (o mesmo backend do app).

**NÃO criar um segundo projeto Supabase.**

---

### 3.1. Tabela de Leads para Marketing

Criar tabela específica para captação de leads da landing page:

```sql
-- Tabela para leads da landing page
CREATE TABLE marketing_leads_restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_name text NOT NULL,
  business_type text NOT NULL,
  city_country text NOT NULL,
  employee_count text NOT NULL,
  contact text NOT NULL,
  main_pain_point text,
  source text DEFAULT 'landing-chefiapp.com',
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE marketing_leads_restaurants ENABLE ROW LEVEL SECURITY;

-- Política: Anon pode inserir leads
CREATE POLICY "Anon can insert leads"
ON marketing_leads_restaurants
FOR INSERT
TO anon
WITH CHECK (true);
```

---

### 3.2. Separação de Responsabilidades

**App (chefiapp-app)**:
- Acessa todas as tabelas do Supabase (users, companies, tasks, etc.)
- NÃO deve acessar a tabela `marketing_leads_restaurants`

**Landing (chefiapp-site)**:
- Acessa APENAS a tabela `marketing_leads_restaurants`
- Faz apenas INSERT nesta tabela
- NÃO acessa as demais tabelas do app

---

## 4. Estrutura da Landing Page

A página `chefiapp-site` deve incluir:

### Seções Obrigatórias

1. **Hero Completo**
   - CTA principal destacado
   - Título impactante
   - Subtítulo explicativo
   - Imagem/vídeo do produto

2. **Como Funciona**
   - 3-4 passos visuais
   - Explicação simples do fluxo

3. **Funcionalidades**
   - Cards com principais features
   - Ícones modernos
   - Hover effects

4. **Para Quem É**
   - Restaurantes
   - Bares
   - Hotéis
   - Buffets

5. **Early Access**
   - Formulário funcional conectado ao Supabase
   - Campos: Nome do Restaurante, Tipo de Negócio, Cidade/País, Nº Funcionários, Contato
   - Validação de campos

6. **Roadmap**
   - MVP Atual
   - Futuras Features

7. **Founder**
   - História pessoal
   - "From Ibiza with Love"

8. **Footer Profissional**
   ```
   © 2025 ChefIApp™ by goldmonkey.studio
   Operado por Goldmonkey Studio LLC (Wyoming, USA)
   Base operacional em Ibiza, Espanha
   Links: Privacy | Terms | Contact
   ```

### Páginas Legais

Criar arquivos:
- `/public/legal/privacy.html`
- `/public/legal/terms.html`

---

## 5. Animações e UI

### Biblioteca Obrigatória
- **Framer Motion** para animações

### Especificações de UX

**Animações**:
- Entrada suave nos blocos (fade + slide)
- Hover motion nos cards de funcionalidades
- Scroll suave entre seções

**Layout**:
- Design mobile-first
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

**Estilo Visual**:
- Design SaaS premium estilo Silicon Valley
- Cores consistentes com brand do ChefIApp
- Tipografia legível e moderna

---

## 6. Objetivo

Construir uma landing profissional que:

### Objetivos Primários
1. ✅ Captar restaurantes, bares, hotéis e buffets
2. ✅ Entregar credibilidade
3. ✅ Explicar o MVP atual
4. ✅ Mostrar o futuro do ChefIApp™
5. ✅ Permitir inscrição no Early Access
6. ✅ Servir como página oficial para Apple Store e Google Play

### Métricas de Sucesso
- Conversão de visitantes em leads
- Taxa de preenchimento do formulário
- Tempo médio na página
- Taxa de rejeição

---

## 🔒 Princípios Inegociáveis

1. **Separação Absoluta**: App e Site são projetos independentes
2. **Um Supabase**: Ambos usam o mesmo backend
3. **Domínio Oficial**: chefiapp.com para landing
4. **Deploy Vercel**: Exclusivo para landing
5. **From Ibiza with Love**: Assinatura obrigatória

---

## 📞 Suporte

**Desenvolvido por**: goldmonkey.studio  
**Base Operacional**: Ibiza, Espanha  
**Entidade Legal**: Goldmonkey Studio LLC (Wyoming, USA)

---

**Esta especificação é definitiva e deve ser respeitada por todas as automações e ferramentas.**

**From Ibiza with Love ❤️**
