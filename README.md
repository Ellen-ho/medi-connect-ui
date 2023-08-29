# Medi-Connect-ui

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

<div align="center">
  <img width="80%" align="center" src="./demo/Demo picture.png">
</div>

## Table of contents

- [User Interface](#User-Interface)
- [About Medi-Connect](#About-Medi-Connect)
- [Features](#Features)
- [Todos](#Todos)
- [Local development](#Local-development)

## User Interface

### Visit doctor's page, choose a time slot, and book appointment

<p align="center">
  <img width="80%" align="center" src="./demo/Book appointment.gif">
</p>

### Add patient record

<p align="center">
  <img width="80%" align="center" src="./demo/Add patient record.gif">
</p>

### Doctor views patient info after appointment notification

<p align="center">
  <img width="80%" align="center" src="./demo/Doctor views patient info after appointment notification.gif">
</p>

## About Medi-Connect

Recognizing physicians' constraints on time and presence, the platform aids in gaining a thorough understanding of patients' health and lifestyles. This tool allows doctors to make informed decisions beyond the traditional confines of clinic hours

### Packages that are used in this project

**Front End**

- Utilizing the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) to showcase interactive maps featuring markers and embedding them seamlessly into the restaurant page.
- Utilizing [`@mui/material`](https://www.npmjs.com/package/@mui/material) and [`@mui/icons-material`](https://www.npmjs.com/package/@mui/icons-material) to enhance the user interface and design of the application.
- Employing [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) for effective and efficient form handling.
- Utilizing [`axios`](https://www.npmjs.com/package/axios) for making HTTP requests and interacting with APIs.
- Incorporating [`dayjs`](https://www.npmjs.com/package/dayjs) for efficient manipulation and formatting of dates and times.
- Utilizing [`dotenv`](https://www.npmjs.com/package/dotenv) to manage environment variables securely.
- Employing [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) for navigation and routing within the application.
- Using [`swr`](https://www.npmjs.com/package/swr) for data fetching and caching.
- Employing [`yup`](https://www.npmjs.com/package/yup) for schema-based form validation.
- Utilizing [`normalize.css`](https://www.npmjs.com/package/normalize.css) to ensure consistent styling across different browsers.
- Employing [`react-hot-toast`](https://www.npmjs.com/package/react-hot-toast) for displaying user-friendly and customizable toasts.
- Using [`@mui/lab`](https://www.npmjs.com/package/@mui/lab) for accessing experimental components and features.
- Employing [`mui-file-input`](https://www.npmjs.com/package/mui-file-input) for enhanced file input handling.
- Utilizing [`@emotion/react`](https://www.npmjs.com/package/@emotion/react) and [`@emotion/styled`](https://www.npmjs.com/package/@emotion/styled) for styling and theming in components.
- Employing [`@fullcalendar`](https://www.npmjs.com/package/@fullcalendar) libraries for interactive calendar display.
- Using [`@fontsource/source-code-pro`](https://www.npmjs.com/package/@fontsource/source-code-pro) for font styling in the application.

## Features

### Patient

As a patient member, you can...

1. Sign up for a Medi-Connect account to embark on your journey towards a healthier lifestyle.
2. Sign in using your registered email and password, or alternatively, you can also log in with your Facebook account.
3. Create your personal profile in order to commence the use of other services on the plant.
4. Edit your account or your personal profile.
5. Add your health records, with the platform offering seven categories of health record classifications, including blood pressure, blood sugar, glycated hemoglobin, sleep, exercise, diet, and weight.
6. Review and examine individual entries or lists of records from any category to gain insights into changes in your personal health status.
7. Pose any health inquiries and select the category attribute for your question, facilitating relevant medical professionals to respond to your queries.
8. Navigate through your own inquiries and also view questions from other patients along with the corresponding responses from medical professionals in the question forum.
9. Click the notification to view the reply that a red dot will appear on your notification bell when your question receives a response.
10. Click the heart icon to write a gratitude message and express your thanks to the doctor who provided you with a response.
11. Cancel any of your gratitude messages if you change your mind.
12. Visit the physician list to view information about any doctor.
13. View the schedule of any doctor and select an available time slot to create an appointment.
14. View your appointment history, which includes categories such as upcoming, completed, and canceled appointments.
15. Cancel your upcoming appointment no later than the day before the scheduled date.
16. Receive upcoming appointment notifications 22 hours before the scheduled appointment time.
17. Receive the Google Meet link for the respective appointment 22 hours prior to the scheduled appointment time.
18. Receive the health goal plan sent by the platform when you have maintained records for two consecutive weeks.
19. Accept the health goal plan and commence your plan accordingly.
20. Decline the health goal plan provided by the platform.

### Doctor

As a doctor member, you can...

1. Sign up for a Medi-Connect account and begin utilizing your expertise to assist others.
2. Sign in using your registered email and password.
3. Create your personal profile in order to commence the use of other services on the plant.
4. Edit your account or your personal profile.
5. View the list of questions posed by patients.
6. Respond to patients' inquiries.
7. Click the thumbs-up icon to agree with another physician's response and send feedback content to the respective doctor.
8. Withdraw your agreement if you change your mind.
9. Receive notifications when patients express gratitude for your response or when other doctors agree with your answer.
10. Create your schedule within the designated timeframes outlined by the platform guidelines.
11. Edit your schedule within the timeframes specified by the platform guidelines.
12. Receive notifications when patients schedule appointments during your available time slots or when they cancel appointments previously reserved with you.
13. View the profile, records, and goals of the patient who has scheduled an appointment with you when the appointment status is "upcoming."
14. Receive the Google Meet link for the respective appointment 22 hours prior to the scheduled appointment time.
15. View the number of agreements and expressions of gratitude received for each of your responses.

## Todos

1. Elaborate the doctor's sign-up procedure by incorporating more comprehensive steps, including the submission of educational credentials and medical certificates.
2. Modify the image uploading process for users to store images on other cloud storage service.
3. Integrate additional social features, like doctors being able to share specialized articles to educate patients about different medical disciplines, and enabling patients to interact and motivate each other through mutual communication.

## Local development

### Install dependency

```
yarn install --frozen-lockfile
```

### Running the application

```shell
yarn dev
```
