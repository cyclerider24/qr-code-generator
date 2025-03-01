import React, { useRef, useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Moon, Sun } from "lucide-react"; // Icons for dark mode toggle
import QRDescription from "./QRDescription";

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
            <h1 className="text-lg font-bold md:text-xl">Qr World</h1>
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


    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                setGeneratedUrl(url);
            }
        };
    
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [url]);
    

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

            <div className="flex flex-col items-center space-y-6 mt-10 px-4 md:px-10">
                <img src="logown.png" alt="QR WORLD" className="h-40 md:h-60 mb-2" />
                <p className="text-center text-sm md:text-lg text-gray-700 dark:text-gray-300 px-6 mt-4 pb-4">
                    Generate high-quality QR codes effortlessly with QR World. Customize dot styles, colors, logos, and more to suit your needs.
                </p>
                <input
                    type="text"
                    placeholder="Enter text or URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded-md w-full max-w-md shadow-md dark:bg-gray-800"
                />
                <button
                    onClick={() => setGeneratedUrl(url)}
                    className="bg-blue-800 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 w-full max-w-md"
                >
                    Generate QR Code
                </button>
            </div>

            {/* QR Code Settings */}
            <div className="border-2 border-blue-950 rounded-3xl flex flex-col space-y-6 p-6 mx-4 md:mx-20 my-10 shadow-xl">
                <div className="flex flex-col space-y-4">
                    <label className="font-bold">QR Dot Type:</label>
                    <select
                        value={dotType}
                        onChange={(e) => setDotType(e.target.value)}
                        className="border p-2 rounded-md w-full dark:bg-gray-800"
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
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <label className="font-bold">Dot Color:</label>
                        <input type="color" value={dotColor} onChange={(e) => setDotColor(e.target.value)} className="border p-1 rounded-md" />
                    </div>
                    <div className="flex justify-between">
                        <label className="font-bold">Background Color:</label>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="border p-1 rounded-md" />
                    </div>
                </div>

                {/* QR Margin */}
                <div className="flex flex-col space-y-2">
                    <label className="font-bold">QR Code Edge Size:</label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={qrMargin}
                        onChange={(e) => setQrMargin(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <span className="text-center">{qrMargin}px</span>
                </div>

                {/* Logo Option */}
                <div className="flex flex-col space-y-4">
                    <label className="font-bold">Choose Logo Source:</label>
                    <select value={logoOption} onChange={(e) => setLogoOption(e.target.value)} className="border p-2 rounded-md w-full dark:bg-gray-800">
                        <option value="url">Use URL</option>
                        <option value="upload">Upload File</option>
                    </select>
                    {logoOption === "url" && (
                        <input type="text" placeholder="Enter Logo Image URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="border p-2 rounded-md w-full dark:bg-gray-800" />
                    )}
                    {logoOption === "upload" && (
                        <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="border p-2 rounded-md w-full dark:bg-gray-800" />
                    )}
                </div>
                <div className="flex flex-col space-y-4">
                    <label className="font-bold">Download Format:</label>
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="border p-2 rounded-md w-full dark:bg-gray-800"
                    >
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="svg">SVG</option>
                    </select>
                </div>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center space-y-6 my-10">
                <div className="border-2 border-blue-950 rounded-lg p-4 shadow-xl" ref={qrRef}></div>            
                {generatedUrl && (
                    <button onClick={handleDownload} className="bg-green-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
                        Download QR Code
                    </button>
                )}
            </div>

            <QRDescription />

            {/* Footer */}
            <footer className="text-center p-4 bg-gray-800 text-white mt-10">
                <p>© {new Date().getFullYear()} QR World. All Rights Reserved.</p>
                <p>Created by <a href="https://www.linkedin.com/in/loyola-seba/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-sky-600">Loyola Seba. A</a></p>
            </footer>
        </div>
    );
};

export default QRCodeGenerator;
