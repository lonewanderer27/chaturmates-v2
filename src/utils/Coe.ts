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

export { parseAcademicInfo, parseBlockNumber, parseSchedule };