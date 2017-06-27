export class User {
    private UserID: string;
    private username: string;
    private name: string;
    private lastName: string;
    private email: string;
    private role: string;
    private department: string;
    constructor() {
        this.username = '';
        this.name = '';
        this.email = '';
        this.role = '';
    }

    public setUserID(UserID: string) {
        this.UserID = UserID;
    }

    public getUserID(): string {
        return this.UserID;
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

    public setLastName(lastName: string) {
        this.lastName = lastName;
    }

    public getLastName(): string {
        return this.lastName;
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

    public setDepartment(department: string) {
        this.department = department;
    }

    public getDepartment(): string {
        return this.department;
    }
}
