const { app } = require("@azure/functions");

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

function mixColors(color1, color2) {
    return {
        r: Math.floor((color1.r + color2.r) / 2),
        g: Math.floor((color1.g + color2.g) / 2),
        b: Math.floor((color1.b + color2.b) / 2),
    };
}

function calculateLuminance(color) {
    let { r, g, b } = color;
    [r, g, b] = [r, g, b].map((channel) => {
        channel /= 255;
        return channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrast(color1, color2) {
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);
    return luminance1 > luminance2
        ? (luminance1 + 0.05) / (luminance2 + 0.05)
        : (luminance2 + 0.05) / (luminance1 + 0.05);
}

app.http("ColorMixerCC", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        const color1_hex = request.query.get("color1");
        const color2_hex = request.query.get("color2");

        const color1 = hexToRgb(color1_hex);
        const color2 = hexToRgb(color2_hex);

        if (!color1 || !color2) {
            return {
                status: 400,
                body: "one or more colors are missing or invalid!",
            };
        }

        const mixedColor = mixColors(color1, color2);
        const contrast = calculateContrast(color1, color2);

        return {
            body: `
            color1: HEX ${color1_hex} 
            color2: HEX ${color2_hex} 
            -----------------------------
            color1: RGB(${color1.r}, ${color1.g}, ${color1.b}) 
            color2: RGB(${color2.r}, ${color2.g}, ${color2.b}) 
            -----------------------------
            Mixed color: RGB(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b}) 
            -----------------------------
            Contrast ratio: ${contrast}`,
        };
    },
});
