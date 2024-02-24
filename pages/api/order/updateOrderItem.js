import { db } from '../../../db.js'
export default async function updateOrderItem(req, res) {
  try {
    if (req.method !== 'POST') {
      // 處理非 POST 請求
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const client = await db.connect()

    const { order } = req.body

    client.query(
      `UPDATE lightup."Order"
    SET totalamount=${order.totalamount}, item='${JSON.stringify(order.item)}'
    WHERE orderid=${order.orderid} ; `,
    )

    client.release()

    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}