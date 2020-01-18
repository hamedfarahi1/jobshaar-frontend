// export interface Type<T> extends Function {
// 	new (): T;
// }


function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
	return o[name]; // o[name] is of type T[K]
}

function setProperty<T, K extends keyof T>(o: T, name: K, value: T[K]): void {
	o[name] = value; // o[name] is of type T[K]
}
