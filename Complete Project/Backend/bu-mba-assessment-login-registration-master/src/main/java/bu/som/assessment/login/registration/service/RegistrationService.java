package bu.som.assessment.login.registration.service;

import bu.som.assessment.login.registration.Dto.ForgotPassResponseDTO;
import bu.som.assessment.login.registration.Dto.NewUserDto;
import bu.som.assessment.login.registration.entity.EmailDetails;
import bu.som.assessment.login.registration.entity.TempToken;
import bu.som.assessment.login.registration.entity.UserCompletionDetails;
import bu.som.assessment.login.registration.entity.UserDetails;
import bu.som.assessment.login.registration.enums.UserRole;
import bu.som.assessment.login.registration.repository.TempTokenRepository;
import bu.som.assessment.login.registration.repository.UCompRepo;
import bu.som.assessment.login.registration.repository.UserDetailsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

@Service
@Slf4j
public class RegistrationService {

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    private UCompRepo uCompRepo;

    @Autowired
    TempTokenRepository tempTokenRepository;

    @Autowired
    private EmailServiceImpl emailService;

    public String saveUser(NewUserDto userDto, String userRole) throws SQLException, DataIntegrityViolationException {
            String message;

            if(userDetailsRepository.existsByBingNumber(userDto.getBingNumber())) {
                System.out.println("Duplicate BNUMBER");
                throw new DataIntegrityViolationException("Duplicate BNumber");
            }

            if (userDetailsRepository.existsById(userDto.getEmailId())) {
                message = "Error : Email / B-Number already exists";
            } else {
                UserDetails user = new UserDetails();
                UserCompletionDetails compU = new UserCompletionDetails();
//                user.setUpdateStatusCode("A");

                user.setBingNumber(userDto.getBingNumber());

                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                user.setEmailId(userDto.getEmailId());

                user.setPassword(userDto.getPassword());

                LocalDate date = LocalDate.now(ZoneId.of("America/New_York"));
//                System.out.println(date);
                user.setCreatedAt(date);

                LocalDateTime time = LocalDateTime.now(ZoneId.of("America/New_York"));
                user.setUpdateStatusCode(time);
                user.setRole(userRole);
                if(userRole.equals(UserRole.student.role)) {
                    compU.setEmailId(userDto.getEmailId());
                    compU.setBingNumber(userDto.getBingNumber());
                    compU.setFirstName(userDto.getFirstName());
                    compU.setLastName(userDto.getLastName());
                    compU.setPbComplete(false);
                    compU.setCtComplete(false);
                    compU.setDdComplete(false);
                    compU.setBiComplete(false);
                    compU.setUpdatePBTime(time);
                    compU.setUpdateCTTime(time);
                    compU.setUpdateDDTime(time);
                    compU.setUpdateBITime(time);
                    uCompRepo.save(compU);
                }
//                tempTokenRepository.deleteById(userDto.getEmailId());
                userDetailsRepository.save(user);


                message = userDto.getFirstName() + ", You have been registered...";
            }
            return message;
    }

    protected String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 12) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }

    public String generateToken(String email) {
        String token = new String();

        if(userDetailsRepository.existsById(email)) {
            token = "User already exists";
            System.out.println("User exists");

        } else {
//            UserDetails res = userDetailsRepository.findByEmailId(email);
            TempToken tempToken = new TempToken();
            tempToken.setEmailId(email);
            token = getSaltString();
            tempToken.setToken(token);
            tempTokenRepository.save(tempToken);
//            res.setToken(token);
//            userDetailsRepository.save(res);

            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(email);
            emailDetails.setSubject("Registration Token");
            emailDetails.setMsgBody("The following token is generated for registration. Please do no share this with anyone. \n" + token);
            emailService.sendSimpleMail(emailDetails);
        }

        return token;
    }

    public ForgotPassResponseDTO confirmToken(String email, String token) {
        String text = new String();
        ForgotPassResponseDTO responseDTO = new ForgotPassResponseDTO();
        if(tempTokenRepository.existsById(email)) {
            TempToken tempToken = tempTokenRepository.findByEmailId(email);
            System.out.println("BLAH BLAH " + tempToken);
            if(tempToken.getToken().equals(token)) {
                responseDTO.setEmail(email);
                responseDTO.setIsValid(true);
                responseDTO.setMessage("Token matches with the secret token");
                responseDTO.setStatus(200);
            } else {
                responseDTO.setEmail(email);
                responseDTO.setIsValid(false);
                responseDTO.setMessage("Token does not match with the secret token");
                responseDTO.setStatus(404);
            }
        } else {
            responseDTO.setEmail(email);
            responseDTO.setIsValid(false);
            responseDTO.setMessage("No such email found");
            responseDTO.setStatus(404);
        }
        System.out.println(responseDTO);
        return responseDTO;
    }
}