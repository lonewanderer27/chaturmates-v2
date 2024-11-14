// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'
import { Database } from "../_types/supabase.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
  'Access-Control-Allow-Methods': 'POST, GET, DELETE',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const url = new URL(req.url)
    const path = url.pathname
    const studentId = url.searchParams.get('studentId')
    const hobbyId = url.searchParams.get('hobbyId')

    // Check if the studentId is provided
    if (!studentId) {
      console.error('Student ID is required', req)

      return new Response(JSON.stringify({ error: 'Student ID is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // lets check if the student actually exists
    const { data, error } = await supabase
      .from("students")
      .select("id")
      .eq("id", studentId)
      .single()

    // If the student does not exist, return a 404
    if (error || !data) {
      console.error('Student not found', req)
      
      return new Response(JSON.stringify({ error: 'Student not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    const { method } = req;

    // Handle the request
    switch (true) {
      case method === 'GET' && path === '/student-hobbies':
        return await getStudentHobbies(supabase, studentId)
        
      case method === 'PUT' && path === '/student-hobbies':
        return await newStudentHobbies(supabase, studentId, user.id, hobbyId)

      case method === 'POST' && path === '/student-hobbies':
        return await addCustomStudentHobbies(supabase, studentId, user.id)

      case method === 'DELETE' && path === '/student-hobbies':
        return await deleteStudentHobby(supabase, studentId, user.id, hobbyId)

      default:
        return new Response(JSON.stringify({ error: 'Not Found' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        })
    }
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

async function getStudentHobbies(supaClient: SupabaseClient, studentId: string) {
  // get the hobbies for the student
  const { data, error } = await supaClient
    .from('student_hobbies')
    .select('hobbies(*)')
    .eq('student_id', studentId)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function newStudentHobbies(supaClient: SupabaseClient, studentId: string, userId: string, hobbyIds: string[]) {
  // create an object for each hobbyId
  const hobbies = hobbyIds.map((hobby
    : string) => ({
    student_id: studentId,
    hobby_id: hobby,
    is_custom: false,
  }))

  // delete the existing hobbies for the student
  const { error: deleteError } = await supaClient.from('student_hobbies').delete().eq('student_id', studentId);

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  // create the relationship between the student and the hobbies
  const { error } = await supaClient.from('student_hobbies').insert([...hobbies]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  return new Response(JSON.stringify({ message: "Hobbies added to student" }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}


async function addCustomStudentHobbies(supaClient: SupabaseClient, studentId: string, userId: string, hobbies: string[]) {
  // create an object for each hobby
  const hbbs = hobbies.map((hobby
    : string) => ({
    student_id: studentId,
    created_by_user_id: userId,
    title: hobby,
  }))

  // create the custom hobbies for the student
  const { data, error } = await supaClient.from('hobbies').insert([...hbbs]).select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  // create the relationship between the student and the custom hobbies
  const { error: studentHobbyError } = await supaClient.from('student_hobbies').insert({
    student_id: studentId,
    hobby_id: data.id!,
    created_by_user_id: userId,
  });

  if (studentHobbyError) {
    return new Response(JSON.stringify({ error: studentHobbyError.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  return new Response(JSON.stringify({ message: "Custom hobby created" }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function deleteStudentHobby(supaClient: SupabaseClient, studentId: string, userId: string, hobbyId: string | null) {
  // check if hobbyId is provided
  if (!hobbyId) {
    return new Response(JSON.stringify({ error: 'Hobby ID is required' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  // delete the relationship between the student and the hobby
  const { error } = await supaClient.from('student_hobbies').delete().eq('student_id', studentId).eq('hobby_id', hobbyId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  return new Response(JSON.stringify({ message: "Hobby removed from student" }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

