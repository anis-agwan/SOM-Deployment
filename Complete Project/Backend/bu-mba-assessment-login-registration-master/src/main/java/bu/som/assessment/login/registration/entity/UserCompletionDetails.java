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

    @Column(name = "PB_COMPLETE")
    private Boolean pbComplete;

    @Column(name = "UPDT_STAT_PB")
    private LocalDateTime updatePBTime;

    @Column(name = "CT_COMPLETE")
    private Boolean ctComplete;

    @Column(name = "UPDT_STAT_CT")
    private LocalDateTime updateCTTime;

    @Column(name = "DD_COMPLETE")
    private Boolean ddComplete;

    @Column(name = "UPDT_STAT_DD")
    private LocalDateTime updateDDTime;
}
