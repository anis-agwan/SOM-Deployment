package bu.som.assessment.login.registration.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetails {
    @Id
    @Column(name = "EMAIL_ID")
    private String emailId;

    @Column(name = "B_NUMBER")
    private String bingNumber;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "CREATED_AT")
    private LocalDate createdAt;

    @Column(name = "UPDT_STAT_CD")
    private LocalDateTime updateStatusCode;

    @Column(name = "ROLE")
    private String role;
}
