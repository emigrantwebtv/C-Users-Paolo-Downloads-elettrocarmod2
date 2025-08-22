import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoSchema, insertVideoSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads - use persistent directory
const uploadDir = path.join(process.cwd(), 'attached_assets', 'gallery_uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo immagini sono consentite!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadVideo = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|mov|avi|wmv|flv|webm|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo video sono consentiti!'));
    }
  },
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for videos
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically with no-cache headers for mobile compatibility
  app.use('/uploads', express.static(uploadDir, {
    setHeaders: (res, path) => {
      // Disable caching for all uploaded images to ensure mobile browsers show latest content
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }));
  
  // Serve attached assets statically
  const attachedAssetsDir = path.join(process.cwd(), 'attached_assets');
  app.use('/attached_assets', express.static(attachedAssetsDir));

  // Placeholder image endpoint
  app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
              font-family="Arial, sans-serif" font-size="20" fill="#666">
          ${width}x${height}
        </text>
      </svg>
    `;
    res.set('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  // Get all photos
  app.get("/api/photos", async (req, res) => {
    try {
      // Add no-cache headers for API responses
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const photos = await storage.getAllPhotos();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recuperare le foto" });
    }
  });

  // Upload photo with password protection
  app.post("/api/photos/upload", upload.single('photo'), async (req, res) => {
    try {
      const password = req.body.password;
      if (password !== "segreta") {
        return res.status(401).json({ error: "Password non corretta" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Nessun file caricato" });
      }

      const photoData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        uploadedAt: new Date().toISOString(),
      };

      const result = insertPhotoSchema.safeParse(photoData);
      if (!result.success) {
        return res.status(400).json({ error: "Dati non validi" });
      }

      const photo = await storage.createPhoto(result.data);
      res.json(photo);
    } catch (error) {
      res.status(500).json({ error: "Errore nel caricare la foto" });
    }
  });

  // Delete photo with password protection
  app.delete("/api/photos/:id", async (req, res) => {
    try {
      const password = req.body.password;
      if (password !== "segreta") {
        return res.status(401).json({ error: "Password non corretta" });
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID foto non valido" });
      }

      // Get photo info before deleting to remove file
      const photos = await storage.getAllPhotos();
      const photo = photos.find(p => p.id === id);
      
      if (!photo) {
        return res.status(404).json({ error: "Foto non trovata" });
      }

      // Delete from storage
      const deleted = await storage.deletePhoto(id);
      
      if (deleted) {
        // Try to delete physical file
        try {
          const filePath = path.join(uploadDir, photo.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.error("Errore eliminazione file:", fileError);
          // Continue even if file deletion fails
        }
        
        res.json({ message: "Foto eliminata con successo" });
      } else {
        res.status(404).json({ error: "Foto non trovata" });
      }
    } catch (error) {
      res.status(500).json({ error: "Errore nell'eliminare la foto" });
    }
  });

  // Get all videos
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recuperare i video" });
    }
  });

  // Upload video with password protection
  app.post("/api/videos/upload", uploadVideo.single('video'), async (req, res) => {
    try {
      const password = req.body.password;
      if (password !== "segreta") {
        return res.status(401).json({ error: "Password non corretta" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Nessun file caricato" });
      }

      const videoData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        uploadedAt: new Date().toISOString(),
      };

      const result = insertVideoSchema.safeParse(videoData);
      if (!result.success) {
        return res.status(400).json({ error: "Dati non validi" });
      }

      const video = await storage.createVideo(result.data);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Errore nel caricare il video" });
    }
  });

  // Delete video with password protection
  app.delete("/api/videos/:id", async (req, res) => {
    try {
      const password = req.body.password;
      if (password !== "segreta") {
        return res.status(401).json({ error: "Password non corretta" });
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID video non valido" });
      }

      // Get video info before deleting to remove file
      const videos = await storage.getAllVideos();
      const video = videos.find((v: any) => v.id === id);
      
      if (!video) {
        return res.status(404).json({ error: "Video non trovato" });
      }

      // Delete from storage
      const deleted = await storage.deleteVideo(id);
      
      if (deleted) {
        // Try to delete physical file
        try {
          const filePath = path.join(uploadDir, video.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.error("Errore eliminazione file:", fileError);
          // Continue even if file deletion fails
        }
        
        res.json({ message: "Video eliminato con successo" });
      } else {
        res.status(404).json({ error: "Video non trovato" });
      }
    } catch (error) {
      res.status(500).json({ error: "Errore nell'eliminare il video" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
