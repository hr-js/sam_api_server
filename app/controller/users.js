'use strict';
const {
  REGISTOR_SCHEMA,
  UPDATE_SCHEMA,
  ENTRY_SCHEMA,
  OUT_SCHEMA,
  USERS_SCHEMA,
} = require('./schema/users');

const provider = require('../repository');

module.exports = async function(fastify, opt, next) {
  const handler = (response, reply) => {
    if (response.code === 1) {
      reply.code(400).send(response.error);
    }
    reply.send(response);
  };

  fastify.post('/register', REGISTOR_SCHEMA, async (req, reply) => {
    provider.register(req.body).then(response => handler(response, reply));
  });

  fastify.post('/entry', ENTRY_SCHEMA, async (req, reply) => {
    provider.entry(req.body).then(response => handler(response, reply));
  });

  fastify.post('/update', UPDATE_SCHEMA, async (req, reply) => {
    provider.update(req.body).then(response => handler(response, reply));
  });

  fastify.post('/exit', OUT_SCHEMA, async (req, reply) => {
    provider.exit(req.body).then(response => handler(response, reply));
  });

  fastify.get('/users/:date', USERS_SCHEMA, async (req, reply) => {
    provider.findByDate(req.params.date).then(response => {
      reply.send(response);
    });
  });

  next();
};
