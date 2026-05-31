/**
 * Fallback global para avatar
 * Usado quando o sistema está offline ou a imagem do ERP falha
 */
export const FALLBACK_IMAGE =
  'https://ui-avatars.com/api/?background=EEF2FF&color=6366F1&bold=true&size=256';

/**
 * Gera avatar via UI Avatars a partir do nome
 * Centraliza a lógica para qualquer colaborador
 */
export const getAvatarByName = (name: string): string => {
  if (!name?.trim()) {
    return FALLBACK_IMAGE;
  }

  const params = new URLSearchParams({
    name,
    background: '6366F1',
    color: 'ffffff',
    bold: 'true',
    size: '256',
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
};

/**
 * Exemplo específico conforme documentação (Ana García Fernández)
 * ⚠️ Use apenas para mock ou demo
 */
export const getAnaGarciaAvatar = (): string => {
  return getAvatarByName('Ana Garcia Fernandez');
};
