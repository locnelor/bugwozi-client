export * from "./HttpFetch"
export * from "../../hooks/useQuery"
import { String } from "ts-toolbelt"

export const strFactory = <T extends string>(url: T) =>
    <S extends string>(s: S) => (url + s) as String.Join<[T, S]>;
