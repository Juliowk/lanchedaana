export const config = {
  whatsapp: '558496275652',

  pix: {
    chave: '70010946411',
    // Nome e cidade do recebedor, usados no BR Code (QR code / copia e cola).
    // Devem ser iguais aos do banco: no máximo 25 e 15 caracteres, sem acentos.
    nomeRecebedor: 'ANA KARLA',
    cidade: 'NATAL',
  },

  admin: {
    usuario: 'Ana_Karla',
    // SHA-256 da senha. É apenas um portão de interface: a proteção real é o token do GitHub.
    senhaSha256: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
  },

  github: {
    owner: 'Juliowk',
    repo: 'lanchedaana',
    branch: 'main',
    menuPath: 'public/menu.json',
  },
}
