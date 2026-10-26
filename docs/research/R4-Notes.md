# Project & Portfolio IV

* **Research Notes - Milestone #4**
* **Terry Biesboer**
* **October 25, 2026**

## Topic - Front-End Development, Components & Deployment Strategy

This document outlines our transition from static wireframes and prototyping into active component-based front-end development, prop validation, and preliminary staging/production server workflows.

## Component Architecture & Reusability

Analyzing screen designs to extract modular, reusable UI components.

* **Key finding 1: Breaking down complex screen layouts using "Thinking in React" principles allows us to isolate shared interface elements—such as navigation bars, cards, and buttons—into independent, reusable components.**
* **Key finding 2: Maintaining a strict separation of concerns ensures that components handle their own localized presentation while passing dynamic behavior down from parent pages.**
* **Key finding 3: Storing modular components in dedicated directories improves repository organization and makes filing targeted GitHub issues for the MVP much cleaner.**

## Props, Data Modeling, & Type Safety

Defining data structures and expected data types before integrating live dynamic sources.

* **Key finding 1: Implementing prop types and default props allows components to render sample data gracefully without requiring an active backend connection during early UI development.**
* **Key finding 2: Using static JSON structures or mock arrays for default props prevents runtime rendering errors when components expect complex data sets like arrays or objects.**
* **Key finding 3: Establishing strict data type definitions early saves significant refactoring time when transitioning from mock data to live API endpoints.**

## Deployment Architecture (Staging vs. Production)

Evaluating multi-environment deployment pipelines using cloud hosting providers.

* **Key finding 1: Maintaining two distinct deployment environments—a staging server for testing automated merges and a production server for final releases—reduces the risk of pushing breaking code live.**
* **Key finding 2: Automated deployment triggers linked to specific branches (stage branch for staging, main branch for production) streamline the release cycle and ensure continuous delivery validation.**
* **Key finding 3: Utilizing build logs and monitoring tools (such as Papertrail on Heroku) provides essential visibility into server-side compilation errors and runtime exceptions during deployment.**

## Code Quality & Tooling

* **ESLint catches unused variables, hook mistakes, and common React issues.**

* **Prettier would enforce consistent formatting across branches.**

* **GitHub Actions can run lint/build checks on every PR.**

## Styling Architecture

* **Tailwind’s utility-first approach keeps styles close to markup and avoids naming collisions.**

* **Component-scoped CSS improves isolation but adds more files and conventions.**

* **CSS-in-JS offers dynamic styling but increases runtime and tooling complexity.**

* **For this project, Tailwind plus a small amount of global CSS is the best fit.**

## Reference Links

** Thinking in React Guide
[React Official Documentation](https://react.dev): Official guide on breaking down UI mockups into a component hierarchy.

** Heroku Documentation
[Heroku Dev Center](https://devcenter.heroku.com): Reference for configuring cloud application deployments, environment variables, and build logs.

** WebAIM Contrast Checker
[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/): Applied reference standards used to verify contrast ratios for custom UI components and visual frameworks.
