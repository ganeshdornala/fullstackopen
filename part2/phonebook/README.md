# Phonebook

A phonebook application built with React as part of the University of Helsinki Full Stack Open course.

## Exercises

- **2.6:** Add new people to the phonebook.
- **2.7:** Prevent duplicate names.
- **2.8:** Add phone numbers.
- **2.9:** Filter contacts by name.
- **2.10:** Refactor the application into reusable components.
- **2.11:** Fetch phonebook data from a JSON Server backend.
- **2.12:** Save new contacts to the backend using POST requests.
- **2.13:** Separate backend communication into a service module.
- **2.14:** Delete contacts using DELETE requests.
- **2.15:** Update existing contacts using PUT requests.
- **2.16:** Display temporary success notifications after adding or updating contacts.
- **2.17:** Handle failed requests and display error notifications.

## Concepts Practiced

- React components and props
- Controlled components and form handling
- `useState` and `useEffect` hooks
- Array methods (`find`, `some`, `filter`, `map`, `concat`)
- Event handling and conditional rendering
- Derived data and component composition
- HTTP requests using Axios (GET, POST, PUT, DELETE)
- REST API integration
- JSON Server as a mock REST API
- Separating API communication from UI components
- Conditional success and error notifications
- Timed notifications using `setTimeout` and `clearTimeout`
- Promise error handling using `.catch()`

## Run Locally

Install dependencies:

```bash
npm install
```

Start the JSON Server backend in one terminal:

```bash
npm run server
```

Start the React development server in another terminal:

```bash
npm run dev
```

The application runs at `http://localhost:5173`, and the backend API is available at `http://localhost:3001/persons`.

The initial phonebook data is stored in `db.json`.