# Sprint Plan: 2025-07-07 - 2025-07-21

**Sprint Goal:** Enhance the user profile page to include a history of attended events and allow users to manage their account details, thereby increasing user engagement and providing more value to the user post-purchase.

---
****
## Sprint Backlog

| PBI | User Story / Task | Priority | Story Points | Status |
|---|---|---|---|---|
| **PBI-123** | As a registered user, I want to see a list of all the tickets I have purchased on my profile page, so that I can easily track my upcoming and past events. | High | 5 | To Do |
| **PBI-124** | As a registered user, I want to be able to update my first name, last name, and profile picture, so that my personal information is accurate. | High | 8 | To Do |
| **PBI-125** | As a user viewing an event, I want to see a list of related events (by the same organizer or in the same category), so that I can discover other events I might be interested in. | Medium | 5 | To Do |
| **PBI-126** | **Tech Task:** Refactor the `EventForm.tsx` component to use the reusable `useForm` hook for state management and validation to improve maintainability. | Medium | 3 | To Do |
| **PBI-127** | **Bug:** The `CategoryFilter` does not reset when the user performs a new search via the main search bar, leading to confusing results. | High | 2 | To Do |

---

### PBI-123: "My Tickets" Section on Profile

**User Story:** As a registered user, I want to see a list of all the tickets I have purchased on my profile page, so that I can easily track my upcoming and past events.

**Acceptance Criteria:**
- The user's profile page (`/profile`) should have a new section titled "My Tickets".
- This section should display a collection of events for which the user has placed an order.
- Each item in the list should show the event title, date, and a link to the order details.
- A distinction between upcoming and past events should be clear.

**Tasks:**
- [ ] Create a new component `OrdersCollection.tsx` for displaying the list of ordered events.
- [ ] Update `order.actions.ts` to include a function `getOrdersByUser` that retrieves all orders for a given user ID.
- [ ] Modify the `Profile` page component in `app/(root)/profile/page.tsx` to fetch and display the user's orders.

### PBI-124: Edit User Profile

**User Story:** As a registered user, I want to be able to update my first name, last name, and profile picture, so that my personal information is accurate.

**Acceptance Criteria:**
- The profile page should contain an "Edit Profile" button.
- Clicking the button should open a modal or navigate to a form where the user can change their first name, last name, and upload a new profile picture.
- The `FileUploader` component should be used for the picture upload.
- Upon saving, the new information should be reflected on their profile and in the site header.

**Tasks:**
- [ ] Create a new `ProfileForm.tsx` component.
- [ ] Implement the `updateUser` action in `lib/actions/user.actions.ts`.
- [ ] Integrate the form with the `updateUser` action and handle the file upload logic.
- [ ] Ensure the Clerk user session is updated with the new information.

---

## Team & Capacity

*   **Team:** 1 Full-Stack Engineer
*   **Sprint Duration:** 2 Weeks
*   **Capacity:** 100%

---

## Definition of Done (DoD)

- Code is peer-reviewed.
- All related unit and integration tests are passing.
- Code adheres to the project's ESLint and Prettier configurations.
- Functionality is manually tested and verified against the acceptance criteria in a staging environment.
- All changes are merged into the `main` branch.
- No new high-priority bugs are introduced.
