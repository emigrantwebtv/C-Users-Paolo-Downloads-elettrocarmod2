import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users_new = pgTable("users_new", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const photos_new = pgTable("photos_new", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const videos_new = pgTable("videos_new", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users_new).pick({
  username: true,
  password: true,
});

export const insertPhotoSchema = createInsertSchema(photos_new).pick({
  filename: true,
  originalName: true,
  uploadedAt: true,
});

export const insertVideoSchema = createInsertSchema(videos_new).pick({
  filename: true,
  originalName: true,
  uploadedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users_new.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos_new.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos_new.$inferSelect;
