export class UserModel {
    private username: string;
    private name: string;
    private email: string;
    private role: string;
    constructor() {
        this.username = '';
        this.name = '';
        this.email = '';
        this.role = '';
    }

    setUsername(username: string) {
        this.username = username;
    }

    getUsername(): string {
        return this.username;
    }

    setName(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }

    setRole(role: string) {
        this.role = role;
    }

    getRole(): string {
        return this.role;
    }
}
