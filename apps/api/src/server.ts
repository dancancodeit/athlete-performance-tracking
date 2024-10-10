import { Hono } from 'hono';
import dotenv from 'dotenv';
import { serve } from '@hono/node-server';

import {
  createAthlete,
  getAllAthletes,
  getAthleteById,
  updateAthlete,
  deleteAthlete,
} from './controllers/athleteController';
import { addMetric, getMetrics } from './controllers/metricController';
import { authenticateJWT } from './utils/auth';

dotenv.config();

const app = new Hono();

// Athlete Routes
app.get('/athletes', getAllAthletes);
app.post('/athletes', authenticateJWT, createAthlete);
app.get('/athletes/:id', authenticateJWT, getAthleteById);
app.put('/athletes/:id', authenticateJWT, updateAthlete);
app.delete('/athletes/:id', authenticateJWT, deleteAthlete);

// Metric Routes
app.post('/athletes/:id/metrics', authenticateJWT, addMetric);
app.get('/athletes/:id/metrics', authenticateJWT, getMetrics);

app.get('/', (c) => c.text('Athlete Performance API'));

serve({
  fetch: app.fetch,
  port: 4000,
});
