using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MyConsoleApp
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();

        static async Task Main(string[] args)
        {
            client.BaseAddress = new Uri("https://a2-bilal-dist.vercel.app/api/");
            client.Timeout = TimeSpan.FromSeconds(10);

            Console.WriteLine("Welcome to the Greeting Console Client!");

            try
            {
                
                Console.WriteLine("Fetching available times of day...");
                var timesResponse = await client.GetAsync("times-of-day");
                var timesResponseBody = await timesResponse.Content.ReadAsStringAsync();
                var timesData = JsonConvert.DeserializeObject<TimesOfDayResponse>(timesResponseBody);
                var times = timesData.TimesOfDay;
                Console.WriteLine("Available Times of Day: " + string.Join(", ", times));

               
                Console.WriteLine("Fetching supported languages...");
                var languagesResponse = await client.GetAsync("languages");
                var languagesResponseBody = await languagesResponse.Content.ReadAsStringAsync();
                var languagesData = JsonConvert.DeserializeObject<LanguagesResponse>(languagesResponseBody);
                var languages = languagesData.Languages;
                Console.WriteLine("Supported Languages: " + string.Join(", ", languages));

                
                Console.Write("Enter Time of Day (e.g., Morning, Afternoon, Evening): ");
                string? timeOfDay = Console.ReadLine();

                Console.Write("Enter Language (e.g., English, French, Spanish): ");
                string? language = Console.ReadLine();

                Console.Write("Enter Tone (Formal/Casual): ");
                string? tone = Console.ReadLine();

                if (string.IsNullOrEmpty(timeOfDay) || string.IsNullOrEmpty(language) || string.IsNullOrEmpty(tone))
                {
                    Console.WriteLine("All inputs are required!");
                    return;
                }

                
                var greetingRequest = new
                {
                    timeOfDay = timeOfDay,
                    language = language,
                    tone = tone
                };

                var jsonRequest = JsonConvert.SerializeObject(greetingRequest);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                
                Console.WriteLine("Fetching greeting...");
                var greetingResponse = await client.PostAsync("greet", content);
                if (!greetingResponse.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Error fetching greeting: {greetingResponse.StatusCode}");
                    return;
                }

                
                var jsonResponse = await greetingResponse.Content.ReadAsStringAsync();
                var greeting = JsonConvert.DeserializeObject<GreetingResponse>(jsonResponse);
                Console.WriteLine($"Greeting: {greeting.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }

        public class TimesOfDayResponse
        {
            [JsonProperty("timesOfDay")]
            public string[] TimesOfDay { get; set; }
        }

        public class LanguagesResponse
        {
            [JsonProperty("languages")]
            public string[] Languages { get; set; }
        }

        public class GreetingResponse
        {
            [JsonProperty("greetingMessage")]
            public string? Message { get; set; }
        }
    }
}




