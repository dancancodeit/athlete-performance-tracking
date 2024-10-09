import { Hono } from 'hono';
import dotenv from 'dotenv';
import { serve } from '@hono/node-server'
// import { logger } from 'hono/logger'
import { createMiddleware } from 'hono/factory'

const logger = createMiddleware(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})
import {
    createAthlete,
    getAllAthletes,
    getAthleteById,
    updateAthlete,
    deleteAthlete,
  } from './controllers/athleteController';
import { addMetric, getMetrics } from './controllers/metricController';


dotenv.config();

const app = new Hono();

// Athlete Routes
app.post('/athletes', createAthlete);
app.get('/athletes', getAllAthletes);
app.get('/athletes/:id', getAthleteById);
app.put('/athletes/:id', updateAthlete);
app.delete('/athletes/:id', deleteAthlete);

// Metric Routes
app.post('/athletes/:id/metrics', addMetric);
app.get('/athletes/:id/metrics', getMetrics);

app.get('/', (c) => c.text('Athlete Performance API'));

app.use(logger);


serve({
  fetch: app.fetch,
  port: 4000,
})
