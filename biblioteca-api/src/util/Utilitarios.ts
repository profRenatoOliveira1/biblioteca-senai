import multer from 'multer';
import path from 'path';

// Configuração do Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Diretório onde as imagens serão salvas
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para evitar sobrescritas
//     }
// });

// const upload = multer({ storage });

// export default upload;

// Middleware para definir o diretório de upload com base no tipo de arquivo
export const uploadUserPhoto = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/users/'); // Diretório para fotos de usuários
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para evitar sobrescritas
        }
    })
});

export const uploadBookPhoto = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/livros/'); // Diretório para fotos de livros
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para evitar sobrescritas
        }
    })
});
