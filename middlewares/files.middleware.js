//const multer = require('multer');
//const path = require('path');
//
//
//
//const fs = require('fs');
//const cloudinary = require('cloudinary').v2;
//
//const storage = multer.diskStorage({
//    filename: (req, file, cb) => {
//        console.log('filename ->', file);
//        cb(null, `${Date.now()}-${file.originalname}`);
//    },
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../temp'))
//     },
//});
//
//const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
//
//const fileFilter = (req, file, cb) => {
//    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
//        const error = new Error("file not supported");
//        cb(error)
//    } else {
//        cb(null, true);
//    }
//};
//
//const upload = multer({
//    storage,
//    fileFilter,
//});
//
//const uploadToCloudinary = async (req, res, next) => {
//	if (req.file) {
//    try{
//		const filePath = req.file.path;
//    const image = await cloudinary.uploader.upload(filePath);
//
//    await fs.unlinkSync(filePath);
//	
//    req.file_url = image.secure_url;
//		return next();
//    }catch(error){
//      return next(error)
//    }
//  } else {
//    return next();
//  }
//};
//
//module.exports = { upload: upload, uploadToCloudinary };

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '/multer',
    format: async (req, file) => {
      const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

      if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        //formato no valido de imagen (ver error)
      } else {
        //devolver formato con el string cortado.
        var type = file.mimetype.substring(file.mimetype.indexOf('/')+1);
        return type;
      }
    },  
    public_id: (req, file) => {
      const imageName = file.originalname.substring(0 ,file.originalname.indexOf('.'));

      if(imageName != null){
        return imageName
      }else{
        return 'nombre por defecto'
      }
    }
  },
});

const parser = multer({ storage: storage });

module.exports = { parser };