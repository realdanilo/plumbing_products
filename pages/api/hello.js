// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getById} from "../../utils/dbConnection"

export default function handler(req, res) {
  let obj = getById();

  res.status(200).json(obj)
}
