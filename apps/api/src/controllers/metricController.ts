import { PrismaClient } from '@prisma/client';
import { Context } from 'hono';

const prisma = new PrismaClient();

// Add Performance Metric
export const addMetric = async (c: Context) => {
  const id = c.req.param('id');
  const { type, value, unit } = await c.req.json();

  console.log(c.req.json());
  console.log(id);
  const newMetric = await prisma.performanceMetric.create({
    data: {
      athleteId: id,
      metricType: type,
      value,
      unit,
    },
  });
  return c.json(newMetric);
};

// Get Metrics for an Athlete (Optional Filter by Type)
export const getMetrics = async (c: Context) => {
  const id = c.req.param('id');
  const metricType = c.req.query('metricType');

  const metrics = await prisma.performanceMetric.findMany({
    where: {
      athleteId: id,
      ...(metricType ? { metricType } : {}),
    },
  });

  return c.json(metrics);
};
