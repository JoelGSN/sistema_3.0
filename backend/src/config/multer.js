import multer from 'multer';

// Define que o arquivo vai para uma pasta temporária chamada 'uploads/'
const upload = multer({ dest: 'uploads/' });

export default upload;