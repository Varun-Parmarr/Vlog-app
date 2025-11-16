
const zod = require('zod');

const createVlog = zod.object({
  title: zod.string(),
  content: zod.string().min(2),
  imageURL:zod.string().url(),
  type:zod.enum(['movie','series','anime'])
});

module.exports = { createVlog };