import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return json({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'object',
    properties: {
      language: {
        type: 'string',
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            java: {
              type: 'string',
            },
            javascript: {
              type: 'string',
            },
          },
          required: ['java', 'javascript'],
          additionalProperties: false,
        },
      },
    },
    required: ['language', 'items'],
    additionalProperties: false,
  });
};
