import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { AppError } from '../middleware/errorHandler';

// Generic file upload configuration
// Can be swapped for S3, Cloudinary, Azure, etc.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store in public/uploads - can be changed to cloud storage
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|zip/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

// Helper to get file URL (can be modified for cloud storage)
export function getFileUrl(filename: string): string {
  return `/uploads/${filename}`;
}

// S3-compatible upload function (for future cloud integration)
export async function uploadToCloud(file: Express.Multer.File): Promise<string> {
  // This can be replaced with actual S3/Cloudinary upload
  // For now, return local path
  return getFileUrl(file.filename);
}

// Delete file (works for local and can be extended for cloud)
export async function deleteFile(filename: string): Promise<void> {
  // Implementation for file deletion
  // Can be extended for S3/Cloudinary
  console.log('Delete file:', filename);
}
