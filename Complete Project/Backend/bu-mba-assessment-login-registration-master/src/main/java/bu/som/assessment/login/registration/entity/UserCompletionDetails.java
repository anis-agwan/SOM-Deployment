package bu.som.assessment.login.registration.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_completion_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCompletionDetails {

    @Id
    @Column(name = "EMAIL_ID")
    private String emailId;

    @Column(name = "B_NUMBER")
    private String bingNumber;

    @Column(name = "NAME_FIRST")
    private String firstName;

    @Column(name = "NAME_LAST")
    private String lastName;

    @Column(name = "COMPLETE_PB")
    private Boolean pbComplete;

    @Column(name = "UPDT_STAT_PB")
    private LocalDateTime updatePBTime;

    @Column(name = "COMPLETE_CT")
    private Boolean ctComplete;

    @Column(name = "UPDT_STAT_CT")
    private LocalDateTime updateCTTime;

    @Column(name = "COMPLETE_DD")
    private Boolean ddComplete;

    @Column(name = "UPDT_STAT_DD")
    private LocalDateTime updateDDTime;

    @Column(name = "COMPLETE_BI")
    private Boolean biComplete;

    @Column(name = "UPDT_STAT_BI")
    private LocalDateTime updateBITime;
}
