import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";

import { hideTabBar } from "../../utils/TabBar";
import useSetup from "../../hooks/setup/useSetup";
import { useDropzone } from "react-dropzone";
import { FC, useMemo, useState } from "react";
import { createWorker } from "tesseract.js";
import * as PDFJS from "pdfjs-dist";
import { RouteComponentProps } from "react-router";
import useFetchSubjects from "../../hooks/setup/useFetchSubjects";
import client from "../../client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NewStudentTypeSteps } from "../../types/student/post/NewStudentType";
import { newStudentAtom } from "../../atoms/student";
import { useAtom } from "jotai";
import useFetchAcademicYears from "../../hooks/setup/useFetchAcademicYears";
import useFetchCourses from "../../hooks/setup/useFetchCourses";
import { AcademicYearType, CourseType } from "../../types";

PDFJS.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const SetupPdfUpload: FC<RouteComponentProps> = ({ match }) => {
  const [alert] = useIonAlert();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const rt = useIonRouter();
  const [newStudent, setNewStudent] = useAtom(newStudentAtom);
  const { handleNext } = useSetup();

  const [file, setFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
      maxSize: 3 * 1024 * 1024,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const worker = createWorker({
    logger: (m) => console.log(m),
    langPath: "https://tessdata.projectnaptha.com/4.0.0_fast",
  });
  const [loader, dismissLoader] = useIonLoading();
  const { data: subjects } = useFetchSubjects();

  function parseAcademicInfo(text: string) {
    try {
      // Extract semester and academic year
      const semesterRegex = /^(\d{1}[a-z]{2} Semester), (\d{4}-\d{4})/;
      const semesterMatch = text.match(semesterRegex);
      let semester = "";
      let academicYear = "";
      if (semesterMatch) {
        semester = semesterMatch[1].includes("1st") ? "1" : "2";
        academicYear = semesterMatch[2].trim();
        text = text.replace(semesterMatch[0], "").trim();
      }

      // Extract name
      const nameRegex =
        /NAME\s*:\s*([A-Z ,]+)\s*(?:STUDENTNO\. ~\s*:\s*(\d+)|STUDENTNO\. *:\s*(\d+))/;
      const nameMatch = text.match(nameRegex);
      let name = null;
      let studentNumber = null;
      if (nameMatch) {
        name = nameMatch[1]?.trim() || null;
        studentNumber = nameMatch[2]?.trim() || nameMatch[3]?.trim() || null;
        text = text.replace(nameMatch[0], "").trim();
      }

      // Extract course and year level
      const courseRegex =
        /COURSE\s+:\s+([A-Z. ]+)\s+ACAD\. YEAR\s+([A-Za-z ]+)/;
      const courseMatch = text.match(courseRegex);
      let course = "";
      let yearLevel = "";
      if (courseMatch) {
        course = courseMatch[1].trim();
        yearLevel = courseMatch[2].trim();
        text = text.replace(courseMatch[0], "").trim();
        if (yearLevel.includes("First")) {
          yearLevel = "1";
        } else if (yearLevel.includes("Second")) {
          yearLevel = "2";
        } else if (yearLevel.includes("Third")) {
          yearLevel = "3";
        } else if (yearLevel.includes("Fourth")) {
          yearLevel = "4";
        } else if (yearLevel.includes("Fifth")) {
          yearLevel = "5";
        }
      }

      // Convert to numbers
      const sms = Number(semester);
      const yl = Number(yearLevel);
      const studentNo = Number(studentNumber);

      return {
        semester: sms,
        name,
        studentNumber: studentNo,
        course,
        yearLevel: yl,
        academicYear,
      };
    } catch (error) {
      console.error("Error parsing academic info:", error);
      return {
        semester: 0,
        name: "",
        studentNumber: 0,
        course: "",
        yearLevel: 0,
        academicYear: "",
      };
    }
  }

  function parseSchedule(text: string) {
    try {
      // Extract and remove block number
      const blockRegex = /Block No\.\: ([A-Z0-9 ]+)/;
      const blockMatch = text.match(blockRegex);
      let blockNumber = "";
      if (blockMatch) {
        blockNumber = blockMatch[1].trim();
        function parseStudentInfo(text: string) {
          // Extract semester
          const semesterRegex = /^(\d{1}[a-z]{2} Semester, \d{4}-\d{4})/;
          const semesterMatch = text.match(semesterRegex);
          let semester = "";
          if (semesterMatch) {
            semester = semesterMatch[1].trim();
            text = text.replace(semesterMatch[0], "").trim();
          }

          // Extract name
          const nameRegex = /NAME\s+: ([A-Z ,]+) STUDENTNO\. ~ : (\d+)/;
          const nameMatch = text.match(nameRegex);
          let name = "";
          let studentNumber = "";
          if (nameMatch) {
            name = nameMatch[1].trim();
            studentNumber = nameMatch[2].trim();
            text = text.replace(nameMatch[0], "").trim();
          }

          // Extract course and academic year
          const courseRegex = /COURSE\s+: ([A-Z. ]+) ACAD. YEAR (\w+ \w+)/;
          const courseMatch = text.match(courseRegex);
          let course = "";
          let academicYear = "";
          if (courseMatch) {
            course = courseMatch[1].trim();
            academicYear = courseMatch[2].trim();
            text = text.replace(courseMatch[0], "").trim();
          }

          return {
            semester,
            name,
            studentNumber,
            course,
            academicYear,
          };
        }
        text = text.replace(blockMatch[0], "").trim();
      }

      // Extract and remove total units
      const unitsRegex = /Total Units\: (\d+)/;
      const unitsMatch = text.match(unitsRegex);
      let totalUnits = 0;
      if (unitsMatch) {
        totalUnits = parseInt(unitsMatch[1], 10);
        text = text.substring(0, text.indexOf(unitsMatch[0])).trim();
      }

      // Extract subjects
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);
      const subjects = [];
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 >= lines.length) break;
        const subjectName = lines[i];
        const details = lines[i + 1].split(" ").filter((detail) => detail);
        const subject = {
          name: subjectName,
          code: details[0],
          schedule: details.slice(1, 3).join(" "),
          room: details[3],
          units: parseInt(details[4], 10),
        };
        subjects.push(subject);
      }

      return {
        blockNumber,
        totalUnits,
        subjects,
      };
    } catch (error) {
      console.error("Error parsing schedule:", error);
      return {
        blockNumber: "",
        totalUnits: 0,
        subjects: [],
      };
    }
  }

  const { data: academicYears } = useFetchAcademicYears();
  const { data: courses } = useFetchCourses();

  const handleProceed = async () => {
    // PERFORM CHECKS
    const checks = {
      imageNotFound: false,
      invalidImage: false,
      academicInfoNotFound: false,
      academicYearInvalid: false,
      studentNumberInvalid: false,
      semesterInvalid: false,
      courseInvalid: false,
      subjectsNotFound: false,
    };

    try {
      setLoading(true);
      setLoadingMessage("Processing PDF");

      // Get the array buffer from the file
      const arrayBuffer = await file!.arrayBuffer();

      // Load the PDF document
      const doc = await PDFJS.getDocument({ data: arrayBuffer }).promise;

      // Get the first page
      const page = await doc.getPage(1);

      setLoadingMessage("Fetching image");

      // Get the operator list
      const ops = await page.getOperatorList();

      const fns = ops.fnArray;
      const args = ops.argsArray;
      let imgsFound = 0;

      for (let i = 0; i < fns.length; i++) {
        // Check if it's an image object
        // @ts-ignore
        if (fns[i] !== PDFJS.OPS.paintImageXObject) {
          continue;
        }

        console.log("Loading image", i);
        imgsFound++;

        const imgKey = args[i][0];
        const imgInfo = {
          name: `image_${i}.jpg`,
          url: "",
        };

        // Get the image object
        // @ts-ignore
        page.objs.get(imgKey, async (imgObj) => {
          if (!imgObj) {
            console.log("Image not found");
            checks.imageNotFound = true;
          }

          if (!imgObj.bitmap || imgObj.width !== 850) {
            console.log(
              "Invalid image, expecting bitmap image with dimensions 850x1000"
            );
            checks.invalidImage = true;
          }

          console.log(imgObj);

          // EXTRACT THE TOP PART OF THE IMAGE

          // Create a canvas element
          const canvas = document.createElement("canvas");
          canvas.width = imgObj.width;
          canvas.height = imgObj.height;

          // Draw the ImageBitmap to the canvas
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(
            imgObj.bitmap,
            0, // source x
            112, // source y
            imgObj.width, // source width
            60, // source height
            0, // destination x
            0, // destination y
            imgObj.width, // destination width
            60 // destination height
          );

          // Convert canvas to blob
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/jpeg")
          );

          // Create object URL
          // @ts-ignore
          const url = URL.createObjectURL(blob);

          // EXTRACT THE BOTTOM PART OF THE IMAGE

          // Create a canvas element
          const canvas2 = document.createElement("canvas");
          const croppedWidth = 520;
          const croppedHeight = imgObj.height - 306; // original height - 206 - 100

          // Set the canvas dimensions to match the cropped image dimensions
          canvas2.width = croppedWidth;
          canvas2.height = croppedHeight;

          // Draw the ImageBitmap to the canvas
          const ctx2 = canvas2.getContext("2d");
          ctx2!.drawImage(
            imgObj.bitmap,
            0, // source x
            206, // source y
            croppedWidth, // source width
            croppedHeight, // source height
            0, // destination x
            0, // destination y
            croppedWidth, // destination width
            croppedHeight // destination height
          );

          // Convert canvas to blob
          const blob2 = await new Promise((resolve) =>
            canvas2.toBlob(resolve, "image/jpeg")
          );

          // Create object URL
          // @ts-ignore
          const url2 = URL.createObjectURL(blob2);
          console.log(url2);

          // OCR
          setLoadingMessage("Preparing scanner");

          await worker.load();
          await worker.loadLanguage("eng");
          await worker.initialize("eng");

          setLoadingMessage("Scanning your details");
          const { data } = await worker.recognize(url);
          const { data: data2 } = await worker.recognize(url2);

          await worker.terminate();

          console.log(data.text);
          console.log(data2.text);

          const studentInfo = parseAcademicInfo(data.text);
          const schedule = parseSchedule(data2.text);

          setLoading(false);

          if (studentInfo.studentNumber.toString().length !== 9) {
            checks.academicInfoNotFound = true;
          }

          if (schedule.subjects.length === 0) {
            checks.subjectsNotFound = true;
          }

          console.log(studentInfo);
          console.log(schedule);

          if (
            checks.imageNotFound ||
            checks.invalidImage ||
            checks.academicInfoNotFound
          ) {
            alert({
              header: "Error",
              message:
                "An error occurred while processing the PDF file. Please try again or input your data manually.",
              buttons: ["OK"],
            });
            return;
          }

          // we should take all the data that we're able to extract
          // and then we should ask the user to confirm the data
          // as long as one of the ff passes: student number, course, year level, academic year
          // then let's proceed to the next step
          if (
            studentInfo.studentNumber ||
            studentInfo.course ||
            studentInfo.yearLevel ||
            studentInfo.academicYear
          ) {
            // validate the academic information that we had
            // if it's correct, we can proceed to the next step

            // check academic year
            const academicYear =
              academicYears!.find(
                (ay) => ay.academic_year === studentInfo.academicYear
              ) ?? null;
            if (!academicYear) {
              checks.academicYearInvalid = true;
            } else {
            }

            // check semester
            if (studentInfo.semester !== 1 && studentInfo.semester !== 2) {
              checks.semesterInvalid = true;
            }

            // check course
            let course: CourseType | null = null;
            // when doing course check, we need to remove the "BS" prefix
            // since the course in the certificate of enrollment does not include it
            // declare a variable to hold the course that doesn't include the "BS" prefix
            console.log("studentInfo.course: ", studentInfo.course);
            let courseWithoutBs = studentInfo.course.replace("B.S.", "");

            // make the course title lowercase
            courseWithoutBs = studentInfo.course.toLowerCase();
            console.log("course without B.S. :", courseWithoutBs);

            // try to remove the "b.s." prefix
            courseWithoutBs = courseWithoutBs.replace("b.s.", "");
            console.log("course without b.s. :", courseWithoutBs);
            // ang weird, bakit dito naremove na siya hahhaha

            // trim
            courseWithoutBs = courseWithoutBs.trim();

            course =
              courses?.find((c) => {
                console.log(
                  `does ${c.title.toLowerCase()} contain the ${courseWithoutBs}?`
                );
                const yes = c.title.toLowerCase().includes(courseWithoutBs);
                console.log(yes);
                return yes;
              }) ?? null;

            if (!course) {
              checks.courseInvalid = true;
            } else {
              console.log("course found: ", course);
            }

            // flip the name from last name, first name middle name
            // to first name middle name last name
            if (studentInfo.name) {
              const nameParts = studentInfo.name.split(", ");
              studentInfo.name = `${nameParts[1]} ${nameParts[0]}`;

              // convert the name into title case
              studentInfo.name = studentInfo.name
                .split(" ")
                .map(
                  (n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
                )
                .join(" ");
            }

            // save the data we've processed
            setNewStudent((prev) => ({
              ...prev,
              step1: {
                ...prev.step1,
                fullName: studentInfo.name ? studentInfo.name : "",
              },
              step2: {
                ...prev.step2,
                studentNo: studentInfo.studentNumber,
                course: course ? course.id : 0,
                academicYear: academicYear ? academicYear.id : 0,
                semester: studentInfo.semester ? studentInfo.semester : 0,
                yearLevel: studentInfo.yearLevel ? studentInfo.yearLevel : 0,
                type: schedule.blockNumber.length > 0 ? true : false,
              },
            }));

            console.log("student into atm: ", newStudent);

            // we can now proceed to the next step, at least, since we have the basic data
            // alert the user that we have processed some but not all of the data
            // and that we've saved the data we've processed
            alert({
              backdropDismiss: false,
              header: "Success",
              message:
                "We've are able to process some of the data. Please input the rest of the data manually.",
              buttons: [
                {
                  text: "OK",
                  handler: () => {
                    handleNext();
                  },
                },
              ],
            });
          } else {
            // if we're not able to process the student number, course, year level, academic year
            // then we should inform the user that we're not able to process the data
            // and that they'd need to input the data manually
            alert({
              header: "Error",
              message:
                "An error occurred while processing the PDF file. Please try again or input your data manually.",
              buttons: [
                {
                  text: "OK",
                  handler: () => {
                    handleNext();
                  },
                },
              ],
            });
          }
        });
      }

      if (imgsFound === 0) {
      }
    } catch (error) {
      setLoading(false);
      console.error("Error processing PDF:", error);

      // inform the user that there has been an error
      // and that they'd need to manually input their data
      alert({
        header: "Error",
        message:
          "An error occurred while processing the PDF file. Please try again or input your data manually.",
        buttons: ["OK"],
      });
    }
  };

  const handleInputManually = () => {
    rt.push("/setup/introduceYourself");
  };

  return (
    <>
      <IonPage>
        <IonContent className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton
                  defaultHref={"/" + match.path.split("/")[1]}
                  text=""
                />
              </IonButtons>
              {/* <IonTitle>Introduce Yourself</IonTitle> */}
            </IonToolbar>
          </IonHeader>
          <IonGrid className="mt-[20px]">
            <IonRow>
              <IonCol>
                <IonText className="text-center">
                  <h3>Scan Certificate of Enrollment</h3>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonCard>
            <div
              {...getRootProps(style)}
              className="h-80 flex flex-col justify-center align-middle border-dashed border-4 border-red-200 px-5"
            >
              <input {...getInputProps()} />
              <IonImg src={"pdf.png"} className="w-32 mx-auto" />
              <div className="flex justify-center mt-3">
                <IonButton
                  shape="round"
                  size="small"
                  fill="outline"
                  color="dark"
                >
                  {file ? file.name : "Browse Files"}
                </IonButton>
              </div>
            </div>
          </IonCard>
          <IonGrid className="text-center">
            <IonRow>
              <IonCol>
                <IonText>Maximum file size is 3MB</IonText>
                <br />
                <IonText>Strictly PDF file only</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="flex justify-center p-3">
                <IonButton
                  shape="round"
                  onClick={handleProceed}
                  size="small"
                  disabled={file === null}
                >
                  Process
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        <IonFooter className="ion-padding flex justify-center text-center">
          <IonText color="medium" className="text-xs">
            <p>
              Don't want to upload? <br />{" "}
              <span
                className="underline cursor-pointer"
                onClick={handleInputManually}
              >
                Input your data manually
              </span>
            </p>
          </IonText>
        </IonFooter>
        {loading === true && (
          <IonLoading
            isOpen={loading === true}
            spinner="crescent"
            message={loadingMessage}
          />
        )}
      </IonPage>
    </>
  );
};

export default SetupPdfUpload;
