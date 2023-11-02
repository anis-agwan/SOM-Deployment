package bu.som.assessment.login.registration.enums;

public enum UserRole {

        student("student"),
        faculty("faculty"),
        admin("admin");

    public final String role;

    private UserRole(String role) {
        this.role = role;
    }
}
