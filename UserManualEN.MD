HomeChef Web Application
User Manual
Version 1.0
Platform: Web (React + Firebase)
Audience: End Users (Food lovers, Home cooks, Cameroonian cuisine enthusiasts)

Table of Contents
Introduction

Getting Started

User Interface Overview

Features

4.1 Landing Page

4.2 Login / Sign In

4.3 Language Selection

4.4 Home Page

4.5 Meal Detail Page

4.6 MyAssistant

4.7 Search Function

4.8 Sidebar Navigation

Special Features

5.1 Recipe of the Day

5.2 Events

5.3 My Experience

5.4 MyRecipes

Settings

FAQ

Support

1. Introduction
   HomeChef is a Cameroonian digital platform built to help users discover, learn, and prepare a wide variety of local Cameroonian meals. With curated recipes, intelligent cooking assistance, and a language-friendly interface, it brings local cuisine to your fingertips.

2. Getting Started
   Visit the Website: Launch the browser and go to the official HomeChef URL.

Create an Account or Log In: Use the "Login / Sign In" option to access features.

Choose Language: Select your preferred language from the language selector.

Explore Recipes: Browse or search for Cameroonian recipes right from the homepage.

3. User Interface Overview
   Top Bar: Logo, language selector, search bar.

Main Area: Scrollable section with meals and interactions.

Sidebar: Navigation options (My Recipes, Recipe of the Day, Events, etc.)

Dark/Light Toggle: Adjust theme as desired.

4. Features
   4.1 Landing Page
   A welcoming splash screen introducing users to the platform.

Call-to-action to register, sign in, or continue browsing.

4.2 Login / Sign In
New Users: Register with name, email, and password.

Returning Users: Log in with credentials.

Auth: Firebase authentication manages your secure login.

4.3 Language Selection
Switch between supported languages (e.g., English, French).

The language affects all content across the site.

4.4 Home Page
Scroll through the "For You" section.

Each meal card includes:

Image

Name

Region of origin

Difficulty

Short description

Click on any meal to access detailed view.

4.5 Meal Detail Page
Meal Name + Description

Presentation Video (already-cooked meal)

Quiz Section: 5 questions to test your understanding.

Two Tabs:

Written Recipe: Detailed text instructions.

Video Recipe: Step-by-step video.

Both show estimated preparation time.

Alternate Modes of Preparation (if available).

Cook This Button: Begins guided cooking session via MyAssistant.

4.6 MyAssistant
After clicking Cook This, users:

Enter:

Number of people eating

Number of times the meal will be eaten

The app calculates:

Ingredient quantities

Estimated preparation duration

Total cost in Francs CFA (from ingredient price database)

Your cooking history is updated.

Suggestions:

Varieties of the same meal (if available)

Similar meals (ontology-based recommendations)

4.7 Search Function
Located at the top of the home page.

Search by:

Meal Name

Category

Difficulty

Region of Origin

4.8 Sidebar Navigation
A. MyRecipes:

Create and save your own custom recipes.

B. Recipe Of The Day:

A new daily recommendation with quick facts.

Auto-refreshes every 24 hours.

C. About Us:

Developer bios

Project goals

Contact and messages for users

D. Night/Day Mode:

Toggle between light and dark theme for readability.

E. My Experience:

Shows history of all recipes where "Cook This" was clicked.

F. Log Out:

Safely logs you out of your account.

G. Events:

View upcoming and past culinary events.

Click to see event details, dates, and media.

H. Settings:

Change account information

Manage preferences and display options

5. Special Features
   5.1 Recipe of the Day
   Daily featured Cameroonian recipe.

Includes random fun fact or cultural relevance.

5.2 Events
Past: Browse media and highlights from previous events.

Future: Get information on upcoming culinary fairs, workshops, or festivals.

5.3 My Experience
Learning history tracker.

Tracks all interactions with the “Cook This” function.

5.4 MyRecipes
Personal cookbook for users.

Save, edit, and organize your own recipes.

Optionally share with others (if implemented later).

6. Settings
   Access through the sidebar:

Update name, email, password

Switch language

Manage notification preferences

Delete account (if supported)

7. FAQ
   Q1: Can I use HomeChef without an account?
   A1: You can browse meals, but full features like "Cook This", MyAssistant, and MyRecipes require login.

Q2: How accurate are the cost estimates?
A2: Ingredient prices are pulled from a live ingredient database and reflect typical local market costs.

Q3: What are ontology-based suggestions?
A3: They are smart recommendations based on ingredients, region, preparation similarity, and food types.

Q4: Is there a mobile app?
A4: Currently, HomeChef is a web application but is optimized for mobile browsing.
