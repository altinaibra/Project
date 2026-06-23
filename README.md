# Task Manager — React Native App

A clean, fully-featured personal task manager built with Expo + TypeScript.

---

## What was implemented

| Feature | Details |
|---|---|
| Task list screen | Scrollable list with status badges, creation date, and inline toggle |
| Add task | Form with title (required, min 3 chars) + optional description, character counter |
| Toggle complete | Tap the checkbox on the list or the button on the detail screen |
| Delete task | Swipe-to-confirm alert from both list and detail screen |
| Task detail view | Full view showing title, description, date, status with action buttons |
| Search | Real-time search by title |
| Filter tabs | All / Pending / Completed with live counts |
| Local persistence | Tasks saved to device via AsyncStorage — survive app restarts |
| Public API | Fetches a motivational advice tip from [Advice Slip API](https://api.adviceslip.com/) on launch |
| Navigation | React Navigation native stack — List → Detail, List → Add |
| Empty states | Custom empty messages per filter/search context |
| Input validation | Required title, minimum length, error messages |

---

## Tech stack

- **Expo SDK 56** (blank TypeScript template)
- **React Navigation** (native stack)
- **AsyncStorage** (local persistence)
- **Advice Slip API** (public REST API for daily advice card)
- Functional components + hooks throughout
- Context API for global task state

---

## Setup & running locally

### Prerequisites

- Node.js 18+
- npm or yarn
- [Expo Go](https://expo.dev/go) app on your phone **or** an Android/iOS simulator

### Steps

```bash
# 1. Clone the repo
git clone <repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Then:
- **Physical device** — scan the QR code with Expo Go
- **Android emulator** — press `a`
- **iOS simulator (macOS only)** — press `i`
- **Web preview** — press `w`

---

## Project structure

```
src/
  types/         — shared TypeScript types (Task, FilterType)
  context/       — TaskContext (state + AsyncStorage)
  hooks/         — useAdvice (Advice Slip API fetch)
  components/    — TaskItem, EmptyState, SearchBar, FilterTabs, AdviceCard
  screens/       — TaskListScreen, AddTaskScreen, TaskDetailScreen
App.tsx          — navigation setup + TaskProvider
```
