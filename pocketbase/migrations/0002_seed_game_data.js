migrate(
  (app) => {
    try {
      app.findFirstRecordByData('cases', 'title', 'Homicídio na Rua das Acácias')
      return
    } catch (_) {}

    const c = app.findCollectionByNameOrId('cases')
    const e = app.findCollectionByNameOrId('evidence')
    const s = app.findCollectionByNameOrId('suspects')
    const t = app.findCollectionByNameOrId('testimonies')
    const a = app.findCollectionByNameOrId('activity_logs')

    const cases = [
      [
        'Homicídio na Rua das Acácias',
        'Corpo encontrado em residência abandonada.',
        'em_andamento',
        'alta',
        'Rua das Acácias, 145',
        '2026-07-28T22:30:00Z',
      ],
      [
        'Furto na Galeria Municipal',
        'Três pinturas valiosas furtadas.',
        'em_andamento',
        'media',
        'Av. Brasil, 500',
        '2026-08-01T03:15:00Z',
      ],
      [
        'Desaparecimento - Maria Silva',
        'Jovem desaparecida após o trabalho.',
        'em_andamento',
        'critica',
        'Jardim Primavera',
        '2026-08-03T19:00:00Z',
      ],
      [
        'Fraude TechCorp Ltda',
        'Desvio de R$ 2.5 milhões.',
        'resolvido',
        'alta',
        'Centro Empresarial Norte',
        '2026-06-15T00:00:00Z',
      ],
    ]
    const cIds = []
    for (const d of cases) {
      const r = new Record(c)
      r.set('title', d[0])
      r.set('description', d[1])
      r.set('status', d[2])
      r.set('priority', d[3])
      r.set('location', d[4])
      r.set('occurred_at', d[5])
      app.save(r)
      cIds.push(r.id)
    }

    const evidence = [
      [0, 'Faca serrilhada', 'Arma', 'Lâmina 15cm com sangue.', '2026-07-29T10:00:00Z'],
      [0, 'Impressões digitais', 'Biometria', 'Marcas na maçaneta.', '2026-07-29T11:30:00Z'],
      [1, 'Gravação CCTV', 'Vídeo', 'Dois suspeitos encapuzados.', '2026-08-01T06:00:00Z'],
      [2, 'Veículo abandonado', 'Objeto', 'Honda Civic prata.', '2026-08-04T08:00:00Z'],
      [2, 'Registro telefônico', 'Digital', 'Última chamada 19:12.', '2026-08-04T09:00:00Z'],
    ]
    for (const d of evidence) {
      const r = new Record(e)
      r.set('case_id', cIds[d[0]])
      r.set('name', d[1])
      r.set('type', d[2])
      r.set('description', d[3])
      r.set('collected_at', d[4])
      app.save(r)
    }

    const suspects = [
      ['Ricardo Almeida', 'O Lobo', 'sob_vigilancia', 'alto', 'Ex-namorado da vítima.'],
      ['Fernando Costa', 'Fantasma', 'livre', 'extremo', 'Especialista em segurança.'],
      ['Ana Paula Ribeiro', 'Sombra', 'detido', 'medio', 'Motorista do veículo suspeito.'],
      ['Marcos Vieira', 'Contador', 'inocentado', 'baixo', 'Cooperação total com a investigação.'],
    ]
    for (const d of suspects) {
      const r = new Record(s)
      r.set('name', d[0])
      r.set('alias', d[1])
      r.set('status', d[2])
      r.set('threat_level', d[3])
      r.set('description', d[4])
      app.save(r)
    }

    const testimonies = [
      [
        0,
        'João Pereira',
        'Ouvi gritos por volta das 22h. Vi uma pessoa sair correndo.',
        '2026-07-29T14:00:00Z',
      ],
      [
        1,
        'Carlos Santos',
        'Vi um furgão escuro estacionado às 2h da manhã.',
        '2026-08-01T15:00:00Z',
      ],
      [
        2,
        'Patrícia Lima',
        'Maria saiu às 19h como sempre, parecia normal.',
        '2026-08-04T11:00:00Z',
      ],
    ]
    for (const d of testimonies) {
      const r = new Record(t)
      r.set('case_id', cIds[d[0]])
      r.set('witness_name', d[1])
      r.set('statement', d[2])
      r.set('recorded_at', d[3])
      app.save(r)
    }

    const activities = [
      ['Evidência coletada', 'Faca serrilhada adicionada ao Caso #1'],
      ['Suspeito identificado', 'Ricardo Almeida em vigilância'],
      ['Depoimento registrado', 'João Pereira - Caso #1'],
      ['Caso atualizado', 'Caso #3 prioridade elevada para crítica'],
      ['Conexão estabelecida', 'Ana Paula Ribeiro ligada ao Caso #3'],
    ]
    for (const d of activities) {
      const r = new Record(a)
      r.set('action', d[0])
      r.set('description', d[1])
      app.save(r)
    }
  },
  (app) => {
    const names = ['activity_logs', 'testimonies', 'suspects', 'evidence', 'cases']
    for (const name of names) {
      try {
        app.truncateCollection(app.findCollectionByNameOrId(name))
      } catch (_) {}
    }
  },
)
