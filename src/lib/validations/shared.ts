import { z } from "zod";

/**
 * Empty form inputs arrive as "" rather than undefined, so optional text and
 * URL fields are normalised to null before they reach Postgres.
 */
export const optionalText = z
  .string()
  .trim()
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .default(null);

export const optionalUrl = z
  .union([z.literal(""), z.url("Must be a valid URL")])
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .default(null);

export const optionalEmail = z
  .union([z.literal(""), z.email("Must be a valid email")])
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .default(null);

export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the YYYY-MM-DD format");

export const optionalIsoDate = z
  .union([z.literal(""), isoDate])
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .default(null);

export const sortOrder = z.coerce.number().int().min(0).default(0);

export const tagList = z.array(z.string().trim().min(1)).default([]);
