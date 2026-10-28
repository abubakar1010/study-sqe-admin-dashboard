import { createBrowserRouter } from "react-router";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Login from "../authentication/Login.tsx";

import { Subject } from "../pages/Subject.tsx";

import { Notes } from "../pages/note/Notes.tsx";
import { TopicNotes } from "../pages/TopicNotes.tsx";
import { Earnings } from "../pages/Earnings.tsx";
import { Help } from "../pages/support/Help.tsx";

import { PrivateRoute } from "../privateRoutes/PrivateRoute.tsx";
import Tutorials from "../pages/Tutorials.tsx";
import { Area } from "../pages/Area.tsx";
import AddQuestion from "../pages/AddQuestion.tsx";
import AllQuestions from "../pages/AllQuestions.tsx";
import Faq from "../pages/Faq.tsx";
import Content from "../pages/Content.tsx";
import UpdateQuestion from "../pages/UpdateQuestion.tsx";
import ForgotPassword from "../authentication/ForgotPassword.tsx";
import ResetPassword from "../authentication/PasswordReset.tsx";
import VerifyOtp from "../authentication/VerifyOtp.tsx";
import SingleHelp from "../pages/support/SingleHelp.tsx";

import { About } from "../pages/settings/About.tsx";
import { Terms } from "../pages/settings/Terms.tsx";
import { Privacy } from "../pages/settings/Privacy.tsx";
import AddFlashcard from "../pages/flashcard/AddFlashcard.tsx";
import EditFlashcard from "../pages/flashcard/EditFlashcard.tsx";
import AddNote from "../pages/note/AddNote.tsx";
import EditNote from "../pages/note/EditNote.tsx";
import { Flashcards } from "../pages/flashcard/Flashcards.tsx";
import { TopicFlashcards } from "../pages/flashcard/TopicFlashcards.tsx";
import AllUsers from "../pages/AllUsers.tsx";
import { Profile } from "../pages/profile/Profile.tsx";
import { ChangePassword } from "../pages/profile/ChangePassword.tsx";
import SingleNote from "../pages/note/SingleNote.tsx";

export const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp></VerifyOtp>,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/tutorials",
        element: <Tutorials></Tutorials>,
      },
      {
        path: "/content/:subjectId",
        element: <Content></Content>,
      },
      {
        path: "/subject/:type/:assessment",
        element: <Subject></Subject>,
      },

      {
        path: "/area/:type/:subjectId",
        element: <Area></Area>,
      },
      {
        path: "/add-question/:areaId",
        element: <AddQuestion></AddQuestion>,
      },
      {
        path: "/all-questions/:areaId",
        element: <AllQuestions></AllQuestions>,
      },
      {
        path: "/single-question/:id",
        element: <UpdateQuestion></UpdateQuestion>,
      },
      {
        path: "/flashcards/:area",
        element: <Flashcards></Flashcards>,
      },
      {
        path: "/flashcard/:area",
        element: <AddFlashcard></AddFlashcard>,
      },
      {
        path: "/edit-flashcard/:area",
        element: <EditFlashcard></EditFlashcard>,
      },
      {
        path: "/topic-flashcards/:topic",
        element: <TopicFlashcards></TopicFlashcards>,
      },
      {
        path: "/notes/:subjectId",
        element: <Notes></Notes>,
      },
      {
        path: "/notes/add-note/:subjectId",
        element: <AddNote></AddNote>,
      },
      {
        path: "/notes/edit-note/:noteId",
        element: <EditNote></EditNote>,
      },
      {
        path: "/single-note/:noteId",
        element: <SingleNote></SingleNote>,
      },
      {
        path: "/topic-notes/:topic",
        element: <TopicNotes></TopicNotes>,
      },
      {
        path: "/earnings",
        element: <Earnings></Earnings>,
      },
      {
        path: "/faq",
        element: <Faq></Faq>,
      },
      {
        path: "/settings/about",
        element: <About></About>,
      },
      {
        path: "/settings/terms",
        element: <Terms></Terms>,
      },
      {
        path: "/settings/privacy",
        element: <Privacy></Privacy>,
      },
      {
        path: "/help",
        element: <Help></Help>,
      },
      {
        path: "help/:supportId",
        element: <SingleHelp></SingleHelp>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/change-password",
        element: <ChangePassword></ChangePassword>,
      },
    ],
  },
]);
