package bu.som.assessment.login.registration.repository;

import bu.som.assessment.login.registration.entity.UserCompletionDetails;
import bu.som.assessment.login.registration.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UCompRepo extends JpaRepository<UserCompletionDetails, String> {
    public UserCompletionDetails findByBingNumber(String bNumber);
    public UserCompletionDetails findByEmailId(String email);
}
