// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@keeveestore/file";
import { readFileSync, writeFileSync } from "fs-extra";
import { decode, encode } from "ini";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	// @ts-ignore
	protected dump(rows: Record<K, T>): void {
		writeFileSync(this.uri, encode(rows));
	}

	protected load(): void {
		for (const [key, value] of Object.entries(decode(readFileSync(this.uri, "utf8")))) {
			// @ts-ignore
			this.put(key, value);
		}
	}
}
