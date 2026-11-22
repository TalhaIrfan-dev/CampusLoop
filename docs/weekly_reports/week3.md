# Week 3 --- Planned Activities

## 1. Review and Stabilize Existing Functionality

-   Thoroughly test student registration and login.
-   Verify password hashing and password comparison using bcrypt.
-   Test session creation, protected routes, and logout functionality.
-   Verify that unauthenticated users cannot access private pages.
-   Test product listing creation, image uploads, and database
    insertion.
-   Test marketplace browsing, product search, category filters,
    listing-type filters, condition filters, and sorting.
-   Test product detail pages and verify that the correct listing is
    displayed.
-   Test My Listings, including viewing, editing, and deleting listings.
-   Verify listing ownership checks so students can only modify or
    delete their own listings.
-   Identify and fix bugs found during functional testing.

## 2. Database Organization and Documentation

-   Review the existing MySQL tables and their relationships.
-   Prepare a complete, reproducible SQL database schema script.
-   Prepare optional sample/seed data for development and testing.
-   Document the tables, columns, primary keys, foreign keys, and
    relationships.
-   Verify that the database structure supports users, listings, offers,
    transactions, and delivery records.
-   Update `.env.example` with all required database and session
    environment variables without including real credentials.

## 3. Offers and Requests Management

-   Design the workflow for students to make offers or purchase requests
    on listings.
-   Decide how exchange and donation requests will be represented.
-   Design and create the required database table(s) for offers or
    requests.
-   Implement submission of an offer/request by a student.
-   Allow listing owners to view incoming offers and requests.
-   Allow listing owners to accept or reject an offer/request.
-   Validate listing availability and prevent invalid or duplicate
    requests where appropriate.
-   Display the current status of each offer/request to the involved
    students.
-   Include independent item requests and responses to those requests.

## 4. Transaction Management

-   Design and create the database table(s) required to record
    transactions.
-   Create a transaction when an offer or request is accepted, according
    to the agreed workflow.
-   Store the buyer/requesting student, seller/listing owner, listing,
    and transaction status.
-   Implement transaction status updates.
-   Display relevant transaction information to both involved students.
-   Maintain a transaction history for students.
-   Ensure that completed, cancelled, or rejected transactions are
    handled consistently.

## 5. Smart Delivery Recommendation System

-   Finalize the delivery methods that CampusLoop will support.
-   Define the item and delivery attributes used by the recommendation
    process, such as weight, size, fragility, and delivery requirements.
-   Define clear rule-based eligibility conditions for each delivery
    method.
-   Implement the recommendation logic using the available listing
    information.
-   Return suitable delivery recommendations for a transaction.
-   Display the recommended delivery method and a brief explanation of
    why it is suitable.
-   Handle cases where no available delivery method meets the
    requirements.
-   Test the recommendation rules using different item and delivery
    scenarios.
-   Include Personal Pickup, Bike/Rider, Van, Truck, and simulated Drone as delivery options.

## 6. Delivery Management

-   Design and create the database table(s) needed to store delivery
    information.
-   Connect a delivery record with its related transaction.
-   Allow the appropriate students to view delivery details.
-   Implement delivery method selection or confirmation based on the
    recommendation workflow.
-   Implement delivery status updates, such as pending, assigned, in
    transit, delivered, or cancelled, as finalized for the project.
-   Display delivery status and relevant details to the students
    involved.
-   Keep delivery management simulated within the CampusLoop
    application; external delivery service integration is not part of
    this planned work unless the project scope is revised.
-   Include simulated delivery-user assignment and delivery status updates (Requested, Assigned, Picked Up, In        
    Transit, Delivered).

## 7. Dashboard and Student Activity

-   Improve the student dashboard with actual data from the database.
-   Display useful listing and transaction summaries.
-   Show incoming offers/requests and their statuses.
-   Show the student's active and previous transactions.
-   Show delivery information and status where applicable.
-   Ensure that dashboard information is limited to the currently
    logged-in student.
-   Include circular-economy statistics.

## 8. Notifications and Additional Features

-   Identify the important events that should generate notifications,
    such as receiving an offer, an offer being accepted or rejected, and
    a delivery status change.
-   Decide how notifications will be stored and displayed.
-   Implement basic in-application notifications if time permits.
-   Review whether student profile management, ratings/reviews, and
    administrative listing moderation fit the remaining project scope
    and schedule.
-   Implement only the additional features that are approved and
    feasible within the semester timeline.

## 9. Security, Validation, and Error Handling

-   Review server-side validation for authentication, listings, offers,
    transactions, and delivery forms.
-   Continue using parameterized SQL queries for database operations.
-   Review image upload validation and file handling.
-   Add protection against unauthorized access to student-specific
    records.
-   Review session configuration and plan a persistent session store
    before deployment.
-   Consider CSRF protection and login rate limiting.
-   Provide clear error handling for invalid input, missing records, and
    database failures.

## 10. Testing and Documentation

-   Perform functional testing of the existing authentication and
    listing workflows.
-   Test offer/request, transaction, and delivery workflows as they are
    implemented.
-   Test the smart delivery recommendation rules with multiple
    scenarios.
-   Verify that students cannot access or modify another student's
    private records.
-   Record identified issues and fix high-priority bugs.
-   Update the project README to reflect the selected technology stack
    and implemented functionality.
-   Maintain database documentation, test records, and relevant
    development notes.
-   Review the project structure and remove only genuinely unnecessary
    files or dependencies.

## 11. Item Request Management
- Allow students to post requests for items they need.
- Display available item requests to other students.
- Allow students to respond to relevant requests through available listings.
## 12. User Roles and Access Management
- Define Student, Admin, and Delivery User roles.
- Implement appropriate access permissions for each role.
- Restrict administrative and delivery-related functionality to authorized users.
## 13. Circular Economy Statistics
- Display statistics for sold, exchanged, donated, and reused items.
- Integrate relevant activity statistics into the dashboard.
- Retrieve statistics dynamically from the database.
## 14. Responsive Design and Interface Testing
- Test the application on desktop, tablet, and mobile screens.
- Identify and fix layout and usability issues.
- Verify consistency across different screen sizes.

------------------------------------------------------------------------

## Expected Outcome --- Week 3

By the end of Week 3, the goal is to have the existing authentication
and marketplace functionality tested and stabilized, database
documentation prepared, and the core peer-to-peer workflow
(offers/requests and transactions) developed or substantially underway.
The smart delivery recommendation and delivery management modules should
be designed and implemented as far as the available time permits.

**Note:** These are planned activities. Their completion status should
be updated in the weekly report after implementation and testing.
