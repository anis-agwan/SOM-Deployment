package bu.som.assessment.login.registration.Dto;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
public class UserCompleteDTO {
    private String emailId;
    private String bingNumber;
    private Boolean pbComplete;
    private LocalDateTime updatePBTime;
    private Boolean ctComplete;
    private LocalDateTime updateCTTime;
    private Boolean ddComplete;
    private LocalDateTime updateDDTime;
}
