import QRCode from "qrcode";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ error: "No data provided!" });
    }

    try {
        // Generate QR Code as a PNG Buffer
        const qrBuffer = await QRCode.toBuffer(data, {
            width: 250,
            margin: 2,
            color: {
                dark: "#ffffff", // White foreground
                light: "#003366" // Dark blue background
            },
        });

        // Set the response headers to return an image
        res.setHeader("Content-Type", "image/png");
        res.status(200).send(qrBuffer);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate QR code" });
    }
}
