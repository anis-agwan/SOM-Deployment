package bu.som.assessment.login.registration.repository;

import bu.som.assessment.login.registration.entity.TempToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempTokenRepository extends JpaRepository<TempToken, String> {
    public TempToken findByEmailId(String email);
}
