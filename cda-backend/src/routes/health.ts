import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Healthcheck da API
 */
router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'CDA Backend 2026',
  });
});

export default router;
