import { useContext, useRef } from "react";
import { UserContext } from "../../context/user/context";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
export default function Receive() {
	const { wallet } = useContext(UserContext);
	const qrRef = useRef(null);

	const handleDownload = async () => {
		if (qrRef.current) {
			try {
				const dataUrl = await htmlToImage.toPng(qrRef.current);
				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = "qrcode.png";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} catch (error) {
				console.error("Error generating or downloading QR code:", error);
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-full">
			<div className="flex flex-col justify-center items-center gap-6">
				{/* ⚠️ Avoid Tailwind inside here to prevent oklch errors */}
				<div
					ref={qrRef}
					style={{
						padding: "16px",
						backgroundColor: "white",
						borderRadius: "8px",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					}}
				>
					{wallet && <QRCode value={wallet} size={400} />}
				</div>

				<button
					onClick={handleDownload}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
				>
					Download
				</button>
			</div>
		</div>
	);
}
