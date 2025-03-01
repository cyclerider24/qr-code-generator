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
        <nav className="flex justify-between items-center px-6 py-3 bg-blue-950 text-white md:px-8">
            <h1 className="text-xl font-bold md:text-2xl">Qr World</h1>
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

            <div>
                <div className="flex flex-col items-center space-y-10 mt-20">
                    <img src="logown.png" alt="QR WORLD" className="h-60 mb-10" />
                    <input
                        type="text"
                        placeholder="Enter text or URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border p-2 rounded-md w-80 m:w-64  dark:bg-gray-800"
                    />
                    <button
                        onClick={() => setGeneratedUrl(url)}
                        className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Generate QR Code
                    </button>
                </div>

                <div className="border-2 border-blue-950 rounded-3xl grid grid-cols-2 content-evenly gap-6 space-y-6 p-6 mx-20 my-10 items-center">
                    <div className="flex space-x-6 items-center mt-6 pl-8">
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
                    </div>

                    {/* Color Pickers */}
                    <div className="flex space-x-24 items-center mt-6">
                        <div className="space-x-4">
                            <label className="font-bold">Dot Color:</label>
                            <input
                                type="color"
                                value={dotColor}
                                onChange={(e) => setDotColor(e.target.value)}
                                className="border p-1 rounded-md"
                            />
                        </div>
                        <div className="pl-14 space-x-4">
                            <label className="font-bold">Background Color:</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="border p-1 rounded-md"
                            />
                        </div>
                    </div>
                    
                    <div className="flex space-x-6 items-center mt-6 pl-8 pb-6">
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
                    </div>

                    <div className="flex items-center space-x-3 mt-6 pb-6">
                        {/* Logo Option Selection */}
                        <label className="font-bold">Choose Logo Source:</label>
                        <select
                            value={logoOption}
                            onChange={(e) => setLogoOption(e.target.value)}
                            className="border p-2 rounded-md w-28 dark:bg-gray-800"
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
                    </div>
                </div>
                
                <div className="border-2 border-blue-950 rounded-3xl grid grid-cols-2 content-evenly gap-6 space-y-6 p-6 mx-20 my-10 items-center">
                    <div className="flex space-x-10 items-center mt-6 pl-8 justify-center">
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
                    </div>

                    {/* QR Code Display */}
                    <div className="flex items-center mt-6 justify-center" ref={qrRef}></div>

                    <div className="col-span-2 flex justify-center">
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
            </div>
        </div>
    );
};

export default QRCodeGenerator;
