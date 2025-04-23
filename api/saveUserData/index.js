
const { app } = require('@azure/functions');

app.http('saveUserData', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`HTTP function processed request for URL "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return {
      body: `Hello, ${name}!`,
    };
  },
});
