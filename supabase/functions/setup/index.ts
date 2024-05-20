import { ProfileType, StudentClassType, StudentType } from "../_types/index.d.ts";

import { ServerSetupProgressType } from "../_types/setup.d.ts";
import { baseCorsHeaders } from "../_shared/cors.ts";
import clientAdmin from "../_shared/admin.ts";

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  ...baseCorsHeaders,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function fetchStudentsClass(student_id: string) {
  const { data, error } = await clientAdmin
    .from("students_class")
    .select("*, classes(*, subjects(*))")
    .eq("student_id", student_id);

  if (error || data.length === 0) {
    return {
      success: false,
      data: null,
    };
  }

  return {
    success: true,
    data,
  };
}

async function fetchStudent(student_id: string) {
  const { data, error } = await clientAdmin
    .from("students")
    .select("*")
    .eq("id", student_id)
    .single();

  if (error) {
    return {
      success: false,
      data: null,
    };
  }

  return {
    success: true,
    data,
  };
}

async function fetchProfile(profile_id: string) {
  const { data, error } = await clientAdmin
    .from("profiles")
    .select("*, students(*)")
    .eq("id", profile_id)
    .single();

  if (error) {
    return {
      success: false,
      data: null,
    };
  }

  return {
    success: true,
    data,
  };
}

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200,
      statusText: "OK",
    });
  }


  // error if we get a request that is not POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Invalid request method, only POST is allowed",
      }),
      {
        status: 405,
        statusText: "Method Not Allowed",
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  let profile_id: string;

  try {
    const res = await req.json();
    console.log(res);
    profile_id = res.profile_id;
  } catch {
    return new Response(
      JSON.stringify({
        error: "Invalid request body, profile_id is required",
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  // we have a profile_id, check if the profile exists
  let profileExists = false;
  let profileData: ProfileType | null = null;
  const res1 = await fetchProfile(profile_id);
  profileExists = res1.success;
  profileData = res1.data;

  // so we have a profile, check if we have a student_id
  let studentExists = false;
  let studentData: StudentType | null = null;
  // if we have a student_id, check if the student exists
  if (res1.data?.students.length !== 0) {
    const res2 = await fetchStudent(res1.data?.students[0].id+"");
    studentExists = res2.success;
    studentData = res2.data;
  }

  // if we have a student, check if we atleast 1 class
  let classesExists = false;
  let classesData: StudentClassType[] | null = null;
  if (studentExists) {
    const res3 = await fetchStudentsClass(studentData!.id+"");
    classesExists = res3.success;
    classesData = res3.data;
  }

  // construct our response data
  /**
   * Represents the setup progress data.
   */
  const data: ServerSetupProgressType = {
    profile: {
      exists: profileExists,
      data: profileData,
    },
    student: {
      exists: studentExists,
      data: studentData,
    },
    classes: {
      exists: classesExists,
      data: classesData,
    },
    progress: [
      { studentNo: studentData?.student_no !== undefined},
      { course: studentData?.course !== undefined },
      { type: studentData?.type !== undefined},
      { yearLevel: studentData?.year_level !== undefined},
      { subjects: classesData !== null && classesData.length !== 0},
    ],
  };

  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      statusText: "OK",
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
});
