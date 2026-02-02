declare module "upng-js" {
	interface DecodedImage {
		width: number;
		height: number;
		depth: number;
		ctype: number;
		frames: Array<{
			rect: { x: number; y: number; width: number; height: number };
			delay: number;
			dispose: number;
			blend: number;
		}>;
		tabs: Record<string, unknown>;
		data: ArrayBuffer;
	}

	export function decode(buffer: ArrayBuffer | Buffer): DecodedImage;
	export function toRGBA8(image: DecodedImage): ArrayBuffer[];
	export function encode(
		imgs: ArrayBuffer[],
		width: number,
		height: number,
		colorDepth: number,
		delays?: number[],
		filterType?: number,
	): ArrayBuffer;
}
