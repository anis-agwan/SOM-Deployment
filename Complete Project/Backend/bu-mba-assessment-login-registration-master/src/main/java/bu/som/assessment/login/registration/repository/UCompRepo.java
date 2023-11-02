package bu.som.assessment.login.registration.repository;

import bu.som.assessment.login.registration.entity.UserCompletionDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UCompRepo extends JpaRepository<UserCompletionDetails, String> {
}
