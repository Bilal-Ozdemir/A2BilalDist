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
            
            client.BaseAddress = new Uri("http://localhost:5000/api/");

            Console.WriteLine("Welcome to the Greeting Console Client!");

            
            Console.Write("Enter Time of Day (Morning/Afternoon/Evening): ");
            string timeOfDay = Console.ReadLine();

            Console.Write("Enter Language (English/French/Spanish): ");
            string language = Console.ReadLine();

            Console.Write("Enter Tone (Formal/Casual): ");
            string tone = Console.ReadLine();

  
            var greetingRequest = new
            {
                timeOfDay = timeOfDay,
                language = language,
                tone = tone
            };

            
            var jsonRequest = JsonConvert.SerializeObject(greetingRequest);
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            
            HttpResponseMessage response = await client.PostAsync("greet", content);

            
            if (response.IsSuccessStatusCode)
            {
              
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var greetingResponse = JsonConvert.DeserializeObject<GreetingResponse>(jsonResponse);
                Console.WriteLine($"Response: {greetingResponse.Message} (Tone: {greetingResponse.Tone})");
            }
            else
            {
                
                var errorResponse = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error: {errorResponse}");
            }
        }

        
        public class GreetingResponse
        {
            [JsonProperty("greetingMessage")]
            public string Message { get; set; }
    
            [JsonProperty("tone")]
            public string Tone { get; set; }
        }

    }
}


