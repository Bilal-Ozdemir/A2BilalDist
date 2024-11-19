# Bilal Ozdemir A2
## GitHub Repository
[https://github.com/Bilal-Ozdemir/A2BilalDist](https://github.com/Bilal-Ozdemir/A2BilalDist)
# Greetings API

This API allows you to manage and retrieve greetings based on the time of day, language, and tone.

## API Endpoints

### 1. Greet Endpoint
- **URL**: `POST http://localhost:5000/api/greet`
- **Description**: Returns a greeting message based on the `timeOfDay`, `language`, and `tone` provided.
- **Request Body**:
  ```json
  {
    "timeOfDay": "Morning",
    "language": "English",
    "tone": "Formal"
  }

- **Example JSON Response**:
  ```json
  {
  "greetingMessage": "Good Morning!"
  }

### 2. GetAllTimesOfDay Endpoint
- **URL**: `GET http://localhost:5000/api/times-of-day`
- **Description**: Returns a list of all available times of day.
- **Example JSON Response**:
  ```json
  {
  "timesOfDay": ["Morning", "Afternoon", "Evening"]
  }

### 3. GetSupportedLanguages Endpoint
- **URL**: `GET http://localhost:5000/api/languages`
- **Description**: Returns a list of all supported languages.
- **Example JSON Response**:
  ```json
  {
  "languages": ["English", "French", "Spanish"]
  }

 



