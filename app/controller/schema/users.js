'use strict';

const id = {
  type: 'string',
};

const mail = {
  type: 'string',
  pattern: '^([a-za-z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9\\._-]+)*$',
};

const {
  CLIENT_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
} = require('./common/error.js');

module.exports = {
  REGISTOR_SCHEMA: {
    schema: {
      tags: ['user'],
      description: 'The user to create.',
      body: {
        type: 'object',
        required: ['id', 'user'],
        properties: {
          id,
          user: {
            type: 'object',
            required: ['mail', 'name'],
            properties: {
              mail,
              name: { type: 'string' }
            }
          }
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              id,
              user: {
                type: 'object',
                properties: {
                  mail,
                  name: { type: 'string' }
                }
              }
            }
          },
          '4xx': CLIENT_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': INTERNAL_SERVER_ERROR_RESPONSE,
        },
      },
    },
  },
  ENTRY_SCHEMA: {
    schema: {
      tags: ['visitor'],
      description: '入室処理',
      body: {
        type: 'object',
        required: ['id', 'purpose'],
        properties: {
          id,
          purpose: { type: 'string' }
        }
      },
      response: {
        '2xx': {
          type: 'object',
          properties: {
            id,
            user: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                isEntry: { type: 'boolean' },
              },
            },
          },
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  UPDATE_SCHEMA: {
    schema: {
      tags: ['user'],
      description: 'Update user info.',
      body: {
        type: 'object',
        required: ['id','user'],
        properties: {
          id,
          user: {
            type: 'object',
            properties: {
              mail,
            }
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id,
            user: {
              type: 'object',
              properties: {
                mail,
              }
            }
          }
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  OUT_SCHEMA: {
    schema: {
      tags: ['visitor'],
      description: '退出処理',
      body: {
        type: 'object',
        required: ['id'],
        properties: {
          id,
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              id,
              user: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  isEntry: {type: 'boolean'}
                }
              }
            }
          },
          '4xx': CLIENT_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': INTERNAL_SERVER_ERROR_RESPONSE,
        },
      },
    },
  },
  USERS_SCHEMA: {
    schema: {
      response: {
        '2xx': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              porpose: { type: 'string' },
              isEntry: { type: 'boolean' },
            },
          },
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
};

