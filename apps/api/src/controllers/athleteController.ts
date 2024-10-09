import { PrismaClient } from '@prisma/client';
import { Context } from 'hono';

const prisma = new PrismaClient();

// Create Athlete
export const createAthlete = async (c: Context) => {
  const { name, age, team } = await c.req.json();
  const newAthlete = await prisma.athlete.create({
    data: { name, age, team },
  });
  return c.json(newAthlete);
};

// Get All Athletes
export const getAllAthletes = async (c: Context) => {
  const athletes = await prisma.athlete.findMany();
  return c.json(athletes);
};

// Get Athlete by ID
export const getAthleteById = async (c: Context) => {
  const id = c.req.param('id');
  const athlete = await prisma.athlete.findUnique({
    where: { id },
    include: { metrics: true },
  });
  if (!athlete) return c.text('Athlete not found', 404);
  return c.json(athlete);
};

// Update Athlete
export const updateAthlete = async (c: Context) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const updatedAthlete = await prisma.athlete.update({
    where: { id },
    data: body,
  });
  return c.json(updatedAthlete);
};

// Delete Athlete
export const deleteAthlete = async (c: Context) => {
  const id = c.req.param('id');
  await prisma.performanceMetric.deleteMany({ where: { athleteId: id } });
  await prisma.athlete.delete({ where: { id } });
  return c.text('Athlete deleted');
};
