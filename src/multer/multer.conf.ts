import multer from "multer";
import path from "path";

const storage = (name_file: string) => multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("uploads"))
    },
    filename: (req, file, callback) => {
        
        const extensionArq = file.originalname.split('.')[1];

        callback(null, `${name_file}.${extensionArq}`)
    }
});

export default storage