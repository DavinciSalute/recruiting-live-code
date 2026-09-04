// Materiale per l'esercizio di code analysis.
// Questo file NON fa parte della build Maven (non è sotto src/main/java): va solo
// letto, analizzato e commentato criticamente dal candidato (design, correttezza, edge case, ecc.),
// esattamente come la sua controparte TypeScript in typescript/code-analysis/user.ts.

package com.recruiting.codeanalysis;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

class EmailValidator {
    boolean check(String e) {
        return e.indexOf('@') != -1;
    }
}

class MailChecker {
    boolean isValid(String email) {
        return email.contains("@") && email.contains(".");
    }
}

class BaseUser {
    List<String> getPermissions() {
        return List.of("read", "write", "delete");
    }

    String getDashboard() {
        return "full-dashboard";
    }
}

class GuestUser extends BaseUser {
    @Override
    List<String> getPermissions() {
        throw new UnsupportedOperationException("Guests have no permissions");
    }

    @Override
    String getDashboard() {
        throw new UnsupportedOperationException("Guests have no dashboard");
    }

    String getGuestToken() {
        return "guest-" + UUID.randomUUID().toString().substring(0, 8);
    }
}

public class User {

    private List<String> _tempValidationErrors;
    private String _tempHashedPwd;

    // valida, calcola permessi, calcola rate limit, hasha, audita, notifica
    public Map<String, Object> createUser(
            String firstName,
            String lastName,
            String e,
            String pwd,
            int age,
            boolean isAdmin,
            String country,
            String city,
            String zip,
            String street,
            String phone,
            String taxCode,
            String role
    ) {
        // — sezione 1: validazione input
        EmailValidator validator = new EmailValidator();
        if (!validator.check(e)) throw new RuntimeException("bad email");
        if (pwd.length() < 8) throw new RuntimeException("bad pwd");
        if (age < 0 || age > 130) throw new RuntimeException("bad age");
        if (!Pattern.matches("^\\+?[0-9]{7,15}$", phone)) throw new RuntimeException("bad phone");
        if (!Pattern.matches("^[0-9]{5}$", zip)) throw new RuntimeException("bad zip");
        if (taxCode == null || taxCode.trim().isEmpty()) throw new RuntimeException("bad taxCode");

        // — sezione 2: calcolo permessi
        List<String> permissions;
        switch (role) {
            case "admin":  permissions = List.of("read", "write", "delete", "manage_users"); break;
            case "editor": permissions = List.of("read", "write"); break;
            case "viewer": permissions = List.of("read"); break;
            default:       permissions = List.of();
        }

        // — sezione 3: calcolo rate limit
        int apiCallsLimit;
        switch (role) {
            case "admin":  apiCallsLimit = 10000; break;
            case "editor": apiCallsLimit = 1000;  break;
            case "viewer": apiCallsLimit = 100;   break;
            default:       apiCallsLimit = 10;
        }

        // — sezione 4: hashing password
        this._tempValidationErrors = new ArrayList<>();
        this._tempHashedPwd = "hashed_" + pwd;

        // — sezione 5: costruzione oggetto utente
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("firstName", firstName);
        user.put("lastName", lastName);
        user.put("email", e);
        user.put("password", this._tempHashedPwd);
        user.put("age", age);
        user.put("isAdmin", isAdmin);
        user.put("country", country);
        user.put("city", city);
        user.put("zip", zip);
        user.put("street", street);
        user.put("phone", phone);
        user.put("taxCode", taxCode);
        user.put("permissions", permissions);
        user.put("apiCallsLimit", apiCallsLimit);

        // — sezione 6: audit
        System.out.println("[AUDIT] User created: " + firstName + " " + lastName + ", role: " + role);
        System.out.println("[AUDIT] Address: " + street + ", " + zip + " " + city + ", " + country);
        if (isAdmin) {
            System.out.println("[AUDIT] WARNING: admin user created");
            System.out.println("[AUDIT] taxCode: " + taxCode);
        }

        // — sezione 7: notifica di benvenuto
        String welcomeMessage;
        if (role.equals("admin")) {
            welcomeMessage = "Ciao " + firstName + "! Hai accesso amministratore."
                    + " Ricordati di abilitare il 2FA al primo accesso.";
        } else {
            welcomeMessage = "Ciao " + firstName + "! Benvenuto sulla piattaforma."
                    + " Il tuo account è stato creato con ruolo " + role + "."
                    + " Accedi con la tua email: " + e + ".";
        }
        System.out.println("[NOTIFY] " + welcomeMessage);

        this._tempValidationErrors = null;
        this._tempHashedPwd = null;

        return user;
    }

    public Map<String, Object> updateUser(
            String userId,
            String firstName,
            String lastName,
            String e,
            String pwd,
            int age,
            boolean isAdmin,
            String country,
            String city,
            String zip,
            String street,
            String phone,
            String taxCode,
            String role
    ) {
        // — sezione 1: validazione
        MailChecker checker = new MailChecker();
        if (!checker.isValid(e)) throw new RuntimeException("bad email");
        if (pwd.length() < 8) throw new RuntimeException("bad pwd");
        if (age < 0 || age > 130) throw new RuntimeException("bad age");
        if (!Pattern.matches("^\\+?[0-9]{7,15}$", phone)) throw new RuntimeException("bad phone");
        if (!Pattern.matches("^[0-9]{5}$", zip)) throw new RuntimeException("bad zip");

        // — sezione 2: calcolo permessi
        List<String> permissions;
        if (role.equals("admin")) {
            permissions = List.of("read", "write", "delete", "manage_users");
        } else if (role.equals("editor")) {
            permissions = List.of("read", "write");
        } else if (role.equals("viewer")) {
            permissions = List.of("read");
        } else {
            permissions = List.of();
        }

        System.out.println("[AUDIT] User updated: " + firstName + " " + lastName + ", role: " + role);
        System.out.println("[AUDIT] Address: " + street + ", " + zip + " " + city + ", " + country);
        if (isAdmin) {
            System.out.println("[AUDIT] WARNING: admin user updated");
            System.out.println("[AUDIT] taxCode: " + taxCode);
        }

        Map<String, Object> user = new LinkedHashMap<>();
        user.put("userId", userId);
        user.put("firstName", firstName);
        user.put("lastName", lastName);
        user.put("email", e);
        user.put("age", age);
        user.put("isAdmin", isAdmin);
        user.put("country", country);
        user.put("city", city);
        user.put("zip", zip);
        user.put("street", street);
        user.put("phone", phone);
        user.put("taxCode", taxCode);
        user.put("permissions", permissions);

        return user;
    }

    public Object findByEmail(String email) {
        System.out.println("[DB] SELECT * FROM users WHERE email = '" + email + "'");
        return null;
    }

    public void resetPassword(String userId, String newPwd) {
        // — sezione 1: validazione
        if (newPwd.length() < 8) throw new RuntimeException("bad pwd");
        if (!Pattern.compile("^(?=.*[A-Z])(?=.*[0-9])").matcher(newPwd).find()) {
            throw new RuntimeException("pwd too weak");
        }

        // — sezione 2: hashing
        String hashed = "hashed_" + newPwd;

        // — sezione 3: salvataggio
        System.out.println("[DB] UPDATE users SET password = '" + hashed + "' WHERE id = '" + userId + "'");

        // — sezione 4: audit
        System.out.println("[AUDIT] Password reset for userId: " + userId);

        // — sezione 5: notifica
        System.out.println("[NOTIFY] La tua password è stata aggiornata.");
    }

    public String formatUserProfile(
            String firstName, String lastName,
            String email, String role,
            String country, String city, String zip
    ) {
        return """

              === PROFILO UTENTE ===
              Nome: %s %s
              Email: %s
              Ruolo: %s
              Indirizzo: %s %s, %s
            """.formatted(firstName, lastName, email, role, zip, city, country);
    }
}
