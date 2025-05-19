import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import "./copy-string.scss"

const CopyString = ({ string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(string);
		setCopied(true);
		setTimeout(() => setCopied(false), 2500);
	};

	return (
		<div className="copy-container" onClick={handleCopy}>
			<span className="icon">
				{copied ? <CopyCheck size={16} /> : <Copy size={16} />}
			</span>
			<span className="ip">{copied ? "Скопійовано" : string}</span>
		</div>
	);
};

export default CopyString;
