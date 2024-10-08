# Chat (with Node.js)
Implement a chat application (both client and server)

- You type a username and send it to the server
- It is now username (save it in localStorage)
- All the messages should have an author, time, and text
- Implement the ability to create rooms (create / rename / join / delete)
- New user should see all previous messages in the room

## Project Structure

```chat-app/
│
└── server/
    ├── src/
    │   ├── controllers/        # Controllers for handling requests
    │   │   ├── roomController.js  # Logic for room management
    │   │   └── messageController.js # Logic for message handling
    │   │
    │   ├── models/             # Database models
    │   │   ├── Room.js         # Model for rooms
    │   │   └── Message.js      # Model for messages
    │   │
    │   ├── routes/             # Routes (endpoints)
    │   │   ├── roomRoutes.js    # Route for rooms
    │   │   └── messageRoutes.js # Route for messages
    │   │
    │   ├── utils/              # Utilities (helper functions if needed)
    │   │   └── db.js           # File for database setup
    │   │
    │   ├── exceptions/         # Exception handling
    │   │   └── api.error.js    # File for API error handling
    │   │
    │   └── index.js            # Main file to start the server
    │
    └── package.json            # Dependencies and server configuration
```

## Endpoint Routing Scheme
```
GET    /rooms              # Get all rooms
POST   /rooms              # Create a new room
PATCH  /rooms/:roomId      # Rename a room
DELETE /rooms/:roomId      # Delete a room

GET    /messages/:roomId   # Get all messages in a room
POST   /messages/:roomId    # Send a message in a room
```

## Database Schema

### Users
| Column    | Type                      |
|-----------|---------------------------|
| id        | SERIAL PRIMARY KEY        |
| username  | VARCHAR(255) UNIQUE       |
| createdAt | TIMESTAMP DEFAULT NOW()   |
| updatedAt | TIMESTAMP DEFAULT NOW()   |

### Rooms
| Column    | Type                      |
|-----------|---------------------------|
| id        | SERIAL PRIMARY KEY        |
| name      | VARCHAR(255) UNIQUE       |
| createdAt | TIMESTAMP DEFAULT NOW()   |
| updatedAt | TIMESTAMP DEFAULT NOW()   |

### Messages
| Column    | Type                              |
|-----------|-----------------------------------|
| id        | SERIAL PRIMARY KEY                |
| userId    | INTEGER REFERENCES Users(id)      |
| roomId    | INTEGER REFERENCES Rooms(id)      |
| text      | TEXT                              |
| time      | TIMESTAMP DEFAULT NOW()           |
