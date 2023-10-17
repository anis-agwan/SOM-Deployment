package bu.som.assessment.criticalThinking.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "ct_questions", schema = "critical_thinking")
@NoArgsConstructor
@AllArgsConstructor
public class CriticalThinkingQuestions {
    @Id
    @Column(name = "questionNumber")
    private int questionNumber;

    @Column(name = "sectionNumber")
    private int sectionNumber;

    @Column(name = "choiceA")
    private int choiceA;

    @Column(name = "choiceB")
    private int choiceB;

    @Column(name = "choiceC")
    private int choiceC;

    @Column(name = "questionDescription", length = 500)
    private String questionDescription;

    @Column(name = "questionOption_1", length = 500)
    private String questionOp1;

    @Column(name = "questionOption_2", length = 500)
    private String questionOp2;

    @Column(name = "sectionDescription", length = 500)
    private String sectionDescription;

    @Column(name = "optionDescription", length = 500)
    private String optionDescription;

    @Column(name = "answerOption_1", length = 500)
    private String answerOp1;

    @Column(name = "answerOption_2", length = 500)
    private String answerOp2;

    @Column(name = "answerOption_3", length = 500)
    private String answerOp3;


}
