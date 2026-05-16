type Role = "admin" | "editor" | "viewer";

interface Address {
  country: string;
  city: string;
  zip: string;
  street: string;
}

interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  taxCode: string;
  role: Role;
  address: Address;
}

interface User {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  taxCode: string;
  role: Role;
  permissions: string[];
  apiCallsLimit: number;
  address: Address;
}

interface Logger {
  log(message: string): void;
}

interface Notifier {
  send(message: string): void;
}

interface UserRepository {
  save(user: User): User;
  findByEmail(email: string): User | null;
  updatePassword(userId: string, hashedPassword: string): void;
}

function validateEmail(email: string): void {
  if (!email.includes("@") || !email.includes(".")) {
    throw new Error("Email is not valid");
  }
}

function validatePassword(password: string): void {
  if (password.length < 8) throw new Error("Password too short");
  if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) throw new Error("Password too weak");
}

function validateAge(age: number): void {
  if (!Number.isInteger(age) || age < 0 || age > 130) throw new Error("Age not valid");
}

function validatePhone(phone: string): void {
  if (!/^\+?[0-9]{7,15}$/.test(phone)) throw new Error("Phone not valid");
}

function validateZip(zip: string): void {
  if (!/^[0-9]{5}$/.test(zip)) throw new Error("Zip code not valid");
}

function validateTaxCode(taxCode: string): void {
  if (!taxCode || taxCode.trim().length === 0) throw new Error("Tax code required");
  if (taxCode.trim().length !== 16) throw new Error("Tax code not formatted correctly");
}

function validateUserInput(input: UserDTO): void {
  validateEmail(input.email);
  validatePassword(input.password);
  validateAge(input.age);
  validatePhone(input.phone);
  validateZip(input.address.zip);
  validateTaxCode(input.taxCode);
}

const PERMISSIONS: Record<Role, string[]> = {
  admin:  ["read", "write", "delete", "manage_users"],
  editor: ["read", "write"],
  viewer: ["read"]
};

const API_LIMITS: Record<Role, number> = {
  admin:  10000,
  editor: 1000,
  viewer: 100
};

function hashPassword(pwd: string): string {
  return `hashed_${pwd}`;
}

function welcomeMessage(firstName: string, role: Role): string {
  if (role === "admin") {
    return `Ciao ${firstName}! Hai accesso amministratore.`;
  }
  return `Ciao ${firstName}! Benvenuto, ruolo: ${role}.`;
}

export class UserService {
  constructor(
    private audit: Logger,
    private notifier: Notifier,
    private repo: UserRepository,
  ) {}

  createUser(input: UserDTO): User {
    validateUserInput(input);

    const user: User = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashPassword(input.password),
      age: input.age,
      phone: input.phone,
      taxCode: input.taxCode,
      role: input.role,
      permissions: PERMISSIONS[input.role],
      apiCallsLimit: API_LIMITS[input.role],
      address: input.address,
    };

    const saved = this.repo.save(user);

    this.audit.log(`User created: ${saved.firstName} ${saved.lastName}, role: ${input.role}`);
    if (input.role === "admin") {
      this.audit.log(`WARNING: admin user created`);
    }

    this.notifier.send(welcomeMessage(saved.firstName, input.role));

    return saved;
  }

  updateUser(userId: string, input: UserDTO): User {
    validateUserInput(input);

    const user: User = {
      userId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashPassword(input.password),
      age: input.age,
      phone: input.phone,
      taxCode: input.taxCode,
      role: input.role,
      permissions: PERMISSIONS[input.role],
      apiCallsLimit: API_LIMITS[input.role],
      address: input.address,
    };

    const saved = this.repo.save(user);

    this.audit.log(`User updated: ${saved.firstName} ${saved.lastName}, role: ${input.role}`);
    if (input.role === "admin") {
      this.audit.log(`WARNING: admin user updated`);
    }

    return saved;
  }

  findByEmail(email: string): User | null {
    return this.repo.findByEmail(email);
  }

  resetPassword(userId: string, newPwd: string): void {
    validatePassword(newPwd);

    const hashed = hashPassword(newPwd);
    this.repo.updatePassword(userId, hashed);

    this.audit.log(`Password reset for userId: ${userId}`);
    this.notifier.send("La tua password è stata aggiornata.");
  }
}