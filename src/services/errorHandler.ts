import { NextFunction, Request, Response } from "express";

const errorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch((err: Error) => {
      res.status(500).json({
        message: "internal server error",
        error: err.message || "domething went wrong",
      });
    });
  };
};

export default errorHandler;
