import { PrismaClient } from '@prisma/client';

// Usamos a configuração que você definiu no defineConfig automaticamente
const prisma = new PrismaClient();

async function main() {
  const senhaPadrao = 'cda123';
  console.log('🌱 Iniciando seed no Supabase (Ambiente 2026)...');

  try {
    // 1. LIMPEZA BRUTA COM SQL (Necessário para evitar erros de Foreign Key P2003)
    console.log('🧹 Limpando tabelas existentes...');
    const tabelas = ['ciclo_desempenho', 'colaborador', 'usuario', 'perfil'];
    
    for (const tabela of tabelas) {
      // Usamos TRUNCATE CASCADE para limpar tudo sem travar nas chaves estrangeiras
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tabela}" RESTART IDENTITY CASCADE;`);
    }

    console.log('✅ Banco limpo.');

    // 2. CRIAÇÃO DOS DADOS (Seguindo a hierarquia de dependência)
    console.log('🏗️ Criando Perfil...');
    const perfilAdmin = await prisma.perfil.create({
      data: { 
        nome: 'ADMIN', 
        descricao: 'Administrador do Sistema' 
      }
    });

    console.log('👤 Criando Usuário Administrador...');
    // Usamos 'connect' para que o Prisma resolva se a coluna é perfil_id ou perfilId
    const admin = await prisma.usuario.create({
      data: {
        nome: 'Administrador CDA',
        email: 'admin@cda.com',
        senha: senhaPadrao,
        firebase_uid: 'uid-admin-teste',
        perfil: {
          connect: { id: perfilAdmin.id }
        }
      }
    });

    console.log('📅 Criando Ciclo de Desempenho 2026...');
    await prisma.ciclo_desempenho.create({
      data: {
        nome: 'Ciclo Anual 2026',
        data_inicio: new Date('2026-01-01T00:00:00Z'),
        data_fim: new Date('2026-12-31T23:59:59Z'),
        criado_por: admin.id,
        descricao: 'Configuração inicial de backend'
      }
    });

    console.log('🚀 SEED FINALIZADO COM SUCESSO!');

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();