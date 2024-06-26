package bu.som.assessment.login.registration.controller;

import bu.som.assessment.login.registration.Dto.DeleteResponseDTO;
import bu.som.assessment.login.registration.Dto.ExistingUserDto;
import bu.som.assessment.login.registration.Dto.ForgotPassResponseDTO;
import bu.som.assessment.login.registration.Dto.ForgotPasswordDTO;
import bu.som.assessment.login.registration.Dto.LoginResponseDto;
import bu.som.assessment.login.registration.entity.EmailDetails;
import bu.som.assessment.login.registration.entity.UserCompletionDetails;
import bu.som.assessment.login.registration.entity.UserDetails;
import bu.som.assessment.login.registration.enums.UserRole;
import bu.som.assessment.login.registration.service.EmailServiceImpl;
import bu.som.assessment.login.registration.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/login")
@Slf4j
public class LoginController {

    @Autowired
    LoginService loginService;

    @Autowired
    private EmailServiceImpl emailService;

    @PostMapping("/verify-user")
    public LoginResponseDto verifyUser(@RequestBody ExistingUserDto existingUser) {
        try {
            return loginService.validateUserCredentials(existingUser);
        } catch (Exception e) {
            System.out.println("ERR:   "+e.getMessage());
            return new LoginResponseDto(null, null, null, null, "Invalid", null);
        }
    }

    @GetMapping("/getUser/{bb}")
    public LoginResponseDto getUserDets(@PathVariable("bb") String bn) {
        LoginResponseDto loggedUser = new LoginResponseDto();
        System.out.println("B_NUMBER IS "+bn);
        try {
            UserDetails user = loginService.getUserDetails(bn);
            loggedUser.setLastName(user.getLastName());
            loggedUser.setRole(user.getRole());
            loggedUser.setEmailId(user.getEmailId());
            loggedUser.setFirstName(user.getFirstName());
            loggedUser.setBingNumber(user.getBingNumber());
            loggedUser.setValidationIndicator("Valid");
            System.out.println(user);
            return loggedUser;

        } catch (Exception err) {
            System.out.println(err);

            return new LoginResponseDto(null, null, null, null, "Invalid", null);
        }
    }

    @PostMapping("checkUserExists")
    public LoginResponseDto checkUserEmailExists(@RequestBody HashMap<String, String> details) {
        LoginResponseDto loggedUser = new LoginResponseDto();
        System.out.println("Email IS "+details.get("email"));
        try {
            UserDetails user = loginService.checkUserExists(details.get("email"));
            loggedUser.setLastName(user.getLastName());
            loggedUser.setRole(user.getRole());
            loggedUser.setEmailId(user.getEmailId());
            loggedUser.setFirstName(user.getFirstName());
            loggedUser.setBingNumber(user.getBingNumber());
            loggedUser.setValidationIndicator("Valid");
            System.out.println(user);
            return loggedUser;

        } catch (Exception err) {
            System.out.println(err);

            return new LoginResponseDto(null, null, null, null, "Invalid", null);
        }
    }

    @PostMapping("generatetoken")
    public String genToken(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        System.out.println(forgotPasswordDTO);
        try {

            return loginService.generateToken(forgotPasswordDTO.getEmail());

        } catch (Exception err) {
            System.out.println(err);
        }
        return "No Such email found";
    }

    @PostMapping("confirmtoken")
    public ForgotPassResponseDTO confirmToken(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        try {
            return loginService.confirmToken(forgotPasswordDTO.getEmail(), forgotPasswordDTO.getToken());
        } catch (Exception err) {
            ForgotPassResponseDTO resp = new ForgotPassResponseDTO() ;
            resp.setEmail(forgotPasswordDTO.getEmail());
            resp.setIsValid(false);
            resp.setMessage("Invalid details and token");
            resp.setStatus(404);

            return resp;
        }

    }

    @PostMapping("newPassword")
    public ForgotPassResponseDTO newPasswordGen(@RequestBody HashMap<String, String> details) {
//        System.out.println("CONTROLLER EMAIL: " + details.get("email"));
        String email = details.get("email");
        String newPassword = details.get("newPassword");
        return loginService.newPassword(email, newPassword);
    }

    @PostMapping("updatestats")
    public void updateTimeStats(@RequestBody HashMap<String, String> emailMap) {
        String email = emailMap.get("email");
        String section = emailMap.get("section");
        loginService.updateStudentStats(email, section);
    }

    @GetMapping("getcomplete")
    public List<UserCompletionDetails> getStudents() {
        return loginService.getStudentCompletion();
    }

    @PostMapping("getstudcomplete")
    public boolean getStudentWhoComp(@RequestBody HashMap<String, String> details) {
        System.out.println(details.get("bnumber"));
        return loginService.getStudentDoneAll(details.get("bnumber"));
    }

    @PostMapping("invite")
    public String inviteUser(@RequestBody HashMap<String, String> details) {
        System.out.println(details.get("email"));
        String email = details.get("email");
        String mess = "";
        String role = details.get("role");
        if(role.equals(UserRole.faculty)) {
            System.out.println("FACULTY");
            return loginService.inviteFaculty(email);
        }
        return loginService.inviteStudent(email);
    }

    @PostMapping({"getfaculty"})
    public List<UserDetails> getFaculty(@RequestBody HashMap<String, String> details) {
        List<UserDetails> allFaculty = this.loginService.getAllFaculty((String)details.get("email"));
        System.out.println(allFaculty);
        return allFaculty;
    }

    @PostMapping({"deletefaculty"})
    public DeleteResponseDTO deleteFaculty(@RequestBody HashMap<String, String> details) {
        System.out.println((String)details.get("email"));
        return this.loginService.deleteFaculty((String)details.get("email"));
    }

    @PostMapping({"deletestudent"})
    public DeleteResponseDTO deleteStudent(@RequestBody HashMap<String, String> details) {
        System.out.println((String)details.get("email"));
        return this.loginService.deleteStudent((String)details.get("email"));
    }


}
