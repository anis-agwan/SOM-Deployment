package bu.som.assessment.login.registration.Dto;

import lombok.Data;

@Data
public class NewUserDto {
    private String emailId;
    private String firstName;
    private String lastName;
    private String bingNumber;
    private String password;
    private String role;

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBingNumber() {
        return bingNumber;
    }

    public void setBingNumber(String bingNumber) {
        this.bingNumber = bingNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
