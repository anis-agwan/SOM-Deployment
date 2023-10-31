import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Page,
  Line,
  Svg,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import BIcon from "../images/BinghamtonIcon.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  horiLine: {
    width: 1000,
    height: 1,
    top: 2,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  bIcon: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    height: "80%",
    width: "100%",
    top: "15%",
    left: "5%",
    opacity: 0.06,
    margin: 10,
  },
  sname: {
    position: "relative",
    top: 20,
    left: 0,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Times-Roman",
  },
  bNumber: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Times-Roman",
  },
  date: {
    top: 23,
    fontSize: 14,
    fontWeight: 200,
    color: "grey",
    marginBottom: 40,
  },
  Score: {
    position: "relative",
    top: 40,
    left: 20,
    fontSize: 28,
    textAlign: "left",
    color: "#FA8D33",
  },
  text: {
    top: 1,
    left: 65,
    marginBottom: 7,
    fontSize: 16,
    fontWeight: 600,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  comment: {
    left: 65,
    marginRight: 100,
    fontSize: 14,
    fontWeight: 400,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    flexWrap: "wrap",
    color: "#525252",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 460,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  svgLine: {
    marginBottom: 20,
    left: -35,
    backgroundColor: "#E5E4E2",
    height: 1,
    top: 10,
    width: 600,
  },
});

const PdfV01 = ({ bNum, pbData, ctData, ddData, biData, studentInfo }) => {
  console.log(bNum);
  // console.log(pbData);
  // console.log(ctData);
  console.log(ddData);
  console.log(biData);
  console.log(studentInfo);

  const [todayDate, setTodayDate] = useState(new Date());
  const [monthName, setMonthName] = useState();
  // const

  useEffect(() => {
    const month = todayDate.toLocaleString("default", { month: "long" });

    console.log(month);
    setMonthName(month);
  });

  return (
    //Comment PDFViwer when not in use
    // <PDFViewer style={styles.viewer}>
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title} fixed>
          LEADERSHIP ASSESSMENT REPORT
        </Text>
        <Svg style={styles.svgLine} fixed>
          <Line
            x1="0"
            y1="3"
            x2="0"
            y2="3"
            strokeWidth={1}
            stroke="rgb(0,0,0)"
          />
        </Svg>
        <Text style={styles.sname}>
          {studentInfo.firstName} {studentInfo.lastName}
          <Text style={styles.bNumber}> ( {bNum} )</Text>
        </Text>
        <Text
          style={styles.date}
        >{`${monthName} ${todayDate.getDate()}, ${todayDate.getFullYear()}`}</Text>
        <Image style={styles.bIcon} src={BIcon} fixed></Image>

        {/* Personal Beliefs */}

        <Text style={styles.Score}>
          {Math.floor(pbData.openToChangeScore / 10) === 0
            ? `0${pbData.openToChangeScore}`
            : pbData.openToChangeScore}
        </Text>
        <Text style={styles.text}>Open to Change/New Ideas </Text>
        <Text style={styles.comment}>{pbData.openToChangeScoreComment}</Text>

        <Text style={styles.Score}>
          {Math.floor(pbData.coachingScore / 10) === 0
            ? `0${pbData.coachingScore}`
            : pbData.coachingScore}
        </Text>
        <Text style={styles.text}>Coaching Behaviors and Beliefs </Text>
        <Text style={styles.comment}>{pbData.coachingScoreComment}</Text>

        <Text style={styles.Score}>
          {Math.floor(pbData.empoweringScore / 10) === 0
            ? `0${pbData.empoweringScore}`
            : pbData.empoweringScore}
        </Text>
        <Text style={styles.text}>Empowerment Beliefs </Text>
        <Text style={styles.comment}>{pbData.empoweringScoreComment}</Text>

        <Text style={styles.Score}>
          {Math.floor(pbData.teamworkScore / 10) === 0
            ? `0${pbData.teamworkScore}`
            : pbData.teamworkScore}
        </Text>
        <Text style={styles.text}>Teamwork Beliefs </Text>
        <Text style={styles.comment}>{pbData.teamworkScoreComment}</Text>

        <Text style={styles.Score}>
          {Math.floor(pbData.planningAndOrganizingScore / 10) === 0
            ? `0${pbData.planningAndOrganizingScore}`
            : pbData.planningAndOrganizingScore}
        </Text>
        <Text style={styles.text}>Planning and Organizing </Text>
        <Text style={styles.comment}>
          {pbData.planningAndOrganizingScoreComment}
        </Text>

        {/* End of PB */}

        {/* Critical Thinking */}

        <Text style={styles.text}>" "</Text>

        <Text style={styles.text}>Little Doubt in CT section</Text>

        <Text style={styles.Score}>
          {Math.floor(ctData.sec1AnalysisScore / 10) === 0
            ? `0${ctData.sec1AnalysisScore}`
            : ctData.sec1AnalysisScore}
        </Text>
        <Text style={styles.text}>Analyses Critical Thinking</Text>
        <Text style={styles.comment}>{ctData.analysesScoreComment}</Text>

        <Text style={styles.Score}>
          {Math.floor(ctData.sec2ConnectionsScore / 10) === 0
            ? `0${ctData.sec2ConnectionsScore}`
            : ctData.sec2ConnectionsScore}
        </Text>
        <Text style={styles.text}>Decisiveness Critical Thinking</Text>
        <Text style={styles.comment}>{ctData.decisivenessScoreComment}</Text>

        <Text style={styles.Score}>
          {Math.floor(ctData.sec3DepthScore / 10) === 0
            ? `0${ctData.sec3DepthScore}`
            : ctData.sec3DepthScore}
        </Text>
        <Text style={styles.text}>Logical Reasoning Critical Thinking</Text>
        <Text style={styles.comment}>
          {ctData.logicalReasoningScoreComment}
        </Text>

        {/* End of CT */}

        {/* Difficult Decisions */}

        <Text style={styles.Score}>
          {Math.floor(ddData.rankScore.convertedRankDecisionScore / 10) === 0
            ? `0${ddData.rankScore.convertedRankDecisionScore}`
            : ddData.rankScore.convertedRankDecisionScore}
        </Text>
        <Text style={styles.text}>Judgement </Text>
        <Text style={styles.comment}>
          {ddData.rankScore.judgementScoreComment}
        </Text>

        <Text style={styles.Score}>
          {Math.floor(
            ddData.rateScore.convertedDesirabilityDecisionsScore / 10
          ) === 0
            ? `0${ddData.rateScore.convertedDesirabilityDecisionsScore}`
            : ddData.rateScore.convertedDesirabilityDecisionsScore}
        </Text>
        <Text style={styles.text}>Consideration of Alternatives </Text>
        <Text style={styles.comment}>
          {ddData.rateScore.considerationOfAlternativesScoreComment}
        </Text>

        {/* End of DD */}

        {/* Behavioral Interview */}
        <Text style={styles.Score}>
          {Math.floor(biData.biScoreIII / 10) === 0
            ? `0${biData.biScoreIII}`
            : biData.biScoreIII}
        </Text>
        <Text style={styles.text}>Idealized Influence and Inspiration </Text>
        <Text style={styles.comment}>{biData.biCommentIII}</Text>

        <Text style={styles.Score}>
          {Math.floor(biData.biScoreIS / 10) === 0
            ? `0${biData.biScoreIS}`
            : biData.biScoreIS}
        </Text>
        <Text style={styles.text}>Intellectual Stimulation </Text>
        <Text style={styles.comment}>{biData.biCommentIS}</Text>

        <Text style={styles.Score}>
          {Math.floor(biData.biScoreIC / 10) === 0
            ? `0${biData.biScoreIC}`
            : biData.biScoreIC}
        </Text>
        <Text style={styles.text}>Individualized Consideration </Text>
        <Text style={styles.comment}>{biData.biCommentIC}</Text>

        <Text style={styles.Score}>
          {Math.floor(biData.biScoreSR / 10) === 0
            ? `0${biData.biScoreSR}`
            : biData.biScoreSR}
        </Text>
        <Text style={styles.text}>Sharing Responsibility </Text>
        <Text style={styles.comment}>{biData.biCommentSR}</Text>

        <Text style={styles.Score}>
          {Math.floor(biData.biScoreSMI / 10) === 0
            ? `0${biData.biScoreSMI}`
            : biData.biScoreSMI}
        </Text>
        <Text style={styles.text}>Seeking More Information </Text>
        <Text style={styles.comment}>{biData.biCommentSMI}</Text>

        {/* End of DD */}

        <Text style={styles.Score}> 07 </Text>
        <Text style={styles.text}>
          Transactional Leadership (NEEDS TO BE CHANGED){" "}
        </Text>
        <Text style={styles.comment}>
          Clearly enjoys change. Solicits new ideas from others and acts on them
          to help produce change.
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
    // </PDFViewer>
    // comment PDFViewer
  );
};

export default PdfV01;
