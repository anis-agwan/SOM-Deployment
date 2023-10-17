package bu.som.assessment.situationQuestions.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "situation_questions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SituationQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Situation_Number")
    private Long SituationNumber;

    @Column(name = "Situation_Text", length = 4500)
    private String SituationText;

    @Column(name = "Prev_Situation_Number")
    private Long PrevSituationNumber;

    @Column(name = "Prev_Situation_Text", length = 4500)
    private String PrevSituationText;

    @Column(name = "Rank1_Text", length = 1000)
    private String Rank1Text;

    @Column(name = "Rank2_Text", length = 1000)
    private String Rank2Text;

    @Column(name = "Rank3_Text", length = 1000)
    private String Rank3Text;

    @Column(name = "Rank4_Text", length = 1000)
    private String Rank4Text;

    @Column(name = "Rank5_Text", length = 1000)
    private String Rank5Text;

    @Column(name = "Rank6_Text", length = 1000)
    private String Rank6Text;

}
