const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// API Route
app.post("/api/generate", async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ error: "No data provided!" });
    }

    try {
        const qrCode = await QRCode.toDataURL(data, {
            errorCorrectionLevel: "H",
            color: {
                dark: "#FFFFFF", // White foreground
                light: "#003366", // Dark blue background
            },
        });

        res.status(200).json({ qrCode });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate QR code." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
