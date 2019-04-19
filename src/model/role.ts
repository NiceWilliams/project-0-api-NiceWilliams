export class Role {
  roleId: number; // primary key
  role: string; // not null, unique

  constructor(roleId: number, role = '') {
    this.roleId = roleId;
    this.role = role;

  }
}
