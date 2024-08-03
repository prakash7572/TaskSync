using TaskSync.Helpher;
using TaskSync.Interface;
using TaskSync.Models;

namespace TaskSync.Service
{
    public class Profile : IProfile
    {
        readonly DBConnection _dbConnection;
        public readonly TaskSync.Helpher.DataResponse _response;
        public Profile(DBConnection dbConnection, DataResponse response)
        {
            _dbConnection = dbConnection;
            _response = response;
        }
        public Task<List<DataResponse>> Login(Models.Profile profile)
        {
            List<Models.Profile> profiles = _dbConnection.Profile.Where(x=>x.Email == profile.Email && x.Password == profile.Password).ToList();
            if (profiles.Count() > 0) {
                _response.Status = "SUCCESS";
                _response.Message = "User Login Successfully !!";
            }
            else
            {   
                _response.Status = "ERROR";
                _response.Message = "Invalid User !!";
            }
            return  Task.FromResult(new List<DataResponse> { _response });
        }
    }
}
