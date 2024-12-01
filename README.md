# Bilal Ozdemir A3
## GitHub Repository
[https://github.com/Bilal-Ozdemir/A2BilalDist](https://github.com/Bilal-Ozdemir/A2BilalDist)
# Greetings API

This API allows you to manage and retrieve greetings based on the time of day, language, and tone.

## API Details

### Base URL
**Live API URL**:  
[https://a2-bilal-dist.vercel.app](https://a2-bilal-dist.vercel.app)

---

## API Endpoints

### 1. Greet Endpoint
- **URL**: `POST https://a2-bilal-dist.vercel.app/api/greet`
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
- **URL**: `GET https://a2-bilal-dist.vercel.app/api/times-of-day`
- **Description**: Returns a list of all available times of day.
- **Example JSON Response**:
  ```json
  {
  "timesOfDay": ["Morning", "Afternoon", "Evening"]
  }

### 3. GetSupportedLanguages Endpoint
- **URL**: `GET https://a2-bilal-dist.vercel.app/api/languages`
- **Description**: Returns a list of all supported languages.
- **Example JSON Response**:
  ```json
  {
  "languages": ["English", "French", "Spanish"]
  }

### Console Application
- **Navigate to this directory:** 
```json
  cd MyConsoleApp
  ```
- **Run the Console App, and follow the prompts** 
```json
  dotnet run
  ```
  

 



