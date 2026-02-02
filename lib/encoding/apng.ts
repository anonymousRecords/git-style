import UPNG from "upng-js";

export interface APNGFrame {
	data: Buffer;
	width: number;
	height: number;
}

export function encodeAPNG(
	frames: APNGFrame[],
	frameDelay: number,
): Uint8Array {
	if (frames.length === 0) {
		throw new Error("No frames provided for APNG encoding");
	}

	const { width, height } = frames[0];

	const frameDataArrays: ArrayBuffer[] = frames.map((frame) => {
		const decoded = UPNG.decode(frame.data);
		const rgba = UPNG.toRGBA8(decoded)[0];
		return rgba;
	});

	const delays = frames.map(() => frameDelay);

	const apngBuffer = UPNG.encode(frameDataArrays, width, height, 0, delays);

	return new Uint8Array(apngBuffer);
}
