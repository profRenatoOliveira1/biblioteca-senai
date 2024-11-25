import * as multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: multer.File;  // Isso adiciona a propriedade 'file' ao tipo Request
    }
  }
}
