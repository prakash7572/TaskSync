using Microsoft.AspNetCore.Mvc;
using System.Web;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TaskSync.Controllers
{
    public class Address : Controller
    {
        public async Task<IActionResult> Index()
        {
            string location = await GetLocationFromIpAsync();
            return Content(location);
        }

        async Task<string> GetLocationFromIpAsync()
        {
            string url = "https://ipinfo.io/json";
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    var jsonResult = JsonConvert.DeserializeObject<dynamic>(result);
                    string location = jsonResult?.loc;

                    if (!string.IsNullOrEmpty(location))
                    {
                        string[] locParts = location.Split(',');

                        if (locParts.Length == 2 &&
                            double.TryParse(locParts[0], out double latitude) &&
                            double.TryParse(locParts[1], out double longitude))
                        {
                            string address = await GetAddressFromCoordinatesAsync(latitude, longitude);
                            return address;
                        }
                    }
                }
                return "Unable to retrieve location.";
            }
        }

        async Task<string> GetAddressFromCoordinatesAsync(double latitude, double longitude)
        {
            string apiKey = "cac454b528d949a58b171d844d0e7f21";
            string url = $"https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key={apiKey}";

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    var jsonResult = JsonConvert.DeserializeObject<dynamic>(result);

                    if (jsonResult?.status?.code == 200 && jsonResult?.results?.Count > 0)
                    {
                        string formattedAddress = jsonResult.results[0]?.formatted;
                        return formattedAddress ?? "Address not found.";
                    }
                }
            }
            return "Unable to retrieve address.";
        }

    }
}
