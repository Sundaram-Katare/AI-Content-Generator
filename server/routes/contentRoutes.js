import express from 'express';
const router = express.Router();

import { generateContent, getContents } from '../controllers/contentController.js'; // ❗ Include .js extension

router.post('/generate', generateContent);
router.get('/', getContents);

export default router;
