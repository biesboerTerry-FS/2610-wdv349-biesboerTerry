# [Lindbergh Ultimate Frisbee ]

## Application Definition Statement

The Lindbergh Ultimate Frisbee application is a centralized, unified communication and management hub designed exclusively for a highschool sports team. It will serve as a single source of information connecting players, parents, and coaches to streamline schedule tracking, roster management, and critical team announcements. By replacing fragmented text chains and lost emails with a clean, role-based dashboard, the platform ensures everyone shows up to the right field, at the right time, with the right jersey.

## Target Market

Primary: The Lindbergh Ultimate Frisbee application/site is a centralized, unified communication and management hub designed exclusively for a highschool sports team. It will serve as a single source of information connecting players, parents, and coaches to streamline schedule tracking, roster management, and critical team announcements. By replacing fragmented text chains and lost emails with a clean, role-based dashboard, the platform ensures everyone shows up to the right field, at the right time, with the right jersey.

Secondary: According to youth sports participation data, managing logistics is one of the top stressors for volunteer coaches and parents. While generic communication tools exist, they often suffer from feature bloat or lack of sports-specific scheduling tools.

## User Profile / Persona

Players (Ages 14-18): High school students who are highly active on mobile devices but need quick, distraction-free access to team info.

Parents/Guardians (Ages 30-55): Busy professionals who need reliable, at-a-glance scheduling, location routing, and direct communications lines with coaches.

Coaches (Ages 25-50): Faculty or volunteer leaders who need efficiant broadcast communication and administrative control without a steep learning curve.

## Use Cases

Profile 1: The Busy Parent (Sarah)

Sarh is a 42 year old working professional with two teenagers. She relies heavily on her digital calendar to keep her life afloat. Her biggest frustration is digging through weeks of messy email chains or other specifics apps to find the address for an away tournament or figuring out if practice was cancelled. She needs a clean interface that immediately shows the "When", "Where", and "What to bring"

Profile 2: The Player(Mark)

Mark is a 16 year old high school junior. He doesnt check his email often and reliess on notifications. However, with most schools requiring students to store their phones during school hours, he isn't always able to check his device through the day. He needs to quickly see who is on the roster for the upcoming game, check what jersey to wear, and message teammates for a ride.

## Problem Statement

High school sports teams currently rely on multiple apps, email chains, and word of mouth to manage logistics. This fragmented communication leads to missed practices, lost permission slips, incorrect date/time for games, and frustrated parents, ultimately pulling focus away from player development and the sport itself.  

## Pain Points

* Information fragmentation: Critical updates are spread across email, text, and paper, making it difficult to find a single sourcec of truth.

* Last-Minute Changes: When weather or field availability changes, cascading the update to all parents and players simultaneously is slow and unreliable.

* Roster Management: Tracking who  has submitted paperwork, emergency contacts, and dues is a nightmare for volunteer coaches.

## Solution Statement

The custom-built MERN stack application provides a tailored, ad-free environment specifically designed for the Lindbergh Ultimate Frisbee team. Unlike generic messaging apps, it offers a structured database (MongoDB) to securely house rosters and contacts, paired with a React front-end that delivers dynamic, role-based dashboards. By centralizing scheduling, maps, photos, and announcements into one intuitive web app, it eliminates communication friction and gives time back to the coaches and families.

## Competition

Direct Competition: Team-management applications like TeamSnap or Band.

* Difference: While highly functional, these apps are heavily monetized, often placing ads across the free tiers or locking essential features behind expensive nonthly subscriptions. These are often overly generalized for any type of group.

Indirect Competition: Group messaging apps like Remind, WhatsApp, or GroupMe.

* Difference: These solve the immediate communication problems but lack structural tools like calendar integrations, static document hosting (e.g. permission slips), and distinct user roles, often resulting in chaotic, noisy chat threads where important information is quickly buried.

## Features & Functionality

* Role-Based Authentication & Dashboards: Utilizing JWT authentication, users will experience a customized UI based on their role (Coach, Player, Parent). This ensures coaches have adminitrative CRUD capabilities while players and parents have a streamlined, read-only view of critical data.

* Dynamic Team Calendar: A centralized scheduling tool where coaches can post practices, games, and tournaments. This solves the pain point of lost updates by providing a single, always updated source of information.

* Announcement Board/Alerts: A dedicated space for coaches to post high-priority updates (e.g., weather cancellations). This prevents important information from getting lost in a noisy group thread.

* Secure Roster & Directory: A protected database view of team members and emergency contacts. This solves the coach's pain point of carrying sensitive data in physical binders to every game and practice.

## Integrations

* Internal RESTful API: I will build a custom backend API using Node.js and Express to serve data from the MongoDb database to the React front-end securely.

* Google Maps API: To be used within the Team Calendar. When a coach inputs an address for the game, the frontend will render an interactive map and routing options for parents and players, directly solving the pain point of navigating to unfamiliar fields.
<https://cloud.google.com/terms/overview>

* OpenWeatherMap API: To be integrated into the dashboard to display the forecast for upcoming practice and game times, helping players pack appropriate gear and giving coaches, players, and parents foresight for potential rainouts.
<https://openweather.co.uk/api/files/file/OpenWeather_T%26C_of_sale.pdf>
