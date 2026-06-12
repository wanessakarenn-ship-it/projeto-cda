import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const senhaPadrao = 'cda123';
  console.log('🌱 Iniciando seed no Supabase (Ambiente 2026)...');

  try {
    // 1. LIMPEZA BRUTA COM SQL (Necessário para evitar erros de Foreign Key P2003)
    console.log('🧹 Limpando tabelas existentes...');
    const tabelas = [
      'ciclo_desempenho',
      'colaborador',
      'usuario',
      'perfil',
      'cargo',
      'ciclo_colaborador',
      'competencia',
      'meta',
      'avaliacao',
      'pontuacao',
      'nine_box',
      'plano_carreira',
      'colaborador_trilha'
    ];
    
    for (const tabela of tabelas) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tabela}" RESTART IDENTITY CASCADE;`);
    }

    console.log('✅ Banco limpo.');

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senhaPadrao, 10);

    // 2. CRIAÇÃO DOS DADOS (Seguindo a hierarquia de dependência)
    console.log('🏗️ Criando Perfis...');
    const perfilAdmin = await prisma.perfil.create({
      data: { nome: 'ADMIN', descricao: 'Administrador do Sistema' }
    });
    const perfilGestor = await prisma.perfil.create({
      data: { nome: 'GESTOR', descricao: 'Gestor da Equipe' }
    });
    const perfilColaborador = await prisma.perfil.create({
      data: { nome: 'COLABORADOR', descricao: 'Colaborador da Equipe' }
    });

    console.log('💼 Criando Cargos...');
    const cargoGestor = await prisma.cargo.create({
      data: { titulo: 'Gerente de Tecnologia', descricao: 'Gestor da equipe de tecnologia' }
    });
    const cargoColab = await prisma.cargo.create({
      data: { titulo: 'Desenvolvedor Software', descricao: 'Desenvolvedor da equipe de tecnologia' }
    });

    console.log('👤 Criando Usuários de Teste...');
    // 1. Admin
    const admin = await prisma.usuario.create({
      data: {
        nome: 'Administrador CDA',
        email: 'admin@cda.com',
        senha: senhaHash,
        firebase_uid: 'uid-admin-teste',
        perfil: { connect: { id: perfilAdmin.id } }
      }
    });

    // 2. Gestor
    const gestorUser = await prisma.usuario.create({
      data: {
        nome: 'Gestor CDA',
        email: 'gestor@cda.com',
        senha: senhaHash,
        firebase_uid: 'uid-gestor-teste',
        perfil: { connect: { id: perfilGestor.id } }
      }
    });

    // 3. Colaborador
    const colabUser = await prisma.usuario.create({
      data: {
        nome: 'Colaborador CDA',
        email: 'colaborador@cda.com',
        senha: senhaHash,
        firebase_uid: 'uid-colab-teste',
        perfil: { connect: { id: perfilColaborador.id } }
      }
    });

    console.log('👥 Criando Colaboradores...');
    // 1. Gestor Colaborador
    const gestorColab = await prisma.colaborador.create({
      data: {
        nome: 'Gestor CDA',
        matricula: 'M-GESTOR',
        cargo: { connect: { id: cargoGestor.id } },
        usuario: { connect: { id: gestorUser.id } }
      }
    });

    // 2. Colaborador
    const colabColab = await prisma.colaborador.create({
      data: {
        nome: 'Colaborador CDA',
        matricula: 'M-COLAB',
        cargo: { connect: { id: cargoColab.id } },
        usuario: { connect: { id: colabUser.id } },
        gestor: { connect: { id: gestorColab.id } }
      }
    });

    console.log('📅 Criando Ciclo de Desempenho 2026...');
    const ciclo = await prisma.ciclo_desempenho.create({
      data: {
        nome: 'Ciclo Anual 2026',
        data_inicio: new Date('2026-01-01T00:00:00Z'),
        data_fim: new Date('2026-12-31T23:59:59Z'),
        criado_por: admin.id,
        descricao: 'Configuração inicial de backend'
      }
    });

    console.log('🔗 Associando Colaboradores ao Ciclo...');
    await prisma.ciclo_colaborador.create({
      data: {
        ciclo_id: ciclo.id,
        colaborador_id: gestorColab.id
      }
    });
    await prisma.ciclo_colaborador.create({
      data: {
        ciclo_id: ciclo.id,
        colaborador_id: colabColab.id
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