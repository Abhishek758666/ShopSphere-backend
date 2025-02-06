import { Request, Response } from "express";
import { UserRequestType } from "../middleware/authMiddleware";
import Banner from "../database/models/bannerModel";

declare global {
  namespace Express {
    interface Request {
      file?: {
        filename: string;
      };
    }
  }
}

class BannerController {
  public static async getBanner(req: Request, res: Response): Promise<void> {
    const data = await Banner.findAll();
    res.status(200).json({
      message: "banner fetched successfully",
      data,
    });
  }

  public static async addBanner(
    req: UserRequestType,
    res: Response
  ): Promise<void> {
    const fileName = req?.file?.filename;

    await Banner.create({
      bannerImage: fileName ?? "notfound.jpg",
      userId: req?.user?.id,
    });
    res.status(200).json({
      message: "banner created",
    });
  }

  public static async updateBanner(
    req: UserRequestType,
    res: Response
  ): Promise<void> {
    const fileName = req?.file?.filename;
    const id = req.params.id;

    const bannerExist = await Banner.findAll({
      where: {
        id: id,
      },
    });

    if (bannerExist.length === 0 || !bannerExist) {
      res.status(200).json({
        message: "cannot find banner",
      });
    }

    await Banner.update(
      { bannerImage: fileName },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      message: "banner updated successfully",
    });
  }

  public static async deleteBanner(
    req: UserRequestType,
    res: Response
  ): Promise<void> {
    const id = req.params.id;

    const data = await Banner.findAll({
      where: {
        id: id,
      },
    });

    if (data.length === 0 || !data) {
      res.status(404).json({
        message: "banner not found",
      });
      return;
    }

    Banner.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "banner deleted successfully",
    });
  }
}

export default BannerController;
