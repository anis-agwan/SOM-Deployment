import React, { useState, useRef } from "react";
import "./SidePanel.css";

import { useNavigate } from "react-router-dom";
import downloadPDF from "../images/downloadPDF.svg";
import searchLogo from "../images/search-icon.svg";
import { ReportPB } from "./reportPB";
import axios from "axios";
import { ReportCT } from "./reportCT";
import { ReportDD } from "./reportDD";
import { BIReport } from "./BIReport";
import PdfV01 from "../PDFFiles/PdfV01";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BIMenus from "./BIMenus";

function SidePanel() {
  let navigate = useNavigate();

  const [Dashactive, setDashActive] = useState(true);
  const [PBactive, setPBActive] = useState(false);
  const [CAactive, setCAActive] = useState(false);
  const [DDactive, setDDActive] = useState(false);
  const [BIactive, setBIActive] = useState(false);
  const [SRactive, setSRActive] = useState(false);
  const [DashShow, setDashShow] = useState(true);
  const [PBShow, setPBShow] = useState(false);
  const [CAShow, setCAShow] = useState(false);
  const [DDShow, setDDShow] = useState(false);
  const [BIShow, setBIShow] = useState(false);
  const [BIStudentFormShow, setBIStudentFormShow] = useState(true);
  const [SRShow, setSRShow] = useState(false);
  const [showPDFBtn, setShowPDFBtn] = useState(false);

  const [bNum, setBNum] = useState();
  const [bNumIsValid, setBNumValid] = useState(false);

  const [graphPBShow, setPBGraphShow] = useState(false);
  const [graphCTShow, setCTGraphShow] = useState(false);
  const [graphDDSHow, setDDGraphShow] = useState(false);
  const [graphBIShow, setBIGraphShow] = useState(false);
  const [student, setStudent] = useState();
  const [isUserValid, setUserValid] = useState(false);
  const [enteredFName, setEnteredFName] = useState("");
  const [enteredLName, setEnteredLName] = useState("");
  const [enteredDetails, setEnteredDetails] = useState({});

  const [pbData, setPBData] = useState();
  const [ctData, setCTData] = useState();
  const [ddData, setDDData] = useState();
  const [biData, setBIData] = useState();
  const [isDataLoading, setIsDataLoading] = useState(false);

  const ShowDash = () => {
    if (DashShow === true) {
      setDashShow(true);
    } else {
      setBIStudentFormShow(true);
      setDashShow(true);
      setPBShow(false);
      setCAShow(false);
      setDDShow(false);
      setBIShow(false);
      setSRShow(false);
      setBIGraphShow(false);
    }
    setDashActive(true);
    setPBActive(false);
    setCAActive(false);
    setDDActive(false);
    setBIActive(false);
    setSRActive(false);
    setShowPDFBtn(false);
    setBIGraphShow(false);
  };

  const ShowPB = () => {
    if (PBShow === true) {
      setPBShow(true);
    } else {
      setBIStudentFormShow(true);
      setPBShow(true);
      setCAShow(false);
      setDDShow(false);
      setBIShow(false);
      setSRShow(false);
      setDashShow(false);
      setBIGraphShow(false);
    }
    setDashActive(false);
    setPBActive(true);
    setCAActive(false);
    setDDActive(false);
    setBIActive(false);
    setSRActive(false);
    setShowPDFBtn(false);
    setBIGraphShow(false);
  };

  const ShowCA = () => {
    if (CAShow === true) {
      setCAShow(true);
    } else {
      setBIStudentFormShow(true);
      setCAShow(true);
      setPBShow(false);
      setDDShow(false);
      setBIShow(false);
      setSRShow(false);
      setDashShow(false);
      setBIGraphShow(false);
    }
    setDashActive(false);
    setPBActive(false);
    setCAActive(true);
    setDDActive(false);
    setBIActive(false);
    setSRActive(false);
    setShowPDFBtn(false);
    setBIGraphShow(false);
  };

  const ShowDD = () => {
    if (DDShow === true) {
      setDDShow(true);
    } else {
      setBIStudentFormShow(true);
      setDDShow(true);
      setPBShow(false);
      setCAShow(false);
      setBIShow(false);
      setSRShow(false);
      setDashShow(false);
      setBIGraphShow(false);
    }
    setDashActive(false);
    setPBActive(false);
    setCAActive(false);
    setDDActive(true);
    setBIActive(false);
    setSRActive(false);
    setBIGraphShow(false);
  };

  const ShowBI = () => {
    if (BIShow === true) {
      setBIShow(true);
      setBIStudentFormShow(true);
    } else {
      setBIShow(true);
      setPBShow(false);
      setCAShow(false);
      setDDShow(false);
      setSRShow(false);
      setDashShow(false);
    }
    setDashActive(false);
    setPBActive(false);
    setCAActive(false);
    setDDActive(false);
    setBIActive(true);
    setSRActive(false);
    setShowPDFBtn(false);
  };

  const handleBIStudentInfoSumbit = async (event) => {
    event.preventDefault();
    const baseUrl = "http://3.13.110.40:8080/login-register/login/";
    const url = `${baseUrl}getUser/${bNum}`;

    await axios
      .get(url)
      .then((res) => {
        if (res.data.validationIndicator === "Valid") {
          console.log(res.data);
          setEnteredDetails({
            bingNumber: bNum,
          });
          console.log(enteredDetails);
          if (BIShow === true) {
            setBIShow(true);
            setBIStudentFormShow(false);
          } else {
            setBIStudentFormShow(false);
            setBIShow(true);
            setPBShow(false);
            setCAShow(false);
            setDDShow(false);
            setSRShow(false);
            setDashShow(false);
          }
          setDashActive(false);
          setPBActive(false);
          setCAActive(false);
          setDDActive(false);
          setBIActive(true);
          setSRActive(false);
          setShowPDFBtn(false);
        } else {
          alert("Details are incorrect");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ShowSR = () => {
    if (SRShow === true) {
      setSRShow(true);
    } else {
      setBIStudentFormShow(true);
      setSRShow(true);
      setPBShow(false);
      setCAShow(false);
      setBIShow(false);
      setDDShow(false);
      setDashShow(false);
    }
    setDashActive(false);
    setPBActive(false);
    setCAActive(false);
    setDDActive(false);
    setBIActive(false);
    setSRActive(true);
    setBIStudentFormShow(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handlePDFClick = async (event) => {
    await delay(1000);
    setShowPDFBtn(false);
  };

  const bNumChangeHandler = (event) => {
    var regexConst = /^B\d{8}$/;
    console.log(event.target.value);
    if (regexConst.test(event.target.value)) {
      setBNumValid(true);
      setBNum(event.target.value);
    } else {
      setBNumValid(false);
      setBNum("");
      setPBGraphShow(false);
      setCTGraphShow(false);
      setDDGraphShow(false);
      setUserValid(false);
      setBIGraphShow(false);
      setShowPDFBtn(false);
    }
    console.log(bNumIsValid);
  };

  const fNameChangeHandler = (event) => {
    console.log(enteredFName);
    setEnteredFName(event.target.value);
  };

  const lNameChangeHandler = (event) => {
    console.log(enteredLName);
    setEnteredLName(event.target.value);
  };

  const getUserDets = async (bnumber) => {
    const baseUrl = `http://3.13.110.40:8080/login-register/login/getUser/${bnumber}`;

    try {
      const res = await axios.get(baseUrl);
      console.log(res.data);
      if (res.data.validationIndicator === "Valid") {
        console.log("USER FETS");
        setStudent(res.data);
        setUserValid(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPBData = async () => {
    const baseURL = "http://3.13.110.40:8441/personal-beliefs/pb/getScores";
    if (bNumIsValid) {
      try {
        const response = await axios.get(`${baseURL}/${bNum}`);
        // console.log("Got PB results");
        // console.log(response.data);

        // return scoreArr;
        return response.data;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("NOT VALID");
    }
  };

  const getCTData = async () => {
    const baseURL =
      "http://3.14.159.174:8442/critical-thinking/critical-thinking/getScores";
    if (bNumIsValid) {
      try {
        const response = await axios.get(`${baseURL}/${bNum}`);
        console.log("Got CT results");
        // console.log(response.data);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("NOT VALID");
    }
  };

  const getDDData = async () => {
    const baseRankURL = "http://3.14.159.174:8443/situation_q/sq/getRankScores";
    const baseRateURL = "http://3.14.159.174:8443/situation_q/sq/getRateScores";

    if (bNumIsValid) {
      try {
        const response1 = await axios.get(`${baseRankURL}/${bNum}`);
        const response2 = await axios.get(`${baseRateURL}/${bNum}`);

        return { rankScore: response1.data, rateScore: response2.data };
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("NOT VALID");
    }
  };

  const getBIData = async () => {
    const baseURL = "http://3.14.159.174:8448/bbim/bi/getScores";
    try {
      const response = await axios.get(`${baseURL}/${bNum}`);
      // console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const pdfReportsSearch = async (event) => {
    event.preventDefault();

    setIsDataLoading(true);

    await getPBData().then((res) => {
      setPBData(res);
    });
    // console.log(pb);
    await getCTData().then((res) => {
      setCTData(res);
    });

    await getDDData().then((res) => {
      setDDData(res);
    });

    await getBIData().then((res) => {
      setBIData(res);
    });

    await getUserDets(bNum);

    // setPBData(pb);

    setShowPDFBtn(true);
    setIsDataLoading(false);
  };

  const bNumSearchSubmit = (event) => {
    event.preventDefault();
    if (bNumIsValid) {
      //   console.log(bNum);
      setUserValid(false);
      getUserDets(bNum);
      setPBGraphShow(true);
      setCTGraphShow(true);
      setDDGraphShow(true);
    } else {
      setPBGraphShow(false);
      setCTGraphShow(false);
      setDDGraphShow(false);
    }
  };

  const ddBnumSearchSubmit = (event) => {
    event.preventDefault();
    if (bNumIsValid) {
      setUserValid(false);
      getUserDets(bNum);
      setDDGraphShow(true);
    } else {
      setDDGraphShow(false);
    }
  };

  const biBnumSearchSubmit = (event) => {
    event.preventDefault();
    if (bNumIsValid) {
      setUserValid(false);
      getUserDets(bNum);
      setBIStudentFormShow(false);
      setBIGraphShow(true);
    } else {
      setBIGraphShow(false);
      setBIStudentFormShow(true);
    }
  };

  const logoutRoute = () => {
    let path = `/`;
    navigate(path);
  };

  const inputRef = useRef(null);
  return (
    <div className="ReportsMainContainer">
      <div className="LeftSection">
        <div className="AdminPanelTitle">
          <h4 className="AdminPanelTitleText">ADMIN PANEL</h4>
        </div>
        <div className="UserNameTitle">
          <h2 className="UserNameTitleText">User Name</h2>
        </div>
        <button id="btnClick" onClick={ShowDash} className="BtnContainer">
          <h2
            className="TitleText"
            style={{ color: Dashactive ? "#30FFC7" : "#f8f8f8" }}
          >
            Dashboard
          </h2>
        </button>
        <button id="btnClick" onClick={ShowPB} className="BtnContainer">
          <h2
            className="TitleText"
            style={{ color: PBactive ? "#30FFC7" : "#f8f8f8" }}
          >
            Personal Beliefs
          </h2>
        </button>
        <button id="btnClick" onClick={ShowCA} className="BtnContainer">
          <h2
            className="TitleText"
            style={{ color: CAactive ? "#30FFC7" : "#f8f8f8" }}
          >
            Critical Analysis
          </h2>
        </button>
        <button id="btnClick" onClick={ShowDD} className="BtnContainer">
          <h2
            className="TitleText"
            style={{ color: DDactive ? "#30FFC7" : "#f8f8f8" }}
          >
            Difficult Decisions
          </h2>
        </button>
        <button id="btnClick" onClick={ShowBI} className="BtnContainer">
          <h2
            className="TitleText"
            style={{ color: BIactive ? "#30FFC7" : "#f8f8f8" }}
          >
            Behavioral Interview
          </h2>
        </button>
        {/* <button id="btnClick" onClick={ShowSR} className="BtnContainer">
          <h2
            className="TitleText"
            style={{ color: SRactive ? "#30FFC7" : "#f8f8f8" }}
          >
            Student Records
          </h2>
        </button> */}
        <button onClick={logoutRoute} className="LogoutBtn">
          Logout
        </button>
      </div>
      {/* <div className="DashtSection">
               
            </div> */}
      <div>
        {DashShow && (
          <div>
            <div className="DashtSection">
              <h1>Dashboard</h1>
            </div>
            <div className="DashSearchBar">
              <div className="BIReports1">
                <input
                  ref={inputRef}
                  required
                  pattern="[b,B]{1}[0-9]{8}"
                  type="text"
                  placeholder="Please enter Student's B-Number"
                  onChange={bNumChangeHandler}
                />
              </div>
              <div className="BIReports">
                {!showPDFBtn && (
                  <>
                    <img
                      src={searchLogo}
                      alt="Avatar"
                      className="searchImage"
                    />
                    <button className="BIReports2" onClick={pdfReportsSearch}>
                      Search Student Reports
                    </button>
                  </>
                )}
                {showPDFBtn && (
                  <>
                    <img
                      src={downloadPDF}
                      alt="Avatar"
                      className="searchImage"
                    />
                    <PDFDownloadLink
                      className="PDFV01"
                      document={
                        <PdfV01
                          bNum={bNum}
                          pbData={pbData}
                          ctData={ctData}
                          ddData={ddData}
                          biData={biData}
                          studentInfo={student}
                        />
                      }
                      fileName={`${bNum} + "_MBA_Assessment_Report`}
                    >
                      {({ loading }) =>
                        loading ? (
                          <button className="BIReports2">loading PDF...</button>
                        ) : (
                          <button
                            className="BIReports2"
                            onClick={handlePDFClick}
                          >
                            Download PDF
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {PBShow && (
          <div>
            <form action="/DashReports">
              <div className="DashSearchBar">
                <div className="BIReports1">
                  <input
                    ref={inputRef}
                    required
                    type="text"
                    placeholder="Please enter Student's B-Number"
                    onChange={bNumChangeHandler}
                  />
                </div>
                <div className="BIReports">
                  <img src={searchLogo} alt="Avatar" className="searchImage" />
                  <button className="BIReports2" onClick={bNumSearchSubmit}>
                    Search Student Reports
                  </button>
                </div>
              </div>
            </form>
            <div className="PBRightSection">
              {/**Graphs can be added here */}
              <h1>Personal Belief Student Grpahs</h1>
              {graphPBShow && <ReportPB bnum={bNum} />}
            </div>
            <div className="PBRightRecords">
              {/**Graphs can be added here */}
              <h1>Student details in text</h1>
              {isUserValid ? (
                <div>
                  <p>{student.firstName}</p>
                  <p>{student.lastName}</p>
                  <p>{student.emailId}</p>
                  <p>{student.bingNumber}</p>
                </div>
              ) : (
                <p>Getting User details</p>
              )}
            </div>
          </div>
        )}
        {CAShow && (
          <div>
            <form action="/DashReports">
              <div className="DashSearchBar">
                <div className="BIReports1">
                  <input
                    ref={inputRef}
                    required
                    // pattern="[b,B]{1}[0-9]{8}"
                    type="text"
                    placeholder="Please enter Student's B-Number"
                    onChange={bNumChangeHandler}
                  />
                </div>
                <div className="BIReports">
                  <img src={searchLogo} alt="Avatar" className="searchImage" />
                  <button className="BIReports2" onClick={bNumSearchSubmit}>
                    Search Student Reports
                  </button>
                </div>
              </div>
            </form>
            <div className="PBRightSection">
              {/**Graphs can be added here */}
              <h1>Critical Analysis Student Grpahs</h1>
              {graphCTShow && <ReportCT bnum={bNum} />}
            </div>
            <div className="PBRightRecords">
              {/**Graphs can be added here */}
              <h1>Student details in text</h1>
              {isUserValid ? (
                <div>
                  <p>{student.firstName}</p>
                  <p>{student.lastName}</p>
                  <p>{student.emailId}</p>
                  <p>{student.bingNumber}</p>
                </div>
              ) : (
                <p>Getting User details</p>
              )}
            </div>
          </div>
        )}
        {DDShow && (
          <div>
            <form action="/DashReports">
              <div className="DashSearchBar">
                <div className="BIReports1">
                  <input
                    ref={inputRef}
                    required
                    // pattern="[b,B]{1}[0-9]{8}"
                    type="text"
                    placeholder="Please enter Student's B-Number"
                    onChange={bNumChangeHandler}
                  />
                </div>
                <div className="BIReports">
                  <img src={searchLogo} alt="Avatar" className="searchImage" />
                  <button className="BIReports2" onClick={ddBnumSearchSubmit}>
                    Search Student Reports
                  </button>
                </div>
              </div>
            </form>
            <div className="PBRightSection">
              {/**Graphs can be added here */}
              <h1>Difficult Decisions Student Grpahs</h1>
              {graphDDSHow && <ReportDD bnum={bNum} />}
            </div>
            <div className="PBRightRecords">
              {/**Graphs can be added here */}
              <h1>Student details in text</h1>
              {isUserValid ? (
                <div>
                  <p>{student.firstName}</p>
                  <p>{student.lastName}</p>
                  <p>{student.emailId}</p>
                  <p>{student.bingNumber}</p>
                </div>
              ) : (
                <p>Getting User details</p>
              )}
            </div>
          </div>
        )}
        {BIShow && (
          <div className="BIMain">
            {/* <form action="/BIReports"> */}
            <div className="BISearchBar">
              <div className="BIReports1">
                <input
                  ref={inputRef}
                  required
                  // pattern="[b,B]{1}[0-9]{8}"
                  type="text"
                  placeholder="Please enter Student's B-Number for behavioral reports"
                  onChange={bNumChangeHandler}
                />
              </div>
              <div className="BIReports">
                <img src={searchLogo} alt="Avatar" className="searchImage" />
                <button className="BIReports2" onClick={biBnumSearchSubmit}>
                  Behavioral Interview Reports
                </button>
              </div>
            </div>
            {/* </form> */}
            {graphBIShow ? (
              <div>
                <div className="PBRightSection">
                  {/**Graphs can be added here */}
                  <h1>Behavioral Student Grpahs</h1>
                  {graphBIShow && <BIReport bnum={bNum} />}
                </div>
                <div className="PBRightRecords">
                  {/**Graphs can be added here */}
                  <h1>Student details in text</h1>
                  {isUserValid ? (
                    <div>
                      <p>{student.firstName}</p>
                      <p>{student.lastName}</p>
                      <p>{student.emailId}</p>
                      <p>{student.bingNumber}</p>
                    </div>
                  ) : (
                    <p>Getting User details</p>
                  )}
                </div>
              </div>
            ) : BIStudentFormShow ? (
              <div className="BIStudentInfoMainFrame">
                <div className="BIStudentsInfoTitle">
                  Enter Students Details
                </div>
                <form className="BIStudentinfoForm">
                  <div className="BINameDiv">
                    <label className="BIFNameLabel" htmlFor="fname">
                      First name:
                    </label>
                    <input
                      className="BIFNameInput"
                      type="text"
                      id="fname"
                      placeholder="ABC"
                      onChange={fNameChangeHandler}
                    />
                  </div>
                  <div className="BINameDiv">
                    <label className="BILNameLabel" htmlFor="lname">
                      Last name:
                    </label>
                    <input
                      className="BILNameInput"
                      type="text"
                      id="lname"
                      placeholder="XYZ"
                      onChange={lNameChangeHandler}
                    />
                  </div>
                  <div className="BINameDiv">
                    <label className="BIBNumberLabel" htmlFor="bNumber">
                      B-Number:
                    </label>
                    <input
                      className="BIBNumberInput"
                      type="text"
                      id="bNumber"
                      required
                      pattern="[b,B]{1}[0-9]{8}"
                      placeholder="B-00000000"
                      onChange={bNumChangeHandler}
                    />
                  </div>
                  <button
                    className="BISubmitBtn"
                    type="submit"
                    onClick={handleBIStudentInfoSumbit}
                    value="Submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <BIMenus bnumber={bNum} />
            )}
          </div>
        )}
        {SRShow && (
          <div>
            <form action="/SRReports">
              <div className="DashSearchBar">
                <div className="BIReports1">
                  <input
                    ref={inputRef}
                    required
                    pattern="[b,B]{1}[0-9]{8}"
                    type="text"
                    placeholder="Please enter Student's B-Number"
                  />
                </div>
                <div className="BIReports">
                  <img src={searchLogo} alt="Avatar" className="searchImage" />
                  <button className="BIReports2">
                    Search Student's Reports
                  </button>
                </div>
              </div>
            </form>
            <div className="DashtSection">
              <h1>Student Records</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidePanel;
