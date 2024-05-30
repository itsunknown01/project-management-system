import { Request, Response } from "express";
import { db } from "../services/db.js";

export const getProject = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const project = await db.project.findFirst({
      where: {
        userId,
      },
    });

    if (!project) {
      return res.json({ message: "Project Not Found" }).status(404);
    }

    res.json({ message: "Project exists", project });
  } catch (error) {
    console.log(error);
  }
};

export const ProjectData = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log("Project",req.user)

    // if (!userId) {
    //   return res.json({ success: false, message: "Unauthorized" }).status(403);
    // }

    if (!name) {
      return res
        .json({ success: false, message: "Name is required" })
        .status(400);
    }

    // const project = await db.project.create({
    //   data: {
    //     name,
    //     userId,
    //   },
    // });

    res.json({
      success: true,
      message: "Project Created Successfully",
      // data: project,
    });
  } catch (error) {
    console.log(error);
  }
};
