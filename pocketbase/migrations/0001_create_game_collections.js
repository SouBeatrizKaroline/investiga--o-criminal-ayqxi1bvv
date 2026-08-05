migrate(
  (app) => {
    const cases = new Collection({
      name: 'cases',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['aberto', 'em_andamento', 'resolvido', 'arquivado'],
          maxSelect: 1,
        },
        {
          name: 'priority',
          type: 'select',
          required: true,
          values: ['baixa', 'media', 'alta', 'critica'],
          maxSelect: 1,
        },
        { name: 'location', type: 'text' },
        { name: 'occurred_at', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_cases_status ON cases (status)'],
    })
    app.save(cases)

    const casesId = app.findCollectionByNameOrId('cases').id

    const evidence = new Collection({
      name: 'evidence',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'case_id', type: 'relation', required: true, collectionId: casesId, maxSelect: 1 },
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'collected_at', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_evidence_case ON evidence (case_id)'],
    })
    app.save(evidence)

    const suspects = new Collection({
      name: 'suspects',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'alias', type: 'text' },
        {
          name: 'status',
          type: 'select',
          required: false,
          values: ['livre', 'sob_vigilancia', 'detido', 'inocentado'],
          maxSelect: 1,
        },
        {
          name: 'threat_level',
          type: 'select',
          required: false,
          values: ['baixo', 'medio', 'alto', 'extremo'],
          maxSelect: 1,
        },
        { name: 'description', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(suspects)

    const testimonies = new Collection({
      name: 'testimonies',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'case_id', type: 'relation', required: true, collectionId: casesId, maxSelect: 1 },
        { name: 'witness_name', type: 'text', required: true },
        { name: 'statement', type: 'text' },
        { name: 'recorded_at', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_testimonies_case ON testimonies (case_id)'],
    })
    app.save(testimonies)

    const activityLogs = new Collection({
      name: 'activity_logs',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'action', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_activity_created ON activity_logs (created DESC)'],
    })
    app.save(activityLogs)
  },
  (app) => {
    const names = ['activity_logs', 'testimonies', 'suspects', 'evidence', 'cases']
    for (const name of names) {
      try {
        app.delete(app.findCollectionByNameOrId(name))
      } catch (_) {}
    }
  },
)
