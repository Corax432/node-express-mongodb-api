const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /orders/process:
 *   post:
 *     summary: Process an order
 *     description: Simulates order processing with a 3-second delay.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Order processed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request - orderId is required.
 *       500:
 *         description: Internal server error.
 */
router.post('/process', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: '❌ Missing orderId' });
    }

    try {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: `✅ Order #${orderId} has been successfully processed!` });
            }, 3000);
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: '❌ Order processing failed' });
    }
});

module.exports = router;

