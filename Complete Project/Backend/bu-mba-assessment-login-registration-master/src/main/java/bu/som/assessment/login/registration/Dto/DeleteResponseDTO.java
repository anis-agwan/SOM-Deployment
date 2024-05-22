package bu.som.assessment.login.registration.Dto;


import lombok.Data;

@Data
public class DeleteResponseDTO {
    String email;
    String message;
    Boolean isDeleted;
    Integer status;
}
