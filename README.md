# Chaturmates

This is a React project that uses Supabase for backend services, EmailJS for email services, and Resend for some other services.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the latest version of Node.js and npm.
- You can access services provided by Supabase, EmailJS, Resend on your network.
- You are running on a Linux machine or WSL environment.

### Running the Project

To run this project, follow these steps:

1. Clone the repository

```
git clone https://github.com/lonewanderer27/chaturmates
```

2. Install the dependencies:
```
cd chaturmates
npm install 
// or bun install if you're using bun
```

3. Create a .env file in the root directory of the project and add the following variables:
```
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
VITE_SUPABASE_API_URL=<your_supabase_api_url>
VITE_RESEND_API_KEY=<your_resend_api_key>
VITE_EMAILJS_SERVICE_ID=<your_emailjs_service_id>
VITE_EMAILJS_TEMPLATE_ID=<your_emailjs_template_id>
VITE_EMAILJS_PUBLIC_KEY=<your_emailjs_public_key>
```

Replace <your_supabase_anon_key>, <your_supabase_api_url>, <your_resend_api_key>, <your_emailjs_service_id>, <your_emailjs_template_id>, and <your_emailjs_public_key> with our actual keys and IDs.

4. Start the development server:
```
npm run dev
// or bun dev
```
The application should now be running at http://localhost:5173


## Contributing to Chaturmates

To contribute, follow these steps:
1. Fork this repository to your github account.
2. Create new branch: `git checkout -b <new_branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'
4. Push to the new branch and your new repository: `git push origin`
5. Create the pull request in the original github repository.

### Contact
If you want to contact me you can reach me at adrianejames27@gmail.com

### License
This project uses the MIT License.
