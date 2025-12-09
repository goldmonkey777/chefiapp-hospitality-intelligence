import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qmuanfwwrkozpgziekzh.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY não definida!')
  console.error('Execute: export SUPABASE_SERVICE_ROLE_KEY="sua_key_aqui"')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const COMPANY_ID = '671cac91-9f56-45ca-9812-99e8cd8369ac' // Resort Paradise
const PASSWORD = 'Chef1234!'

const users = [
  { email: 'owner@sofiagastrobaribiza.com', role: 'OWNER', name: 'Sofia Owner' },
  { email: 'waiter@sofiagastrobaribiza.com', role: 'WAITER', name: 'Sofia Waiter' },
  { email: 'kitchen@sofiagastrobaribiza.com', role: 'KITCHEN', name: 'Sofia Kitchen' }
]

async function createUsers() {
  console.log('🚀 ChefIApp OS - Criação de Usuários de Teste')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`🔑 Usando service_role_key para Admin API`)
  console.log(`📍 Company: Resort Paradise (${COMPANY_ID})`)
  console.log(`🔒 Senha padrão: ${PASSWORD}\n`)

  for (const user of users) {
    console.log(`➡️  Criando ${user.email} (${user.role})...`)
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: {
        name: user.name,
        company_id: COMPANY_ID,
        role: user.role
      }
    })

    if (error) {
      console.error(`❌ Erro ao criar ${user.email}:`, error.message)
      console.error('   Detalhes:', JSON.stringify(error, null, 2))
    } else {
      console.log(`✅ ${user.email} criado com sucesso!`)
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Profile será criado automaticamente pelo trigger\n`)
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎉 Processo concluído!')
  console.log('\n📋 Próximos passos:')
  console.log('   1. Verifique os usuários em: Supabase → Authentication → Users')
  console.log('   2. Verifique os profiles em: Supabase → Table Editor → profiles')
  console.log('   3. Teste o login no app com as credenciais acima\n')
}

createUsers().catch(err => {
  console.error('💥 Erro fatal:', err)
  process.exit(1)
})
