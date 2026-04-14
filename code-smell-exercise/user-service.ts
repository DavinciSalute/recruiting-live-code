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
  
  class UserService {
    private _tempValidationErrors: string[] | undefined;
    private _tempHashedPwd: string | undefined;
  
    createUser(
      firstName: string,
      lastName: string,
      e: string,
      pwd: string,
      age: number,
      isAdmin: boolean,
      country: string,
      zip: string,
      role: string
    ) {
      let permissions: string[];
      switch (role) {
        case 'admin':   permissions = ['read', 'write', 'delete', 'manage_users']; break;
        case 'editor':  permissions = ['read', 'write']; break;
        case 'viewer':  permissions = ['read']; break;
        default:        permissions = [];
      }
  
      let apiCallsLimit: number;
      switch (role) {
        case 'admin':  apiCallsLimit = 10000; break;
        case 'editor': apiCallsLimit = 1000;  break;
        case 'viewer': apiCallsLimit = 100;   break;
        default:       apiCallsLimit = 10;
      }
  
      const validator = new EmailValidator();
      if (!validator.check(e)) throw new Error('bad email');
      if (pwd.length < 8) throw new Error('bad pwd');
      if (age < 0 || age > 130) throw new Error('bad age');
  
      this._tempValidationErrors = [];
      this._tempHashedPwd = `hashed_${pwd}`;
  
      const user = {
        firstName, lastName, email: e,
        password: this._tempHashedPwd,
        age, isAdmin, country, zip,
        permissions, apiCallsLimit,
      };
  
      this._tempValidationErrors = undefined;
      this._tempHashedPwd = undefined;
  
      return user;
    }
  
    updateUser(
      userId: string, firstName: string, lastName: string,
      e: string, pwd: string, age: number,
      isAdmin: boolean, country: string, zip: string, role: string
    ) {
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
  
      const checker = new MailChecker();
      if (!checker.isValid(e)) throw new Error('bad email');
      if (pwd.length < 8) throw new Error('bad pwd');
  
      return { userId, firstName, lastName, email: e, age, isAdmin, permissions };
    }
  }