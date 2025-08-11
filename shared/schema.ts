import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPhotoSchema = createInsertSchema(photos).pick({
  filename: true,
  originalName: true,
  uploadedAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).pick({
  filename: true,
  originalName: true,
  uploadedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
