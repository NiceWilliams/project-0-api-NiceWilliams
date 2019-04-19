import { User } from './model/user';
import { Role } from './model/role';

export let roles: Role[] = [
  new Role (1, 'Admin'),
  new Role (2, 'Contractor'),
  new Role (3, 'Security'),
  new Role (4, 'Employee'),
  new Role (5, 'Intern'),
  new Role (6, 'Finance Manager'),
];
export let users: User[] = [
  new User(13, 'B6', 'pass', 'Brother6', 'Durola', 'brotha@gmail.com', roles[3]),
  new User(17, 'Oki', 'pass', 'Okiku', 'Tamatchi', 'Okidoiki@yahoo.com', roles[1]),
  new User(19, 'Siosan', 'pass', 'Sio', 'Kakuguri', 'silentsio@hotmail.com', roles[1]),
  new User(21, 'Kot1', 'pass', 'Kotaro', 'Noeske', 'hotkot@aol.com', roles[4]),
  new User(23, 'Dhar', 'pass', 'Dharman', 'Tama', 'baddharma@live.com', roles[3]),
  new User(37, 'Binbong', 'pass', 'Bin', 'Vergara', 'binbin@outlook.com', roles[3]),
  new User(6, 'ViolentTeddy', 'pass', 'Jinno', 'Kakuguri', 'killerbear@outlook.com', roles[3]),
  new User(48, 'Knives', 'pass', 'Ninja', 'Ninja', 'ancientsecretart@yahoo.com', roles[0]),
  new User(30, 'Unreal', 'pass', 'Justice', 'None', 'ownbrandofjustice@gmail.com', roles[2]),
  new User(28, 'Roku', 'pass', 'Rokutaro', 'Kieske', 'rokustick@hotmail.com', roles[6]),
  new User(10, 'Slasher', 'pass', 'Sword', 'Master', 'dojogod@live.com', roles[0]),
  new User(8, 'Cydroid', 'pass', 'Afro', 'Droid', 'cyborgtakeover@outlook.com', roles[2]),
  new User(1, 'Froman', 'pass', 'Afro', 'Samurai', 'sworddiety@gmail.com', roles[0])
];