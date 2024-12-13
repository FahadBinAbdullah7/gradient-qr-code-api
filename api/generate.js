import QRCode from "qrcode";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

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
}
