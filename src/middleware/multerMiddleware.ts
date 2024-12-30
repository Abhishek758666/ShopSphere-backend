import multer from "multer";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    const allowedFileTypes = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/avif",
    ];

    if (!allowedFileTypes.includes(file.mimetype)) {
      console.log(file.mimetype);
      cb(new Error("invalid file type"));
      return;
    }
    cb(null, "./src/uploads");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { multer, storage };
