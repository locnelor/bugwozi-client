
export type languageType = "cn" | "en"

class Language {
    private readonly map = new Map<string, string>();
    public use(
        type: languageType,
        key: string,
        value: string
    ) {
        this.map.set(`${key}-${type}`, value);
        return this;
    }
    public get(type: languageType, key: string) {
        const has = this.map.has(`${key}-${type}`);
        if (has) return this.map.get(`${key}-${type}`);
        return this.map.get(`${key}-cn`)
    }
}
export default Language