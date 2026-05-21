import type { Request, Response } from "express"

export const getAllIssues = async(req: Request, res: Response)=>{
  res.send({
    success: true,
    message: "This is Issues route"
  })
}