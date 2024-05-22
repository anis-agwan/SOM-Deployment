package bu.som.assessment.login.registration.service;

import bu.som.assessment.login.registration.Dto.DeleteResponseDTO;
import bu.som.assessment.login.registration.Dto.ExistingUserDto;
import bu.som.assessment.login.registration.Dto.ForgotPassResponseDTO;
import bu.som.assessment.login.registration.Dto.LoginResponseDto;
import bu.som.assessment.login.registration.Dto.UserCompleteDTO;
import bu.som.assessment.login.registration.entity.EmailDetails;
import bu.som.assessment.login.registration.entity.TempToken;
import bu.som.assessment.login.registration.entity.UserCompletionDetails;
import bu.som.assessment.login.registration.entity.UserDetails;
import bu.som.assessment.login.registration.enums.SectionEnum;
import bu.som.assessment.login.registration.repository.TempTokenRepository;
import bu.som.assessment.login.registration.repository.UCompRepo;
import bu.som.assessment.login.registration.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class LoginService {

    @Autowired
    private UserDetailsRepository repository;

    @Autowired
    private UCompRepo uCompRepo;

    @Autowired
    TempTokenRepository tempTokenRepository;

    @Autowired
    private EmailServiceImpl emailService;

    public LoginResponseDto validateUserCredentials(ExistingUserDto existingUser) {
        LoginResponseDto responseDto = new LoginResponseDto();
        if (repository.existsById(existingUser.getEmailId())) {
            Optional<UserDetails> dbUser = repository.findById(existingUser.getEmailId());
            if (dbUser.isPresent() && dbUser.get().getEmailId().equals(existingUser.getEmailId()) && dbUser.get().getPassword().equals(existingUser.getPassword())) {
                responseDto.setBingNumber(dbUser.get().getBingNumber());
                responseDto.setFirstName(dbUser.get().getFirstName());
                responseDto.setLastName(dbUser.get().getLastName());
                responseDto.setEmailId(dbUser.get().getEmailId());
                responseDto.setRole(dbUser.get().getRole());
                responseDto.setValidationIndicator("Valid");
            } else {
                responseDto.setValidationIndicator("Invalid");
            }
        } else {
            responseDto.setValidationIndicator("Invalid");
        }
        System.out.println(responseDto);
        return responseDto;
    }

    public UserDetails getUserDetails(String bNumber) {
        UserDetails user = new UserDetails();
        UserDetails res = repository.findByBingNumber(bNumber);
        res.setPassword("");
        return res;
    }

    public UserDetails checkUserExists(String email) {
        UserDetails user = new UserDetails();
        UserDetails res = repository.findByEmailId(email);
        res.setPassword("");
        return res;
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
        UserDetails user = repository.findByEmailId(email);
        System.out.println(user.getPassword());
        if(repository.existsById(email)) {
//            UserDetails res = repository.findByEmailId(email);
            System.out.println("TIll here");
            System.out.println("Password here");
            UserDetails user1 = repository.findByEmailId(email);
            System.out.println(user.getPassword());
            TempToken tempToken = new TempToken();
            tempToken.setEmailId(email);
            token = getSaltString();
            tempToken.setToken(token);
            tempTokenRepository.save(tempToken);

            System.out.println("After token Password here");
            UserDetails user2 = repository.findByEmailId(email);
            System.out.println(user.getPassword());

            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(email);
            emailDetails.setSubject("Password Recovery Token");
            emailDetails.setMsgBody("The following token is generated to recover your password. Please do no share this with anyone. \n" + token);
            emailService.sendSimpleMail(emailDetails);
        } else {
            token = "No such email";
            System.out.println("NO email");
        }

        return token;
    }

    public ForgotPassResponseDTO confirmToken(String email, String token) {
        ForgotPassResponseDTO responseDTO = new ForgotPassResponseDTO();
        if(repository.existsById(email)) {
            UserDetails res = repository.findByEmailId(email);
            TempToken tempToken = tempTokenRepository.findByEmailId(email);
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

    public ForgotPassResponseDTO newPassword(String email, String password) {

        ForgotPassResponseDTO responseDTO = new ForgotPassResponseDTO();
        if(repository.existsById(email)) {
            UserDetails res = repository.findByEmailId(email);
            res.setPassword(password);
            repository.save(res);
            tempTokenRepository.deleteById(email);
            responseDTO.setEmail(email);
            responseDTO.setIsValid(true);
            responseDTO.setMessage("Password changed successfully");
            responseDTO.setStatus(200);
            return responseDTO;
        } else {
            responseDTO.setEmail(email);
            responseDTO.setIsValid(false);
            responseDTO.setMessage("Error While changing password");
            responseDTO.setStatus(404);
            return responseDTO;
        }
    }

    public void updateStudentStats(String email, String section) {
        if(repository.existsById(email) && uCompRepo.existsById(email)) {
            UserDetails student = repository.findByEmailId(email);
            UserCompletionDetails user = uCompRepo.findByEmailId(email);
            LocalDateTime time = LocalDateTime.now(ZoneId.of("America/New_York"));
            student.setUpdateStatusCode(time);

            if (section.equals(SectionEnum.PB.section)) {
                user.setPbComplete(true);
                user.setUpdatePBTime(time);
            } else if (section.equals(SectionEnum.CT.section)) {
                user.setCtComplete(true);
                user.setUpdateCTTime(time);
            } else if (section.equals(SectionEnum.DD.section)) {
                user.setDdComplete(true);
                user.setUpdateDDTime(time);
            } else if (section.equals(SectionEnum.BI.section)) {
                user.setBiComplete(true);
                user.setUpdateBITime(time);
            }

            repository.save(student);
            uCompRepo.save(user);
        }
    }

    public List<UserCompletionDetails> getStudentCompletion() {
        return uCompRepo.findAll();
    }

    public boolean getStudentDoneAll(String bNum) {
        UserCompletionDetails user = uCompRepo.findByBingNumber(bNum);
        System.out.println(user);
        if(user.getCtComplete() && user.getPbComplete() && user.getBiComplete() && user.getDdComplete()) {
            return  true;
        }
        return false;
    }

    public String inviteStudent(String email) {
        String token = "http://3.20.242.19:3000/";
        String message = "";
        if(!repository.existsById(email)) {
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(email);
            emailDetails.setSubject("Invitation for SOM Leadership Assessment");
            emailDetails.setMsgBody("You have been invited to give SOM Leadership Assessment Quiz. You can access the below link to create a profile on the portal to start giving the assessment. Please do no share this with anyone. \n" + token);
            emailService.sendSimpleMail(emailDetails);
            message = "An invitation link is sent to the student at "+ email + " via email.";
        } else {
            message = "Student is already signed up";
        }

        return  message;
    }

    public String inviteFaculty(String email) {
        String token = "http://3.139.153.217:3000/";
        String message = "";
        if(!repository.existsById(email)) {
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(email);
            emailDetails.setSubject("Invitation for SOM Leadership Assessment Portal");
            emailDetails.setMsgBody("As a faculty of the SOM department, You have been invited to access student's SOM Leadership Assessment Quiz analyses. You can access the below link to create a profile on the portal to start accessing the portal. Please do no share this with anyone. \n" + token);
            emailService.sendSimpleMail(emailDetails);
            message = "An invitation link is sent to the faculty at "+ email + " via email.";
        } else {
            message = "Faculty is already signed up";
        }

        return  message;
    }

    public List<UserDetails> getAllFaculty(String email) {
        try {
            List<UserDetails> all = this.repository.findAll();
            List<UserDetails> allFaculty = new ArrayList<>();
            Iterator var4 = all.iterator();

            while(var4.hasNext()) {
                UserDetails user = (UserDetails)var4.next();
                if (user.getRole().contains("faculty") && !user.getEmailId().contains(email)) {
                    user.setPassword("");
                    allFaculty.add(user);
                }
            }

            System.out.println(allFaculty);
            return allFaculty;
        } catch (Exception var6) {
            Exception err = var6;
            System.out.println(err);
            return null;
        }
    }

    public DeleteResponseDTO deleteFaculty(String email) {
        new UserDetails();
        UserDetails res = this.repository.findByEmailId(email);
        DeleteResponseDTO response = new DeleteResponseDTO();
        if (res == null) {
            response.setIsDeleted(false);
            response.setEmail(email);
            response.setMessage("No such faculty found");
            response.setStatus(404);
            return response;
        } else {
            System.out.println(res);
            String role = res.getRole();
            if (role.equals("admin")) {
                response.setIsDeleted(false);
                response.setEmail(email);
                response.setMessage("Cant delete an admin");
                response.setStatus(101);
                return response;
            } else if (role.equals("faculty")) {
                try {
                    this.repository.deleteById(email);
                    System.out.println("Successfully deleted the faculty");
                    response.setIsDeleted(true);
                    response.setEmail(email);
                    response.setMessage("Successfully deleted the faculty");
                    response.setStatus(200);
                    return response;
                } catch (Exception var7) {
                    System.out.println("Cant delete");
                    response.setIsDeleted(false);
                    response.setEmail(email);
                    response.setMessage("Cant delete because of database issue");
                    response.setStatus(101);
                    return response;
                }
            } else {
                response.setIsDeleted(false);
                response.setEmail(email);
                response.setMessage("Can not delete a student");
                response.setStatus(101);
                return response;
            }
        }
    }

    public DeleteResponseDTO deleteStudent(String email) {
        new UserDetails();
        UserDetails res = this.repository.findByEmailId(email);
        DeleteResponseDTO response = new DeleteResponseDTO();
        if (res == null) {
            response.setIsDeleted(false);
            response.setEmail(email);
            response.setMessage("No such student found");
            response.setStatus(404);
            return response;
        } else {
            System.out.println(res);
            String role = res.getRole();
            if (role.equals("admin")) {
                response.setIsDeleted(false);
                response.setEmail(email);
                response.setMessage("Cant delete an admin");
                response.setStatus(101);
                return response;
            } else if (role.equals("student")) {
                try {
                    this.repository.deleteById(email);
                    this.uCompRepo.deleteById(email);
                    System.out.println("Successfully deleted the student");
                    response.setIsDeleted(true);
                    response.setEmail(email);
                    response.setMessage("Successfully deleted the student");
                    response.setStatus(200);
                    return response;
                } catch (Exception var7) {
                    System.out.println("Cant delete");
                    response.setIsDeleted(false);
                    response.setEmail(email);
                    response.setMessage("Cant delete because of database issue");
                    response.setStatus(101);
                    return response;
                }
            } else {
                response.setIsDeleted(false);
                response.setEmail(email);
                response.setMessage("Can not delete a faculty");
                response.setStatus(101);
                return response;
            }
        }
    }

}
