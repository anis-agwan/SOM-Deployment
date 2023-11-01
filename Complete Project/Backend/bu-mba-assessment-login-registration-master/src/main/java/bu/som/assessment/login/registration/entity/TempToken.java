package bu.som.assessment.login.registration.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "temp_token")
@Data
public class TempToken {

    @Id
    @Column(name = "EMAIL_ID")
    private String emailId;

    @Column(name = "TOKEN")
    private String token;
}
