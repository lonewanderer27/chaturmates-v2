function parseBlockNumber(text: string) {
  try {
    const blockRegex = /Block No\.\: ([A-Z0-9 ]+)/;
    const blockMatch = text.match(blockRegex);
    if (blockMatch) {
      return blockMatch[1].trim();
    } else {
      return "";
    }
  } catch (err) {
    console.error("Error parsing block number:", err);
    return "";
  }
}

const parseBlockNumberNative = (bottomText: string) => {
  const blockRegex = /Block No\.\s*:?\s*(CS\s*\d+)/i;
  const match = bottomText.match(blockRegex);

  if (match) {
    return match[1].trim().replace(" ", "");
  } else {
    return null;
  }
};

function parseSchedule(text: string) {
  try {
    // Extract and remove block number
    const blockRegex = /Block No\.\: ([A-Z0-9 ]+)/;
    const blockMatch = text.match(blockRegex);
    let blockNumber = "";
    if (blockMatch) {
      blockNumber = blockMatch[1].trim();
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
    const courseRegex = /COURSE\s*[:~-]?\s*([A-Z. ]+)\s*ACAD\.\s*YEAR\s*[:~-]?\s*([A-Za-z0-9 ]+)/;
    const courseMatch = text.match(courseRegex);
    let course = "";
    
    let yearLevel = "";
    if (courseMatch) {
      course = courseMatch[1].trim();
      yearLevel = courseMatch[2].trim();
      text = text.replace(courseMatch[0], "").trim();
    
      // Normalize yearLevel to handle variations like "First" and "first"
      if (/first|1st/i.test(yearLevel)) {
        yearLevel = "1";
      } else if (/second|2nd/i.test(yearLevel)) {
        yearLevel = "2";
      } else if (/third|3rd/i.test(yearLevel)) {
        yearLevel = "3";
      } else if (/fourth|4th/i.test(yearLevel)) {
        yearLevel = "4";
      } else if (/fifth|5th/i.test(yearLevel)) {
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

const parseAcademicInfoNative = (topText: string) => {
  try {
    const semesterRegex = /(\d+[a-z]{2} Semester, \d{4}-\d{4})/i;
    const nameRegex = /^[A-Za-z, ]+$/m;
    const courseRegex = /B\.S\. [A-Z ]+/;
    const studentNoRegex = /\b\d{9}\b/;
    const yearLevelRegex = /(First|Second|Third|Fourth|Fifth) Year/i;
    const academicYearRegex = /\b\d{4}-\d{4}\b/;

    console.log("splitting topText");
    let lines = topText.split("\n").map((line) => line.trim());

    // Helper to remove a matched line from the text
    const removeLine = (regex: RegExp) => {
      const match = lines.find((line) => regex.test(line));
      if (match) {
        lines = lines.filter((line) => line !== match);
      }
      return match;
    };

    // Remove and extract semester
    const semesterMatch = removeLine(semesterRegex)?.match(semesterRegex)?.[1];

    // Convert semester to a numeric value
    let semester: number | undefined;
    if (semesterMatch) {
      if (semesterMatch.includes("1st")) semester = 1;
      else if (semesterMatch.includes("2nd")) semester = 2;
      else if (semesterMatch.includes("3rd")) semester = 3;
      else if (semesterMatch.includes("4th")) semester = 4;
    }

    // Remove "COURSE" and extract course
    lines = lines.filter((line) => line !== "COURSE");
    const courseMatch = removeLine(courseRegex)?.match(courseRegex)?.[0];

    // Remove "STUDENT NO." and extract student number
    let studentNo: number | undefined;
    lines = lines.filter((line) => line !== "STUDENT NO.");
    const studentNoMatch =
      removeLine(studentNoRegex)?.match(studentNoRegex)?.[0];
    if (studentNoMatch) studentNo = parseInt(studentNoMatch);

    // Remove "ACAD. YEAR" and extract year level
    lines = lines.filter((line) => line !== "ACAD. YEAR");
    const yearLevelMatch =
      removeLine(yearLevelRegex)?.match(yearLevelRegex)?.[1];

    // Extract academic year
    const academicYearMatch = topText.match(academicYearRegex)?.[0];

    // Convert year level to a numeric value
    let yearLevel: number | undefined;
    if (yearLevelMatch) {
      if (yearLevelMatch.includes("First")) yearLevel = 1;
      else if (yearLevelMatch.includes("Second")) yearLevel = 2;
      else if (yearLevelMatch.includes("Third")) yearLevel = 3;
      else if (yearLevelMatch.includes("Fourth")) yearLevel = 4;
      else if (yearLevelMatch.includes("Fifth")) yearLevel = 5;
    }

    // Remove "NAME" and find the name
    lines = lines.filter((line) => line !== "NAME");
    const nameMatch = lines.find((line) => nameRegex.test(line));
    if (nameMatch) lines = lines.filter((line) => line !== nameMatch);

    // flip the name from last name, first name middle name
    // to first name middle name last name
    console.log("splitting name");
    console.log("nameMatch: ", nameMatch);
    const nameParts = nameMatch!.split(",");
    let studentName = `${nameParts[1].trim()} ${nameParts[0].trim()}`;

    // convert student name into title case
    studentName = studentName
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
      .join(" ");

    return {
      semester: semester,
      name: studentName || "",
      studentNumber: studentNo,
      course: courseMatch || "",
      yearLevel: yearLevel || "",
      academicYear: academicYearMatch || "",
    };
  } catch (err) {
    console.error("Error parsing academic info:", err);
    return {
      semester: 0,
      name: "",
      studentNumber: 0,
      course: "",
      yearLevel: 0,
      academicYear: "",
    };
  }
};

export {
  parseAcademicInfo,
  parseAcademicInfoNative,
  parseBlockNumber,
  parseBlockNumberNative,
  parseSchedule,
};
