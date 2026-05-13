class EmailValidator {
  check(e: string): boolean {
    return e.indexOf('@') !== -1;
  }
}

class MailChecker {
  isValid(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}

class BaseUser {
  getPermissions(): string[] {
    return ['read', 'write', 'delete'];
  }
  getDashboard(): string {
    return 'full-dashboard';
  }
}

class GuestUser extends BaseUser {
  override getPermissions(): string[] {
    throw new Error('Guests have no permissions');
  }
  override getDashboard(): string {
    throw new Error('Guests have no dashboard');
  }
  getGuestToken(): string {
    return 'guest-' + Math.random().toString(36).slice(2);
  }
}

export class UserService {

  private _tempValidationErrors: string[] | undefined;
  private _tempHashedPwd: string | undefined;

  // valida, calcola permessi, calcola rate limit, hasha, audita, notifica
  // Ogni sezione con commento è un segnale che dovrebbe essere un metodo separato
  createUser(
    firstName: string,
    lastName: string,
    e: string,
    pwd: string,
    age: number,
    isAdmin: boolean,
    country: string,
    city: string,
    zip: string,
    street: string,
    phone: string,    
    taxCode: string,  
    role: string
  ) {
    // — sezione 1: validazione input
    const validator = new EmailValidator();
    if (!validator.check(e)) throw new Error('bad email');
    if (pwd.length < 8) throw new Error('bad pwd');
    if (age < 0 || age > 130) throw new Error('bad age');
    if (!/^\+?[0-9]{7,15}$/.test(phone)) throw new Error('bad phone');
    if (!/^[0-9]{5}$/.test(zip)) throw new Error('bad zip');
    if (!taxCode || taxCode.trim().length === 0) throw new Error('bad taxCode');

    // — sezione 2: calcolo permessi
    let permissions: string[];
    switch (role) {
      case 'admin':  permissions = ['read', 'write', 'delete', 'manage_users']; break;
      case 'editor': permissions = ['read', 'write']; break;
      case 'viewer': permissions = ['read']; break;
      default:       permissions = [];
    }

    // — sezione 3: calcolo rate limit
    let apiCallsLimit: number;
    switch (role) {
      case 'admin':  apiCallsLimit = 10000; break;
      case 'editor': apiCallsLimit = 1000;  break;
      case 'viewer': apiCallsLimit = 100;   break;
      default:       apiCallsLimit = 10;
    }

    // — sezione 4: hashing password
    this._tempValidationErrors = [];
    this._tempHashedPwd = `hashed_${pwd}`;

    // — sezione 5: costruzione oggetto utente
    const user = {
      firstName, lastName, email: e,
      password: this._tempHashedPwd,
      age, isAdmin,
      country, city, zip, street,
      phone, taxCode,
      permissions, apiCallsLimit,
    };

    // — sezione 6: audit
    console.log(`[AUDIT] User created: ${firstName} ${lastName}, role: ${role}`);
    console.log(`[AUDIT] Address: ${street}, ${zip} ${city}, ${country}`);
    if (isAdmin) {
      console.log(`[AUDIT] WARNING: admin user created`);
      console.log(`[AUDIT] taxCode: ${taxCode}`);
    }

    // — sezione 7: notifica di benvenuto
    let welcomeMessage: string;
    if (role === 'admin') {
      welcomeMessage = `Ciao ${firstName}! Hai accesso amministratore.`
        + ` Ricordati di abilitare il 2FA al primo accesso.`;
    } else {
      welcomeMessage = `Ciao ${firstName}! Benvenuto sulla piattaforma.`
        + ` Il tuo account è stato creato con ruolo ${role}.`
        + ` Accedi con la tua email: ${e}.`;
    }
    console.log(`[NOTIFY] ${welcomeMessage}`);

    this._tempValidationErrors = undefined;
    this._tempHashedPwd = undefined;

    return user;
  }

  updateUser(
    userId: string,
    firstName: string,
    lastName: string,
    e: string,
    pwd: string,
    age: number,
    isAdmin: boolean,
    country: string,
    city: string,
    zip: string,
    street: string,
    phone: string,
    taxCode: string,
    role: string
  ) {
    // — sezione 1: validazione
    const checker = new MailChecker();
    if (!checker.isValid(e)) throw new Error('bad email');
    if (pwd.length < 8) throw new Error('bad pwd');
    if (age < 0 || age > 130) throw new Error('bad age');
    if (!/^\+?[0-9]{7,15}$/.test(phone)) throw new Error('bad phone');
    if (!/^[0-9]{5}$/.test(zip)) throw new Error('bad zip');

    // — sezione 2: calcolo permessi
    let permissions: string[];
    if (role === 'admin') {
      permissions = ['read', 'write', 'delete', 'manage_users'];
    } else if (role === 'editor') {
      permissions = ['read', 'write'];
    } else if (role === 'viewer') {
      permissions = ['read'];
    } else {
      permissions = [];
    }

    console.log(`[AUDIT] User updated: ${firstName} ${lastName}, role: ${role}`);
    console.log(`[AUDIT] Address: ${street}, ${zip} ${city}, ${country}`);
    if (isAdmin) {
      console.log(`[AUDIT] WARNING: admin user updated`);
      console.log(`[AUDIT] taxCode: ${taxCode}`);
    }

    return {
      userId, firstName, lastName, email: e,
      age, isAdmin,
      country, city, zip, street,
      phone, taxCode,
      permissions,
    };
  }

  findByEmail(email: string): object | null {
    console.log(`[DB] SELECT * FROM users WHERE email = '${email}'`);
    return null;
  }

  resetPassword(userId: string, newPwd: string): void {
    // — sezione 1: validazione 
    if (newPwd.length < 8) throw new Error('bad pwd');
    if (!/^(?=.*[A-Z])(?=.*[0-9])/.test(newPwd)) throw new Error('pwd too weak');

    // — sezione 2: hashing 
    const hashed = `hashed_${newPwd}`;

    // — sezione 3: salvataggio
    console.log(`[DB] UPDATE users SET password = '${hashed}' WHERE id = '${userId}'`);

    // — sezione 4: audit
    console.log(`[AUDIT] Password reset for userId: ${userId}`);

    // — sezione 5: notifica
    console.log(`[NOTIFY] La tua password è stata aggiornata.`);
  }

  formatUserProfile(
    firstName: string, lastName: string,
    email: string, role: string,
    country: string, city: string, zip: string
  ): string {
    return `
      === PROFILO UTENTE ===
      Nome: ${firstName} ${lastName}
      Email: ${email}
      Ruolo: ${role}
      Indirizzo: ${zip} ${city}, ${country}
    `;
  }
}