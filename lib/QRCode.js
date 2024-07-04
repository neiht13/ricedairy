'use client'
import React, {useContext, useEffect, useRef, useState} from "react";
import QRCodeStyling from "qr-code-styling";
import {Button} from "@/registry/default/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const QrCode = ({shortUrl, qrConfig}) => {
	console.log('qrConfig', qrConfig)
	console.log('shortUrl', shortUrl)
	const [options] = useState({
		width: 333,
		height: 333,
		type: 'canvas',
		data: 'https://link.vnptdongthap.com.vn/'+shortUrl,
		image: qrConfig?.imageLogo,
		margin: 10,
		imageOptions: {
			hideBackgroundDots: true,
			imageSize: 0.4,
			margin: 5,
			crossOrigin: 'anonymous',
		},
		dotsOptions: {
			color: qrConfig?.mainColor,
			type: qrConfig?.dotsOption,
		},
		backgroundOptions: {
			color: qrConfig?.backgroundColor,
		},
		cornersSquareOptions: {
			color: qrConfig?.mainColor,
			type: qrConfig?.cornersSquareOption,
		},
		cornersDotOptions: {
			color: qrConfig?.cornersDotColor,
			type: qrConfig?.cornersDotOption,
		},
	});
	const [qrCode] = useState(new QRCodeStyling(options));
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			qrCode.append(ref.current);
		}

		if( qrConfig){
			qrCode.update({
				image: qrConfig.imageLogo,
				dotsOptions: {
					color: qrConfig?.mainColor,
					type: qrConfig?.dotsOption,
				},
				backgroundOptions: {
					color: qrConfig?.backgroundColor,
				},
				cornersSquareOptions: {
					color: qrConfig?.mainColor,
					type: qrConfig?.cornersSquareOption,
				},
				cornersDotOptions: {
					color: qrConfig?.cornersDotColor,
					type: qrConfig?.cornersDotOption,
				}
			})
		}

	}, [qrCode, ref, qrConfig]);

	const downloadQrCode = async () => {
		const qrcodeDownload = new QRCodeStyling(options)
		qrcodeDownload.update({
			width: 1000,
			height:1000,
			image: qrConfig?.imageLogo,
			dotsOptions: {
				color: qrConfig?.mainColor,
				type: qrConfig?.dotsOption,
			},
			backgroundOptions: {
				color: qrConfig?.backgroundColor,
			},
			cornersSquareOptions: {
				color: qrConfig?.mainColor,
				type: qrConfig?.cornersSquareOption,
			},
			cornersDotOptions: {
				color: qrConfig?.cornersDotColor,
				type: qrConfig?.cornersDotOption,
			}})
		qrcodeDownload.download()
	}
	return(
		<div
		>
			<div ref={ref}>
			</div>
			<div className="flex justify-center">

			<Button className="button" onClick={downloadQrCode}>
				<span className="button-text">Tải về</span>
				<span className="button-icon fa-solid fa-download"></span>
			</Button>
		</div>
		</div>
	)
}
export default QrCode
