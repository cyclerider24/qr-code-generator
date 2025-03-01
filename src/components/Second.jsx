import React, { useRef, useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Moon, Sun } from "lucide-react"; // Icons for dark mode toggle

const qrCode = new QRCodeStyling({
    width: 240,
    height: 240,
    type: "png",
    data: "",
    dotsOptions: { color: "#000000", type: "dots" },
    backgroundOptions: { color: "#ffffff" },
    margin: 10,
    imageOptions: { crossOrigin: "anonymous", margin: 5 },
});

const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className="flex justify-between items-center px-8 py-3 bg-blue-950 text-white">
            <h1 className="text-xl font-bold">Qr World</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-blue-800">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </nav>
    );
};

const QRCodeGenerator = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [url, setUrl] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [dotType, setDotType] = useState("dots");
    const [dotColor, setDotColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [qrMargin, setQrMargin] = useState(10);
    const [logoOption, setLogoOption] = useState("url");
    const [logoUrl, setLogoUrl] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [format, setFormat] = useState("png");

    const qrRef = useRef(null);

    useEffect(() => {
        let logoImage = "";
        if (logoOption === "url") {
            logoImage = logoUrl || "";
        } else if (logoFile) {
            logoImage = URL.createObjectURL(logoFile);
        }

        if (generatedUrl && qrRef.current) {
            qrCode.update({
                data: generatedUrl,
                dotsOptions: { color: dotColor, type: dotType },
                backgroundOptions: { color: bgColor },
                margin: qrMargin,
                image: logoImage,
                type: format,
            });

            qrRef.current.innerHTML = "";
            qrCode.append(qrRef.current);
        }
    }, [generatedUrl, dotType, dotColor, bgColor, qrMargin, logoOption, logoUrl, logoFile, format]);

    const handleDownload = () => {
        if (generatedUrl) {
            qrCode.download({ name: "qrcode", extension: format });
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div className="flex flex-col items-center space-y-4 mt-6">
                <input
                    type="text"
                    placeholder="Enter text or URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded-md w-64 dark:bg-gray-800"
                />
                <button
                    onClick={() => setGeneratedUrl(url)}
                    className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Generate QR Code
                </button>

                {/* QR Dot Type Selection */}
                <label className="font-bold">QR Dot Type:</label>
                <select
                    value={dotType}
                    onChange={(e) => setDotType(e.target.value)}
                    className="border p-2 rounded-md w-64 dark:bg-gray-800"
                >
                    <option value="dots">Dots</option>
                    <option value="rounded">Rounded</option>
                    <option value="classy">Classy</option>
                    <option value="classy-rounded">Classy Rounded</option>
                    <option value="square">Square</option>
                    <option value="extra-rounded">Extra Rounded</option>
                </select>

                {/* Color Pickers */}
                <div className="flex space-x-4">
                    <div>
                        <label className="font-bold">Dot Color:</label>
                        <input
                            type="color"
                            value={dotColor}
                            onChange={(e) => setDotColor(e.target.value)}
                            className="border p-1 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="font-bold">Background Color:</label>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="border p-1 rounded-md"
                        />
                    </div>
                </div>

                {/* QR Edge Size Control */}
                <label className="font-bold">QR Code Edge Size:</label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={qrMargin}
                    onChange={(e) => setQrMargin(parseInt(e.target.value))}
                    className="w-64"
                />
                <span>{qrMargin}px</span>

                {/* Logo Option Selection */}
                <label className="font-bold">Choose Logo Source:</label>
                <select
                    value={logoOption}
                    onChange={(e) => setLogoOption(e.target.value)}
                    className="border p-2 rounded-md w-64 dark:bg-gray-800"
                >
                    <option value="url">Use URL</option>
                    <option value="upload">Upload File</option>
                </select>

                {/* Logo Input */}
                {logoOption === "url" && (
                    <>
                        <label className="font-bold">Logo URL:</label>
                        <input
                            type="text"
                            placeholder="Enter Logo Image URL"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            className="border p-2 rounded-md w-64 dark:bg-gray-800"
                        />
                    </>
                )}

                {logoOption === "upload" && (
                    <>
                        <label className="font-bold">Upload Logo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogoFile(e.target.files[0])}
                            className="border p-2 rounded-md w-64 dark:bg-gray-800"
                        />
                    </>
                )}

                {/* Format Selection */}
                <label className="font-bold">Download Format:</label>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="border p-2 rounded-md w-64 dark:bg-gray-800"
                >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="svg">SVG</option>
                </select>

                <div ref={qrRef}></div>

                {generatedUrl && (
                    <button
                        onClick={handleDownload}
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Download QR Code
                    </button>
                )}
            </div>
        </div>
    );
};

export default QRCodeGenerator;
