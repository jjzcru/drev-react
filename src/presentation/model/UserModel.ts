export class UserModel {
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
        this.lastName = '';
    }

    setUserID(UserID: string) {
        this.UserID = UserID;
    }

    getUserID(): string {
        return this.UserID;
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

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    getLastName(): string {
        return this.lastName;
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

    setDepartment(department: string) {
        this.department = department;
    }

    getDepartment(): string {
        return this.department;
    }
}
