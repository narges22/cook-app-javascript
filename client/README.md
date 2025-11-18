# front-end-test-4h1B

# How to run the FE

    in the client folder run following commands:
    1) `npm install`
    2) `npm run dev`

**----------------------------------**
HELLO!
Let's go through my chain of thoughts :)

# Which frameworks??

First of all which framework and tools are suitable for this project,
based on the overview of the task I started to search what would be
the bast choices

- basic: REACT/ Typescript
- UI kit: Prime react
- CSS: Tailwind
- StateManagement: Zustand
- Handle Forms: Formik

- backend :
  node.js

**----------------------------------**
Defining the types

what are the types of entities we have to align back end and front end code and avoid errors.
I think it's an important part and should be in one of the first things to do
**----------------------------------**
Set up the state manager

Why Zustand?

Among the 3 options of Zustand, Redux toolkit and Context API.
based on my own expeience and my research:

- Context API : is better for feature-level state, not for handling all the global data of the app.
  The reason is that it doesn’t manage re-renders well — whenever the context value changes, every component that uses that context (and all their children) gets re-rendered. So it can easily hurt performance.

- Redux Toolkit: is a better choice for larger and more complex projects, because it gives developers more control and flexibility in managing state.

- Zustand: It’s an easy-to-learn solution and it handles re-renders much more efficiently compared to Context

====> Final Decision
So I chose Zustand. I tried to follow best practices for structuring it — for example, instead of calling the store directly in every component, I created separate hooks to access the data or actions I needed.

\*\* to optimize the performance I have added transformedIngredients in store and changed the data structure from an array to an object using the ingredient ID as the key.
This way I can access any ingredient by its ID, without looping through the whole array, basically O(1).
In the ideal world, this should be handled by the backend, because as the app grows and the number of ingredients increases, the frontend shouldn’t be responsible for managing that heavy data transformation.

**----------------------------------**

Basic of decision making based on project needs and delivering fast with quality

I think about the flows one by one setup priorities and basic minimum and then start by developing the minimun working version and then phase 2 and improvements in UI

**----------------------------------**

Writing tests

- I wrote some e2e tests with playwright.
- I think writing tests for the main scenarios is important — especially the critical ones that could be affected by other changes in the app. These should always be tested before finalizing a feature, just to make sure everything still works as expected.
- There are some tests that check the actual text in the app, and I’m not really a big fan of those. Usually we’re working on apps with multiple languages, or the text file gets changed by the PM team , so updating the tests every time the text changes doesn’t feel very efficient to me.

**----------------------------------**

Using AI

I’m not against using AI, but I like to treat it more like a junior developer or a colleague who’s better at research than me.
I prefer to set up the structure, the base, and some sample code myself, then ask AI to help with boilerplate or follow my structure.
I like to stay in control — any code added to my repo, I want to fully understand how it works and why this approach was used.

**----------------------------------**

Room for improvement

- Change the UI of table to cards on mobile and small screens
- Write unit tests
- Use react-query and separate server and client state
