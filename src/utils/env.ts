export class Env {
    public static get(key: string): string {
        if (!process.env[key])
            throw new Error(`${key} environment variable not defined`);
        return process.env[key];
    }
}
