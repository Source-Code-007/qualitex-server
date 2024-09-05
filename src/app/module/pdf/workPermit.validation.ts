import { z } from "zod";

// Zod validation schema for work permit creation
const createWorkPermitZodValidation = z.object({
  lubaNr: z.string(),
  tootajaTeave: z.object({
    nimi: z.string(),
    isaNimi: z.string(),
    emainimi: z.string(),
    sunnipaev: z.string(),
    passiNumber: z.string(),
    pusivAadress: z.string(),
    ePost: z.string(),
  }),
  tooandmiseDetailid: z.object({
    ametikoht: z.string(),
    tooKirjeldus: z.string(),
    contractStartDate: z.string(),
    contractEndDate: z.string(),
    palkJaKasu: z.object({
      kuuPalk: z.string(),
    }),
  }),
  tooloaDetailid: z.object({
    workPermitStartDate: z.string(),
    workPermitEndDate: z.string(),
  }),
});

// Zod validation schema for work permit updates (all fields are optional)
const updateWorkPermitZodValidation = z.object({
  lubaNr: z.string().optional(),
  tootajaTeave: z.object({
    nimi: z.string().optional(),
    isaNimi: z.string().optional(),
    emainimi: z.string().optional(),
    sunnipaev: z.string().optional(),
    passiNumber: z.string().optional(),
    pusivAadress: z.string().optional(),
    ePost: z.string().optional(),
  }).optional(),
  tooandmiseDetailid: z.object({
    ametikoht: z.string().optional(),
    tooKirjeldus: z.string().optional(),
    contractStartDate: z.string().optional(),
    contractEndDate: z.string().optional(),
    palkJaKasu: z.object({
      kuuPalk: z.string().optional(),
    }).optional(),
  }).optional(),
  tooloaDetailid: z.object({
    workPermitStartDate: z.string().optional(),
    workPermitEndDate: z.string().optional(),
  }).optional(),
});

// Exporting the validations
export const workPermitZodValidation = {
  createWorkPermitZodValidation,
  updateWorkPermitZodValidation,
};
