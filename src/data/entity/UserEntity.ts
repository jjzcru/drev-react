export class UserEntity {
    private username: string;
    private name: string;
    private email: string;
    private role: string;
    private createdAt: Date;
    private updatedAt: Date;
    constructor() {
        this.username = '';
        this.name = '';
        this.email = '';
        this.role = '';
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail(): string {
        return this.email;
    }

    public setRole(role: string) {
        this.role = role;
    }

    public getRole(): string {
        return this.role;
    }

    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

     public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }

    public getUpdateAt(): Date {
        return this.updatedAt;
    }
}