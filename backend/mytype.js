
const zod = require('zod');

const createVlog = zod.object({
  title: zod.string().min(5).max(50),
  content: zod.string().min(2),
  authorname: zod.string().min(3).max(30)
});

module.exports = { createVlog };