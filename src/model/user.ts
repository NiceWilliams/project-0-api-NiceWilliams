export class User {
    userId: number;
    username: string;
    password: string;
    name: string;
    role: string;

    constructor(userId = 0, username = '', password = '', name = '', role = 'associate') {
      this.userId = userId;
      this.username = username;
      this.password = password;
      this.name = name;
      this.role = role;
    }
  }

export class Admin {
    userId: number;
    username: string;
    password: string;
    name: string;
    role: string;

    constructor(userId = 0, username = '', password = '', name = '', role = 'admin') {
      this.userId = userId;
      this.username = username;
      this.name = name;
      this.role = role;
    }
}