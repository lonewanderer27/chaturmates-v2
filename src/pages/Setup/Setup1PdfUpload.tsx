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
  IonRow,
  IonSpinner,
  IonText,
  IonToolbar,
  useIonAlert,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { hideTabBar } from "../../utils/TabBar";
import { useDropzone } from "react-dropzone";
import { FC, useEffect, useMemo, useState } from "react";
import Tesseract, { createWorker } from "tesseract.js";
import * as PDFJS from "pdfjs-dist";
import { RouteComponentProps, useLocation } from "react-router";
import { newStudentAtom } from "../../atoms/student";
import { useAtom } from "jotai";
import useFetchAcademicYears from "../../hooks/setup/useFetchAcademicYears";
import useFetchCourses from "../../hooks/setup/useFetchCourses";
import { CourseType } from "../../types";
import Image from "image-js";
import useSetupDraftStudent from "../../hooks/setup/useSetupDraftStudent";
import useFeatureFlags from "../../hooks/useFeatureFlags";
import { parseAcademicInfo, parseBlockNumber } from "../../utils/Coe";

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
  const debug = false;
  const FF = useFeatureFlags();
  const [alert] = useIonAlert();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { handleDraftCOEUpload, handleNext } = useSetupDraftStudent();

  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const rt = useIonRouter();
  const [newStudent, setNewStudent] = useAtom(newStudentAtom);

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

  const worker = createWorker({ logger: (m) => console.log(m) });

  useEffect(() => {
    if (worker) {
      
    }
  }, [worker])

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
    };

    try {
      // upload the coe image

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

          // Define the target dimensions
          const targetWidth = 850;
          const targetHeight = 1000;

          if (!imgObj.bitmap || imgObj.width !== 850) {
            console.log(
              "Invalid image, expecting bitmap image with dimensions 850x1000.\nAttempting to resize to target dimensions"
            );
            // we'll attempt to resize the image to the target dimensions
          }

          console.log(imgObj);
          console.log(typeof imgObj.bitmap);

          // Convert ImageBitmap to a format image-js can work with
          const canvas0 = document.createElement("canvas");
          canvas0.width = targetWidth;
          canvas0.height = targetHeight;

          const ctx0 = canvas0.getContext("2d");
          if (!ctx0) {
            throw new Error("Failed to get canvas context");
          }
          ctx0.drawImage(imgObj.bitmap, 0, 0, targetWidth, targetHeight);
          const imageData0 = ctx0.getImageData(0, 0, targetWidth, targetHeight);

          // Load the image using image-js
          const image = new Image(
            targetWidth,
            targetHeight,
            new Uint8Array(imageData0.data),
            // @ts-ignore
            { kind: "RGBA" }
          )

          console.log("topImage")
          // EXTRACT THE TOP PART OF THE IMAGE
          let topImage = image.crop({
            x: 0,
            y: 112,
            width: image.width,
            height: 60,
          })

          // CONVERT THE IMAGE TO GREYSCALE
          topImage = topImage.grey();

          // DENOISE THE IMAGE
          // topImage = topImage.medianFilter({ radius: 1 });

          // THRESHOLD TO BINARIZE THE IMAGE
          // topImage = topImage.mask({ threshold: 200 });

          // Create a canvas element
          const canvasTop = document.createElement("canvas");
          canvasTop.width = imgObj.width;
          canvasTop.height = imgObj.height;

          // Draw the ImageBitmap to the canvas
          const ctxTop = canvasTop.getContext("2d");

          const imageData = new ImageData(
            new Uint8ClampedArray(topImage.getRGBAData()),
            topImage.width,
            topImage.height
          );
          ctxTop!.putImageData(imageData, 0, 0);

          // Convert canvas to blob
          const blobTop = await new Promise<Blob | null>((resolve) =>
            canvasTop.toBlob(resolve, "image/jpeg")
          );
          const urlTop = URL.createObjectURL(blobTop!);

          // EXTRACT THE BOTTOM PART OF THE IMAGE
          const croppedWidth = 520;
          const croppedHeight = image.height - 306;

          console.log("bottomImage")
          let bottomImage = image.crop({
            x: 0,
            y: 206,
            width: croppedWidth,
            height: croppedHeight,
          })

          // CONVERT THE IMAGE TO GREYSCALE
          bottomImage = bottomImage.grey();

          // DENOISE THE IMAGE
          bottomImage.medianFilter({ radius: 1 });

          // THRESHOLD TO BINARIZE THE IMAGE
          bottomImage = bottomImage.mask({ threshold: 0.5 });

          // we first extract the block no, which is the 30px in height
          // then we download the image to check if we have the correct block no
          // then we can proceed to the next step

          console.log("blockNoImage")
          const blockNoImage = bottomImage.crop({
            x: 0,
            y: 0,
            width: croppedWidth,
            height: 30,
          })

          // Convert image to blob
          // blockNoImage.getCanvas().toBlob((blob) => {
          //   const url = URL.createObjectURL(blob!);
          //   const a = document.createElement("a");
          //   a.href = url;
          //   a.download = "block-no.jpg";
          //   a.click();
          // });

          // // Starting from 30px in height, extract subsequent classes
          // let y = 30;
          // let classIndex = 1;
          // while (y + 45 <= bottomImage.height) {
          //   console.log(`classImage ${classIndex}`)
          //   let classImage = bottomImage.crop({
          //     x: 0,
          //     y: y,
          //     width: croppedWidth,
          //     height: 45,
          //   });

          //   // Crop to the class code on the left by 90px
          //   let classCodeImage = classImage.crop({
          //     x: 0,
          //     y: 0,
          //     width: 90,
          //     height: 45,
          //   });

          //   // download the image
          //   // classCodeImage.getCanvas().toBlob((blob) => {
          //   //   const url = URL.createObjectURL(blob!);
          //   //   const a = document.createElement("a");
          //   //   a.href = url;
          //   //   a.download = `class-code-${classIndex}.jpg`;
          //   //   a.click();
          //   // });

          //   // Crop to the unit count on the right by 50px
          //   let unitCountImage = classImage.crop({
          //     x: 470,
          //     y: 0,
          //     width: 50,
          //     height: 45,
          //   });

          //   // download the image
          //   // unitCountImage.getCanvas().toBlob((blob) => {
          //   //   const url = URL.createObjectURL(blob!);
          //   //   const a = document.createElement("a");
          //   //   a.href = url;
          //   //   a.download = `unit-count-${classIndex}.jpg`;
          //   //   a.click();
          //   // });

          //   // Crop to the middle part of the image
          //   // the starting x is 90px and the end width is the total width of bottom img - 50px
          //   let middleImage = classImage.crop({
          //     x: 90,
          //     y: 0,
          //     width: 380,
          //     height: 45,
          //   });

          //   // Split the image into 2 parts horizontally
          //   // the top part is the subject name and the bottom part is the schedule
          //   let topMiddleImage = middleImage.crop({
          //     x: 0,
          //     y: 0,
          //     width: 380,
          //     height: 22,
          //   });

          //   // download the image
          //   // topMiddleImage.getCanvas().toBlob((blob) => {
          //   //   const url = URL.createObjectURL(blob!);
          //   //   const a = document.createElement("a");
          //   //   a.href = url;
          //   //   a.download = `subject-name-${classIndex}.jpg`;
          //   //   a.click();
          //   // });

          //   let bottomMiddleImage = middleImage.crop({
          //     x: 0,
          //     y: 22,
          //     width: 380,
          //     height: 23,
          //   });

          //   // download the image
          //   // bottomMiddleImage.getCanvas().toBlob((blob) => {
          //   //   const url = URL.createObjectURL(blob!);
          //   //   const a = document.createElement("a");
          //   //   a.href = url;
          //   //   a.download = `schedule-${classIndex}.jpg`;
          //   //   a.click();
          //   // });

          //   // download the image
          //   // middleImage.getCanvas().toBlob((blob) => {
          //   //   const url = URL.createObjectURL(blob!);
          //   //   const a = document.createElement("a");
          //   //   a.href = url;
          //   //   a.download = `middle-${classIndex}.jpg`;
          //   //   a.click();
          //   // });

          //   // Convert image to blob
          //   // classImage.getCanvas().toBlob((blob) => {
          //   //   const url = URL.createObjectURL(blob!);
          //   //   const a = document.createElement("a");
          //   //   a.href = url;
          //   //   a.download = `class-${classIndex}.jpg`;
          //   //   a.click();
          //   // });

          //   y += 45;
          //   classIndex++;
          // }

          // // Convert canvas to blob
          // const blobB = await new Promise<Blob | null>((resolve) =>
          //   canvas2.toBlob(resolve, "image/jpeg")
          // );
          // const urlB = blobB ? URL.createObjectURL(blobB) : null;

          // // console.log("bottomImage Url: ", url2);

          // // download the image
          // const aB = document.createElement("a");
          // aB.href = urlB!;
          // aB.download = "bottom-image.jpg";
          // aB.click();
          // return;

          // 30px is the start of the first class
          // each class is 45px in height
          // so for example, we have 4 subjects, we need to loop 4 times
          // adding 45px to the y value each time
          // for each loop, we check if we have reached the total amt of units 
          // if we have, then we stop the loop

          // 1.   Get the first class
          // 2.   Extract the left part of the image
          // 2.1  Extract the class code
          // 3.   Extract the right part of the image
          // 3.1  Extract the unit count
          // 4.   Extract the middle part of the image
          // 4.1  Split the image into 2 parts horizontally
          // 4.2  Extract the subject name from the top part
          // 4.3  Extract the schedule from the bottom part

          // Create canvas element for blockNo image
          const canvasBlockNo = document.createElement("canvas");
          canvasBlockNo.width = blockNoImage.width
          canvasBlockNo.height = blockNoImage.height

          // Draw the processed image to the canvas
          const ctxBlockNo = canvasBlockNo.getContext("2d");
          if (ctxBlockNo) {
            const imageDataBlockNo = new ImageData(
              new Uint8ClampedArray(blockNoImage.getRGBAData()),
              blockNoImage.width,
              blockNoImage.height
            );
            ctxBlockNo.putImageData(imageDataBlockNo, 0, 0);
          }
          ctxBlockNo!.imageSmoothingEnabled = true;
          ctxBlockNo!.imageSmoothingQuality = "high";

          // Convert canvas to blob
          const blobBlockNo = await new Promise<Blob | null>((resolve) =>
            canvasBlockNo.toBlob(resolve, "image/jpeg")
          );
          const urlBlockNo = blobBlockNo ? URL.createObjectURL(blobBlockNo) : null;

          // Create a URLSearchParams object to work with query params
          const queryParams = new URLSearchParams(location.search);

          // Fetch a specific query param (e.g., 'id')
          const sessionId = queryParams.get('sessionId');

          // set the loading message to uploading coe
          setLoadingMessage("Uploading COE")

          // Parallel tasks
          const uploadPromise = (async () => {
            return handleDraftCOEUpload(image, sessionId!).then((data) => {
              console.log("COE Uploaded: ", data)
              return data;
            });
          })();
          const ocrPromise = (async () => {
            // OCR
            setLoadingMessage("Preparing scanner");
            await worker.load();
            await worker.loadLanguage("eng");
            await worker.initialize("eng");

            setLoadingMessage("Scanning your details");
            const { data: academicInfo } = await worker.recognize(urlTop);
            const { data: blockNo } = await worker.recognize(urlBlockNo!);

            await worker.terminate();

            console.log(academicInfo.text);
            console.log(blockNo.text);

            const studentInfo = parseAcademicInfo(academicInfo.text);
            const blockNumber = parseBlockNumber(blockNo.text);

            return {
              studentInfo,
              blockNumber
            }
          })();

          const [uploadResult, { studentInfo, blockNumber }] = await Promise.all([
            uploadPromise,
            ocrPromise
          ])

          setLoading(false);

          if (studentInfo.studentNumber.toString().length !== 9) {
            checks.academicInfoNotFound = true;
          }

          console.log(studentInfo);
          console.log(blockNumber);

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
                // console.log(
                //   `does ${c.title.toLowerCase()} contain the ${courseWithoutBs}?`
                // );
                const yes = c.title.toLowerCase().includes(courseWithoutBs);
                // console.log(yes);
                return yes;
              }) ?? null;

            if (!course) {
              checks.courseInvalid = true;
            } else {
              // console.log("course found: ", course);
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
                type: blockNumber.length > 0 ? true : false,
                block:
                  blockNumber.length > 0 ? blockNumber : "",
              },
            }));

            // we can now proceed to the next step, at least, since we have the basic data
            // alert the user that we have processed some but not all of the data
            // and that we've saved the data we've processed
            if (debug) {
              alert({
                backdropDismiss: false,
                header: "DEBUG",
                message:
                  `Academic Info:\n${JSON.stringify(studentInfo, null, 2)}\nBlock No: ${blockNumber}`,
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
            }
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

  const enableManualStudentInfoUpload = FF.flags["enable_manual_student_info_upload"]?.value as unknown as boolean ?? false;
  console.info("Enable manual student info upload: ", enableManualStudentInfoUpload);

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
              <div className="flex justify-center mt-6">
                <IonButton
                  shape="round"
                  size="small"
                  fill="outline"
                  color="dark"
                >
                  <IonText className="py-3">
                    {file ? file.name : "Browse Files"}
                  </IonText>
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
                  disabled={file === null || loading}
                >
                  <IonText className="py-3">
                    {loading ? <IonSpinner name="dots" /> : "Proceed"}
                  </IonText>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        {enableManualStudentInfoUpload === true &&
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
          </IonFooter>}
        {loading === true && (
          <IonLoading
            isOpen={loading === true}
            spinner="lines"
            message={loadingMessage}
          />
        )}
      </IonPage>
    </>
  );
};

export default SetupPdfUpload;
